//  스코프 클로져 

function foo(){
    var a = 2; 
    function bar(){
        console.log(a);
    }
    return bar;
}

var baz = foo();
baz();

// bar() 는 foo() 스코프에 대한 클로져를 가진다. 
// bar() 는 foo() 스코프에서 닫힌다. 
// bar() 는 여전히 해당 스코프에 대한 참조를 가지는데 
// 그 참조를 바로 클로저라고 부른다. 

// 이제 나는 볼 수 있다. 
// IIFE 는 클로져의 사례가 아니다. (클로져와 연관이 깊긴하지만)

// 반복문과 클로져 

for(var i = 1 ; i <= 5; i++ ){
    setTimeout(function timer(){
        console.log(i);
    }, i* 1000)
}

// 해결 ? 
for(var i = 1; i <= 5; i++){
    (function(){
        setTimeout(function timer(){
            console.log(i);
        }, i* 1000)
    })();
}
// 자신만의 스코프를 가지지만 비어있다. 

// 해결
for(var i = 1; i <= 5; i++){
    (function(){
        setTimeout(function timer(){
            var j = i;
            console.log(i);
        }, i* 1000)
    })();
}

// 해결 2
for(var i = 1; i <= 5; i++){
    (function(j){
        setTimeout(function timer(){
            console.log(i);
        }, i* 1000)
    })(i);
}

// 해결 3 
// let 은 for문안에서는 특별한 방식으로 작동한다. 
// 한번만 선언되는 것이 아니라 반복할때마다 선언된다. 해당 변수는
// 반복마다 이전 반복이 끝난 이후의 값으로 초기화 된다.

for(let i = 1; i <= 5; i++){
    setTimeout(function timer(){
        console.log(i);
    }, i* 1000)
}

// 모듈 
// 클로져의 능력을 활용하면서, 표면적으로 콜백과 상관없는 코드 패턴들이 있다. 

// 모듈 패턴,  가장 흔한 구현 방법은 모듈 노출
// 1. 하나의 최외곽 함수가 존재하고, 이 함수가 최소 한번은 호출되어야 한다. 
// 2. 최 외곽 함수는 하나의 내부 함수를 반환해야 한다. 
// 그래야 해당 함수가 비공개 스코프에 대한 클로져를 가져 비공개 상태에 접근하고 수정할 수 있다.

function CoolModule(){
    var something = "cool"; 
    var another = [1,2,3]; 

    function doSomething(){
        console.log(something);
    }
    function doAnother(){
        console.log(another.join(" ! "));
    }
    return {
        doSomething: doSomething, 
        doAnother: doAnother
    }
}
var foo = CoolModule();
foo.doSomething();

// 싱글톤만 생성하는 버젼

var foo = (function CoolModule(){
    var something = 'cool'; 
    var another = [1,2,3]; 
    function doSomething(){
        console.log(something);
    }
    function doAnother(){
        console.log(another.join(" ! "));
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
})();


// 현재의 모듈 
// 많은 모듈 의존성 로더와 관리자는 본질적으로 이 패턴의 모듈 정의를 친숙한 API형태로 감싸고 있다. 
// 단순한 증명 

var MyModule = (function Manager(){
    var modules = {}; 

    function define = (name, deps, impl){
        for (var i = 0 ; i < deps.length; i++){
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps);
    }
    function get(name){
        return  modules[name];
    }
    return {
        define: define, 
        get: get
    };
})();

MyModule.define("bar", [], function(){
    function hello(who){
        return 'let me introduce: ' + who; 
    }
    return {
        hello: hello
    }
});

MyModule.define("foo", ["bar"], function(bar){
    var hungry = "hippo"; 
    function awesome(){
        console.log(bar.hello(hungry ).toUpperCase());
    }
    return {
        awesome: awesome
    };
});
var bar = MyModule.get("bar");
var foo = MyModule.get("foo");

console.log(
    bar.hello("hippo")
);
foo.awsome();