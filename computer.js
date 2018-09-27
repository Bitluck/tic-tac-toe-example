'use strict';

const Player = require('./player');
const Checker = require('./checker');

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

function Computer(degree) {
  Player.apply(this, arguments);

  this.checker = new Checker();

  this.DIFFICULTY_DEGREE = {
    EAZY: 'eazy',
    HARD: 'hard'
  };

  this.difficult;

  this.setPlayerName('Computer');

  switch (degree) {
    case 'e':
      this.difficult = this.DIFFICULTY_DEGREE.EAZY;
      this.move = this.eazyMove;
      break;
    case 'h':
      this.difficult = this.DIFFICULTY_DEGREE.HARD;
      this.move = this.hardMove;
      break;
    default:
      //not default
      break;
  }
}

Computer.prototype.getRandomNumber = function (from, to) {
  return Math.floor(Math.random() * (to - from)) + from;
}

Computer.prototype.eazyMove = function (board) {
  //Random
  let emptyCells = board.getEmptyCells();

  let randomEmptyCell = emptyCells[this.getRandomNumber(0, emptyCells.length)];
  return `set ${randomEmptyCell.x + 1} ${randomEmptyCell.y + 1}`;
}

Computer.prototype.minimax = function (newBoard, player) {
  let emptyCells = newBoard.getEmptyCells();

  let w = this.checker.isGameOver(newBoard);
  if (w === this.checker.WINNER.PERSON) {
    return {
      score: -10
    };
  }
  if (w === this.checker.WINNER.COMPUTER) {
    return {
      score: 10
    };
  }
  if (emptyCells.length === 0) {
    return {
      score: 0
    };
  }

  let moves = [];

  for (let i = 0; i < emptyCells.length; ++i) {
    let move = {};
    let saveValue = newBoard.getCell(emptyCells[i].x, emptyCells[i].y).getValue();
    move.index = emptyCells[i];

    if (player === this.checker.WINNER.PERSON) {
      newBoard.markCell(emptyCells[i].x, emptyCells[i].y, {});
      let result = this.minimax(newBoard, this.checker.WINNER.COMPUTER);
      move.score = result.score;
    }
    if (player === this.checker.WINNER.COMPUTER) {
      newBoard.markCell(emptyCells[i].x, emptyCells[i].y, this);
      let result = this.minimax(newBoard, this.checker.WINNER.PERSON);
      move.score = result.score;
    }

    newBoard.getCell(emptyCells[i].x, emptyCells[i].y).setValue(saveValue);

    moves.push(move);
  }

  let bestScore;
  if (player === this.checker.WINNER.COMPUTER) {
    bestScore = Math.max.apply(Math, moves.map(function (obj) {
      return obj.score
    }));
  }
  if (player === this.checker.WINNER.PERSON) {
    bestScore = Math.min.apply(Math, moves.map(function (obj) {
      return obj.score
    }));
  }
  let bestMove = moves.find(function (obj) {
    return obj.score === bestScore;
  });

  return bestMove;
}

Computer.prototype.hardMove = function (board) {
  //Minimax
  let bestNextMove = this.minimax(board, this.checker.WINNER.COMPUTER);
  return `set ${bestNextMove.index.x + 1} ${bestNextMove.index.y + 1}`;
}

module.exports = Computer;
