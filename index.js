'use strict';

const Game   = require('./game');
const Reader = require('./reader');
const Writer = require('./writer');

let game = new Game(new Reader(), new Writer(console.log));
game.startGame();
