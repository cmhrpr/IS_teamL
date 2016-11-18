function WhiteBoardDocument(id){
  this.id = id;
  this.elements = [];
  this.changed = [];
}

WhiteBoardDocument.prototype.addElement = function(element){
  this.elements.add(element);
};

WhiteBoardDocument.prototype.createShape = function(shape_type, options){
  this.elements.add(element);
};

// Update an element's options
WhiteBoardDocument.prototype.updateElement = function(id, element_options) {
  // First we need to check the element still exists
  if (this.elements.hasOwnProperty(id)) {

  // Else return error if element not found
  } else {
    console.log("ERROR ID " + id + " IS NOT IN THE ELEMENTS FOR THIS DOCUMENT");
    return -1;
  }
}

WhiteBoardDocument.prototype.removeElement = function (id) {
  // First we need to check the element still exists
  if (this.elements.hasOwnProperty(id)) {

  // Else return error if element not found
  } else {
    console.log("ERROR ID " + id + " IS NOT IN THE ELEMENTS FOR THIS DOCUMENT");
    return -1;
  }
}

WhiteBoardDocument.prototype.notifyWatchers = function() {

}



module.exports = {
  WhiteBoardDocument: WhiteBoardDocument
}
