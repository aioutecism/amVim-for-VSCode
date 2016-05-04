import {ExtensionContext} from 'vscode';
import {Configuration} from './Configuration';
import {Dispatcher} from './Dispatcher';
import {ModeID} from './Modes/Mode';

let dispatcher: Dispatcher;

export function activate(context: ExtensionContext) {
    Configuration.init();
    dispatcher = new Dispatcher(context);

    context.subscriptions.push(
        Configuration,
        dispatcher
    );
}

export function currentModeId(): ModeID {
    return dispatcher ? dispatcher.currentModeId : null;
}
