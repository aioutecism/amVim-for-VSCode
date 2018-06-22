export class Command {
  protected readonly input: string;

  constructor(input: string) {
    this.input = input;
  }

  execute(): Thenable<boolean | undefined> {
    return Promise.resolve(false);
  }
}
