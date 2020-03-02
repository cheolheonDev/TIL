// 구문
//  선언적 형식 
var value = 1; 
var myObj = {
    key: value 
}
// 생성자 형식
var myObj = new Object(); 
myObj.key = value;

// 타입
// 객체의 7가지 주요 타입 ( Language Types )
// null, undefined, boolean, number, string, object, symbol

// 단순원시타입 simple Primitives
// string, number, boolean, null, undefined
// 객체가 아니다. 자바스크립트는 모든 것이 객체다 라는 말은 옳지 않다. 

// 복합원시타입 complex Primitives
// function , object,  array
// 자바스크립트의 함수는 기본적으로는 객체이므로 일급이다. 
// 일급객체 - 다른 함수에 인자로 전달할 수 있고, 다른 함수로부터 함수를 반환받을 수 잇으며 함수 자체를 변수에 할당하거나 
// 구조에 저장할 수 있다. 

// 내장 객체 
// 내장 객체라고 부르는 객체 하위 타입도 있다. 
// 단순 원시 타입과 직접 연관되어 보이지만 실제 관계는 뜻밖에 복잡하다
//
// String
// Number
// Boolean
// Object
// Function
// Array
// Date
// RegExp
// Error

// 진짜 타입처럼 보이는데다,, 클래스 처럼 여기지지만, 
// 자바스크립트의 내장 함수일뿐.. 생성자로 사용되어 주어진 하위 타입의 새 객체를 생성한다. 

var strPrimitive = '나는 문자열이야';
typeof strPrimitive;               // string
strPrimitive instanceof String;    // false

var strObject = new String('나는 문자열이야');
typeof strObject;                  //  object
strObject instanceof String;       // true
console.log(Object.prototype.toString.call(strObject)); // [object String]
console.log(Object.prototype.toString.call(strPrimitive));

//  되도록 생성자 형식은 지양하고 리터럴 형식을 사용하라고 적극 권장한다. 

// 문자열이나 숫자값은 원시값에 대해서 프로퍼티/메서드를 호출하면 자동으로 강제 변환한다. 
// null, undefined 는 그 자체로 유일 값, 
// date 값은 리터럴 형식이 없어서 반드시 생성자 형식으로 생성해야 한다. 

// 추가 형식이 필요할때만 생성자 형식을 사용하자

// Error 객체는 예외가 던져지면 알아서 생성되니..  명시적으로 생성할 일은 드물다

// 3.3. 내용
// 엔진이 값을 저장하는 방식은 구현 의존적이다. 
// 객체 컨테이너에는 값이 있는 곳을 가리키는 포인터 역할을 담당하는 프로퍼티 명이 담겨있다. 

// [" "] 구문은 - UTF8/ 유니코드 호환 문자열이라면 모두 프로퍼티 명으로 쓸 수 있다는 점에서 차이가 있다. 
// 객체 프로퍼티명은 언제나 문자열이다. 문자열 이외의 다른 값을 쓰면 우선 문자열로 변환된다. 

// 공연히 객체와 배열 사이에 숫자를 써서 헷갈리는 코드를 만들지 않도록 하자 

// 계산된 프로퍼티명 
// es6부터 추가된 기능

var prefix = "foo"; 
var myObject = {
    [prefix + "bar"]: "hello", 
    [prefix+ "baz"]: "world", 
};
myObject["foobar"]; // hello
myObject["foobaz"]; // hello

// 심볼에서 가장 많이 사용하 값이다. 
// 불분명하고 예측 불가능한 값을 지닌다.

/*
var myObject = {
    [Symbol.Something]: "hello world"
}
*/

// 프로퍼티 / 매서드
// 객체에 속하기 때문에 매서드라고 칭하는 건 그 의미를 지나치게 확대해 해석한 것이다.
// 객체와는 기껏해야 간접적인 관계일 뿐
// 모두 같은 함수를 가리키는 개별 레퍼런스 일뿐 
// 함수와 매서드는 서로 바꿔 사용할 수 있다. 

// 배열 
// 숫자 인덱스 양수로 표기된 위치에 값을 저장한다. 
// 프로퍼티를 추가하는 것도 가능하다, 하지만 배열 길이에는 변함이 없다. 

//  키값 저장소로는 객체, 숫자 인덱스를 가진 저장소로는 배열을 쓰는게 좋다. 

// 객체 복사 
// duplicate 
// 

function anotherFunction(){}
var anotherObject = {
    c: true
};
var anotherArray = []; 
var myObject = {
    a:2, 
    b:anotherObject,
    c:anotherArray,
    d:anotherFunction
};
anotherArray.push(anotherObject, myObject);
// 깊은 복사를 할 경우 환형 참조로 인해 무한 복사의 구렁텅이에 빠지게 된다. 
// 이 난관은 뾰족한 답이 아직까지 없었다. 

// 대안 
// 1.JSON 안전한 객체 
// JSON 안전한 객체는 쉽게 복사할 수 있다. 

// var newObj = JSON.parse(JSON.stringify(someObj));

// 얕은 복사는 별 문제가 없기 때문에 
// es6..Object.assign()매서드 를 활용하자
//  (타깃객체, 소스객체1, .. 2, ...)
// 열거 가능한 것 (Enumerable) 과 보유키 (Owned Keys)를 순회하면서 타깃 객체로 복사한다.


// 프로퍼티 서술자 
// 읽기 전용 Read-Only 와 같은 프로퍼티의 특성을 자바스크립트 코드로 직접 구별하거나 확인할 방법이 없었다. 
// 프로퍼티 서술자로 표현된다. es5부터.. 

var myObject = {
    a:2
};
console.log(Object.getOwnPropertyDescriptor(myObject, "a"));
// property Desciptor

// Object.defineProperty()로 
// 새로운 프로퍼티를 추가하거나
// 기존의 프로퍼티의 특성을 원하는 대로 수정할 수 있다. 

// 쓰기가능 여부 wirteable
var myObject = {}; 
Object.defineProperty(myObject, "a", {
    value: 2, 
    writable: false, 
    configurable: true, 
    enumerable: true
});
myObject.a = 3; 
console.log(myObject.a)// 2
// 엄격모드에서는 TypeError가 발생한다. 
// no-op세터를 설정한 것과 같다. 
// 

// 설정가능 여부 configurable 
// true이면, defineProperty로 프로퍼티 서술자를 변경할 수 있다. 
// false가 되면 돌아올 수 없는 강을 건너게 되어, 절대로 복구되지 않으니.. 주의하자 
// (한가지 예외상황 configurable - false 에서 writable 은 true -> false로 에러 없이 변경할 수 있다.(이것도 가면 못돌아온다))

// configurable false이면 이미 존재하는 프로퍼티 삭제도 금지된다. 
// delete로 지우려 해도 조용히 실패한다. 

delete myObject.a;
// delete를 할당된 메모리를 해제할때 사용하는 도구처럼 사용하면 안된다. 

// 열거가능성 enumerable
// for .. in 루프에서 해당 프로퍼티의 표출 여부를 나타낸다. 
// 보통 사용자 정의 프로퍼티는 enumerable: true가 기본 값이어서 열거할 수 있다. 

// 불변성 
// es5부터는 얕은 불변성 (Shallow Immutability)만 지원한다. 
// 객체 자신과 직속 프로퍼티 특성만 불변으로 만들 뿐, 다른 객체를 가리키는 레퍼선스가 있을때 해당
// 내용까지 불변으로 만들지는 못한다. 

// 예) 
// myImmutableObjact.foo.push(4); <- 가능 


// 객체 상수 
// writable: false , configurable:false

// 확장 금지  // 더 프로퍼티를 추가하지 못하게 차단
// Object.preventExtensions(myObject); 

//봉인 
// Object.seal() 봉인된 객체를 생성한다. 
//  전부 configurable: false.. 프로퍼티를 추가 할 수 없고 기존 프로퍼티를 재설정 삭제 할수 없다. 
// 물론 값은 언제든지 바꿀수 있다. 

//동결
// Object.freeze() 
// Object.seal()을 적용하고 데이터 접근자 프로퍼티를 모두 writable:false처리해서 값도 못바꾸게 한다.
// 가장 높은 단계의 불변성.. 
// 해당 객체가 참조하는 모든 객체를 재귀 순환하면서 깊숙이 동결한다. .. 주의해야 한다. 

// 3.3.7 GET 
// 프로퍼티에 접근하는 세부 과정을 살펴보자. 

var myObject = {
    a:2
};
myObject.a;

// 누가 봐도 프로퍼티 접근이지만, a라는 이름의 프로퍼티를 myObject에서 찾는것이 아닌
// myObject에 대해 [[GET]] 연산을 한다. 
myObject.b; // undefined
// 현재까지는 프로퍼티가 있는데 undefined값을 가지고 있는지 
// 프로퍼티가 없는건지 구분이 안된다. 

// 3.3.8 PUT 
// 객체에 값을 할당하는 일 생각보다 복잡한 알고리즘
// 이미 존재하는 프로퍼티에 대해 대략 다음의 확인 절차를 밟는다. 

// 1. 프로퍼티가 접근 서술자인가? 맞으면 세터를 호출한다. 
// 2. 프로퍼티가 writable: false 인 데이터 서술자인가. 
// 3. 이외에는 프로퍼티에 해당 값을 세팅한다. 

// 3.3.9 게터와 세터 (ES5) 
// // 게터/세터는 실제로 값을 가져오는/세팅하는 감춰진 함수를 호출하는 프로퍼티다. 
// 프로퍼티가 게터 세터 어느 한쪽이거나 게터/세터가 될 수 있게 정의한 것을 '접근 서술자'라고 한다.

var myObject  = {
    // a 의 게터를 정의한다. 
    get a() { 
        return 2;
    }
}
Object.defineProperty(
    myObject,
    "b", 
    {
        get: function(){ return this.a*2;},
        enumerable: true
    }
);
myObject.a; //2
console.log(myObject.b); //4

// myObject.a = 3; 
// console.log(myObject.a) // 2
// 게터가 2만 반환하게 되어 있어서 세팅은 있으나 마나다.

// 3.3.10 존재확인
var myObject = {
    a: 2
}
"a" in myObject
"b" in myObject
// in 연산자는 prototype연쇄를 쫓아 올라간다

myObject.hasOwnProperty("a"); // true
myObject.hasOwnProperty("b"); // false

// hasOwnProperty는 prototype 연쇄는 찾지 않는다. 
// Object.prototype과 연결되지 않은 함수에서는
Object.prototype.hasOwnProperty.call(myObject, "a");
// 이렇게 확인할 수 있다. 

//  열거 

var myObject = {}; 
Object.defineProperty(
    myObject,
    "a",
    {enumerable: true, value: 2}
)
Object.defineProperty(
    myObject, 
    "b",
    {enumerable:false, value:3}
)
myObject.b;//3
"b" in myObject // true
myObject.hasOwnProperty("b"); // true;
for( var i in myObject){
    console.log(i, myObject[i]);
}
// "a" 2

// myObject.b 는 실제 존재하는 프로퍼티로 그 값에 접근할 수 있지만, 
// for .. in 루프에서는 자취를 감춰버린다. 

myObject.propertyIsEnumerable("a"); // true
myObject.propertyIsEnumerable("b"); // false

Object.keys(myObject); //  ["a"]
Object.getOwnPropertyNames(myObject); // ["a", "b"]
// keys() , getOwnPropertyNames() 는 둘다 prototype연쇄는 찾지 않는다.
// in처럼 결과가 동일한.. 프로퍼티 전체 리스트를 조회하는 기능은 없다. 아직까지는

// 순회
var myArr = [1,2,3]; 
for(var i = 0; i < myArr.length; i++){
    console.log(myArr[i]);
}
// 1 2 3 

// es5 부터 도입된 배열 관련 순회 헬퍼들
// forEach, every(), some()

// forEach, 반환값 무시 
// every, false값을 반환할때까지 순회
// some, treu값을 반환할때까지 순회
// 이런 반환값을 사용하여 break처럼 순회를 일찌감치 끝낼 수 있다. 

//for .. in 루프를 이용한 객체순회는 간접적이다. ( 인덱스를 받고 이를 통해 값을 연결)

//배열 인덱스가 아닌 값을 직접 순회하기 
// for ... of 
var myArray = [1,2,3]; 
for(var v of myArray){
    console.log(v);
}

// 순회할 원소의 iterator Object가 잇어야 한다. 
// 배열은 @@iterator가 내장된덕분에 손쉽게 for... of 루프를 사용할 수 있다. 

var myArray = [1,2,3]; 
var it = myArray[Symbol.iterator]();
it.next(); // {value: 1, done: false}
it.next();
it.next(); // {value: 3}
it.next(); // {done:true}

// 일반 객체는 내부에 @@iterator가 없다. 
// 앞으로 등장할 새로운 타입의 객체에서 문제의 소지가 될 수 있다는 점을 생각하면 다행이다. 

var myObject = {
    a: 2, 
    b: 3
};
Object.defineProperty(myObject, Symbol.iterator, {
    enumerable: false, 
    writable: false,
    configurablee: true, 
    value : function() {
        var o = this;
        var idx = 0; 
        var ks = Object.keys(o); 
        return {
            next : function() {
                return {
                    value : o[ks[idx++]],
                    done : (idx > ks.length)
                }
            }
        };
    }
});

var it = myObject[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
for (var v of myObject){
    console.log(v);
}
//2 
//3

// 임의의 복잡한 순회 알고리즘을 정의할 수도 있다. 
// 만약 픽셀 객체의 리스트가 있다면, 직선거리에 따라 순회 순서를 결정하거나. 걸러내는 등의 작업을 할 수 있다. 

// {value: } 형태의 반환값을 반환하고 
// 순회 가 끝나면 {done:true}를 반환한다는 가정하에 ..for .. of로 순회 가능하다. 



