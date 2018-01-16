import {commands, window, workspace, WorkspaceConfiguration, Disposable} from 'vscode';
import {ModeID} from './Modes/Mode';
import {UtilWord} from './Utils/Word';

export class Configuration {

    private static isReady = false;
    private static extensionNamespace: WorkspaceConfiguration;
    private static editorNamespace: WorkspaceConfiguration;
    private static disposables: Disposable[] = [];

    private static _defaultModeID: ModeID;
    static get defaultModeID(): ModeID { return this._defaultModeID; }

    static init(): void {
        if (this.isReady) {
            return;
        }

        this.isReady = true;

        this.onDidChangeConfiguration();

        this.disposables.push(
            workspace.onDidChangeConfiguration(() => this.onDidChangeConfiguration())
        );
    }

    private static onDidChangeConfiguration(): void {
        this.updateCache();
        this.updateKeybindingContexts();
        this._defaultModeID = this.getExtensionSetting<boolean>('startInInsertMode', false) ? ModeID.INSERT : ModeID.NORMAL;
        UtilWord.updateCharacterKindCache(this.getEditorSetting<string>('wordSeparators', '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?'));
    }

    private static updateCache(): void {
        this.extensionNamespace = workspace.getConfiguration('amVim');
        this.editorNamespace = workspace.getConfiguration('editor');
    }

    private static updateKeybindingContexts(): void {
        commands.executeCommand('setContext',
            'amVim.configuration.shouldBindCtrlCommands', this.getExtensionSetting<boolean>('bindCtrlCommands', true));
        commands.executeCommand('setContext',
            'amVim.configuration.shouldUseVimStyleNavigationInListView', this.getExtensionSetting<boolean>('vimStyleNavigationInListView', true));
    }

    static getExtensionSetting<T>(section: string, defaultValue: T): T {
        return this.extensionNamespace.get<T>(section, defaultValue);
    }

    static getEditorSetting<T>(section: string, defaultValue: T): T {
        return this.editorNamespace.get<T>(section, defaultValue);
    }

    /**
     * Remarks: Workaround undefined bug in native API.
     */
    static getInsertSpace(): boolean {
        if (window.activeTextEditor) {
            const options = window.activeTextEditor.options;
            if (options.insertSpaces !== undefined) {
                return options.insertSpaces as boolean;
            }
        }

        return this.getEditorSetting<boolean>('insertSpaces', true);
    }

    /**
     * Remarks: Workaround undefined bug in native API.
     */
    static getTabSize(): number {
        if (window.activeTextEditor) {
            const options = window.activeTextEditor.options;
            if (options.tabSize !== undefined) {
                return options.tabSize as number;
            }
        }

        return this.getEditorSetting<number>('tabSize', 4);
    }

    static dispose(): void {
        Disposable.from(...this.disposables).dispose();
    }

}
