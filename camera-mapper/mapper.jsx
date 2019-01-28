// Copyright(c) 2019 Yuki KODAMA / @kuy
// This script is distributed under the MIT License.

function createDot(g, x, y, r, c) {
  r = 1.0 + r * ((255 - c) / 255.0)
  var dot = g.pathItems.ellipse(y + r, x - r, 2 * r, 2 * r);
  var color = new RGBColor();
  color.red = color.green = color.blue = c;
  dot.fillColor = color;
  dot.filled = true;
  dot.stroked = false;
}

function renderImage(group, data) {
  group.pathItems.removeAll();

  var R = 4;
  var y = 0, ymax = 30;
  while (y < ymax) {
    var x = 0, xmax = 53;
    while (x < xmax) {
      var color = parseInt(data.slice(0, 2), 16);
      createDot(group, x * 2 * R, y * -2 * R, R, color);
      data = data.slice(2)
      x++;
    }
    y++;
  }
}

var group = app.activeDocument.activeLayer.groupItems.add();

var win = new Window('dialog', 'input');
win.alignChildren = "fill";

win.textGroup = win.add('group');
win.textGroup.alignment = "center";
win.textGroup.text = win.textGroup.add('edittext');
win.textGroup.text.characters = 20;
win.textGroup.text.onChanging = function () {
  var data = win.textGroup.text.text;
  renderImage(group, data);
  redraw();
}
win.show();