/*jshint expr:true*/
/* global describe, it, before */

'use strict';

var expect = require('chai').expect;
var Item;
var connect = require('../../app/lib/mongodb');

describe('Item', function(){
  before(function(done){
    connect('home-inventory-test', function(){
      Item = require('../../app/models/item');
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
        expect(couch._id).to.be.ok;
        done();
      });
    });
  });
});
