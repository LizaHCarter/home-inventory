'use strict';

var cItem = global.mongodb.collection('items');
var _ = require('lodash');

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
Item.find = function(search, cb){
  cItem.find(search).toArray(function(err, items){
    cb(items);
  });
};

Item.prototype.value = function(){
  return this.cost * this.count;
};

Item.totalValue = function(search, cb){
  Item.find(search, function(items){
    //this code modifies the prototype chain to redirect from 'Object.prototype' -> 'Item.prototype'
    var value = 0;

    for(var i = 0; i < items.length; i++){
      var item = items[i];
      item = _.create(Item.prototype, item);
      value += item.value();
    }
    cb(value);
  });
};

module.exports = Item;
