var util = require('util'),
    EventEmitter = require('events').EventEmitter ;
var Task = function(){} ;
util.inherits(Task,EventEmitter) ;
Task.prototype.done = function(){
    this.emit('done') ;
} ;

module.exports = Task ;
