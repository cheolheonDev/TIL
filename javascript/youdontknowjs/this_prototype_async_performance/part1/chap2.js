// 호출부
function baz() { 
    console.log('baz'); //  호출부 : 전역
    bar(); 
}
function bar(){ 
    console.log('bar'); // 호출부 : baz
    foo();
}
function foo(){
    console.log('foo');
}
baz();

// 단지 규칙일 뿐. 
// 2.2.1 기본 바인딩
// 전역객체 ! 
function foo_2() { 
    console.log(this.a);
}
var a = 2; 
foo_2();

// 2.2.2 암시적 바인딩
// 콘텍스트 객체! 

function foo_3() { 
    console.log(this.b);
}
var obj2 = {
    b : 42, 
    foo: foo_3,
}
var obj1 = {
    b : 2, 
    obj2 : obj2
}
obj1.obj2.foo();  //42
// 콘텍스트 객체가 체이닝 된다.
// 최상위, 최하위 수준의 정보만 호출부와 연관된다. 


// 암시적 소실 
// 암시적으로 바인딩 된 함수에서 바인딩이 소실된 경우 
function foo() { 
    console.log(this.a);
}
var obj = {
    a: 2, 
    foo: foo
}
var bar = obj.foo;
var a = '엥 전역이네 '
bar(); 

// bar는 foo를 가리키는 또 다른 레퍼런스 변수일뿐.. 
// 기본 바인딩이 적용된다.

// 콜백을 할지라도 
function foo() { 
    console.log(this.a);
}
function doFoo(fn){
    fn(); // fn은 foo의 또 다른 레퍼런스 변수일뿐..
          // 기본 바인딩이 적용된다.
}
var obj = {
    a:2, 
    foo: foo
}
var a = '엥, 전역이네';
doFoo(obj.foo)


// 내장함수에게 콜백을 넘겨줄때도 
// 결국 기본 바인딩이 적용된다.
function foo(){
    console.log(this.a);
}
var obj = {
    a: 2, 
    foo: foo, 
}
var a = '엥, 전역이네';
setTimeout(obj.foo, 100); 

// 2.2.3 명시적 바인딩 
// 함수 레퍼런스 프로퍼티를 객체에 더하지 않고 this를 명시적으로 바인딩 하는 방법
// call과 apply 메서드  // explicit  binding

function foo() { 
    console.log(this.a);
};
var obj = {
    a:2
};
foo.call(obj);
// 원시 값을 넘긴다면, 객체 레퍼가 덮여씌워진다. 

// 하드 바인딩
function foo() { 
    console.log(this.a);
}
var obj = {
    a : 2
}
var bar = function() { 
    foo.call(obj);
}
bar.call(window) // 2 
// 하드 바인딩 된 bar에서  재정의된 this 는 의미가 없다. 

//  하드 바인딩 패턴 1. 
function foo(something){ 
    console.log(this.a, something); 
    return this.a + something;
}
var obj = {
    a : 2
}
var bar = function() { 
    return foo.apply(obj, arguments);
}
var b = bar(3) ; 
console.log(b);

// 하드 바인딩 페턴 2 
// 재사용가능한 헬퍼 함수를 쓰는 것도 같은 패턴이다. 

function foo(something){ 
    console.log(this.a, something);
    return this.a + something;
}
function bind(fn, obj){
    return function() { 
        return fn.apply(obj, arguments);
    }
}
var obj = {
    a : 2
};

var bar = bind(foo, obj);
var b = bar( 3 );
console.log(b);
// Function.prototype.bind도 이와 같이 구현되어 있다. (ES5)


// API 호출 콘텍스트
// 라이브러리 함수와 자바스크립트 언어 및 호스트 환경에 내장된 여러 함수는 
// 컨텍스트라 불리는 선택적인 인자를 제공한다. 
// bind함수를 써서 콜백 함수의 this를 지정할 수 없는 경우를 대비한 일종의 예비책

function foo(el){ 
    console.log(el, this.id);
}
var obj = {
    id: '멋진 남자'
}
[1,2,3].forEach(foo, obj);

// 2.2.4 new 바인딩

// 자바스크립트에서 생성자는 단지, 앞에 new 연산자가 붙어 있을때 호출되는 일반 함수에 불과하다. 
// constructor Call 이라기보다 construction calls of functions

//  new의 진행과정
//  새 객체가 만들어진다. 
// 새로 생성된 객체의 프로토타입이 연결된다. ([[prototype]])
// 새로 생성된 객체는 해당 함수 호출 시 this로 바인딩된다. 
// 이 함수가 자신의 또 다른 객체를 반환하지 않는 한 new와 함께 호출된 함수는 자동으로 새로 생성된 객체를 반환한다. 

// 2.3 모든건 순서가 있는 법
// 명시적 바인딩이 암시적 바인딩보다 우선순위가 높다. 

function foo() { 
    console.log(this.a);
}
var obj1 = {
    a: 2, 
    foo: foo, 
}
var obj2 = {
    a: 3, 
    foo: foo, 
}
obj1.foo(); 
obj2.foo();
obj1.foo.call(obj2);
obj2.foo.call(obj1);

// 암시적 바인딩이 new 바인딩보다 우선순위가 높고 new로 오버라이드 할 수 없다 
// 

function foo(something){
    this.a = something; 
}
var obj1 = {}; 
var bar = foo.bind(obj1);
bar(2);
var baz = new bar(3); 
console.log(obj1.a); // 2
console.log(baz.a); // 3


//  bind 함수의 폴리필 
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function') {
        // ECMAScript 5 내부 IsCallable 함수와
        // 가능한 가장 가까운 것
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }
  
      var aArgs   = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP    = function() {},
          fBound  = function() {
            return fToBind.apply(this instanceof fNOP
                   ? this
                   : oThis,
                   aArgs.concat(Array.prototype.slice.call(arguments)));
          };
  
      if (this.prototype) {
        // Function.prototype은 prototype 속성이 없음
        fNOP.prototype = this.prototype;
      }
      fBound.prototype = new fNOP();
  
      return fBound;
    };
  }

//  this 확정 규칙  ( 1번이 가장 높음)
// 1. new 로 함수를 호출했는가. 맞으면 새로 생성된 객체가 this 다
// 2. call과 apply로 함수를 호출했는가. bind 하드 바인딩.. 내부에 숨겨진 형태로 호출됬는가. 
// 3. 함수를 콘텍스트, 객체를 소유 또는 포함하는 형태로 호출했는가? 
var bar = obj1.foo();
// 4. 그 이외의 경우에는 this는 기본값 (엄격 -> undefined, 비엄격 -> 전역객체)

// 2.4 바인딩 예외 
// 
// this 무시 
// call, apply , bind 메서드에 null, undefined를 넘긴 경우
// 커링 같은 일을 위해 null을 첫번째 인자로 할 수 있다. 

// 더 안전한 this 
// DMZ 객체.. 내용이 하나 없으면서,  ø (option o )
// var ø  = Object.create(null);

// 혹여 전역 객체를 더럽힐 가능성을 줄인다. 

// 간접레퍼런스 
// 의도적이지 않았더라도 간접 레퍼런스가 생성되는 경우..
// 함수를 호출하면 무조건 기본 바인딩 규칙이 적용되어 버린다. 

function foo() { 
    console.log(this.a);
}
var a = 2; 
var o = {a:3, foo:foo};
var p = {a:4};
o.foo(); 
(p.foo = o.foo)()
// 결과값은 원함수의 레퍼런스인 foo 다



// 2.4.3 소프트 바인딩
// 암시적/ 명시적 바인딩 기법을 통해 임의로 this 바인딩을 하는 동시에 전역객체나 undefined가 아닌 다른 기본 바인딩
// 값을 지니도록 하자 
// this를 obj2나 obj3로 수동 바인딩 할 수 있고 기본 바인딩 규칙이 적용되어야 할 땐 다시 obj로 되돌린다. 
// 

if(!Function.prototype.softBind){
    Function.prototype.softBind = function(obj){
        var fn = this; 
        var curried = [].slice.call(arguments,1);
        var bound = function() { 
            return fn.apply(
                (!this || this===(window||global))? obj: this,
                curried.concat.apply(curried, arguments)
            );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    }
}

function foo() { 
    console.log("name:" + this.name); 
}
var obj = {name: "obj1"}; 
var obj2 = {name: "obj2"};
var obj3 = {name: "obj3"};

var fooOBJ = foo.softBind(obj);
fooOBJ();// name: obj
fooOBJ.call(obj3); // name: obj3

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2

// 2.5 어휘적 this
// 화살표 함수는, (Fat Arrow)
// 4가지 표준 규칙 대신 에두른 스코프를 보고 this를 알아서 바인딩한다. 

function foo() {
    return (a) => {
        console.log(this.a); // 여기서 this는 어휘적으로 foo()에서 상속된다. 
    }
}
var obj1 = {
    a:2
}
var obj2 = {
    a:3
}
var bar = foo.call(obj1);
bar.call(obj2);  // 2 
// 결과 값이 3이 아닌 것을 주의 

// ES6이전에도 화살표 함수의 기본 기능과 크게 다르지 않은, 나름대로 많이 쓰이던 패턴이 있었다. 
// self = this.. 

// 렉시컬 스코프만 응용하고 this 스타일,의 코드는 접어둔다. 
// bind()까지 포함하여 완벽한 this 스타일의 코드를 구사한다. 
// 두가지 중에 하나만 선택해서 하자  


