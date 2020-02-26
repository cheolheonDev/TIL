// 강제 변환? 
// type casting - 명시적
// Coercion - 강제변환 (암시적)

var a = 42; 
var b = a + ""; 
var c = String(a); 

// 추상 연산
// 기본 규칙을 알아보자 

// toString 

// 원시값은 본연의 문자열 값이 정해져 있다. 
// null -> "null"
// undefined -> "undefined"
// true -> "true"
// 숫자는 문자열로 바뀌고 너무 큰 숫자는 지수 형태로 바뀐다. 
// 일반 객체는 [[Class]] 프로퍼티를 반환한다. 
// toString 이 있을 경우 그 반환값이 반환된다. 
 
var a = [1,2,3]; 
a.toString(); 

// JSON.stringify() 

// 대부분 단순값들은 toString 과 동일한 로직

// JSON-Safe Value 
// JSON 표현형으로 확실히 나타낼 수 있는 값

// JSON-Safe Value가 아닌 것들 , 심벌, undefined, 함수, 환형 참조 객체 
// 인자 중에 있으면 값을 누락시키며, 배열에 포함되어 있으면 null,  객체 프로퍼티에 있으면 간단히 지워버린다. 

console.log(
    JSON.stringify(
        {a:2, b: function(){}}
    )
);


// toJSON // 문자열 표현형을 반환하지 않는다.. 적절한 평범한 실제 값을 반환한다. // JSON-safe value 만 포함한 

// 옳은 경우 
var a = {
    val : [1,2,3],

    toJSON : function(){
        return this.val.slice(1);
    }
}

// 틀린 경우 
var b = {
    val : [1,2,3], 

    toJSON: function(){
        return "[" + this.val.slice(1).join()+"]"; 
    }
}

JSON.stringify(a);  // "[2,3]"
JSON.stringify(b);  // ""[2,3]""


// JSON stringify의 인자들 
// 두번째 인자 
// - 배열 - 각 원소가 문자열, 객체 직렬화 대상 프로퍼티 명
// - 함수 - 객체 자신에 대해, 그 다음은 각 프로퍼티 별로, 매번 키와 값 두 인자를 전달한다. 

var a = {
    b: 42, 
    c: "42", 
    d: [1,2,3],
    e: undefined
}

console.log(JSON.stringify(a,["b", "c"]));
console.log(JSON.stringify(a, function(k,v){
    if(k!== "c") return v; 
}));

// 세번째 인자 
// 숫자면 들여쓰기 공간
// 문자면.. 

console.log(JSON.stringify(a, null, 3));
console.log(JSON.stringify(a, null, '----'))

// JSON.stringify()에 전달한 객체가 자체 toJSON을 갖고 있다면, 문자열화 전 toJSON()이 자동으로 호출되어 
// JSON안전값으로 강제변환된다. 

// ToNumber
// true -> 1
// false -> 0
// undefined -> NaN
// null -> 0 

// 변환이 실패하면 NaN
// 0이 앞에 붙어도 10진수로 처리한다. (숫자 리터럴 문법과 차이점)
// 원시 값으로 바꾸기 위해, 
// 1. 객체가 valueOf()매서드를 구현했는지 확인한다. 
// 2. valueOf를 쓸 수 있고 반환 값이 원시 값이면 그대로 강제 변환
// 3. 그렇지 않다면 toString (); 

var a = {
    valueOf : function(){
        return "42"; 
    }
}

var b = {
    toString : function(){
        return "42"; 
    }
}

var c = [4,2]; 
c.toString = function(){
    return this.join("");
}

console.log(Number(a));
console.log(Number(b));
console.log(Number(c));
console.log(Number(""));
console.log(Number([]));
console.log(Number(["abc"]));

// toBoolean
// 자바스크립트에서는 true, false , 숫자와 별개다 

// falsy한 값, 나머지는 모두 변환하면 true
// undefined
// null
// false
// +0, -0, NaN
// "" 

// falsy한 객체는 무엇인가 ?? 

var a = new Boolean(false); 
var b = new Number(0); 
var c = new String("");

var d = Boolean(a && b && c)  // true 


// if(document.all) // 비표준 ie를 감지하던 코드 
// 요즘 ie에서 이를 넘어가게 하기위해서.. document.all을 falsy한 객체로

// truthy 값을 외워버리자 

////// 명시적 강제변환 

var a = 42; 
var b = String(a); 
var c = "3.14"; 
var d = Number(c); 

// 또 다른 명시적 강제 변환 형식 
// 오픈 소스 커뮤니티 버젼 

var e = +c; 

// 단항연산자를 다른 연산자와 인접하여 쓰지 않도록 주의하자 

// 날짜를 숫자로

var d = new Date(); 

// 다음도 가능
console.log(+d);

// 그러나 이게 더 명시적이다. 
// Date.now()를 쓰자 // es5추가 버젼
console.log(new Date().getTime())

if(!Date.now){
    Date.now = function() {
        return +new Date();
    }
}


// ~연산  
// 자바스크립트에서 비트 연산은 toInt32연산을 거친후 적용된다. 
0 | -0; 
0 | NaN;
0 | Infinity ; 0; 
0 | -Infinity ; 

// 특수한 숫자는 0 
// 0 |  __   이 연산은  toInt32의 명시적? 
// -x의 값은 -(x+1)과 같다

// ~의 용도 !!! 
// indexOf()의 리턴 값으로 .. -1일때 유일하게 falsy한 값이 되게 할 수 있다. 

var a = "Hello world"; 
if(!~a.indexOf("ol")){
    console.log('찾았다');
}

// 비트 잘라내기 
// ~~를 Math.floor 대용으로 사용하곤 한다. 
//주의 할 점

Math.floor(-49.6) // -50
~~49.6; // -49 

// 명시적 강제변환 : 숫자 형태의 문자열 파싱

var a = "42";
var b = "42px"; 

Number(a); 
parseInt(a); 
Number(b);  // NaN
parseInt(b);  // 42


// parseInt 의 함정 
// 인자가 비 문자열이면 문자열로 강제변환한다. -> 일종의 감춰진 암시적 강제변환으로 비 문자열 값을 넘기지 말자
// 첫번째 문자로 기수를 추정한다 (es5 이전 버젼에서)
// 0 같은 숫자가 들어오면 8진법으로 추정한다. 

// 예) .. var hour = parseInt(selectedHour.value , 10); 

// es5이후에는 10진수로 처리한다. 

parseInt(1/0, 19) // 18
// 문자열을 넘기지 말자.. 
// 인자 값을 강제로 문자열로 바꾼 다음 파싱을 시작한다. 

// 명시적 강제변환 : 불리언

var a = "0"; 
console.log(Boolean(a)); 

var a = "0"; 
console.log(!!a);


var a = 42; 
var b = a? true : false;
// 명시적으로 암시적 ?? 일단 a를 불리언으로 강제변환해야 하기 때문
// 얻을 것이 없다. 
Boolean(a);
!!(a);

// 암시적 변환 
// 단순화시킨 타입변화 코드가 세세한 구현부를 추상화하거나 감추는데 도움이 된다고 생각한다. 

// 암시적 강제변환 : 문자열 <-> 숫자
// + 연산자

var a = "42"; 
var b = "0"; 
var c = 42; 
var d = 0; 

console.log(a+b); 
console.log(c+d);

// 한 쪽 또는 양쪽이 문자열이 아닌지에 따라 연산? 
// 잘못알고 있다. 

var a = [1,2]; 
var b = [3,4]; 
console.log(a+b);

// 암시적 강제 변환의 사례

var a = 42; 
var b = a + ""; 
console.log(b);

var a = {
    valueOf : function () {return 42;},
    toString: function() {return 4;}
}

//  String(a) = >  toString()을 직접 호출
// a+" " => ToPrimitive 연산과정에서 valueOf()메서드에 전달하여 호출하고 
// ToString 추상연산을 하여 최종적인 문자열로 반환된다. 

console.log(a+"")
console.log(String(a))

// valueOf , toString 메서드를 직접 구현한 객체가 있으면 강제 변환 과정에서 달라질 수 있다. 


// 암시적 강제변환 :불리언 -> 숫자 

// 불리언 로직을 단순한 숫자 덧셈 형태로 단순화 할때 좋은 경우가 있다. 
// 세 인자중 정확히 하나만 true인지 확인할때

function onlyOne(a,b,c){
    return !!((!a&&!b&&!c) || (!a&&b&&!c) || (a&&!b&&!c));
}
var a = true; 
var b = false; 
console.log(a,a,b);
console.log(a,b,b);

function onlyOne2(){
    var sum = 0; 
    for (var i = 0; i < arguments.length; i++){
        if(arguments[i]){
            sum += arguments[i];
        }
        /// 이 코드의 문제점,, NaN, undefined를 넘겨 받는다면 
    }
    return sum === 1;
}

var a = true;
var b = false; 
console.log(onlyOne(a,b,b));
var z
console.log(z);
console.log(onlyOne(a,b,z,c));
console.log(onlyOne(NaN,a,b,NaN));

// 강제 형변환 버젼.. 
function onlyOne3(){
    var sum = 0; 
    for( var i = 0; i < arguments.length; i++ ){
        sum += Number ( !!arguments[i]);
    }
    return sum === 1; 
}
// 후자는 쓸데없이 장황한 느낌이 아닌가? 


// 암시적 강제변환 -> 불리언 
// 불리언으로 강제 변환이 일어나는 표현식

// 1. if ( ... ) 조건 표현식
// 2. for (   ; ... ; )  조건 표현식
// 3. while( ... )  do {} while( .... ) 조건 표현식 
// 4. ? : 삼항 연산 시 첫 번째 조건 표현식
// 5. || &&의 좌측 피연산자 

var a = 42; 
var b = "abc"; 
var c = undefined; 
var d = null; 

if(a) { 
    console.log("넵"); 
}
while(c){
    console.log('실행되지 않음');
}

c = d? a:b; 
// c = b;

if((a&&d)|| c){
    console.log('넵');
}

// && 와 || 연산자 
// 논리 연산자라기 보다는 피연산자 선택 연산자 
// 결과값은 두 피연산자 중 한쪽의 값이다. 

var a = 42; 
var b = "abc"; 
var c = null; 
var d = undefined
a || b; // a 
a && b; // b 
c || b; // b 
c && b; // null
console.log(c||d)


function foo(a,b){
    a = a || "hello"; 
    b = b || "world"; 
    console.log(a + " " + b); 
}
foo(); 
foo('oh ',' aaa');
// a || ...  이 관용코드를 쓸때에는 falsy값은 무조건 뛰어넘는다는 것을 주위하자


// short Circuiting
// a가 truthy일때만 foo()표현식이 실행된다. (압축기에서 자주 활용되는 패턴)
var a = 42; 
a && foo();

var a = 42; 
var b = null;
var c = "foo"; 

if( a && (b||c) ){
    console.log('넵');
}

//그렇다면 if .. for 루프에서는 어떻게 작동한 것인가..
// a&&(b||c) 표현식의 실제결과는 c의 값인 foo
// 'foo'를 불리언타입으로 강제 변환한것 


// 심벌의 강제변환 
// 심벌의 강제변환은,, 암시적 강제변환은 금지되었다. 

var s1 = Symbol("좋아"); 
console.log(String(s1));
// console.log(s1+"") // typeError

// 심벌을 강제변활할 일은 정말 드물것이다. 

// 느슨한 / 엄격한 동등 비교  ==  === 
// == 는 값의 동등함을 
// === 값과 타입 모두의 동등함을 비교한다 ?? -> 정확하진 않다. 

// 동등함 비교시 == 는 강제변환을 허용하지만,  ===은 강제 변환을 허용하지 않는다. 

// 비교성능
// 동등 비교에서 성능은 중요한 포인트가 아니다. 
// 강제변환이 필요하다면 느슨한 동등연산자를 필요하지 않다면 엄격한 동등연산자를 필요하자 

// 추상 동등 비교 
// 모든 가능한 타입별 조합마다 강제 변환을 어떻게 수행하는지 그 방법이 적혀있다. 

// 타입이 같은 경우 
// 값을 비교한다 
// 예외 - NaN : 자기 자신하고도 동등하지 않다. 
// +0 -0이 동등하지 않다. 

console.log(+0 == -0);

// 객체의 동등비교에 있어서도 == 와 === 은 똑같다. 
// 두 객체가 정확히 똑같은 값에 대한 레퍼런스 일 경우에만 동등하다 

var a = [1,2,3]; 
var b = a; 
var c = [1,2,3];

console.log('객체의 동등비교');
console.log(a==b)
console.log(a==c);
console.log(a===b);
console.log(a===c);

// != , !==은 동등 비교후 그 값을 부정한 값이다. 

// 비교하기 문자열 -> 숫자 
var a = 42;
var b = "42"; 
a == b // true
a === b // false 

// type x 가 Number고 type y가 String이면 x == ToNumber(y) 비교 결과를 반환한다. 
// type x 가 String이고 type y가 Number이면 ToNumber(x) == y 비교 결과를 반환한다. 

// 비교하기 -> 불리언

var a = 42; 
var b = true; 
a == b // false
// 결과???
// type x 가 불리언이면 toNumber(x) == y 를 반환한다. 
// type y 가 불리언이면 x == toNumber(y) 를 반환한다. 

// "42" 값의 truthy falsy여부는  == 연산과 무관하다. 
///////////////////
// == true, == false 
// 같은 코드는 쓰지 말라고 개인적으로 강권하고 싶다. 

// 비교하기 null -> undefined

// x가 null이고 y가 undefined이면 true 를 반환한다. 
// x가 undefined이고 y가 null이면 true 를 반환한다.

var a= null 
var b; 
a == b; 
a == null; //true
b == null; //true
a == false; //false
a == true;//false
b == false; //false
a == ""; 
b == ""; 
a == 0; 
b == 0;

// 어떤 다른 값도 비교 결과 긍정 오류를 할 가능성이 없다. 
var a = (()=>{})();
if( a == null){

}
// undefined , null의 경우에만.. true다 !! 
// 다음과 같은 코드 보다 가독성 좋고 안전하다. 
if( a === null || a === undefined){
}

// 객체 -> 비객체

// type x 가 string또는 number이고 type y가 객체라면 x == ToPrimitive(y) 의 비교 결과를 반환한다 
// type x 가 Object이고 type y가 String 또는 Number라면 ToPrimitive(x) == y 의 비교 결과를 반환한다. 
var a = 42; 
var b = [42]; 
a == b // true; 
//console.log(Number([42,42])) // NaN

///// 앞에 ToPrimitive 참고  
///ToPrimitive 연산과정에서 valueOf()메서드에 전달하여 호출하고 
// ToString 추상연산을 하여 최종적인 문자열로 반환된다.
////

// 박싱 언박싱.. 
var a = 'abc'; 
var b = Object(a);
console.log(a === b);
console.log(a == b); // true;

// == 알고리즘에서 더 우선하는 규칙때문에 그렇지 않은 경우들

var a = null ;
var b = Object(a);  // Object();
a == b // false; 
var a = undefined ; 
var b = Object(b); // Object();
a == b // false;
var e  = NaN;
var f = Object(e); // new Number(e)
e == f // false; 

// null undefined 객체 래퍼가 없으므로 박싱할 수 없다. 
// 그냥 일반 객체가 생성된다. 

// NaN은 객체 래퍼인 Number 로 박싱되지만..  NaN == NaN이 되어 false다

// 휘귀사례

// 프로토타입을 변경하는 재앙 
/*
Number.prototype.valueOf = function(){
    return 3; 
}
new Number(2) === 3; 

var i = 2;   

Number.prototype.valueOf = function(){
    return i++; 
}
var a = new Number(42);
if(a == 2 && a == 3){
    console.log('???')
}
*/


// falsy 비교들 
"0" == null ; // false
"0" == undefined // false
"0" == false // true  ???
"0" == NaN; // false
"0" == 0 // true
"0" == "" //false

false == null ; // false
false == undefined; // false
false == NaN;  // false
false == 0; // true ???
false == ""; // true ???
false == []; // true ???
false == {}; // true ???


"" == null ; // false
"" == undefined ; // false
"" == NaN; //false;
"" == 0 ; // true; ???
"" == []; // true; ???
"" == {}; // false; 


0 == null; // false
0 == undefined; // false
0 == NaN // false
0 == [] // true ???
0 == {} // false 

// 긍정오류... (false라고 생각되는데 true인 경우)

[] == ![]; // ??
// ! toBoolean ...명시적 강제변환
// [] == false

2 == [2] ; // true; 
"" == [null] ; // true; 

// [2] , [null] 우변의 [2] [null]은 ToPrimitive가 강제 변환을 하여 
// 좌변과 비교 가능한 원시 값으로 바꾼다. 2 와 " " 

// 마음에 안들 수 있지만, 마음에 안드는 것은 강제변환이 아니라. 
// ToPrimitive이 수행하는 로직이 싫은 것이다. 

0 == "\n" ; // true

// 공백문자 " ", "\n"이  ToNumber를 경유하여 0으로 강제 변환된다. 
// 이런 이상한 경우를 제외하고 
// 맞닥뜨릴 가능성이 조금이라도 있는 평범한 값 사이에서 이상하게 작동하는 강제변환은 방금 전 7가지가 전부다

42 =="43";
"foo" == 42; 
"true" == true;

42 =="42"; // true
"foo" == ["foo"]; // true
// 이것들은 falsy도 아니고 휘귀사례도 아닌 강제변환 결과는 전적으로 안전하고 합리적으로 설명할 수 있다. 

// 나쁜 변환들

"0" == false // true; 
false == 0;  // true; 
false == ""; // true; 
false == []; // true; 
"" == 0; //true;
"" == []; //true;
0 == []; // true;

// == false와 연관되는 4가지.. 이거는 절대 하지 말자 (앞에서도 이미 언급함)


"" == 0
"" == []
0 == []
// 이런 강제 변환 코드를 쓸 일이 있을까.. 
// == ""; 
// == 0; 
// 등은 사용될 가능성이 있다. 


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// 결론 !!!1
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// 암시적 강제변환의 안전한 사용법 
// 피연산자 중 하나가 true /false 일 가능성 있으면 절대로 == 연산자를 쓰지 말자
// 피연산자 중 하나가 [], "", 0 이 될 가능성이 있으면 가급적 == 연산자는 쓰지 말자

// ===를 남발하지 말자 
// @dorey 가 작성한 동등 비교의 모든 조합을 나타낸 테이블을 참고하자 



// 추상관계 비교 

// 피연산자 둘다 문자열인경우, 아닌경우로 나뉘어 계산된다. 

var a = [42]; 
var b = ["43"];

a < b;
b < a;
// 어느 한쪽이라도 문자열이 아닐 경우 둘다  ToNumber로 강제변환한다. 

// 둘다 문자열일 경우
var a = ["42"];
var b = ["043"];

// ToPrimitive로 강제변환하면 문자열이기 때문에  a, b 는 숫자로 강제변환하지 않는다. 
// 어휘순서로 비교한다. 

a < b // false

var a= [4,2];
var b = [0,4,3]; 
// "4,2", "0,4,3" 으로 문자열화시킨 후 어휘비교를 한다. 

var a = {b:42};
var b = {b:43};

a < b 
// false a [Object object] b [Object object]

a==b
// false
// 객체 레퍼런스에서의 작동하는 방법을 이전에 설명했다. 

a <=b // true  !!!!
a >=b // true  !!!!

// a <= b 는 b < a의 결과를 부정하도록 설계되었기 때문이다.
// 엄격한 관계비교는 없다. 
// 관계비교를 할 경우에는 비교할 값들을 명시적으로 강제 변환해두는 편이 안전하다. 

// 암시적 강제변환이 때때로 코드 가독성을 향상시키는 장점이 있다. 
// 그러나 내가 지금 무슨 코드를 짜고 있고 어떻게 작동할 거란 점은 확실히 알고 있어야 한다. 