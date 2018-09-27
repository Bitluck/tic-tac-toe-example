'use strict';

const Cell = require('./cell');

EmptyCell.prototype = Object.create(Cell.prototype);
EmptyCell.prototype.constructor = EmptyCell;

function EmptyCell() {
  Cell.apply(this, arguments);
  this.value = this.CELL_VALUE.EMPTY;
}

module.exports = EmptyCell;
