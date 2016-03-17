import {commands, workspace, WorkspaceConfiguration, Disposable} from 'vscode';

export class Configuration {

    private static isReady = false;
    private static extensionNamespace: WorkspaceConfiguration;
    private static editorNamespace: WorkspaceConfiguration;
    private static disposables: Disposable[] = [];

    static init(): void {
        if (this.isReady) {
            return;
        }

        this.isReady = true;

        this.updateCache();
        this.updateKeybindingContexts();

        this.disposables.push(
            workspace.onDidChangeConfiguration(() => {
                this.updateCache();
                this.updateKeybindingContexts();
            })
        );
    }

    private static updateCache(): void {
        this.extensionNamespace = workspace.getConfiguration('amVim');
        this.editorNamespace = workspace.getConfiguration('editor');
    }

    private static updateKeybindingContexts(): void {
        commands.executeCommand('setContext',
            'amVim.configuration.shouldBindCtrlC', this.getExtensionSetting<boolean>('bindCtrlC'));
    }

    static getExtensionSetting<T>(section: string, defaultValue?: T): T {
        return this.extensionNamespace.get(section, defaultValue);
    }

    static getEditorSetting<T>(section: string, defaultValue?: T): T {
        return this.editorNamespace.get(section, defaultValue);
    }

    static dispose(): void {
        Disposable.from(...this.disposables).dispose();
    }

}
