import {workspace, WorkspaceConfiguration, Disposable} from 'vscode';
import {Layout} from './Layouts/Layout';

export class Configuration {

    private static defaultKeyboardLayout = 'US QWERTY';

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
        this.updateLayout();

        this.disposables.push(
            workspace.onDidChangeConfiguration(() => {
                this.updateCache();
                this.updateLayout();
            })
        );
    }

    private static updateCache(): void {
        this.extensionNamespace = workspace.getConfiguration('amVim');
        this.editorNamespace = workspace.getConfiguration('editor');
    }

    private static updateLayout(): void {
        try {
            Layout.use(this.getExtensionSetting<string>('keyboardLayout'));
        } catch (error) {
            Layout.use(this.defaultKeyboardLayout);
        }
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
