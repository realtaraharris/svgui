`npm start`

TODO:
- [x] finish navigation between App and App2 demos - just need to add tabs or buttons or something
- [] make it possible to drag box _out_ of drag target
- [x] port center resize controller to use draggablerectgood
- [x] text rendering optimization: render line text one line at a time
- [] port text component over to new event system
- [] add support for other shapes in event system
- [] wrap global key listener behind event system API
- [] SpacedLine needs graphical editor
- [] develop testing strategy. best if it targets the intermediate representation, NOT the browser stuff?
  - or, just target the demo apps, ensure they work fully

- [] SpacedLine needs the ability to do things via percentages. (also it should emit warnings if it detects total size not === 100%)
