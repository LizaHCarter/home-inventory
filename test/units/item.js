/*jshint expr:true*/
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Item;
var connect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');

describe('Item', function(){
  before(function(done){
    connect('home-inventory-test', function(){
      Item = require('../../app/models/item');
      done();
    });
  });

  beforeEach(function(done){
    global.mongodb.collection('items').remove(function(){
      done();
    });
  });
  
  describe('constructor', function(){
    it('should create a new item object', function(){
      var table = new Item('table', 'living room','07/23/2014','2', '100');
      
      expect(table).to.be.instanceof(Item);
      expect(table.name).to.equal('table');
      expect(table.room).to.equal('living room');
      expect(table.acquired).to.be.instanceof(Date);
      expect(table.count).to.equal(2);
      expect(table.count).to.be.a('number');
      expect(table.cost).to.equal(100);
      expect(table.cost).to.be.a('number');
     });
  });

  describe('#save', function(){
    it('should save an item to the mongo database', function(done){
      var couch = new Item('couch', 'living room','07/23/2014', '2','1100');
      couch.save(function(){
        expect(couch._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.find', function(){
    it('should find all the items from the mongo database', function(done){
      var couch = new Item('couch', 'living room','07/23/2014', '2','1100');
      couch.save(function(){
        Item.find({},function(items){
          expect(items).to.have.length(1);
          done();
        });
      });
    });

    it('should find the couches from the mongo database', function(done){
      var couch = new Item('couch', 'living room','07/23/2014', '2','1100');
      var chair = new Item('chair', 'dining room','07/23/2014', '4','500');
      var bed = new Item('bed', 'bed room','07/23/2014', '1','2000');
     
      couch.save(function(){
        chair.save(function(){
          bed.save(function(){
            Item.find({name: 'chair'}, function (items){
              expect(items).to.have.length(1);
              expect(items[0].name).to.equal('chair');
              done();
            });
          });
        });
      });
    });

    describe('#value', function(){
     it('should calculate the total value of item types', function(){
       var couch = new Item('couch', 'living room','07/23/2014', '2','1100');
       var val = couch.value();
       expect(val).to.equal(2200);
     });
     });
    describe('.totalValue', function(){
      it('should calculate the total value of items in a space', function(done){
      var table = new Item('table', 'dining room','07/23/2014', '1','3000');
      var chair = new Item('chair', 'living room','07/23/2014', '3','300');
      var couch = new Item('couch', 'living room','07/23/2014', '2','1100');
      var chair2 = new Item('chair', 'dining room','07/23/2014', '4','500');
      var bed = new Item('bed', 'bed room','07/23/2014', '1','2000');

      table.save(function(){
        chair.save(function(){
          couch.save(function(){
            chair2.save(function(){
              bed.save(function(){
                Item.totalValue({room: 'dining room'}, function(totalValue){
                  expect(totalValue).to.equal(5000);
                  done();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
