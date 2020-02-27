// 함수 vs 블록 스코프 
// 어떤 것이 새로운 버블을 만들까 
// 자바스크립트의 다른 자료구조는 스코프 버블을 생성하지 못할까? 

// 함수 기반 스코프 

// 자바스크립트가 함수 기반 스코프를 활용하기 때문에 다른 자료구조도 자체적인 스코프를 생성하지 못한다. 
// 이는 사실이 아니다

function foo(a){
    var b = 2; 
    function bar(){
        console.log('');
    }
    var c = 3;
}
// bar() // fails
// console.log(a,b,c); // fails

// 이 모든 확인자는 foo, bar 안에서는 이용할 수 있다. 


// 일반 스코프에 숨기

// 스코프 버블을 생성하면, 감싸진 코드 안에 있는 모든 변수, 함수 선언문은 이전 코드에 포함됬던 스코프가 아니라
// 새로이 코드를 감싼 함수의 스코프에 묶인다. 

// 이는 최소 권한의 원칙 (소프트웨어 디자인 원칙)) 과 관련이 있다. 
// 소프트웨어를 설계할 때 필요한 것만 최소한으로 남기고 나머지는 숨겨야 한다.

/*
function doSomething(a){
    b = a + doSomethingElse(a*2);
    console.log(b*3)
}
function doSomethingElse(a){
    return a-1;
}
var b; 
doSomething(2);
*/
// 위 코드를 다음과 같이 ,
// 비공개로 해야될 부분을 비공개로 둔다

function doSomething(a){
    function doSomethingElse(a){
        return a-1;
    }
    var b; 
    b = a +doSomethingElse(a *2); 
    console.log(b * 3); 
}
doSomething(2); 


// 충돌 회피

function foo() { 
    function bar(a){
        i = 3; 
        console.log( a + i);
    }
    for (var i = 0 ; i < 10 ; i++){
        // bar (i*2);
        // 무한루프를 발생시킨다. 
    }
}

// bar 안에 var i = 3; 
// 스코프를 이용해서 내부에 선언문을 숨기는 것 유일한 선택지 

// 글로벌 네임스페이스 
// 여러 라이브러리를 한 프로그램에서 불러온다면 라이브러리들은 쉽게 충돌한다. 
// 일반적으로 글로벌 스코프에 하나에 고유의 이름을 가지는 객체 선언문을 생성한다.

var MyReallyCoolLibrary = {
    awsome : 'stuff',
}

// 모듈관리 
// 좀 더 현대적인 충돌 방지 옵션 
// 어떤 라이브러리도 확인자를 글로벌 스코프에 추가할 필요 없이 특정 스코프로부터 의존성 관리자를 이용한
// 다양한 명시적인 방법으로 확인자를 가져와 사용할 수 있다. 

// 스코프 역할을 하는 함수 
// 둘러싸인 스코프를 오염시키지 않고, 자동으로 실행될 수는 없을까.

var a = 2; 
(function foo(){
    var a = 3; 
    console.log(a); 
})();
 
// 여기서 함수 이름 foo는 함수를 둘러싼 스코프에 묶이는 대신 함수 자신의 내부 스코프에 묶였다. 

// 익명 함수 표현식
// 단점
// 스택 추적 시 표시할 이름이 없어서 디버깅이 더 어려울 수 있다. 
// 이름 없이 스스로 재귀호출 하려면 arguments.callee가 필요하다(폐기 예정이다)
// 함수 이름은 코드를 이해하는데 도움이 된다

// 인라인 함수 표현식을 쓰자. 
// (함수 표현식에 이름을 쓴 것)
// 위의 foo와 같이

// 함수 표현식 즉시 호출하기 ( Immediately Invoked Function Expressions)
// 함수에 이름을 쓰도록 하자

// 여러 형태들 
// (function foo() {} ()) 이 형태로 쓸수도 있다. 

var a = 2; 
(function IIFE(global){
    var a = 3; 
    console.log(a); 
    console.log(global.a);
})(window);
console.log(2);

// UMD ,,  Universal Module Definition 프로젝트에서 사용되는 형태 

(function IIFE(def){
    def(window);
})(function def(global){
    var a = 3; 
    console.log(a);
    console.log(global.a);
});


// 블록스코프, 
// 변수를 최대한 사용처 가까이에서 최대한 작은 유효 범위를 갖도록 선언
// 정해진 장소 밖에서 변수가 사용되면,, 오류 발생됨
//  자바스크립트는 지원하지 않지만, 방법이 있다. 

// with 
// with 문 안에서 생성된 객체는 바깥 스코프에 영향을 주는 일이 없다. 

// try/ catch
// catch문은 안에 선언된 변수는 블록 스코프에 속한다. 
// ??? 

// let 
// es6부터 let이 채택되다. 
// 키워드 let은 변수를 둘러싼 아무 블록의 스코프에 붙인다.  

// 변수가 어느 블록스코프에 속한 것으로 착각하기 쉽다. 
// 명시적으로 블록을 생성하면 이 문제를 해결할 수 있다. 


var foo = true; 
if(foo){
    {
        let bar = foo * 2; 
        console.log(bar);
    }
}
// console.log(bar) // refernecError

// let은 호이스팅 효과를 받지 않는다. 
{
    // console.log(bar); // Reference Error;
    let bar = 2; 
}

// 가비지 콜랙션
// 어떤 데이터가 더는 필요 없다는 사실을 더 명료하게 알려줄 수 있다. 

function process(data){
    // data 
}
{ 
    let someReallyBigData =  '';
    process(someReallyBigData)
} // 이 블록이 끝나면 더는 필요 없다. 

// 다음과 같은 코드가 있다고 하자
// var btn 
// btn.addEventListner("click", function click(evt){console.log(evt)});

// 위에서 블록으로 명료하게 더 필요없다는 사실을 알려주지 않았다면
// click함수가 해당 스코프 전체의 클로저를 갖고 있기 때문에
// someReally ...를 그대로 남겨둘 것 

// let 반복문 
// .. 코드 리팩토링할때 주의하자 
// var 선언문으로 작성된 코드는 함수 스코프와 숨겨진 연계가 있을 수 있다. 

var foo = true, baz =10; 
if(foo){
    var bar = 3; // let bar = 3 이었다면..bar 선언도 밖으로 나와야한다. 
}
if(baz > bar){
    console.log(baz)
}

// const 
// es6에 추가된 개념 
// 블록스코프를 생성하지만 선언된 값은 고정된다!!


