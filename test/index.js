// hoge
function f1(){
    var e = new Task() ;
    setTimeout(function(){
        e.done() ;
    },1000)
    return e;
}
function f2(){
    var e = new Task() ;
    setTimeout(function(){
        e.done() ;
    },3000)
    return e;
}

