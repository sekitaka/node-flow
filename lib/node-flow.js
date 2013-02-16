var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    Task = require('./task.js') ;

var parallel = module.exports.parallel = function(ary,callback){
    var taskNum = ary.length,
        taskCounter = 0 ,
        para ;
    for ( var i = 0 ; i < ary.length ; i++ ){
        para = ary[i]() ;
        para.on('done',function(){
            console.log('task_end') ;
            if ( ++taskCounter >= taskNum ) {
                callback(null,taskCounter) ;
            }
        });
    }
}


