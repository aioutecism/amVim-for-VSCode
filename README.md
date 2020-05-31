# amVim for VS Code

![icon](images/icon.png)

The [Vim](http://www.vim.org/) mode for [Visual Studio Code](https://code.visualstudio.com/) that works as expected.


## Key features

- Vim style keybindings & looks
- Normal, Visual and Visual Line modes support
- Multi-cursor support
- Works with VS Code's default behaviors


## Not supported

- `:` started commands: Only a few are supported now.
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

#### `amVim.mimicVimSearchBehavior`

`Boolean`, Default: `true`

Set to `false` to keep VSCode's keybinding when searching.

#### `amVim.startInInsertMode`

`Boolean`, Default: `false`

Set to `true` to start in Insert mode when opening files.

#### `amVim.smartRelativeLineNumbers`

`Boolean`, Default: `false`

Set to `true` to will make line numbers relative when not in Insert mode.

#### `amVim.useSystemClipboard`

`Boolean`, Default: `false`

Set to `true` to copy to and paste from the system clipboard.

#### `amVim.vimStyleNavigationInListView`

`Boolean`, Default: `true`

Set to `false` to disable Vim style navigation in sidebar.


## Contributing

Feel free to open [issues][] to report bugs or require features.

[Pull requests][] are welcomed too! See VS Code's official instructions about:

- [How to run and debug extensions][]
- [How to run extension tests][]
  - Protip: change `suite(` to `suite.only(` in a test file to run only a
    single test suite at a time. This saves quite a lot of time. Remember to
    remove the `.only` part before making a Git commit.

[issues]: https://github.com/aioutecism/amVim-for-VSCode/issues
[Pull requests]: https://github.com/aioutecism/amVim-for-VSCode/pulls
[How to run and debug extensions]: https://code.visualstudio.com/docs/extensions/developing-extensions
[How to run extension tests]: https://code.visualstudio.com/docs/extensions/testing-extensions
