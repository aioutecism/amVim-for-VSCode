export interface Action {
    (args?: {}): Thenable<boolean>;
}
