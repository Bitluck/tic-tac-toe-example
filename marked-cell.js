'use strict';

const Cell = require('./cell');
const Computer = require('./computer');

MarkedCell.prototype = Object.create(Cell.prototype);
MarkedCell.prototype.constructor = MarkedCell;

function MarkedCell(player) {
  Cell.apply(this, arguments);

  if (player instanceof Computer) {
    this.setValue(this.CELL_VALUE.O);
  } else {
    this.setValue(this.CELL_VALUE.X);
  }
}

MarkedCell.prototype.isPersonMarked = function () {
  return (this.value === this.CELL_VALUE.X);
}

module.exports = MarkedCell;
