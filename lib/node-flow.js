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
    (function exec(pos,res){
        task = ary[pos](res) ;
        if ( task instanceof Task ){
            task.on('done',function(err,res){
                if(err) return callback(err) ;
                if ( ++pos >= taskNum ) {
                    return callback(null,res) ;
                } else {
                    exec(pos,res) ;
                }
            });
        } else {
            if ( ++pos >= taskNum ) {
                return process.nextTick(function(){
                    callback(null,task) ;
                }) ;
            } else {
                exec(pos,task) ;
            }
        }
    })(0) ;
} ;

