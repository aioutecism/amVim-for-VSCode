import {ExtensionContext} from 'vscode';
import {Dispatcher} from './Dispatcher';

export function activate(context: ExtensionContext) {
    const dispatcher = new Dispatcher(context);
    context.subscriptions.push(dispatcher);
}
