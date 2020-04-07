// 2, 3장 복습
// 2 - 콜백
//  - 콜백식 비동기는 우리가 머릿속으로 계획하는 작업의 단계와 잘 맞지 않는다. 
//  - 콜백은 제어의 역전 문제로 인해 믿음성이 떨어지고 조함하기 어렵다. 

// 3 - 프라미스
//  - 믿음성/ 조합성을 살리면서 제어의 역전을 되역전한다. 

// 어떻게 비동기 흐름 제어를 순차적/ 비동기 모습으로 나타낼 수 있을지 고민해 보자 



// 4.1 완전 - 실행을 타파하다. 
// 함수가 실행되기 시작하면 완료될때까지 계속 실행되며 다른 코드가 끼어들어 실행되는 법은 없다 가 타파되다. 

// 멈춤신호 .. yield
// cooperative concurrency 

var x = 1; 
function *foo(){
    x++; 
    yield; 
    console.log('x :', x);
}
function bar(){
    x++;
}

var it = foo();  // iterator를 선언하여 제너레이터를 제어한다.
it.next(); 
console.log(x);
bar(); 
console.log(x);
it.next(); 
// x : 3

// 제너레이터는 1회 이상 시작/실행을 거듭할 수 있으면서도 반드시 끝까지 실행해야 할 필요는 없는 특별한 함수다. 

// 입력과 출력

function *foo(x,y){
    return x*y; 
}
var it = foo( 6, 7);
var res = it.next(); 
res.value;

// 반복 메시징
// 제너레이터에는  yield와 next()를 통해 입력/ 출력 메시지를 주고받는 강력하고 감탄스러운 기능이 탑재되어 있다. 

function *foo(x){
    var y = x * (yield)
    return y; 
}
var it = foo(); 
it.next();  // foo를 시작함 
var res = it.next(7); // 7이 yield의 결과값이 되도록 전달됨 
 
// yield갯수보다 next호출이 하나 더 많다. 
// 첫번째 next호출이 항상 제너레이터를 가동하여 첫번째 yeild까지 실행하기 때문이다. 

// 짝이 안맞는 것처럼 보이지만.. 
// 이터레이터 관점에서 보면 양방향 메시징이 가능하다는 걸 설명할 필요가 잇다. 

function *foo(x){ 
    var y = x * (yield "hello");
    return y ; 
}

var it = foo(6); 
var res = it.next(); 
// res.value // 첫번째 next에서는 아무것도 전달하지 않는다
res = it.next(7); // 기다리고 있는 yield에게 7을 넘긴다. 

// 마지막 it.next(7)에는 대답할 yield문이 하나도 없다. 그럼 누가 대신할까. 
// 바로 return 문이다. 

// 다중 이터레이터, 
// 이터레이터를 생성할 때마다 해당 이터레이터가 제어할 제너레이터의 인스턴스 역시 암시적으로 생성된다. 
// 같은 제너레이터의 인스턴스를 동시에 여러개 실행할 수 있고, 인스턴스끼리 상호 작용도 가능하다. 

function *foo(){ 
    var x = yield 2; 
    z++; 
    var y = yield(x*z); 
    console.log(x,y,z); 
}

var z = 1; 
var it1 = foo(); 
var it2 = foo();

var val1 = it1.next().value; 
var val2 = it2.next().value; 

val1 = it1.next(val2*10).value; 
val2 = it2.next(val1*5).value; 

it1.next(val2/2); 
it2.next(val1/4); 


// 인터리빙

var a = 1; 
var b = 2; 

function* foo() { 
    a++; 
    yield;
    b = b * a; 
    a = (yield b) + 3; 
}
function* bar() { 
    b--; 
    yield;
    a = (yield 8)+ b; 
    b = a * (yield 2);  // a 값 대입은 yield보다 먼저 일어남
}

function step(gen){
    var it = gen(); 
    var last; 
    return function() { 
        last = it.next(last).value; 
    }
}

a = 1; 
b = 2; 

var s1 = step(foo); 
var s2 = step(bar); 
s2(); // 1,1
s2(); // 1,1 yield -> 8
s1(); // 2,1 
s2(); // 9,1 yield -> 2 
s1(); // 9,9 yield -> 9
s1(); // 12,9
console.log(a,b)
s2(); // 12,24
console.log(a,b)


// 값을 제너레이팅, 
// 

// 자신의 앞엣 값과 어떤 관계가 분명히 정의된, 일련의 값들을 생산, 
// 상태성 생산기가 필요하다 (stateful producer)

// iterator는 생산자로부터 일련의 값들을 받아 하나씩 거치기 위한 명확한 (well-defined) 인터페이스다. 

var something = (function() { 
    var nextVal; 
    return {
        // for ... of 루프에서 필요하다 
        [Symbole.iterator]: function(){return this;}, 

        // 표준 이터레이터 인터페이스 메서드
        next: function(){ 
            if( nextVal === undefined){
                nextVal = 1; 
            }else{
                nextVal = (3 * nextVal) + 6; 
            }
            return { done: false, value: nextVal};
        }
    };
})(); 

console.log(something.next().value); 
console.log(something.next().value); 


for(var v of something){
    console.log(v); 
    if(v > 500){
        break;
    }
}

for(
    var ret; 
    (ret = something.next()) && !ret.done;
){
    console.log(ret.value); 
    if(ret.value > 500){
        break;
    }
}

// 기본 자료구조에 탑재된 이터레이터

var a = [1,3,5,7,9];
for(var v of a){
    console.log(v);
}
 
// 일반 객체에는 이터레이터가 없다. 
// 객체 프로퍼티를 순회하는 것이 목적이라면,,

// 이터러블
// 순회 가능한 이터레이터를 포괄한 객체 iterable 

// [Symbol.iterator] : function() { return this; }

// 
// 제너레이터 이터레이터 
// 이터레이터 인터페이스의 next() 를 호출하여, 한번에 하나씩 추출할 수 있다.

// 제너레이터 자체는 이터러블이 아니지만, 아주 흡사해서 제너레이터를 실행하면
// 이터레이터를 돌려받게 된다. 

// 방금 코드를 제너레이터로 생성한 버젼 
function *something() {
    var nextVal; 
    while(true){
        if(nextVal === undefined){
            nextVal = 1; 
        }else { 
            nextVal = (3 * nextVal) + 6; 
        }
        yield nextVal;
    }
}
//  yield를 만나면 일단 멈추기 때문에 *something의 상태는 그대로 유지된다

for(var v of something()){
    console.log(v);
    if(v > 500){
        break;
    }
}
//  제너레이터를 호출할 것, 제너레이터가 반환한 이터레이터는 이터러블이다!! 

//  for .. of 루프가 비정상 완료되면 제너레이터의 이터레이터를 중지하도록 신호를 준다.
// break return 잡히지 않은 예외로 종료될 경우 
// 커스텀 이터레이터의 경우 부가적인 신호를 받는 경우다 있다. 이때 return()을 호출한다. 

// 제너레이터가 외부적으로 완료된 다음에도 내부에서 try... finally 절을 사용하면
// 실행할 수 잇다. 이는 자원을 정리할 때 유용한 기법이다. 

function * something() { 
    try { 
        var nextVal; 
        while(true){
            if(nextVal === undefined){
                nextVal = 1; 
            }else{
                nextVal = (3 * nextVal) + 6; 
            }
            yield nextVal;
        }
    }
    finally { 
        console.log('정리 완료!');
    }
}
var it = something(); 
for(var v of it){
    console.log(v); 
    if(v > 500){
        console.log(
            it.return("Hello World").value
        );
    }
}
// it.return() 하면 제너레이터 실행은 즉시 끝나고 finally절로 옮겨간다. 
// 또한 return의 전달값이 반환값이 된다. 
// break문이 필요 없고, done=true이므로, 막을 내린다. 

// 제너레이터를 비동기적으로 순회
// 비동기 코딩 패턴과 무슨 상관이 있단 말인가 

function foo(x,y) { 
    ajax( 
        "http..."+x+y, 
        function(err,data) { 
            if(err){
                it.throw(err); 
            }else{
                it.next(data);
            }

        }
    )
}
function *main() { 
    try { 
        var text = yield foo(11,31); 
        console.log(text); 
    }
    catch(err) { 
        console.log(err); 
    }
}

var it = main(); 
it.next();

// foo()안에서는 완전히 비동기적으로 작동 가능하다. 
// 비동기성을 우리 두뇌가 허락하는 순차적/ 동기적 방향으로 표현할 수 없었던 콜백의 단번을 거의 완벽하게 한번에 
// 보완한 솔루션이다. 

// 비동기성을 하나의 구현 상세로 추상화 했기 때문에  개발자가 동기/순차적으로 흐름 제어를 추론할 수 있다. 
// 

// 동기적 에러 처리 
// 제너레이터 안쪽의 try catch.. 이 부분이 작동을 할까? 
// foo는 비동기 함수다.. 

// yield가 이 할당문을 멈추게 하는 방법은 이미 앞에서 이야기 했다. 
// 이 yield로 제너레이터가 에러를 잡을 수 있게 잠시 멈추게 할 수도 있다는 점이다. 

/// foo()안에서..
if(err){
    it.throw(err); 
}

// 제너레이터 밖으로도 가능하다. 

function * main() { 
    var x = yield "Hello World"; 
    console.log(x);
}
var it = main(); 
it.next(); 
try{ 
    it.throw("허걱");
}
catch(err){
    // *main에서 처리 되는 것이 아닌 여기서 처리된다. 
    console.error(err);
}

// 비동기 코드에서 난 에러를 동기적인 모양새로 처리할 수 있다는 것 . 매우 큰 강점이다. 

// 제너레이터 + 프라미스
// 제너레이터를 비동기적으로 순회할 수 있다는 사실 만으로도 순차적 추론성 측면에서 콜백 범벅인 스파키데 코드에 비해 엄청난 발전이다. 
// 정말 중요한 것은 프라미스의 믿음성과의 조합이다. 

// 프라미스 제너레이터를 최대한 활용하는 가장 자연스러운 방법은 우선 프라미스를 yield한 다음 이 프라미스로 제너레이터의 이터레이터를 
// 제어하는 것이다. 

// 프라미스로 제너레이터의 이터레이터를 제어하기 

function foo(x,y){ 
    return request(
        "http: ... " + x+y
    );
}
function *main() { 
    try{ 
        var text = yield foo(11,31); 
        console.log(text);
    }
    catch(err){
        console.error(err); 
    }
}
var it = main(); 
var p = it.next().value; 

p.then(
    function(text) { 
        it.next(text);
    }, 
    function(err){
        it.throw(err); 
    }
);

// * main에는 프라미스를 인식하는 단계가 하나만 있다는 것 그것을 활용했다. 
// 제너레이터 별로 연쇄를 수동으로 작성하고 싶지 않을 것.. 
// 

// 순회 제어를 하면서 프라미스가 나올때마다 귀결되길 기다렸다가 실행할 수 잇으면 금상첨화
// it.next 도중 제너레이터에서 에러가 나면? 그냥 종료? 
// it.throw를 했는데 처리되지 않고 곧바로 다시 뛰어나오게 하려면 ? 

// 프라미스 인식형 제너레이터 실행기 

function run(gen){ 
    var args = [].slice.call(arguments, 1), it;
    it = gen.apply(this, args);

    return Promise.resolve()
        .then(function handleNext(value){
            var next = it.next(value); 
            return (function handleResult(next){
                if(next.done){
                    return next.value; 
                }
                else{
                    return Promise.resolve(next.value)
                        .then(
                            // 성공시 귀결 값을 제너레이터로 반환하면서 비동기 루프를 재개한다. 
                            handleNext, 
                            // 'value 가 버림 프라미스면, 제너레이터 자신이 에러를 처리하게끔
                            // 거꾸로 에러를 전파한다. 
                            function handleErr(err){
                                return Promise.resolve(
                                    it.throw(err)
                                )
                                .then(handleResult);
                            }
                        );
                }
            })(next);
        });
}

// async await !! es8 도입 
// async 함수는 함수가 완료될때마다 귀결되는 프라미스를 알아서 반환한다. 

// 제너레이터에서의 프라미스 동시성 

// version 1 
function * foo() { 
    var r1 = yield request(".."); 
    var r2 = yield request("..");

    var r3 = yield request(
        ".." + r1 + ".." + r2
    );
    console.log(r3); 
}
run(foo); 

// - 두 독립적인 요청을 순차적으로 한다. 
// 전체 비동기 흐름의 기반을, 프라미스에 두는 해결책
// 시간 독립적 형태로 상태 관리가 가능한 프라미스 본연의 능력에 맞기는 것

//  version 1 
function * foo(){
    var p1 = request("...");
    var p2 = request("...");

    var r1 = yield p1; 
    var r2 = yield p2; 
    var r3 = yield request('...');
    console.log(r3);
}

// version 2 
function *foo(){
    var results = yield Promise.all([
        request([]),
        request([]),
    ])
    var r1 = results[0];
    var r2 = results[1];
    var r3 = yield request( ...);
    console.log (r3);
}

// 프라미스의 모든 동시성 능력을 제너레이터 + 프라미스 방식으로 마음껏 이용할 수 있다. 
// 이것, 저것 다음 형태의 순차적 비동기 흐름 제어 이상의 뭔가가 필요하다 싶을 땐 프라미스가 최선이다. 

// 프라미스 숨김 
// 코딩 스타일의 문제이미나, 제너레이터 내부에 얼마만큼의 프라미스 로직을 넣을지 신중히 판단하기 바란다. 
//단순 + 순차적+ 동기적인 코드를 작성하면서 비동기 관련 세부부분은 감추고자하는 의도가 더 대부분 


function bar(url1, url2){
    return Promise.all([
        request(url1),
        request(url2)
    ]);
}

function * foo(){
    var result = yield bar("...",",,,");
    var r1 = result[0];
    //..
}


// 프라미스 로직을 어떤 함수 안에 감추고 이 함수를 제너레이터에서 그냥 호출하는 식으로 코드를 작성하는 것은
// 흐름 제어를 정교하게 다루어야 할때 유용하다. 

// 추론성과 유지 보수성이 낳은 코드를 작성하려고 노력해야 한다. 


 // 제너레이터 위임
 // 제너레이터에서 제너레이터 호출하기 

 function * foo() { 
     //...
 }
 function * bar(){
     var r1 = yield request("...");
     var r3 = yield run(foo);
 }
 run(bar);

 // *foo호출을 *bar 안으로 합하고자 한다면 yield위임이라는 더 좋은 방법이 있다. 
 // yeild * 형태의 특수 구문이다. 

 function *foo() { 
     console.log("...");
     yield 3; 
     yield 4; 
     console.log("...")
 }

 function *bar(){
     console.log("..")
     yield 1; 
     yield 2; 
     yield * foo(); 
     yield 5; 
     console.log("..")
 }

 var it = bar(); 
 console.log(it.next().value);
 console.log(it.next().value);
 console.log(it.next().value);
 console.log(it.next().value);
 console.log(it.next().value);

// yield가 내어주는 것은 이터레이터의 제어권이다

// 왜 위임을? 
// 제너레이터를 분리 배치할 수 있다. 
// 프로그램 가독성, 유지보수성, 디버깅 측면에서 유리하다. 

// 메시지 위임 
// 

// 
function * foo() { 
    console.log('*foo ', yield "B");
    console.log('*foo ', yield "C");
    return "D";
}
// 
function * bar() { 
    console.log('* bar ', yield "A");
    console.log('* bar ', yield * foo());
    // console.log('* bar' , yield *["B","C","D"]);
    console.log('* bar ', yield "E");
    return "F";
}

var it = bar(); 
console.log('외부 ', it.next().value);   //  외부 A
console.log('외부 ', it.next(1).value);  // * bar 1 , 외부 B
console.log('외부 ', it.next(2).value);  // * foo 2 , 외부 C 
console.log('외부 ', it.next(3).value);  // * foo 3 , * bar D , 외부 E
console.log('외부 ', it.next(4).value);  // * bar 4 , 외부 F

// 예외도 위임이 된다. 
// 
function * foo(){
    try{
        yield "B";
    }
    catch(err) { 
        console.log('foo err : ', err);
    }
    yield "C";
    throw "D"; 
}

function * bar(){
    yield "A"; 
    try { 
        yield * foo(); 
    }
    catch(err) { 
        console.log("bar err" , err)
    }
    yield "E"; 
    yield *baz(); // error 
    // baz에서 발생한 예외는 bar에서 잡히지 않고, 
    // bar baz가 모두 완료 상태가 된다. 
    yield "G"; 
}
function *baz(){
    throw "F"; 
}

var it = bar(); 
console.log('외부 : ', it.next().value); // 외부 A
console.log('외부 : ', it.next(1).value); //  외부 B
console.log('외부 : ', it.throw(2).value); // foo err 2 외부 C
console.log('외부 : ', it.next(3).value); // bar err D 외부 E
try{
    console.log("외부:", it.next(4).value); // 외부 err F
}catch(err){ 
    console.log("외부 err", err );
}


// 제너레이터 동시성 
//

// 비동기성: 지금과 나중 

var it1 = reqData("...");
var it2 = reqData("...");

var p1 = it1.next(); 
var p2 = it2.next(); 

p1
.then(function(data){
    it1.next(data);
    return p2;
})
.then(function(data){
    it2.next(data);
});

// 1 

var res = []; 

function *reqData(url){
    var data = yield request(url); 
    yield;
    res.push(data);
}

var it1 = reqData(".."); 
var it2 = reqData("..");

var p1 = it.next(); 
var p2 = it.next(); 

p1.then(function(data){
    it1.next(data);
});
p2.then(function(data){
    it2.next(data);
})
Promise.all([p1,p2])
.then(function(){
    it1.next(); 
    it2.next();
});

// 2 

var res = []; 
runAll( 
    function*(){
        var p1 = request("...");
        yield;
        res.push(yield p1);
    },
    function*(){
        var p2 = request("...");
        yield; 
        res.push(yield p2); 
    }
);

// 3 

runAll(
    function*(data){
        data.res = []; 

        var url1 = yield "..."; 

        var p1 = request(url1);

        yield;

        data.res.push(yield p1);
    },
    function*(data){

        var url2 = yield "...2";

        var p2 = request(url2);
        
        yield;

        data.res.push(yield p2);
    }
)
// 순차적 프로세스 통신
// Communicating Sequential Processes

// 썽크
// thunk
// 다른 함수를 호출할 운명을 가진 인자가 없는 함수다

function foo(x,y){
    return x+y; 
}

function fooThunk(){
    return foo(3,4);
}

// 비동기 썽크 

function foo(x,y,cb) { 
    setTimeout(function(){
      cb(x+y);
    },1000);
}

function fooThunk(cb){
    foo(3,4,cb); 
}

fooThunk(function(sum){
    console.log(sum); 
});

//  thunkify

function thunkify(fn){
    var args = [].slice.call(arguments, 1); 
    return function(cb){
        args.push(cb); 
        return fn.apply(null, args);
    };
}

var fooThunk = thunkify(foo,3,4); 

fooThunk(function(sum){
    console.log(sum);
});

// 자바스크립트에서 thunk를 이용하는 표준적인 방법은 
// thunkify로 thunk 자신을 생성하기 보단 thunk를 만드는 함수를 생성한다. 

function thunkify(fn){
    return function () {
        var args = [].slice.call(arguments);
        return function(cb){
            args.push(cb);
            return fn.apply(null, args);
        }
    };
}

var whatIsThis = thunkify(foo); 
var fooThunk = whatIsThis(3,4); 

fooThunk(function(sum) { 
    console.log(sum); 
});
// thunkory ? thunk factory 


var fooThunkory = thunkify(foo); 
var fooThunk1 = fooThunkory(3,4); 
var fooThunk2 = fooThunkory(5,6); 

// 
// 
// Promise.wrap()이라는 유틸리티를 소개한 적이 있다. 
// 썽커리 썽크의 관계는 

var fooThunkory  = thunkify(foo); 
var fooPromisory = promisify(foo); 

var fooThunk = fooThunkory(3,4); 
var fooPromise = fooPromisory(3,4); 

fooThunk(function(err,sum){
    if(err) { 
        console.error(err);
    }else{
        console.log(sum);
    }
})
fooPromise
.then(
    function(sum){
        console.log(sum);
    },
    function(err){
        console.error(err);
    }
)


// thunk 자체는 프라미스의 믿음성/ 조합성을 거의 보장하지 못한다. 
// es6에서 새로 확장된 구문 중 트랜스파일러라는 도구 덕분에 
// es6이전 코드로 변환할 수 있다. 

// regenerator // facebook 개발자들이 만든 툴