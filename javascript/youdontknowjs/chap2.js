// array 
// 배열의 원소 인덱스는 확실히 숫자만 쓰도록 하자. 
var a = []; 
a["13"] = 42; 
console.log(a.length);

// 유사 배열
function foo(){
    var arr = Array.prototype.slice.call(arguments);
    var arr = Array.from(arguments);
    // es6 부터는 arguments 는 비권장 
    console.log("bam");
    console.log(arr);
}
foo("bar" , "baz");

// 문자열 
var a = "foo";
var b = ["f", "o", "o"];

console.log(a.indexOf("o"));
console.log(b.indexOf("o"));

console.log(a[1]);
console.log(b[1]);
// indexOf, es5
// ie 구버젼에서 문법 에러로 인식.. (charAt(1))

// 문자열은 불변 값, 문자열 메서드는 그 내용을 바로 변경하지 않고 항상 새로운 문자열을 반환
var c = a.toUpperCase();
console.log(a === c);
console.log(a);
console.log(c);

// 문자열에서 배열의 메소드를 빌려쓰는 여러가지 방법
// 1. call 

var c = Array.prototype.join.call(a,'-');
var d = Array.prototype.map.call(a, function(v){
    return v.toUpperCase() + "."; 
}).join("");


// 2. 꼼수
var c = a
    .split("")
    .reverse()
    .join("");

console.log(c);
    
// 유니코드가 있는 경우 처리를 어떻게 할 것인가. 
// https://github.com/mathiasbynens/esrever 를 참고 


// 숫자 
// 정수 부동소수점 숫자를 아우른다, 42.0 === 42

var a = 5E10;
var a = 42.49;

// 지정한 소수점 아래 자릿수까지 숫자를 나타내기
a.toFixed(0); 
a.toFixed(1);

// 유효숫자 갯수 지정하기
a.toPrecision(1);
a.toPrecision(2);

//숫자 리터럴에서도 바로 접근 가능함
0.42.toPrecision(1);
42..toPrecision(1);
// 42. 이 숫자로 인식됨

//다른 진법들
0xf3      // 16진수
0363      // 8진수 ,,, es6의 엄격모드에서는 사용하지 못함
0o364     // 8진수  ,,, es6 버젼 
0b1110111 // 이진수 

//부동소수점 숫자의 부작용
console.log( 0.1 + 0.2 === 0.3);

// 해결방법, 머신 입실론 (미세한 오차)
// 미세한 오차로 동등함을 비교 
if(!Number.EPSILON){
// es6 부터 제공됨 
    Number.EPSILON = Math.pow(2, -52);
}
function numbersCloseEnoughToEqual(n1,n2){
    return Math.abs(n1-n2) < Number.EPSILON;
}
console.log(numbersCloseEnoughToEqual(0.1+0.2 , 0.3));
console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);

// 정수 값 최대로 안전한 값? 
// 2^53-1
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
// es6 

// 큰 수를 다루는 라이브러리?  BigInteger.js

// 정수인지 확인 es6
console.log(Number.isInteger(42));
console.log(Number.isInteger(42.000)); // true

// pollyfill
if(!Number.isInteger){
    Number.isInteger = function(num) {
        return typeof num == "number" && num % 1 ==0
    };
}
if(!Number.isSafeInteger){
    Number.isSafeInteger = function(num){
        return Number.isInteger(num) && 
        Math.abs(num) <= Number.MAX_SAFE_INTEGER;
    }
}

// 32비트 부호 정수 
// 비트 연산과 같은 일부 연산은 이 범위의 숫자에만 가능하다. 
a | 0 
// 숫자갑을 32비트 부호 있는 정수로 강제변환한다. 


// 기타값
// null, undefined

// 프로그래머들이 사용하는 예
// null : 빈값
// undefined : 실종된 값

// null : 예전에 있었지만 지금은 없는 상태
// undefined : 값을 아직 가지지 않은것 


// void 
// 어떤 값이든 무효로 만들어 항상 결과값을 undefined로 만든다. 

console.log(void 0);
console.log(void 1);
console.log(undefined);

// 활용예
// dosomething(){
// return void setTimeout(doSomethingCool, 100);
// }

// 이렇게도 가능하다
// dosomething(){
// setTimeout(doSomething, 100);
// return;
// }

//  if(doSomething()) { .... }
// if에서 긍정오류가 일어나지 않도록

// 특수숫자 

// NaN
// 어떤 NaN과도 동등하지 않다. 
var a = 2 / 'foo';
console.log(a == NaN);
console.log(a === NaN);
console.log(isNaN(a));

var b = 'foo'; 
console.log(isNaN(b));
// 자바스크립트 의 에러 ㅠㅠ 

// es6의 해결책 Number.isNaN

// pollyfill
if(!Number.isNaN){
    Number.isNaN = function(n){
        return (
            typeof n === 'number' &&
            window.isNaN(n)
        );
    };
}
// 자기가 자기자신과 갖지 않은 유일한 값
if(!Number.isNaN){
    Number.isNaN = function(n){
        return n!==n;
    }
}


// infinity 
var a = 1/0 ; // Infinity
var a = -1/0 ; // -Infinity 
console.log(0/Infinity); // 0

// 0   .. -0
var a = 0;
console.log( a/-3);
console.log( -0 === 0);j
function isNegZero(n){
    n = Number(n);
    return (n ===0 ) && (1/n  === -Infinity);
}
// 왜? 0으로 되더라도 이 변수의 이동 방향을 나타내기 위해서 0의 부호를 보존했다.

// 동등 비교의 강력한 함수 
// es6
var a = 2/"foo";
var b = -3 * 0;

Object.is(a, NaN);
Object.is(b,-0);
Object.is(b,0);

if(!Object.is){
    Object.is = function(v1 , v2){
        // -0
        if(v1 === 0 && v2 === 0){
            return 1 / v1  === 1 / v2;
        }
        // NaN
        if(v1 !== v1){
            return v2 !== v2;
        }
        return v2 === v1;
    }
}
// 그러나 === 가 안전하다면 안사용하는 것을 추천


// 값 vs reference 
// 값의 타입만으로 값-복사 레퍼런스-복사 둘 중에 한 쪽이 결정된다. 
// null, undefined, string, number, boolean, symbol(es6) - 값 복사 

// 레퍼런스가 변수가 아닌 값자체를 가리키므로, a레퍼런스로 b 레퍼런스를 바꿀 수 없다. 

var a = [1,2,3]; 
var b = a; 
b = [4,5,6]
console.log(a);
console.log(b);


// 함수 인자 역시 그렇다. 

function foo(x){
    x.push(4);
    console.log(x);
    x = [4,5,6]; 
    x.push(7);
    console.log(x);
}
var a = [1,2,3]; 
foo(a);
console.log(a);

// x가 a로 가르키고 있는 값을 바꿀 도리는 없다. 그 값의 내용만 마꿀수 있다. 

function foo2(x){   
    x.push(4); 
    console.log(x);
    x.length = 0; 
    x.push(4,5,6,7);
    console.log(x);
}

var a = [1,2,3];
foo2(a);
console.log(a);


// 합성값을 값 복사로 효과적으로 전달하려고 한다면.. 
foo2(a.slice());
// 얕은 복사에 의한 사본

// 스칼라 값을 레퍼런스 복사로 전달하려고 한다면

function foo(wrapper){
    wrapper.a = 42; 
}
var obj = {
    a: 2
}
foo(obj);
// wrapper 오브젝트를 사용해야 한다. 
// Number객체를 활용하려고 한다면? ,, 언박싱이 자동으로 되기때문에 불가능

function foo(x){
    x = x + 1; 
    x; 
}
var a = 2; 
var b = new Number(a);
foo(b);
console.log(b);
