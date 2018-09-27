'use strict';

function Checker() {
  this.WINNER = {
    PERSON: 'person',
    COMPUTER: 'computer',
    TIE: 'tie',
  };
}

Checker.prototype.isGameOver = function (board) {
  for (let i = 0; i < board.size; ++i) {
    if (!board.getCell(i, 0).isEmpty() &&
      board.getCell(i, 0).equals(board.getCell(i, 1)) &&
      board.getCell(i, 1).equals(board.getCell(i, 2))) {
      if (board.getCell(i, 0).isPersonMarked()) {
        return this.WINNER.PERSON;
      }
      return this.WINNER.COMPUTER;
    }

    if (!board.getCell(0, i).isEmpty() &&
      board.getCell(0, i).equals(board.getCell(1, i)) &&
      board.getCell(1, i).equals(board.getCell(2, i))) {
      if (board.getCell(0, i).isPersonMarked()) {
        return this.WINNER.PERSON;
      }
      return this.WINNER.COMPUTER;
    }
  }

  if (!board.getCell(1, 1).isEmpty() &&
     (board.getCell(0, 0).equals(board.getCell(1, 1)) &&
      board.getCell(1, 1).equals(board.getCell(2, 2)) ||
      board.getCell(0, 2).equals(board.getCell(1, 1)) &&
      board.getCell(1, 1).equals(board.getCell(2, 0)))) {
    if (board.getCell(1, 1).isPersonMarked()) {
      return this.WINNER.PERSON;
    }
    return this.WINNER.COMPUTER;
  }

  if (board.getEmptyCells().length === 0) {
    return this.WINNER.TIE;
  }

  return null;
}

module.exports = Checker;
