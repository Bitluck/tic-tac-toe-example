'use strict';

const Board = require('./board');
const Person = require('./person');
const Checker = require('./checker');
const Computer = require('./computer');
const IncorrectCommandError = require('./incorrect-command-error');

function Game(reader, writer) {
  this.reader = reader;
  this.writer = writer;

  this.board = new Board();

  this.checker = new Checker();

  this.person;
  this.computer;

  this.STOPPED = false;
}

Game.prototype.set = function (x, y, player) {
  if (this.board.getCell(x, y).isEmpty()) {
    this.board.markCell(x, y, player);
    return true;
  }
  throw new IncorrectCommandError(`set ${x + 1} ${y + 1}`, 'Cell already marked.');
}

Game.prototype.exit = function () {
  this.STOPPED = true;
  return true;
}

Game.prototype.parseMove = function (move, player) {
  let tokens = String(move).split(' ');

  if (tokens.length === 3 && tokens[0] === 'set') {
    if (+tokens[1] > 0 && +tokens[1] < (this.board.size + 1) &&
        +tokens[2] > 0 && +tokens[2] < (this.board.size + 1)) {
      if(this.set(+tokens[1] - 1, +tokens[2] - 1, player)) return true;
    } else {
      throw new IncorrectCommandError(move, 'Incorrect arguments.');
    }
  }
  if (tokens.length === 1 && tokens[0] === 'exit') {
    return this.exit();
  }
  
  throw new IncorrectCommandError(move, 'Unknown command.');
}

Game.prototype.personMove = function () {
  let personCurrentMove;
  while (true) {
    try {
      personCurrentMove = this.person.move(this.reader);
      this.parseMove(personCurrentMove, this.person);
    } catch (ex) {
      this.writer.write(ex.message);
      this.writer.write(this.board.getView());
      continue;
    }
    break;
  }
}

Game.prototype.writeResult = function (winner) {
  if (winner === this.checker.WINNER.PERSON) {
    this.writer.write(this.person.getPlayerName() + ', your win!');
  }
  if (winner === this.checker.WINNER.COMPUTER) {
    this.writer.write(this.person.getPlayerName() + ', your lose :(');
  }
  if (winner === this.checker.WINNER.TIE) {
    this.writer.write('Tie ;)');
  }
}

Game.prototype.startGame = function () {
  this.writer.write('\r\nWelcome \r\n to \r\n  tic-tac-toe \r\n   game\r\n');
  this.person = new Person(this.reader.read('May I have your name? '));
  this.writer.write('Nice to meet your, ' + this.person.playerName + '!\r\n');
  this.computer = new Computer(this.reader.readKey('How do degree of difficult? (eazy/hard) Hit \'e\' or \'h\' key: ', {
    limit: '$<eh>'
  }));
  this.writer.write(`Chosen a ${this.computer.difficult} degree of difficult.\n`);

  let winner;
  this.writer.write(this.board.getView());

  while (true) {
    this.personMove();

    if (this.STOPPED) {
      this.writer.write('Game was terminated.');
      break;
    }

    this.writer.write(this.board.getView());
    winner = this.checker.isGameOver(this.board);
    if (!!winner) {
      this.writeResult(winner);
      break;
    }

    this.writer.write('Computer move...');
    try {
      this.parseMove(this.computer.move(this.board), this.computer);
    }
    catch (ex) {
      this.writer.write(`Computer move. ${ex.message}`);
      this.exit();

      if (this.STOPPED) {
        this.writer.write('Game was terminated.');
        break;
      }
    }

    this.writer.write(this.board.getView());
    winner = this.checker.isGameOver(this.board);
    if (!!winner) {
      this.writeResult(winner);
      break;
    }
  }
}

module.exports = Game;
