// scatter-random-dots.jsx
// https://github.com/kuy/aia/blob/master/scatter-random-dots.jsx
// Copyright(c) 2019 Yuki KODAMA / @kuy
// This script is distributed under the MIT License.

function precondition() {
  if (documents.length === 0) {
    alert("Please create a new document before running script.");
    return false;
  }

  if (selection.length !== 1 || selection[0].typename !== 'PathItem') {
    alert("Please select just 1 rectangle path.");
    return false;
  }

  return true;
}

function createDot(x, y) {
  var radius = 2;
  var dot = activeDocument.activeLayer.pathItems.ellipse(y + radius, x - radius, radius, radius);
  var black = new RGBColor();
  black.red = black.green = black.blue = 0;
  dot.fillColor = black;
  dot.filled = true;
}

function createRandomDot(baseTop, baseLeft, rangeHeight, rangeWidth) {
  var x = baseLeft + Math.floor(Math.random() * rangeWidth);
  var y = baseTop - Math.floor(Math.random() * rangeHeight);
  createDot(x, y);
}

function main() {
  var n = 20;
  var offset = 10;
  var frame = selection[0];

  for (var i = 0; i < n; i++) {
    createRandomDot(frame.top - offset, frame.left + offset, frame.height - 2 * offset, frame.width - 2 * offset);
  }
}

if (precondition()) {
  main();
}