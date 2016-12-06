import {ExtensionContext} from 'vscode';
import {Configuration} from './Configuration';
import {Dispatcher} from './Dispatcher';
import {Mode} from './Modes/Mode';

let dispatcher: Dispatcher;

export function activate(context: ExtensionContext) {
    Configuration.init();
    dispatcher = new Dispatcher(context, Configuration);
    
    context.subscriptions.push(
        Configuration,
        dispatcher
    );
}

export function getCurrentMode(): Mode | null {
    return dispatcher ? dispatcher.currentMode : null;
}
