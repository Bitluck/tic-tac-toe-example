'use strict';

function Player() {
  this.playerName;
}

Player.prototype.setPlayerName = function (playerName) {
  this.playerName = playerName;
}

Player.prototype.getPlayerName = function () {
  return this.playerName;
}

Player.prototype.move = function () {}

module.exports = Player;
