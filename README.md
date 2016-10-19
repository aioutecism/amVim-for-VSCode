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

### [1.15.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.15.0)

- Update to TypeScript 2.0.3. #138 
- Added `p` support in Visual and VisualLine modes. #142 


### [1.14.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.14.0)

- Add folding support. Thanks @rebornix #141.


### [1.13.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.13.0)

- Added support for `N space` and `N backspace` motions.


### [1.12.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.12.0)

- Added support for `{N} _`.
- Added support for `~` and `{visual} ~`.


### [1.11.7](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.7)

- Preserve multiple cursors when changing to normal mode from insert mode. #132

Full list [here](https://github.com/aioutecism/amVim-for-VSCode/releases).


## Contribution

Feel free to open [issues](https://github.com/aioutecism/amVim-for-VSCode/issues) to report bugs or require features.

[Pull requests](https://github.com/aioutecism/amVim-for-VSCode/pulls) are welcomed too!
