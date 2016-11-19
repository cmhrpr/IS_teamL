var obj = { 5: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

var sort = Object.keys(obj).sort();

console.log(sort[sort.length-1])

var elementsFile = require('./Elements.js');

var WhiteBoardDocument = require('./Document.js').WhiteBoardDocument;

/* This is how we get the class definitions for the WhiteBoard shapes from Element.js */
var WhiteBoardObject = elementsFile.WhiteBoardObject;
var WhiteBoardShape = elementsFile.WhiteBoardShape;
var WhiteBoardPosition = elementsFile.WhiteBoardPosition;
var WhiteBoardSquare = elementsFile.WhiteBoardSquare;
var WhiteBoardRectangle = elementsFile.WhiteBoardRectangle;
var WhiteBoardText = elementsFile.WhiteBoardText;



var shapes = [];
var pos = (0,5);


var obj = new WhiteBoardObject(pos, 10);
var shp = new WhiteBoardShape(pos, 5, "000000");
var sqr = new WhiteBoardSquare(pos, 5, "000000");
var rec = new WhiteBoardRectangle(pos, 5, "000000", pos);
var text = new WhiteBoardText(pos, 5, "000000", "this is some text");

shapes.push(obj);
shapes.push(shp);
shapes.push(sqr);
shapes.push(rec);
shapes.push(text);

var obj = {};


for (var i = 0; i < shapes.length; i++) {
  console.log
  console.log(shapes[i].print());

//  console.log("WhiteBoardShape " + i + " is color " + shapes[i].getColor());
}
