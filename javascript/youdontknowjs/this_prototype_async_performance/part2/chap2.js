//  콜백 함수는 프로그램의 continuation을 감싼 Wrapping/캡슐화Encapsulation한 장치다. 
//

// 사람의 뇌는 재빠른 콘텍스트 교환기처럼 행동하고 있을 뿐이다. 
// 사람의 뇌는 싱글태스커에 가깝다. 

// 이 작업을 매우 빨리 하면, 외부에서는 마치 여러가지 작업이 병렬로 실행되고 있는 것처럼 보인다. 
// 비동기 이벤트의 동시성과 비슷 

// 실행 vs 계획 
// 인간은 단계별로 끊어 생각하는 경향이 있는데, 우리 손에 들려진 도구는 동기 -> 비동기로 전환된 이후론
// 단계별로 나타내기가 쉽지 않다 

// 중첩 연쇄된 콜백, 
// Callback hell

// 언뜻 보면 이 코드 자체의 비동기성은 순차적 두뇌 계획과 자연스럽게 잘 조화되는 것처럼 보인다. 
// listen -> settimeout -> ajax 
listen("click", function handler(evt){
    setTimeout( function require(){
        ajax("http://some.url.1", function response(text){
            if(text == "hello"){
                handler
            }else if( text == "world"){
                request;
            }
        });
    }, 500);
})


// 단순히 순차 실행이 될 경우는 많은 경우의 수중 하나에 불과하다 
// 비동기 자바스크립트 프로그램에는 갖가지 잡음이 섞인다. 
/*
doA( function() { 
    doB();
    doC( function(){
        doD();
    })
    doE();
});
doF()
*/
//  A->F->B->C->E->D
//  위 아래로 이동하는것이 피로하다. 
// doA나 doD가 비동기 코드 가 아니라면, 또 순서가 달라진다. 
//  A->B->C->D->E->F

// 선형적으로 이 코드를 추론하자면 한 함수에서 다음 한수로 시퀀스 흐름을 
// 따라가기 위해 코드 베이스 전체를 널뛰기 해야 한다. 

// 수작업으로 하드 코딩한 콜백은, 대부분 바람직하지 않다. 
// 만일의 사태와 가능한 경우의 수를 죄다 나열하다간 코드가 너무 복잡해진다. 
// 바로 이것이 콜백지옥이다. 

// 콜백의 첫번째 단점은
// 사람의 두뇌가 순차적으로 중단을 일으키며 계획하는 방식이 콜백 지향의 비동기 코드와 
// 잘 맞지 않느다는 사실이다. 

// 믿음성 문제 
//
// A
// ajax("..", function() { 
//   C
// });
// D 
// C는 다른 프로그램 ( ajax)의 제어하에 나중에 실행된다. (Control Switch)
// 제어권 교환이야말로 콜백 중심적 설계방식의 가장 큰 문제점이다. 

// 내가 작성하는 프로그램인데도 실행흐름은 서드 파티에 의존해야 하는 이런 상황을 
// inversion of control 제어의 역전이라고 한다. 

// 다섯 마리 콜백 이야기, 
// 어떤 써드 파티 함수에게 콜백을 넘겼을때 써드 파티 함수가 콜백을 잘못 활용할 가능성

// 콜백을 너무 일찍 부른다. 
// 콜백을 너무 늦게 부른다.
// 콜백을 너무 적게 또는 너무 많이 부른다. 
// 필요한 환경/ 인자를 정상적으로 콜백에 전달하지 못한다.
// 일어날지 모를 에러/ 예외를 무시한다. 


// 남의 코드 뿐만이 아니라, 이론적으로 제어하는 유틸리티를 정말 신뢰할 수 있는가? 

function addNumbers(x,y){
    return x+y;
}
// 함수 입력 값에 대한 체크/ 정규화 로직은 지극히 당연하며
// 우리가 이론적으로 완전히 믿고 쓰는 코드도 예외는 아니다. 

// 콜백함수에 반복적인 관용코드 / 오버헤드를 넣는 식으로 손수 필요한 장치를 만들어야 한다. 
// 그럼에도 불구하고 틀어질 수 있는 것이 제어의 역전 문제다. 

// 콜백을 구하라 
// 콜백패턴이 붕괴하는 것을 막기위한 노력의 일환

// 분할 콜백 (split callback) 
// ajax("http:// ... ", success, failure);

// 에러 우선 스타일(Error-First STyle);
// Node Style이라고도 불리며, 모든 노드 제이에스에이피아이에서는 관용이다. 
/*
function resoponse(err,data){
    if (err) { 
        console.log(err);
    } else {
        console.log(data);
    }
}
ajax("....", response);
*/

// 반복적인 호출을 막을 수 없다. 
// 성공/에러신호를 동시에 받거나 전혀 못받을 수 있다. 
// 표준적인 패턴을 띠고 있음에도 재사용불가능한 관용코드다. 

// 이벤트를 취소하는 타임아웃을 거는 유틸리티
/*
function timeoutify(fn, delay){
    var intv =  setTimeout(function(){
        intv = null; 
        fn(new Error('타임아웃'))
    }, delay);
    return function(){
        if(intv){
            clearTimeout(intv);
            fn.apply(this,arguments);
        }
    }
}
ajax("...", timeoutify(foo, 500));
*/

// 이벤트 루프대기열 다음차례라고 해도 예측 가능한 비동기 콜백이 될 수 있게 항상
// 비동기 호출을 해라.

// 콜백은 늘 이런식이야.. 
/*
function result() { 
    console.log(a);
}
var a = 0; 
ajax("...", result);
a++;
*/
// 0, 1이다. 
// 동기적 호출일까? 비동기적 콜백 호출일까. 
// 주어진 API가 항상 비동기로 작동할 지 확신이 없다면.. 
/*
function asyncify(fn){
    var orig_fn = fn, 
        intv = setTimeout(function(){
            intv = null
            if(fn) fn();
        }, 0)
    ;
    fn = null;
    return function () { 
        if(intv){  // 타이머가 기동하기 전에 .. 발사됨
            fn = orig_fn.bind.apply(
                orig_fn,
                [this].concat([].slice.call(arguments))
            );
        }   
        else{   // 이미 비동기임 
            orig_fn.apply(this, arguments);
        }
    }
}
*/
// 

// 언어 자체의 내장 API에서 다른 언어에서 지원하는 방법을 갈망했을것. 
// ES6부터 기막힌 해결책이 화려하게 데뷔하다. 