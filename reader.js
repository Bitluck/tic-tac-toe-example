'use strict';

function Reader() {
  this.readlineSync        = require('readline-sync');
  Reader.prototype.read    = this.readlineSync.question;
  Reader.prototype.readKey = this.readlineSync.keyIn;
};

module.exports = Reader;
