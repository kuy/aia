// convex-hull.jsx
// https://github.com/kuy
// Copyright(c) 2019 Yuki KODAMA / @kuy
// This script is distributed under the MIT License.

function precondition() {
  if (documents.length === 0) {
    alert("Please create a new document before running script.");
    return false;
  }

  if (selection.length < 3) {
    alert("Please select 3 or more paths.");
    return false;
  }

  for (var i = 0, len = selection.length, p; i < len; i++) {
    p = selection[i];
    if (p.typename !== 'PathItem') {
      alert("Please select ONLY path items. Your selection contains an object ('" + p.typename + "') not a path.");
      return false;
    }
  }

  return true;
}

function convertToPoint(path) {
  return [
    path.left + Math.floor(path.width * 0.5),
    path.top - Math.floor(path.height * 0.5)
  ];
}

function getBlack() {
  var black = new RGBColor();
  black.red = black.green = black.blue = 0;
  return black;
}

function createLine(line) {
  var path = activeDocument.activeLayer.pathItems.add();
  path.closed = false;
  path.filled = false;
  path.stroked = true;
  path.strokeWidth = 1;
  path.strokeColor = getBlack();
  path.setEntirePath(line);
  return path;
}

function last(list, num) {
  // PC: list.length >= num
  return list.slice(list.length - num, list.length);
}

function crossProduct(v1, v2) {
  return v1[0] * v2[1] - v1[1] * v2[0];
}

function isCW(points) {
  // PC: points.length >= 3
  var base = points[0];
  var v1 = [points[1][0] - base[0], points[1][1] - base[1]];
  var v2 = [points[2][0] - base[0], points[2][1] - base[1]];
  return crossProduct(v1, v2) < 0;
}

// [..., x, y, z] => [..., x, z]
function removeMid(list) {
  var last = list.pop();
  list.pop();
  list.push(last);
  return list;
}

function main() {
  // Prepare a set of points from selected paths
  var len = selection.length, i;
  var points = [];
  for (i = 0; i < len; i++) {
    points.push(convertToPoint(selection[i]));
  }

  // Sort points by x-axis
  points.sort(function(a, b){return a[0] - b[0]});

  // Upper phase
  var upper = [points[0], points[1]];
  for (i = 2; i < len; i++) {
    upper.push(points[i]);
    while (upper.length >= 3 && !isCW(last(upper, 3))) {
      upper = removeMid(upper);
    }
  }

  // Lower phase
  var lower = [points[len - 1], points[len - 2]];
  for (i = len - 3; 0 <= i; i--) {
    lower.push(points[i]);
    while (lower.length >= 3 && !isCW(last(lower, 3))) {
      lower = removeMid(lower);
    }
  }

  // Remove duplicated points
  lower = lower.slice(1, lower.length - 1);

  // Concatenate upper and lower
  var combined = upper.concat(lower);

  // Draw edges
  for (i = 0, len = combined.length; i < len - 1; i++) {
    createLine([combined[i], combined[i + 1]]);
  }
  createLine([combined[len - 1], combined[0]]);
}

if (precondition()) {
  main();
}