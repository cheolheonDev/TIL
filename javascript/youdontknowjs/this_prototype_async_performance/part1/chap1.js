//왜 this를 쓸까. 
// identify() 와 speak()  두 함수는 객체 별로 따로따로 함수를 작성할 필요 없이 다중 콘텍스트 객체인
// me와 you 모두에서 재사용 할 수 있다. 

function identify(){
    return this.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, Im" + identify.call(this);
    console.log(greeting);
}

var me = {
    name : "Kyle"
};

var you  = {
    name : "Reader"
}

identify.call(me);  // KYLE
identify.call(you); // READER

speak.call(me); // Hello, I'm KYLE
speak.call(you);  // Hello, I'm READER



//// this를 안쓰고 콘텍스트 객체를 명시할 수도 잇다. 
// 하지만 객체 레퍼런스를 함께 넘기는 this체계가.API 설계상 좀 더 깔끔하고 명확하며 재사용하기 쉽다. 
// 사용 패턴이 복잡해질수록, 보통 명시적인 인자로 콘텍스트를 넘기는 방법이 this콘텍스트를 사용하는 것보다 더 지저분해진다. 

// 헷갈리는 것들 
// this에 대한 잘못된 이해들

// 1. 자기자신? 
// 함수 그 자체를 가리킨다. 

function foo(num) { 
    console.log("foo: "+ num);
    this.count++;
}
foo.count = 0; 
var i ; 
for(i=0;i<10;i++){
    if(i>5){
        foo(i);
    }
}
console.log(foo.count); // 0 ?? 
// this.count 는 함수 객체를 바라보는 것이 아니며, 근거지를 둔 객체 자체가 다르다. 
// ( 전역 count 가 1 증가한다 ) 

// this를 우회하는 방식으로 해결이 가능하고, 
// 렉시컬 식별자를 거쳐 함수 객체를 참조할 수 있다. 
// (이름 붙은 함수는 함수명 자체로 자신을 활용할 수 있다)

// 함수 이름을 활용한 방법

function foo(num){
    console.log("foo: " + num);
    foo.count++; 
}
foo.count = 0; 
var i ; 
for( i=0 ; i<10; i++){
    if(i>5){
        foo(i);
    }
}
console.log(foo.count);

// this를 피하지 않고 그대로 적용하는 방법

function foo(num){
    console.log("foo: " + num); 
    this.count++;
}
foo.count = 0; 
var i; 
for(i=0 ; i<10; i++){
    if(i>5){
        foo.call(foo, i);
        // call()함수로 호출하므로,this는 확실히 foo, 자신을 가리킨다
    }
}

// 2. 자신의 스코프
// 어떤면에서 맞지만 잘못 이해한 것
// this는 어떤 식으로든 함수의 렉시컬 스코프를 참조하지 않는다. 

// 억지로 연결통로를 만들어보려는 코드 
/*
function foo(){
    var a = 2; 
    this.bar();
}
function bar(){
    console.log(this.a);
}
foo();
*/

// 연결통로는 없다. 
// 렉시컬 스코프 사이에 어떤 연결통로를 만들어보고 싶었던 것. 

// 결론 this 는 무엇인가. 
// this는 런타인 시점에 바인딩된다. 
// 함수 호출 당시 상황에 따라 콘텍스트가 결정된다. 
// 함수 선언 위치와 상관없이 어떻게 함수를 호출했냐에 따라 정해진다. 