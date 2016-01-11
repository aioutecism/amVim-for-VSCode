import {ExtensionContext} from 'vscode';
import {Configuration} from './Configuration';
import {Dispatcher} from './Dispatcher';

export function activate(context: ExtensionContext) {
    Configuration.init();
    const dispatcher = new Dispatcher(context);

    context.subscriptions.push(
        Configuration,
        dispatcher
    );
}
