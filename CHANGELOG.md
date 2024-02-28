# [1.37.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.37.0)
- Update dependencies and clean up the test infrastructure somewhat.
- Add a 2ms delay to selection change recalculations to try reduce cursor placement issues with `o` and other commands #308 #317


# [1.36.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.36.0)
- Add new when clause context `amVim.waitingForInput` #303
  - Allows for binding `h`, `j`, `k` and `l` to native cursor movement.
- Small improvements to mode change behavior to avoid unexpected cursor placement.
- Add `:shell` and `:split` commands #314
  - Improve `:wq` command to behave more consistently when save fails.


# [1.35.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.35.0)
- Wrapped line support: #305 #306
  - Implements `g^`, `g0`, `g$`, `gm`, `gk` and `gj`.
  - Known issues include a slight flicker and occasional unexpected cursor placement.


# [1.34.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.34.0)
- Improve replace command `r` and add basic replace mode `R` #287
  - `r` command now supports a count
  - This early version of `R` replace mode keeps `amVim.mode` set to `INSERT` to preserve backwards compatibility with existing custom key bindings.
  - Known issues with replace mode: paste from OS clipboard and VS Code autocomplete still inserts instead of replaces
- Fix behavior of next match `n` by nudging the cursor #289
  - `/` command has been modified to put the cursor at the start of the match like vim when `amVim.mimicVimSearchBehavior` is true (default)
  - `n` command now nudges the cursor forward to find the next match - this now makes it work the same as vim
- Temporarily remove `g?` ROT13 command since it broke `gg` motions in visual mode #292


# [1.33.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.33.0)

- Support remote development mode with workspace execution location: #283 Thanks @imyelo!


# [1.32.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.32.0)

- Yank to and paste from system clipboard with `amVim.useSystemClipboard` option: #260 Thanks @karlhorky!
- Add `gd` and `gD` go to definition motion: #258
- Package with webpack for faster startup: #270 Thanks @tejanium!


# [1.31.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.31.0)

- Added `g ?` (ROT13) for visual and visual block modes. #235
- Added `zt` to put cursor at top of the screen. #245
- Added `{N} ~` for normal mode. #234
- Added go to percent in file motion `%`. #227
- Added tag TextObject. #247
- Dependency upgrades


# [1.30.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.30.0)

- Added `amVim.mimicVimSearchBehavior` configuration. #224


# [1.29.3](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.29.3)

- Fixed `command 'search.action.focusActiveEditor' not found` when searching. Thanks @marek2901. #223


# [1.29.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.29.2)

- Focus back to text when pressing enter at find widget. #218


# [1.29.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.29.1)

- Fixed a bug when `"editor.lineNumbers": "off"` is not respected. Thanks @jackfranklin. #215


# [1.29.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.29.0)

- Added support for `;` and `,`. #209


# [1.28.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.28.2)

- Fixed cursor position after `J`. Thanks @wmaurer. #207


# [1.28.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.28.0)

- Added `N x` and `N X` supports. #206. Thanks to @wmaurer!


# [1.27.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.27.0)

- Supports `{N} d {motion}`. #200
- Added `smartRelativeLineNumbers` setting. #201


# [1.26.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.26.1)

- Fixed issue when `:wq` may empty file content.


# [1.26.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.26.0)

- Supports a few `:` commands #199. Thanks @Molunerfinn.


# [1.25.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.25.0)

- Supports `Y` in Visual and VisualLine modes #196.


# [1.24.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.24.0)

- Added Go To Line command #192.
- Added Vim style navigation in sidebar #193.


# [1.23.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.23.1)

- Fixed a bug where switching tabs sometimes doesn't preserve the line the cursor was at #176 .


# [1.23.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.23.0)

- Added support for `N {` and `N }`.


# [1.22.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.22.0)

- Added support for: `Ndd`, `dNd`, `Nyy`, `yNy`, `Np`, `NP`.
- Other `N` support for commands are coming soon.


# [1.21.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.21.2)

- Fixed wrong behavior with `%`.
- More accurate motion handling in Visual mode.


# [1.21.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.21.1)

- Fix `~` to work with special characters. Thanks @mtsk #170.


# [1.21.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.21.0)

- Added `u` and `U` support in Visual and VisualLIne modes. Thanks @mtsk. #169


# [1.20.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.20.2)

- Update dependencies to VSCode 1.8.0 and TypeScript 2.1.0.


# [1.20.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.20.1)

- Workarounded wrong cursor style when switching editor. #161


# [1.20.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.20.0)

- Added repeat support of deletion and autocomplete in Insert mode.


# [1.19.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.19.0)

- Added configuration to start in Insert mode when opening files. Thanks @welkang. #159


# [1.18.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.18.1)

- Workaround native API's bug where insertSpace and tabSize may be undefined.


# [1.18.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.18.0)

- Exit Visual/VisualLine mode after indent, outdent or replace. #108
- Added support to repeat Visual and VisualLine mode's command (Alpha status). #157


# [1.17.6](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.17.6)

- Fix cursor position when exiting insert mode. #155 #154
- Better escape handling. #156 #147


# [1.17.5](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.17.5)

- Fix wrong behavior when using inclusive TextObject.


# [1.17.4](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.17.4)

- Corrects register handling. #152


# [1.17.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.17.2)

- Fix selection bugs after deletion on VSCode Insider.


# [1.17.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.17.1)

- Update internal command for formatting.


# [1.17.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.17.0)

- Added N support for word motions. #146


# [1.16.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.16.1)

- Fix bug where multi-cursor may function weird.


# [1.16.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.16.0)

- Added support for Japanese words. #143


# [1.15.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.15.0)

- Update to TypeScript 2.0.3. #138
- Added `p` support in Visual and VisualLine modes. #142


# [1.14.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.14.0)

- Add folding support. Thanks @rebornix #141.


# [1.13.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.13.0)

- Added support for `N space` and `N backspace` motions.


# [1.12.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.12.0)

- Added support for `{N} _`.
- Added support for `~` and `{visual} ~`.


# [1.11.7](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.7)

- Preserve multiple cursors when changing to normal mode from insert mode. #132


# [1.11.6](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.6)

- Fix wrong behavior when modifying last line of document. #71


# [1.11.5](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.5)

- Fix wrong cursor position when doing `o` in Insert mode.


# [1.11.4](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.4)

- Fix when selection will miss one character when doing `k` or `j` in Visual mode.


# [1.11.3](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.3)

- Fix when cursor may occur at end of line in Normal mode.


# [1.11.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.2)

- Fix where undo/redo will revert selections that blocks further undo/redo.


# [1.11.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.1)

- Fix wrong behavior when deleting word at end of line.


# [1.11.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.11.0)

- Added support for `= {motion}`, `= =` in Normal mode, `=` in Visual and VisualLine modes.


# [1.10.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.10.2)

- Workaround where `.` may blocks further inputs.


# [1.10.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.10.1)

- Fix unstable movement between tab indented lines.


# [1.10.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.10.0)

- Add support for text object in Visual mode. Thanks @ionutvmi #120 #121 .


# [1.9.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.9.0)

- Add word text object(`iw`, `aw`, `iW`, `aW`) support. Thanks @DanEEStar #94 #119 .


# [1.8.6](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.8.6)

- `escape` should work as except when find widget is visible.


# [1.8.5](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.8.5)

- Fix a bug when commands is sent at a realy fast speed. Thanks @DanEEStar #89 .


# [1.8.4](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.8.4)

- Fix a bug where `escape`'s default behavior won't work.


# [1.8.3](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.8.3)

- Fix a bug where cursor doesn't switch to block mode sometime.


# [1.8.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.8.2)

- Fix Non-English input bug. Thanks @liukun #111 .


# [1.8.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.8.1)

- Fix block cursor bug which causes mode switching not working sometime #106 .


# [1.8.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.8.0)

- Add `Ctrl+[` support. Thanks @shamrin #102 .
- Use native block cursor for Normal mode. Thanks @aminroosta #103 .


# [1.7.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.7.0)

- Add `bindCtrlCommands` setting to control all `ctrl+<key>` keybindings.
- **Remove `bindCtrlC` setting.**


# [1.6.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.6.2)

- Remove selections validation on change.


# [1.6.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.6.1)

- Minor fix around selections validation.


# [1.6.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.6.0)

- Support `%` motion. (Thanks, @DanEEStar)


# [1.5.3](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.5.3)

- Correct `we` behavior.
- Validate cursor position when exiting insert mode. #87


# [1.5.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.5.2)

- Cursor should not on "line break".
- All line end involved actions should work now.


# [1.5.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.5.1)

- Respect user settings of word separators.
- `w` will now move across lines.


# [1.5.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.5.0)

- Support arrow keys navigation.


# [1.4.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.4.1)

- Handle escaped characters in quoted text object.


# [1.4.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.4.0)

- Support `W`, `E`, `B` motions.


# [1.3.3](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.3.3)

- Fix broken `$` motion.


# [1.3.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.3.2)

- Fix wrong behavior on last line. (#71)


# [1.3.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.3.0)

- Supports basic text object commands.


# [1.2.3](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.2.3)

- Fix bug yanking last line.


# [1.2.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.2.2)

- Fix duplicated inputs on repeat.


# [1.2.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.2.0)

- Added support for `.` (repeat) in Normal mode.


# [1.1.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.1.2)

- Update VSCode dependence to 1.0.0.


# [1.1.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.1.1)

- Fix `n`, `N`, `*`, `#` behavior.


# [1.1.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.1.0)

- Added support for `Ctrl+F` and `Ctrl+B`.


# [1.0.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/1.0.0)

- Make use of new APIs from VSCode 0.10.12 to solve all problems related to intellisense, keyboard layouts, etc.
See #50.


# [0.1.6](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.1.6)

- Add keyboard layout support. (See README)
- Fix behavior on `cw`.


# [0.1.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.1.2)

- Added support for `zz` and `z.`.
- Obey `editor.quickSuggestions` setting.


# [0.1.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.1.1)

- Fix behaviour of `C` in Visual mode.
- Fix wrong keybindings of indent/outdent in visual mode. #32
- Support for `s` and `S` in visual mode/visual line mode. #31


# [0.1.0](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.1.0)

- Update VSCode min-version to 0.10.8 and dependencies with it.


# [0.0.15](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.15)

- Fix `y` in VisualLine mode missing line-break bug.


# [0.0.14](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.14)

- Fix #18: dd on last line doesn't work.


# [0.0.13](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.13)

- Added support for `N gg` and `N G`.


# [0.0.12](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.12)

- Bind `/` to focus find widget.
- Esc now hides suggestion and exit to Normal mode.
- Add extension configuration. (See README)
- Bind ctrl+c if `amVim.bindCtrlC` is true.
- Minor fixes.


# [0.0.11](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.11)

- Update mode and prefered character on active text editor changed.


# [0.0.10](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.10)

- Count tab as `tabSize` in motions.
- Preserve character position when move cursor without horizontal motion.


# [0.0.9](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.9)

- Only trigger suggestion widget on some characters.


# [0.0.8](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.8)

- Shrink to primary cursor when press `Esc` in Normal mode.
- Work arounds horizontally navigating does not horizontal scroll bug.


# [0.0.7](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.7)

- Support multi-line deletion in Insert mode.
- Prevent yank deletion in Insert mode.


# [0.0.6](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.6)

- Minor fixes.


# [0.0.5](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.5)

- Yank deleted text to register.
- Minor fixes.


# [0.0.4](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.4)

- Fixed replace behaviour on empty line.
- Fixed wrong behaviour on line ends.


# [0.0.3](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.3)

- `<<` and `>>` in Visual and VisualLine modes.
- Add support for `r{char}`
- Minor bug fixes


# [0.0.2](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.2)

- Better cursor style.


# [0.0.1](https://github.com/aioutecism/amVim-for-VSCode/releases/tag/0.0.1)

Initial release.
