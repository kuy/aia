// slow-convex-hull.jsx
// https://github.com/kuy
// Copyright(c) 2019 Yuki KODAMA / @kuy
// This script is distributed under the MIT License.

#include "lib/victor.js"

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

function makePairs(points) {
  var len = points.length;
  var pairs = [];
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      if (i !== j) {
        pairs.push([points[i], points[j]]);
      }
    }
  }
  return pairs;
}

function leftOfLine(p1, p2, r) {
  var v1 = new Victor(p2[0] - p1[0], p2[1] - p1[1]);
  var v2 = new Victor(r[0] - p1[0], r[1] - p1[1]);
  return v1.cross(v2) > 0;
}

function getBlack() {
  var black = new RGBColor();
  black.red = black.green = black.blue = 0;
  return black;
}

function createLine(vec) {
  var path = activeDocument.activeLayer.pathItems.add();
  path.closed = false;
  path.filled = false;
  path.stroked = true;
  path.strokeWidth = 1;
  path.strokeColor = getBlack();
  path.setEntirePath(vec);
  return path;
}

function main() {
  // Get a set of points from path items
  var len = selection.length, i, j, k;
  var points = [];
  for (i = 0; i < len; i++) {
    points.push(convertToPoint(selection[i]));
  }

  // Enumerate product of set of points
  var vectors = [];
  for (i = 0; i < len; i++) {
    for (j = 0; j < len; j++) {
      if (i === j) continue;

      // Judge the pair is a edge
      var valid = true;
      for (k = 0; k < len; k++) {
        if (i === k || j === k) continue;
        if (!leftOfLine(points[i], points[j], points[k])) {
          valid = false;
          break;
        }
      }

      if (valid) {
        vectors.push([points[i], points[j]]);
      }
    }
  }

  // Draw edges
  for (i = 0, len = vectors.length; i < len; i++) {
    createLine(vectors[i]);
  }
}

if (precondition()) {
  main();
}