// 프로토 타입
// [[prototype]]

// 명세에 따르면, 자바스크립트 객체는 [[prototype]]이라는 내부 프로퍼티가 있고 
// 다른 객체를 참조하는 단순 레퍼런스로 활용한다. 

// [[prototype]] 레퍼런스는 어디에 쓰는 물건일까. 
// 객체 자체에 해당 프로퍼티가 존재하는지 찾아보고 존재하면 그 프로퍼티를 사용한다. 

// [[prototype]] 연쇄는 Object.prototype에서 끝난다. 
//  ((호스트에 의해 확장되지 않은 내장객체의 경우))

// Object.prototype에는 많은 익숙한 유틸리티들이 있다. 

// 프로퍼티 세팅과 가려짐 
// 객체에 프로퍼티를 세팅할때 세가지 경우의 수가 따른다 

var myObject = {}; 
myObject.foo = "bar";

// 1. [[prototype]] 연쇄의 상위 수준에서 foo라는 이름의 일반 데이터 접근 프로퍼티가 존재하는데
// 읽기 전용이 아닐경오, myObject의 직속 프로퍼티 foo가 새로 추가되어 '가려짐 프로퍼티'가 된다. 

// 2. [[prototype]] 연쇄의 상위 수준에서 발견한 foo가 읽기 전용 이면 이 프로퍼티를 세팅하거나 
// myObject의 가겨짐 프로퍼티를 생성하는 일이 일어나지 않는다. ( 엄격모드 에서는 에러, 비엄격모드에서는 조용히 무시된다.)

// 3. [[prototype]] 연쇄의 상위 단게에서 발견된 foo가 세터일 경우 항상 이 세터가 호출된다. 
// myObject에 가려짐 프로퍼티 foo를 추가하지 않으며 foo세터를 재정의하는 일 또한 없다. 

//
// = 할당에만 제약이 있는것도 .. 문제 Object.defineProperty()는 아무런 제약이 없다. 
//

// 미묘하게 암시적으로 발생하는 가려짐 예시 

var anotherObject = {
    a: 2
};
var myObject = Object.create(anotherObject);
console.log(anotherObject.a); // 2

myObject.a++ 
//  암시적인 가려짐이 생성된다. 
//  myObject.a = myObject.a + 1; 

anotherObject.a // 2
myObject.a // 3

/////////////
// 클래스
/////////////

// 자바스크립트는 실상 객체밖에 없다. 
// 자바스크립트 에서는 클래스에 객체의 작동을 서술하지 않는다. 

// 클래스 함수 
// 클래스처럼 생긴 뭔가를 만들어 쓰려는 꼼수 
// 일종의 클래스 같은 독특한 작동은 프로토 타입이라는 공용/ 열거불가 프로퍼티를 가진다는 이상한 특성에 기인한다. 

function Foo() {
    console.log('Foo');
}
Foo.prototype; // {}
// 이 객체를 프로토타입이라고 하는데, 
// foo.prototype이라고 명명된 프로퍼티 레퍼런스를 통해 접근하기에 그렇게 부른다. 
// foo.prototype으로 표기된 객체 정도가 좋겠다. 

//  new Foo() 로써 만들어진 모든 객체는 
// Foo.prototype 객체와 [[prototype]] 링크로 연결된다. 

var a = new Foo();
Object.getPrototypeOf(a) === Foo.prototype;

// 어떤 공용객체에 [[Prototype]]으로 연결된 객체를 다수 생성하는 것은 가능하지만
// 기본적으로 어떠한 복사도 일어나지 않아서. 자바스크립트에서 객체들은 서로 완전히 떨어져
// 분리되는 것이 아니라 끈끈하게 연결된다. 

// new는 상호 연결된 두개의 객체로 귀결된다. 
// 여기까지, 클래스 인스턴스화 과정 따윈 없다. 

// new Foo()는 결국 새 객체를 다른 객체와 연결하기 위한 간접적인 우회 방법이다. 
// new Foo()호출 자체는 이러한 링크의 프로세스와 거의 관련이 없다. 
// 부수효과로 발생한 링크.. 

// [[ prototype]] 체계를 다른 말로 Prototypal Inheritance라고 하며 
// 클래스 상속의 동적 언어 버전이라고 말한다. 
// 상속 개념을 잘 살려, 동적 스크립트 언어에 맞게 그 의미를 조금 변형한 장치

// 프로토차입 상속, 은 굳이 귤을 노란 사과라 부르는 것과 같다. 
// 상속은 기본으로 복사를 수반하지만
// 자바스크립트는 객체 프로퍼티를 복사하지 않는다. 
// 두 객체에 링크를 걸어두고 다른 족의 프로퍼티 함수에 접근 할 수 있게 위임한다. 

// 위임 이야말로 자바스크립트객체 연결 체계를 더 정확하게 나타낸 용어다

// 차등상속 Differential Inheritance이라는 표현도 있다. 
// 일반적인 특성과 차이가 나는 부분만 기술하는 식이다. 

// 이런 용어는 프로토타입 상속 과함께 자바스크립트에서 실제 일어나는 일보다 멘탈모델을 더 중요시하는 것처럼 보인다. 
// 이는 객체가 실제로 차등적으로 만들어지는 것이 아니라 

// 아무것도 정의되지 않은 구덩이와 함께 특정 송석들을 정의함으로써 생성된다는 사실을 간과한 것이다. 
// 이 구덩이를 위임이 넘겨받아 그때 그때 상황에 맞게 위임받은 작동으로 채워넣는다. 

// 상속의 의미와는 달리 객체는 아무리 복사해도 하나의 차등 객체로 눌러지지 않으므로 
// 자바스크립트 [[prototype]] 체계의 작동의 원리를 그대로 설명하기 위한 이론으로는 맞지 않는다. 

/// 생성자 

Foo.prototype.constructor === Foo ; // true
var a = new Foo();
a.constructor === Foo ; // true

//Foo.prototype객체에는 열거 불가능한 프로퍼티인 .constructor가 세팅되는데 
//이는 개체의 생성과 관련된 함수 Foo를 다시 참조하기 위한 프로퍼티이다. 
//new Foo()로 생성된 객체 a도 .constructor 프로퍼티를 갖고 있다. 


// 생성자냐 호출이냐 ? 

// Foo는 생성자가 아닌 여느 함수일 뿐이다. 
// 함수는 결코 생성자가 아니지만, 그 앞에 new를 붙여 호출하는 순간 
// 이 함수는 생성자 호출을 한다. 

// 함수는 결코 생성자가 아니지만 new를 사용하여 호출할때에만 생성자 호출이다. 


// 체계 
// 많은 자바스크립트 개발자가 클래스 지향을 흉내내기 위해 각고의 노력을 기울여 왔다. 

function Foo2(name){
    this.name = name; 
}
Foo2.prototype.myName = function(){
    return this.name;
}
var a = new Foo('a');
var b = new Foo('b');
a.myName();
b.myName();

//1 . this.name 할당 시 .name 프로퍼티가 a,b  두 객체에 추가된다. 마치 클래스 인스턴스에서 데이터 값을 캡슐화 하는 것처럼보인다. 
//2. Foo.prototype .. a.myName()처럼 쓸 수 있다. 

// a, b생성 직후 [[prototype]] 연결이 Foo.prototype 에 링크된다. 위임을 통해 Foo.prototype에서 찾는다

// 돌아온 생성자
// Foo2에 의해 생성된 객체 a 가 a.constructor === Foo가 true인 것은
// Foo.prototype에 위임된 레퍼런스 덕분

// 보안측면에서 올바르지 않다. 
// [[prototype]] 위임을 통해 Foo를 올바르게 참조한 것은 맞지만 
// .constructor 가 ~에 의해 생성됨 의 의미라는 불행한 가정이 괴롭힐 경우의 수를 따져보자


function Foo()
Foo.prototype = {};
var a1 = new Foo(); 
a1.constructor === Foo;    //false
a1.constructor === Object; //true

//.constructor 프로퍼티가 없으므로,, [[prototype]] 연쇄를 쫓아 Object.prototype 에 이른다. 
// 생성자와 프로토 타입이라는 용어 자체의 의미는 기본적으로 느슨하기 짝이 없어서 나중에는 부합하지 않을 수 있다. 
// 생성자는 생성됨을 의미하지 않는다

// .constructor 는 불변 프로퍼티가 아니다. 
// 프로토타입 연쇄에 같은 이름의 프로퍼티가 추가되거나 다른 값으로 덮어 씌워질 수 있다. 

// 매우 불안전하고 신뢰할 수 없는 레퍼런스 이다. 

//
// 프로토타입 상속 
// 
// 전형적인 프로토타입 스타일 코드

function Foo(name) {
    this.name = name; 
}
Foo.prototype.myName = function(){
    return this.name;
}
function Bar(naum, label){
    Foo.call(this, name);
    this.label = label;
}
Bar.prototype = Object.create(Foo.prototype);
// 주의 : Bar.prototype.contructor 는 사라졌다. 
// Bar.prototype = Foo.prototype 해버렸다면
// 아래 코드는 Foo.prototype을 직접 변형하게 되어
// Foo.prototype과 연결된 모든 객체 영향을 미친다. 

Bar.prototype.myLabel = function() {
    return this.label;
}

var a = new Bar('a', 'obj a');
a.myName(); 
a.myLabel(); 


// es6 부터 
// Object.setPrototypeOf()가 도입되다. 
// 프로토타입을 연결하는 표준적인 방법
// Bar.prototype = Object.create(Foo.prototype);
// Object.setPrototypeOf(Bar.prototype, Foo.prototype)

// 클래스 관계 조사 
// 객체가 어떤 객체로 위임할 지 어떻게 알까.
// 클래스 지향언어에서는 인스턴스의 상속 계통 (Inheritance Ancestry)를 살펴보는 것을
// 인트로스펙션 Introspection(리플렉션 Reflection)이라고 한다. 

// 참고 하드 바인딩 함수에 instanceof 를 사용하면 원래 함수에 따라 작동한다. 
// instanceOf 는 객체와 대상함수를 확인하는 한계
// 객체 와 객체간 연결 여부는 확인 불가 

a instanceof Foo;  // true;
// a 를 연쇄 순환하면서 , Foo.prototype이 가리키는 객체가 있는지 조사한다. 

// 부자연스러운 방법
function isRelatedTo(o1, o2){
    function F(){}
    F.prototype = o2;
    return o1 instanceof F;
}
var a = {};
var b = Object.create(a);
isRelatedTo(b,a); // true

// [[prototype]] 리플렉션을 확인하는 훨씬 훌륭한 대안
Foo.prototype.isPrototypeOf(a); // true
// a의 전체 [[property]] 연쇄에 Foo.prototype이 있는다? 
b.isPrototypeOf(a) 
// a의 프로토타입연쇄 어딘가에 b가 존재하는가 ? 

// es5 
// Object.getPrototypeOf(a) === Foo.prototype;

///////////
// 객체 링크
// prototype Chain 객체 사이에 형성된 일련의 링크 
// 프로토타입에 연결된 객체를 하나씩 따라가면서 프로퍼티 / 메서드를 찾아보고 발결될때까지 같은 과정을 되풀이 한다. 

// 링크 생성
// Object.create() 은 먼저 새로운 객체를 생성하고 주어진 객체와 연결한다. 
// .prototype, .constructor 레퍼런스등을 동원한 함수를 쓸데없이 골치 아프지 않고도 프로토타입의 진정한 힘을 실감하게 된다. 

// Object.create() 폴리필 (es5)
if(!Object.create){
    Object.create = function(o){
        function F(){}
        F.prototype = o; 
        return new F();
    }
}

// Object.create의 추가 기능 ( 폴리필 을 쓰지 않아야 할))
// 두번째 이후 인자는 객체에 추가할 프로퍼티로서 프로퍼티 서술자를 기재하여 속성을 지정할 수 있다. 
// 
// 


//  링크는 대비책? 
//  프로토 타입을, 프로퍼티 메서드를 찾지 못한 경우의 대비책이라고 생각하는것은 올바른 사고방식이 아니다. 
//  오히려 비상대비책으로 작성한다면, 신기하게도 작동은 하지만 유지보수는 어려운 소프트웨어가 될 가능성이 크다. 

//  위임 디자인 패턴 
//  API 인터페이스 설계시 구현 상세를 겉으로 노출하지 않고 내부에 감추는 식으로 위임하면 특별히 이상하거나 혼동할 일이 없다. 
//  

var anotherObject = {
    cool : function(){
        console.log('좋아');
    }
}
var myObject = Object.create(anotherObject);
myObject.doCool = function(){
    this.cool();
};
myObject.doCool();




