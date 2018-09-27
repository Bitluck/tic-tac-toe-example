'use strict';

const Player = require('./player');

Person.prototype = Object.create(Player.prototype);
Person.prototype.constructor = Person;

function Person(playerName) {
  Player.apply(this, arguments);
  this.setPlayerName(playerName);
}

Person.prototype.move = function (reader) {
  let a = reader.read(this.playerName + ', please, enter your move>');
  return a;
}

module.exports = Person;
