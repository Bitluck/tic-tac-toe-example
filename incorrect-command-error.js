'use strict';

IncorrectCommandError.prototype = Object.create(Error.prototype);
IncorrectCommandError.prototype.constructor = IncorrectCommandError;

function IncorrectCommandError(command, message = '') {
  Error.apply(this, arguments);
  this.message = `\'${command}\' is incorrect command! ${message}`;
  this.stack = (new Error()).stack;
}

module.exports = IncorrectCommandError;
