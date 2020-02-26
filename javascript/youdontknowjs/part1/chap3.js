var a = new String("abc"); 
console.log(typeof a);  // object... not String
console.log(a instanceof String);
console.log(
Object.prototype.toString.call(a)
);

// typeof가 object에는  -> [[class]]라는 내부 프로퍼티가 있다. 

// 단순 원시값들은 해당 객체 래퍼로 자동 박싱된다. 
Object.prototype.toString.call(true);

// 엔진이 알아서 박싱하도록 냅두자 
var a = 'abc'; 
a.length; 
a.toUpperCase();
// 메서드를 이미 쓸 수 있다.  

// 객체래퍼의 함정
// 쓰지말자
var a = new Boolean(false);
if(!a){
    console.log('OOPS');
    // 실행되지 않는다. 
}


// 원시값을 수동 박싱하려면 Object를 쓰자. 
var a = "abc"
var c = Object(a); 
var b = new String(a);

typeof a; // string
typeof b; // object
typeof c; // object

b instanceof String; // true
c instanceof String; // true

Object.prototype.toString.call(b); 
Object.prototype.toString.call(c);

// 언박싱
console.log(c.valueOf());

// 암시적인 언박싱
var a = new String('abc');
var b = a + '';
typeof a; 
typeof b;


// 네이티브 생성자 
// 안쓰는게 좋다. 

// 특히 Array 생성자에 배열의 크기를 미리 정하는 것? 안좋다. / 
// 빈 슬롯이 생기기 때문..
var a = new Array(3);  "--"
var b= [undefined, undefined, undefined];  "--"
var c = []; 
c.length = 3; 

console.log(a.join("-"));
console.log(b.join("-"));
console.log(a.map((v,i)=>i)); // [undefined * 3]
console.log(b.map((v,i)=>i)); // [0,1,2]
console.log(c.map((v,i)=>i));

// undefined로 채워진 배열을 만들어보자 
var d = Array.apply(null, {length: 3});
// 두번째 인자는 인자의 배열로 원소들이 펼쳐져(spread)되어 함수의 인자로 전달된다.)

// 기타 생성자 
// 함수 내용을 동적으로 생성해야 하거나, 정규 표현식을 동적으로 생성해야 할 경우 

var e = new Function("a", "return a * 2"); 
var name = "Kyle"; 
var namePattern = new RegExp("\\b(?:"+name +")+\\b","ig");
// 패턴 , 플래그 형식 


// Date, Error 
// es 6  <- Date.now()

if(Date.now){
    Date.now = function(){
        return (new Date()).getTime();
    }
}

// error 객체, 현재 실행 컨텍스트를 포착하여 객체에 담는 것

function foo(x){
    if(!x){
        throw new Error('x를 안주셨어요');
    }
}

