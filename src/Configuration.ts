import {workspace, WorkspaceConfiguration, Disposable} from 'vscode';

export class Configuration {

    private static isReady = false;
    private static configuration: WorkspaceConfiguration;
    private static disposables: Disposable[] = [];

    static init(): void {
        if (this.isReady) {
            return;
        }

        this.isReady = true;

        this.update();

        this.disposables.push(
            workspace.onDidChangeConfiguration(() => {
                this.update();
            })
        );
    }

    static update(): void {
        this.configuration = workspace.getConfiguration('amVim');
    }

    static get<T>(section: string, defaultValue?: T): T {
        return this.configuration.get(section, defaultValue);
    }

    static has(section: string): boolean {
        return this.configuration.has(section);
    }

    static dispose(): void {
        Disposable.from(...this.disposables).dispose();
    }

}
