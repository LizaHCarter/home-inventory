/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Item = require('../../app/models/item');

describe('Item', function(){
  describe('constructor', function(){
    it('should create a new item object', function(){
      var table = new Item('table', 'living room','07/23/2014', 2, 100);
      expect(table).to.be.instanceof(Item);
      expect(table.name).to.equal('table');
      expect(table.room).to.equal('living room');
      expect(table.dateAcquired).to.equal('07/23/2014');
      expect(table.count).to.equal(2);
      expect(table.cost).to.equal(100);
     });
  });
});
