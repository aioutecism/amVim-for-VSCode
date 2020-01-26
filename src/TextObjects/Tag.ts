import { TextDocument, Position, Range } from 'vscode';
import { TextObject } from './TextObject';

type Tag = { name: string; type: 'close' | 'open'; start: number; end: number };
type MatchedTag = {
    tag: string;
    openingTagStart: number;
    openingTagEnd: number;
    closingTagStart: number;
    closingTagEnd: number;
};

export class TextObjectTag extends TextObject {
    TAG_REGEX = /<(\/)?([^><\s\/]+)(?:[^><]*?)(\/)?>/g;
    OPEN_FORWARD_SLASH = 1;
    TAG_NAME = 2;
    CLOSE_FORWARD_SLASH = 3;
    openStart: number | undefined;
    openEnd: number | undefined;
    closeStart: number | undefined;
    closeEnd: number | undefined;
    tagsParsed: boolean = false;

    static byTag(args: { isInclusive: boolean }): TextObject {
        const obj = new TextObjectTag();
        obj.isInclusive = args.isInclusive;
        return obj;
    }

    findStartRange(document: TextDocument, anchor: Position): Range | null {
        this.parseTags(document, anchor);

        if (this.openStart !== undefined && this.openEnd !== undefined) {
            return new Range(
                document.positionAt(this.openStart),
                document.positionAt(this.openEnd),
            );
        }
        return null;
    }

    findEndRange(document: TextDocument, anchor: Position): Range | null {
        this.parseTags(document, anchor);

        if (this.closeStart !== undefined && this.closeEnd !== undefined) {
            return new Range(
                document.positionAt(this.closeStart),
                document.positionAt(this.closeEnd),
            );
        }
        return null;
    }

    parseTags(document: TextDocument, anchor: Position) {
        // Only need to parse tags if we haven't already
        if (this.tagsParsed) {
            return;
        }

        let match;
        let tags: Tag[] = [];
        // TODO: Potential performance issue with getText()
        while ((match = this.TAG_REGEX.exec(document.getText())) !== null) {
            if (match[this.CLOSE_FORWARD_SLASH]) {
                continue;
            }

            tags.push({
                name: match[this.TAG_NAME],
                type: match[this.OPEN_FORWARD_SLASH] ? 'close' : 'open',
                start: match.index,
                end: this.TAG_REGEX.lastIndex,
            });
        }

        const stack: Tag[] = [];
        const matchedTags: MatchedTag[] = [];

        for (let tag of tags) {
            // We have to push on the stack
            // if it is an open tag.
            if (tag.type === 'open') {
                stack.push(tag);
            } else {
                // We have an unmatched closing tag,
                // so try and match it with any existing tag.
                for (let i = stack.length - 1; i >= 0; i--) {
                    const openNode = stack[i];

                    if (openNode.type === 'open' && openNode.name === tag.name) {
                        // A matching tag was found, ignore
                        // any tags that were in between.
                        matchedTags.push({
                            tag: openNode.name,
                            openingTagStart: openNode.start,
                            openingTagEnd: openNode.end,
                            closingTagStart: tag.start,
                            closingTagEnd: tag.end,
                        });

                        stack.splice(i);
                        break;
                    }
                }
            }
        }

        const startPos = document.offsetAt(anchor);
        const endPos = document.offsetAt(anchor);
        const tagsSurrounding = matchedTags.filter((n) => {
            return startPos > n.openingTagStart && endPos < n.closingTagEnd;
        });

        if (!tagsSurrounding.length) {
            return;
        }

        // The first one should be the most relevant tag.
        const nodeSurrounding = tagsSurrounding[0];

        this.openStart = nodeSurrounding.openingTagStart;
        this.closeEnd = nodeSurrounding.closingTagEnd;
        // if the inner tag content is already selected, expand to enclose tags with 'it' as in vim
        if (
            startPos === nodeSurrounding.openingTagEnd &&
            endPos + 1 === nodeSurrounding.closingTagStart
        ) {
            this.openEnd = this.openStart;
            this.closeStart = this.closeEnd;
        } else {
            this.openEnd = nodeSurrounding.openingTagEnd;
            this.closeStart = nodeSurrounding.closingTagStart;
        }

        this.tagsParsed = true;
    }
}
