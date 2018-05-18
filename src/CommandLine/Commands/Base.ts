export abstract class CommandBase {
  protected name: string;
  abstract execute(...args): void;
}