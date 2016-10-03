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

### [1.12.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.12.0)

- Added support for `{N} _`.
- Added support for `~` and `{visual} ~`.


### [1.11.7](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.7)

- Preserve multiple cursors when changing to normal mode from insert mode. #132 


### [1.11.6](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.6)

- Fix wrong behavior when modifying last line of document. #71 


### [1.11.5](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.5)

- Fix wrong cursor position when doing `o` in Insert mode.


### [1.11.4](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.4)

- Fix when selection will miss one character when doing `k` or `j` in Visual mode.

Full list [here](https://github.com/aioutecism/amVim-for-VSCode/releases).


## Contribution

Feel free to open [issues](https://github.com/aioutecism/amVim-for-VSCode/issues) to report bugs or require features.

[Pull requests](https://github.com/aioutecism/amVim-for-VSCode/pulls) are welcomed too!
