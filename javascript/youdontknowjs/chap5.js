// 문 Statement , 표현식 expression

var a = 3 * 6; //Declaration Statement    
                // 할당하는 부분은 a = ... Assignment Expression
var b = a;  
b;   // expression Statement

// 문의 완료 값  Completion Value 

// 모든 문은, 완료 값을 가진다. 

var b = a; 
// var 문 자체의 완료 값은 undefined

// 문의 완료값을 쓸때가 있을까? 
var b; 
if(true){
    b = 4 + 38; 
}

// if 블록 내의 마지막 문, 완료값이 if 블록의 완료값
/*
var a, b; 
a = if(true){
    b = 4 + 38;
}
*/
// 동작하지 않는다

// 실제로 동작하려면 이렇게 해야한다. 
a = eval("if(true){b = 4 + 38}");

// es7 명세에는 do 표현식이 있다. 
// nodejs에서는 지원되지 않는다 
// https://node.green/
/*
var a, b; 
a = do {
    if (true){
        b = 4 + 38; 
    }
};
*/

// 표현식의 부수효과 
var a = 2; 
var b = a + 3; 
// a + 3 자체에는 부수효과가 전혀 없다. 

// 함수 호출 표현식에는 부수효과가 있을 수 있다. 
function foo(){
    a = a + 1
}
var a = 1; 
foo();  // a가 변경되는 부수효과

// 부수효과를 지닌 표현식 
var b = a++; 
// a를 반환 후, a의 값을 변경
// ++a a의 값을 반환 후, 값을 변경

var b = (a++);
// a의 부수효과를 캡슐화? ㄴㄴ 
var b = (a++, a);
// 문을 나열하는 ,연산자를 사용하면 다수의 개별 표현식을 하나의 문으로 표현할 수 있다. 
// a++, a 는 두번째 a표현식을 a++의 부수효과가 일어난 이후에 평가한다. 

// delete
// delete는 객체의 프로퍼티를 없애거나 배열에서 슬롯을 제거할때 쓴다. 
// 하지만 단독 문으로 더 많이 쓴다. 

var obj = {
    a: 42
};
obj.a // 42
delete obj.a // true
obj.a // undefined

// delete 연산자의 결과값은 유효한/ 허용된 연산일 경우 true 그 외에는 false 
// ( 존재하지 않는 프로퍼티 이거나, 존재하면서 설정 가능한 프로퍼티 일 경우 true)
// 이 연산자의 부수효과는 프로퍼티를 제거하는 것이다. 

var a ; 
a = 42 // 42
a; // 42
// = 연산자는 부수효과 와 멀어지지만, 42를 a에 할당하는 자체가 본질적으로 부수효과
// 할당 표현식/ 문 실행 시 할당된 값이 완료 값이 되는 작동 원리는 다음과 같은 연쇄 할당문에서 특히 유용하다 

var a, b, c; 
a = b = c = 42; 
// c = 42의 결과 값 42.. b = 42;

function vowels(str){
    var matches; 
    if(str){
        matches = str.match(/[aeiou]/g);
        if(matches){
            return matches
        }
    }
}
console.log(vowels("hellow world"));


//  부수효과를 사용한 예 

function vowels(str){
    var matches;
    if(str && (matches = str.match(/[aeiou]/g))){
        return matches
    }
}
console.log(vowels("hellow world"))

// 콘텍스트 
// 콘텍스트 별로 달라지는 .. 

// {} 중괄호 

var bar = () => {return 3}
var a = {
    foo: bar()
};
// 1. 객체 리터럴 
console.log(a);
console.log(a.foo);

{
    foo:bar()
};
// 평범한 코드 블럭
// foo:? 이건 어떻게 해석? -> 레이블

foo: for( var i =0 ; i< 4; i++){
    for(var j = 0; j < 4; j++){
        if((i*j) >= 3){
            console.log("그만!  ",i,j)
            break foo;
        }
        console.log(i,j);
    }
}

// foo라는 레이블이 붙은 바깥쪽 루프 밖으로 나가 그 이후부터 계속하라

function foo() {
    bar : {
        console.log('1');
        break bar;
        console.log('2');
        //실행이 안됨
    }
}
foo();
// 비 루프 블록에서도 활용가능하다.  break만 참조할 수 있다. 
// continue 또는 레이블 없는 break는 안된다. 

// JSON-P
//  JSON은 자바스크립트 구문의 하위집합이라 할 수 있지만, 그 자체로 올바른 자바스크립트 문법은 아니다. 
//  JSON을 문법에 맞는 자바스크립트코드로 옷을 입혀주는 방법이다. 
//  foo({"a" : 42})
//  JSON 함수 호출로 감싸는 패턴이다.

// 2. 블록 

[] + {} ; // [object ..]
{} + [] ; // 0

//  두번째 에서는 {} 빈 블록으로 이해 
// + [] 는 숫자로 강제 변환함 

//  3. 객체 분해 
//  es6 의 분해 할당 destructuring Assignment
function foo({a,b,c}){
    console.log(a,b,c);
}

foo({
    c: [1,2,3],
    a: 42,
    b: "foo",
})

// 4. else if 의 선택적 블록
// 자바스크립트에서 else if 가 존재한다고 믿는것은 미신이다. 

if(a){
}else if (b){
}else{
}
//else 이후의 if(b){}else{} 를 단일 문으로 해석한다. {}로 싸든 안싸든 상관 없다. 
if(a){
}else {
    if(b){
    }else{
    }
}

// 연산자 우선순위
var a = 42; 
var b = "foo"; 
var c = [1,2,3];

a && b || c; 
a || b && c; 
// 연산자의 우선순위는 ? 

var a = 42, b;
b = (a++,a); 
console.log(a,b);

var a = 42, b
b = a++, a;
console.log(a,b);

// , 연산자는 우선순위가 최하위다. 
 // if( str && matches == ...)
 // if( (str&& matches) == ...) <= 이렇게 해석된다. 

false && true || true;
 // 연산자 우선순위는 
 // && > || 이다. 
 // MDN의 연산자 우선순위를 참고하자


// short circuiting 
// 유용하고 자주 쓰인다. 

// opt && opt.cool 
// opt가 존재하지 않는다면 생성될 에러 방지 
 
// opt.cache || primeCache()
// cache가 ok이면 primeCache를 호출해서 불필요한 작업을 줄인다. 

// 결합성

a && b || c ? c || b ? a : c && b : a;
// (a && b || c) ? (c || b) ? a : (c && b) : a

// 우선순위가 동일한 다수의 연산자라면 처리 순서가 어떻게 되는가. 
// 좌측 결합성,, 우측 결합성이 있다. 
// 처리 방향과는 전혀 다르다. 

// 처리 방향 좌측 -> 우측 
// 자바스크립트의 기본 처리 순서 

// && , 
// || 끼리는 순서가 중요하지 않다. 
// 삼항연산자의 경우 결합방향에따라 달라진다. 

// 삼항연산자 우측 결합
a ? b : c ? d : e; 
// -> a ? b: (c ? d : e);
// 우측부터 결합한다. 

// = 연산자도 우측 결합

// 두개의 삼항연산자가 체이닝된 코드가 있다면 주저없이 () 로 그룹핑하여 로직을 밝히자



// 세미콜론 자동 삽입 Automatic Semicolon Insertion 
// ASI는 줄 단위로 파싱을 하닥 에러가 나면 ; 을 넣어보고 타당한 것 같으면 ; 를 삽입한다. 
// 자바스크립트 엔진이 생각보다 관대하지 않다. 

var a = 42, b 
c; 
var a = 42; 
//do{ 
//}while(a) // 세미콜론을 넣어준다. 

// ASI는 주로 break , continue, return, yield 키워드가 있는 곳에서 활약한다. 

function foo(a){
    if(!a) return // ;삽입
    a*=2; 
}

function foo(a){
    return ( 
        a * 2 + 3 / 2
    );
}

// 에러 정정 
// ASI에 전적으로 의지할 것인가. 

// 명세상으로 ASI는 에러 정정 루틴이라고 적혀있다. 
// 유효개행문자를 넣어주는 것이라고 생각하지는 말자 

// 에러 
// 일부 에러는 코드가 실행되기도 전에 컴파일 시점에 발생하도록 문법적으로 정의되어 있다. 

// 올바르지 않은 정규식
// var a = /*foo/; 
// 할당 대상에 식별자를 쓰지 않을 경우
// var a; 
// 42 = a; // 에러
// ES5 엄격모드  
// 동일한 이름의 함수 인자명
// 동일한 이름의 객체 프로퍼티 
// function foo(a,b,c) {}
// function foo(a,b,a)

// 너무 이른 변수 사용
// ES6 
// temporal Dead Zone 
// 아직 초기화를 하지 않아 변수를 참조할 수 없는 코드 영역 

{
    // a = 2; 
    // Reference Error
    let a;
}
{
    typeof a; // undefined
    //typeof b; // ReferenceError
    let b; 
}
// typeof 안전장치도 없어지는 것 참고 .. 


// 함수 인자 
// TDZ  관련 에러는 ES6 디폴트 인자값에서도 찾아볼 수 있다. 
/*
var b = 3; 
function foo(a = 42, b = a+b+5){
}
// 좌변의 b는 TDZ에 있는 b를 참조하려 하기 때문에 에러를 내뱉는다. 
*/

function foo( a= 42, b = a+1 ){
    console.log(a,b);
// undefined를 넘길때와 아무것도 없을때  차이가 있을까 없을까.. 
    console.log(
        arguments.length, a,b,
        arguments[0], arguments[1]
    );
}
foo();

//  인자에 명시적으로 아무것도 없으면, arguments 배열도 빈다. 
//  이런 불일치는 es5에서도 있었다. 

function foo2(a){
    "use strict";
    a = 42; 
    console.log(arguments[0]);
}
foo2(2); // 42
foo2(); // undefined // 연결이 안된다. 

// arguments 배열은 비 권장 요소이지만 나쁜 것은 아니다. 
// 
// 인자와 이 인자에 해당하는 arguments슬롯을 동시에 참조하지 마라 
// 
function foo(a){
    console.log(a + arguments[1]);
}
foo(10,32); // 42


// try .. finally 
// finally 절은 다른 블록 코드에 상관없이 필히 실행되어야 할 콜백 함수와 같다고 봐야 맞다. 

function foo_error() {
    try { 
        return 42; 
    }
    finally {
        console.log("Hello");
    }
    console.log("실행 될 리 없지");
}
//console.log(foo()); 
//hello
//42

// return 42 에서 함수의 완료값이 세팅된다 
// finally의 실행이 끝나고, 함수의 완료값이 반환된다. 

function foo_error() { 
    try {
        throw 42; 
    }
    finally {
        console.log('hello');
    }
}
//console.log(foo());
// hellow
// un caught exception : 42
// try 안에 throw 가 있어도 리턴과 비슷한 상황

// finally 절 안에서 예외가 던저지면 
// 이전의 실행 결과는 모두 무시한다. 

function foo_error() { 
    try {
        return 42; 
    }finally {
        
        throw "어이쿠";
        // console.log(i);
    }
}
//console.log(foo());
// uncaught exception : 어이쿠

// try안에 continue; break; 같은 비선형 제어문 역시 return과 throw 비슷하게 작동한다. 

for(var i = 0 ; i < 10 ; i++){
    try {
        continue; 
    }
    finally {
        console.log(i);
    }
}

// yield 구문은 이와 같이 작동하지 않는다. 


// finally 절의 return은 그 이전에 실행된 try 나 catch 절의 return을 덮어쓰는
// 특추한 능력을 갖고 있다. 그러나 반드시 return문을 써야 한다. 

function try_foo1(){
    try { 
        return 42; 
    }
    finally {
        // 여기 리턴이 없으면,, 이전 리턴값을 가져간다. 
    }
}


function try_foo2(){
    try { 
        return 42; 
    }
    finally {
        return ;
        // return 42 무시
    }
}

function try_foo3(){
    try { 
        return 42; 
    }
    finally {
        return "Hello";
        // return 42 무시
    }
}


// break와 finally 가 만나면 장관이다   (하지말자 이런 코드)

function foo_finally_break( ){
    bar : {
        try { 
            return 42; 
        }
        finally {
            break bar;
        }
    }
    console.log('??');
    return "Hello"
}

console.log(foo_finally_break());


// switch 
// if else 구문을 짧게 해주는 switch구문을 간략히 살펴보자 

switch(a){
    case 2: 
        break; 
    case 42:
        break;
    default:
        // 
}
/// switch 표현식과 case 표현식간에 매칭은 === 알고리즘을 따른다. 

// 동등 비교를 이용하고 싶다면 쓰는 꼼수 
var a= "42"; 
switch(true){
    case a == 10:
        console.log("10 또는 '10'")
        break;
    default: 
} 

// 논리 연산자를 쓰면 문제가 된다 
var a = "Hello world"; 
var b = 10; 

switch(true){
    case (a||b == 10):  // true 가 아닌 hello world가 반환 값 
    // case !!(a||b ==10) 을 해야 한다. 
        break;
    default:
        console.log('어이쿠');
}
// 어이쿠 

var a = 10; 
switch(a){
    case 1:
    case 2:
    default: 
    console.log('default');
    case 3:
    console.log(3);
    break;
    case 4:
    console.log("4");
}