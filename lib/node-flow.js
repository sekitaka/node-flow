var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    Task = require('./task.js') ;

var parallel = module.exports.parallel = function(ary,callback){
    var taskNum = ary.length,
        taskCounter = 0 ,
        task ;
    for ( var i = 0 ; i < ary.length ; i++ ){
        task = ary[i]() ;
        if ( !(task instanceof Task) ){
            if ( ++taskCounter >= taskNum ) {
                process.nextTick(function(){
                    callback(null,taskCounter) ;
                }) ;
            }
            continue ;
        }
        task.on('done',function(){
            if ( ++taskCounter >= taskNum ) {
                callback(null,taskCounter) ;
            }
        });
    }
} ;

var serial = module.exports.serial = function(ary,callback) {
    var taskNum = ary.length,
        task ;
    (function exec(pos){
        task = ary[pos]() ;
        if ( task instanceof Task ){
            task.on('done',function(){
                if ( ++pos >= taskNum ) {
                    callback(null) ;
                } else {
                    exec(pos) ;
                }
            });
        } else {
            if ( ++pos >= taskNum ) {
                process.nextTick(function(){
                    callback(null) ;
                }) ;
            } else {
                exec(pos) ;
            }
        }
    })(0) ;
} ;

