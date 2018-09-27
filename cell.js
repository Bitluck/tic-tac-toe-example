'use strict';

function Cell() {
  this.CELL_VALUE = {
    EMPTY: '-',
    X:     'x',
    O:     'o'
  };

  this.value;
}

Cell.prototype.getValue = function () {
  return this.value;
}

Cell.prototype.setValue = function (value) {
  this.value = value;
}

Cell.prototype.isEmpty = function () {
  return this.value === this.CELL_VALUE.EMPTY;
}

Cell.prototype.equals = function (otherCell) {
  if (this === otherCell) return true;
  if (otherCell === null || this.constructor.name !== otherCell.constructor.name) return false;
  return (this.value === otherCell.value);
}

module.exports = Cell;
