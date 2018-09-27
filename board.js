'use strict';

const EmptyCell = require('./empty-cell');
const MarkedCell = require('./marked-cell');

function Board() {
  this.size = 3;

  this.board = [
    [new EmptyCell(), new EmptyCell(), new EmptyCell()],
    [new EmptyCell(), new EmptyCell(), new EmptyCell()],
    [new EmptyCell(), new EmptyCell(), new EmptyCell()]
  ];
}

Board.prototype.getCell = function (x, y) {
  if (x >= 0 && y >= 0 && x < this.size && y < this.size) {
    return this.board[x][y];
  }

  return null;
}

Board.prototype.setCell = function (x, y, value) {
  if (x >= 0 && y >= 0 && x < this.size && y < this.size)
    this.board[x][y] = value;
}

Board.prototype.markCell = function (x, y, player) {
  if (x >= 0 && y >= 0 && x < this.size && y < this.size) {
    this.board[x][y] = new MarkedCell(player);
  }
}

Board.prototype.getView = function () {
  let result = '';
  let i, j;
  for (i = 0; i < this.size; ++i) {
    for (j = 0; j < this.size; ++j) {
      result += (this.getCell(i, j).getValue() + ' ');
    }
    result += '\r\n';
  }
  return result;
}

Board.prototype.getEmptyCells = function () {
  let emptyCells = [];
  for (let i = 0; i < this.size; ++i) {
    for (let j = 0; j < this.size; ++j) {
      if (this.board[i][j].isEmpty()) {
        emptyCells.push({
          'x': i,
          'y': j
        });
      }
    }
  }

  return emptyCells;
}

module.exports = Board;
