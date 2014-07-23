'use strict';

var cItem = global.mongodb.collection('items');

function Item(name, room, acquired, count, cost){
  this.name = name;
  this.room = room;
  this.acquired = new Date(acquired);
  this.count = parseInt(count);
  this.cost = parseInt(cost);
}

Item.prototype.save = function(cb){
  cItem.save(this, function(err, obj){
    cb();
  });
};

module.exports = Item;
