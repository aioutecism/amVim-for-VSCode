# amVim for VSCode

![icon](images/icon.png)

The [Vim](http://www.vim.org/) mode for [Visual Studio Code](https://code.visualstudio.com/) that works as expected.


## Key features

- Vim style keybindings & looks
- Normal, Visual and Visual Line modes support
- Multi-cursor support
- Works with VSCode's default behaviors


## Not supported

- `:` started commands: Please use `Command Palette` (`Shift+Cmd+P` on OSX, `Shift+Ctrl+P` on Windows) instead.
- Visual Block mode: Please use multi-cursor instead for now.
- Custom keybindings: On the roadmap.


## Commands

Check the list [here](https://github.com/aioutecism/amVim-for-VSCode/issues/1).


## Configuration

You can overwrite default configurations in
[User and Workspace Settings](https://code.visualstudio.com/docs/customization/userandworkspace).

#### `amVim.bindCtrlCommands`

`Boolean`, Default: `true`

Set to `false` to disable `Ctrl+<key>` keybindings.


## Change Log

### [1.11.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.2)

- Fix where undo/redo will revert selections that blocks further undo/redo.


### [1.11.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.1)

- Fix wrong behavior when deleting word at end of line. 


### [1.11.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.0)

- Added support for `= {motion}`, `= =` in Normal mode, `=` in Visual and VisualLine modes.


### [1.10.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.10.2)

- Workaround where `.` may blocks further inputs.


### [1.10.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.10.1)

- Fix unstable movement between tab indented lines.

Full list [here](https://github.com/aioutecism/amVim-for-VSCode/releases).


## Contribution

Feel free to open [issues](https://github.com/aioutecism/amVim-for-VSCode/issues) to report bugs or require features.

[Pull requests](https://github.com/aioutecism/amVim-for-VSCode/pulls) are welcomed too!
