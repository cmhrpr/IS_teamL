function WhiteBoardElement(lastId, element){
  this.id = lastId + 1;
  this.element = element;
}

function WhiteBoardPosition(x, y) {
  this.x = x;
  this.y = y;
}

/* Definition for the base Whiteboard object which will be the base of all other objects */
function WhiteBoardObject(position, scale, color) {
  this.type = "object";
  this.position = position;
  this.scale = scale;
  this.color = color;
}

/* Definition for the base Whiteboard shape which will be the base of all other shapes */
function WhiteBoardShape(position, scale, color) {
  this.type = "shape";
  this.position = position;
  this.scale = scale;
  this.color = color;
}

/* Definition for the Whiteboard text element
  attributes:
    position - (x,y) of centre
    scale - integer modifier
    color - text color
    contents - actual text to be displayed
*/
function WhiteBoardText(position, scale, colour, content) {
  this.type = "text";
  this.position = position;
  this.scale = scale;
  this.content = content;
}

/* Definition for the Whiteboard image element
  attributes:
    position - (x,y) of centre
    scale - integer modifier
    color - background color
    url - image url
*/
function WhiteBoardImage(position, scale, color, url) {
  this.type = "image";
  this.position = position;
  this.scale = scale;
  this.url = url;
}


/* Definition for the Whiteboard square shape
  attributes:
    position - (x,y) of centre
    scale - integer modifier
    color - text color
*/
function WhiteBoardSquare(position, scale, color) {
  this.type = "square";
  this.position = position;
  this.scale = scale;
  this.color = color;
}

/* Definition for the Whiteboard circle shape
  attributes:
    position - (x,y) of centre
    scale - integer modifier
    color - text color
*/
function WhiteBoardCircle(position, scale, color) {
  this.type="circle";
  this.position = position;
  this.scale = scale;
  this.color = color;
}

/* Definition for the Whiteboard rectangle shape
  attributes:
    position - (x,y) of centre
    scale - integer modifier
    color - text color
    size - (width, height)
*/
function WhiteBoardRectangle(position, scale, color, size ) {
  /* the type name for this shape */
  this.type="rectangle";

  /* the (x,y) position of this shape */
  this.position = position;

  /* the scale of this shape */
  this.scale = scale;

  /* (x,y) */
  this.size = size;
}

/*
 * WhiteBoardShape function definitions
*/
WhiteBoardObject.prototype.getType = function() {
  return this.type;
}

WhiteBoardObject.prototype.getPosition = function() {
  return this.position;
}

WhiteBoardObject.prototype.getScale = function() {
  return this.scale;
}

WhiteBoardObject.prototype.print = function(){
  return "I am a " + this.type + " at " + this.position + " and of scale: " + this.scale;
}


WhiteBoardObject.prototype.getColor = function() {
  return this.color;
}

WhiteBoardObject.prototype.setPosition = function(pos) {
  this.position = pos;
}

WhiteBoardObject.prototype.setScale = function() {
  this.scale = scale;
}

WhiteBoardObject.prototype.setColor = function() {
  this.color = color;
}

WhiteBoardPosition.prototype.toString = function() {
  return "(" + this.x + ", " + this.y + ")";
}


/* Mapping inheritence / polymorphism */
WhiteBoardShape.prototype = new WhiteBoardObject();
WhiteBoardText.prototype = new WhiteBoardObject();
WhiteBoardSquare.prototype = new WhiteBoardShape();
WhiteBoardCircle.prototype = new WhiteBoardShape();
WhiteBoardRectangle.prototype = new WhiteBoardShape();




WhiteBoardShape.prototype.setScale = function() {
  this.scale = scale;
}

WhiteBoardShape.prototype.setColor = function() {
  this.color = color;
}


WhiteBoardText.prototype.print = function(){
  return "I am a " + this.type + " at " + this.position + " and of scale: " + this.scale + "\n" + this.content;
}

WhiteBoardRectangle.prototype.print = function(){
  return "I am a " + this.type + " at " + this.position + " and of scale: " + this.scale + " of height and width: " + this.size;
};


module.exports = {
    WhiteBoardPosition: WhiteBoardPosition,
    WhiteBoardShape: WhiteBoardShape,
    WhiteBoardSquare: WhiteBoardSquare,
    WhiteBoardObject: WhiteBoardObject,
    WhiteBoardRectangle: WhiteBoardRectangle,
    WhiteBoardText: WhiteBoardText
};
