# WIP

**This extension is working in progress. It's not ready for anyone to use.**


# Vim for VSCode

The [Vim](http://www.vim.org/) mode for [Visual Studio Code](https://code.visualstudio.com/) that works as expected.


## Why

Because [this](https://github.com/74th/vscode-vim) and [this](https://github.com/VSCodeVim/Vim)
are missing basic functions(such as multi-cursor support) I need.
And they need a complete refactoring to meet my needs.


## Key features

- Vim style keybindings & looks
- Multi-cursor support


## Not supported

- `:` started commands: Please use `Command Palette` (`Shift+Cmd+P` on OSX, `Shift+Ctrl+P` on Windows) instead.


## Task list

- [x] Dispatcher

- [x] Mapper
  - [x] Map
    - [x] keys
    - [x] command
    - [x] args?

- [ ] Modes
  - [x] Normal
  - [x] Insert
  - [ ] Visual
  - [ ] VisualBlock
  - [ ] VisualLine

- [ ] Motions
  - [x] Character
    - [x] Left
    - [x] right
    - [x] up
    - [x] down
  - [x] Word
    - [x] nextStart
    - [x] nextEnd
    - [x] prevStart
  - [ ] FindByCharacter
    - [ ] next
    - [ ] prev
  - [ ] Line
    - [x] start
    - [x] end
    - [ ] firstNonWhiteSpace
  - [ ] EmptyLine
    - [ ] next
    - [ ] prev
  - [ ] Bracket
  - [ ] Page
    - [ ] next
    - [ ] prev
  - [ ] View
    - [ ] top
    - [ ] center
    - [ ] bottom
  - [x] Document
    - [x] start
    - [x] end

- [ ] Actions
  - [x] Mode
    - [x] to{Modes}
  - [x] MoveCursor
    - [x] {Motions}
  - [x] Insert
    - [x] characterAtSelections
    - [x] newLineBefore
    - [x] newLineAfter
  - [ ] Delete
    - [ ] selections
    - [x] line
    - [ ] {Motions}
  - [ ] Replace
    - [ ] selections
    - [ ] line
  - [ ] Yank
    - [ ] selections
    - [ ] line
    - [ ] {Motions}
  - [ ] Paste
    - [ ] before
    - [ ] after
  - [x] History
    - [x] undo
    - [x] redo
  - [ ] Scroll
    - [ ] cursorLineToCenter
    - [ ] cursorLineToTop
    - [ ] cursorLineToBottom
  - [ ] Find
    - [ ] useCursorWord
    - [ ] next
    - [ ] prev
  - [x] Indent
    - [x] increase
    - [x] decrease
  - [x] JoinLines
  - [ ] Case
    - [ ] swap
    - [ ] upper
    - [ ] lower
    - [ ] camel
    - [ ] snake
  - [ ] Focus
    - [ ] leftEditor
    - [ ] rightEditor
  - [ ] Repeat
  - [ ] Cancel
    - [x] currentInput
    - [ ] selections
    - [ ] suggestion
