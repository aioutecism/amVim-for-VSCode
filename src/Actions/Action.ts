export interface Action {
    (args?: {}): Thenable<boolean | undefined> | Promise<boolean | undefined>;
}
