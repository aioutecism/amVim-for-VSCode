# Evolution

Starting from "amVim 1.0.0", we are using some new APIs that are only avaliable from "VSCode 0.10.12".

These APIs enable amVim to get rid of all anonying problems related to **intellisense, keyboard layout, etc.**.

Make sure you are using the newest VSCode for best experience!


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

#### `amVim.bindCtrlC`

`Boolean`, Default: `false`

Set to `true` to bind `Ctrl+C` as the same behaviour in Vim.


## Contribution

Feel free to open [issues](https://github.com/aioutecism/amVim-for-VSCode/issues) to report bugs or require features.

[Pull requests](https://github.com/aioutecism/amVim-for-VSCode/pulls) are welcomed too!
