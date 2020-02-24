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

var hour = parseInt(selectedHour.value , 10); 

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

