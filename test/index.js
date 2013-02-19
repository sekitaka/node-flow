var NF = require('../index.js').NodeFlow ;
var Task = require('../index.js').Task ;

function f1(){
    console.log('f1 START');
    var e = new Task() ;
    setTimeout(function(){
        console.log('f1 END');
        e.done('Error has ocured') ;
    },1000)
    return e;
}
function f2(){
    console.log('f2 START');
    var e = new Task() ;
    setTimeout(function(){
        console.log('f2 END');
        e.done() ;
    },3000)
    return e;
}

function f3(){
    console.log('f3 START');
    var flgBreak = false ;
    var st = new Date(),
        et ;
    while(true){
        et = new Date() ;
        if ( (et-st) > 2000 ) break ;
    }
    console.log('f3 END');
}

function farg1 (){
    console.log('farg1 START');
    var e = new Task() ;
    setTimeout(function(){
        console.log('farg1 END');
        e.done(null,'farg1 end message') ;
    },3000)
    return e;
}

function farg2 (msg){
    console.log('farg2 START');
    console.log('receive message: ' + msg);
    var e = new Task() ;
    setTimeout(function(){
        console.log('farg2 END');
        e.done(null,'farg2 end message') ;
    },3000)
    return e;
}

// parallel
//NF.parallel([f3,f3],function(err,num){
//    if (err) {
//        console.log('ERROR') ;
//    } else {
//        console.log('ALL TASK DONE[' + num + ']') ;
//    }
//})

// serial
NF.serial([farg1,farg2],function(err){
    if(err){
        console.log('END WITH ERROR') ;
    } else {
        console.log('ALL TASK DONE.') ;
    }
})
