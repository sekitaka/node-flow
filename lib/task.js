var util = require('util'),
    EventEmitter = require('events').EventEmitter ;
var Task = function(){} ;
util.inherits(Task,EventEmitter) ;
Task.prototype.done = function(err,res){
    this.emit('done',err,res) ;
} ;

module.exports = Task ;
