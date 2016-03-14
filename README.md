# Beta

This extension is in beta state. Functions may have bugs, but they will be fixed soon.

Feel free to open [issues](https://github.com/aioutecism/amVim-for-VSCode/issues) to report bugs or require functions.


# amVim for VSCode

![icon](images/icon.png)

The [Vim](http://www.vim.org/) mode for [Visual Studio Code](https://code.visualstudio.com/) that works as expected.


## Key features

- Vim style keybindings & looks
- Normal, Visual and Visual Line modes support
- Multi-cursor support


## Not supported

- `:` started commands: Please use `Command Palette` (`Shift+Cmd+P` on OSX, `Shift+Ctrl+P` on Windows) instead.
- Visual Block mode: Please use multi-cursor instead.


## Commands

Check the list [here](https://github.com/aioutecism/amVim-for-VSCode/issues/1).


## Configuration

You can overwrite default configurations in
[User and Workspace Settings](https://code.visualstudio.com/docs/customization/userandworkspace).

#### `amVim.keyboardLayout`

`String`, Default: `US QWERTY`

Your keyboard layout.

Values avaliable:

- `US QWERTY`
- `DE_CH QWERTZ`

**This won't be needed after VSCode v0.10.12 is released.**


#### `amVim.bindCtrlC`

`Boolean`, Default: `false`

Set to `true` to bind `Ctrl+C` as the same behaviour in Vim.


## Similar projects

- [74th/vscode-vim](https://github.com/74th/vscode-vim)
- [VSCodeVim/Vim](https://github.com/VSCodeVim/Vim)
