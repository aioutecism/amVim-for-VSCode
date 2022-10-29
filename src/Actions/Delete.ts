import { window, Range, Selection } from 'vscode';
import { StaticReflect } from '../LanguageExtensions/StaticReflect';
import { SymbolMetadata } from '../Symbols/Metadata';
import { ActionSelection } from './Selection';
import { ActionRegister } from './Register';
import { ActionReveal } from './Reveal';
import { Motion } from '../Motions/Motion';
import { TextObject } from '../TextObjects/TextObject';
import { UtilRange } from '../Utils/Range';

export class ActionDelete {
    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static async byMotions(args: {
        motions: Motion[];
        isChangeAction?: boolean;
        shouldYank?: boolean;
    }): Promise<boolean> {
        args.isChangeAction = args.isChangeAction === undefined ? false : args.isChangeAction;
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return false;
        }

        const document = activeTextEditor.document;

        let ranges: Range[] = [];

        for (const selection of activeTextEditor.selections) {
            const start = selection.active;
            let position = start;
            for (const motion of args.motions) {
                position = await motion.apply(position, {
                    isInclusive: true,
                    shouldCrossLines: false,
                    isChangeAction: args.isChangeAction,
                });
            }
            ranges.push(new Range(start, position));
        }

        if (args.motions.some((motion) => motion.isLinewise)) {
            ranges = ranges.map((range) => UtilRange.toLinewise(range, document));
        }

        ranges = UtilRange.unionOverlaps(ranges);

        // TODO: Move cursor to first non-space if needed

        if (args.shouldYank) {
            await ActionRegister.yankByMotions({
                motions: args.motions,
                isChangeAction: args.isChangeAction,
            });
        }
        await activeTextEditor.edit((editBuilder) => {
            ranges.forEach((range) => editBuilder.delete(range));
        });
        await ActionSelection.shrinkToStarts();
        await ActionReveal.primaryCursor();

        return true;
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static byTextObject(args: { textObject: TextObject; shouldYank?: boolean }): Thenable<boolean> {
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        let ranges: Range[] = [];

        activeTextEditor.selections.forEach((selection) => {
            const match = args.textObject.apply(selection.active);
            if (match) {
                ranges.push(match);
            }
        });

        ranges = UtilRange.unionOverlaps(ranges);

        if (ranges.length === 0) {
            return Promise.reject<boolean>(false);
        }

        return (
            args.shouldYank
                ? ActionRegister.yankByTextObject({
                      textObject: args.textObject,
                  })
                : Promise.resolve(true)
        )
            .then(() => {
                // Selections will be adjust to matched ranges' start.
                activeTextEditor.selections = ranges.map(
                    (range) => new Selection(range.start, range.start),
                );

                return activeTextEditor.edit((editBuilder) => {
                    ranges.forEach((range) => editBuilder.delete(range));
                });
            })
            .then(() => ActionSelection.shrinkToStarts())
            .then(() => ActionReveal.primaryCursor());
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static selectionsOrLeft(
        args: {
            n?: number;
            shouldYank?: boolean;
        } = {},
    ): Thenable<boolean> {
        args.n = args.n === undefined ? 1 : args.n;
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        let ranges = activeTextEditor.selections.map((selection) => {
            let n = Math.min(selection.active.character, args.n!);
            return selection.isEmpty && selection.active.character !== 0
                ? new Range(selection.active, selection.active.translate(0, -n))
                : selection;
        });

        ranges = UtilRange.unionOverlaps(ranges);

        return (
            args.shouldYank
                ? ActionRegister.yankRanges({
                      ranges: ranges,
                      isLinewise: false,
                  })
                : Promise.resolve(true)
        )
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    ranges.forEach((range) => editBuilder.delete(range));
                });
            })
            .then(() => ActionSelection.shrinkToStarts())
            .then(() => ActionReveal.primaryCursor());
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static selectionsOrRight(
        args: {
            n?: number;
            shouldYank?: boolean;
        } = {},
    ): Thenable<boolean> {
        args.n = args.n === undefined ? 1 : args.n;
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        let ranges = activeTextEditor.selections.map((selection) => {
            return selection.isEmpty
                ? new Range(selection.active, selection.active.translate(0, +args.n!))
                : selection;
        });

        ranges = UtilRange.unionOverlaps(ranges);

        return (
            args.shouldYank
                ? ActionRegister.yankRanges({
                      ranges: ranges,
                      isLinewise: false,
                  })
                : Promise.resolve(true)
        )
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    ranges.forEach((range) => editBuilder.delete(range));
                });
            })
            .then(() => ActionSelection.shrinkToStarts())
            .then(() => ActionReveal.primaryCursor());
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static byLines(args: { n?: number; shouldYank?: boolean }): Thenable<boolean> {
        args.n = args.n === undefined ? 1 : args.n;
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        const document = activeTextEditor.document;

        let ranges = activeTextEditor.selections.map((selection) => {
            const range =
                args.n === 1
                    ? selection
                    : selection.with({
                          end: selection.end.translate(args.n! - 1),
                      });
            return UtilRange.toLinewise(range, document);
        });

        ranges = UtilRange.unionOverlaps(ranges);

        return (args.shouldYank ? ActionRegister.yankLines({ n: args.n }) : Promise.resolve(true))
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    ranges.forEach((range) => editBuilder.delete(range));
                });
            })
            .then(() => ActionSelection.shrinkToStarts())
            .then(() => ActionReveal.primaryCursor());
    }
}
