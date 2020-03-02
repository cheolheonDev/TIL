// 클래스와 객체의 혼합
// 클래스 지향 개념은 자바스크립트 객체 체계와는 태생부터 잘 맞지 않다. 

// 클래스 이론
// 클래스와 상속은 특정 형태의 코드와 구조를 형성하며 실생활 영역의 문제를 소프트웨어로 모델링하기 위한
// 방법이다. 

// 데이터는 자신을 기반으로 하는 실행되는 작동  behavior 과 연관되므로, 
// 캡슐화, 데이터와 작동을 잘 감싸는 것이 올바른 설계라고 강조한다. 

// 예) String 클래스와 그 메서드 
// 어떤 문자열도 String 클래스의 인스턴스

// 클래스는 특정 자료구조를 분류하는 용도로 쓴다. 
// 일반적인 기준 정의에서 세부적이고 구체적인 변형으로서의 자료 구조를 도출하는 것이다. 

// vehicle, 사람을 운송하는 기능을 한 곳에만 정의해두고
// Car 일반적인 vehicle의 정의를 세분화 (specialize)
// 인스턴스 데이터는 차량별, 고유 시리얼 넘버 같은 것을 생각할 수 있다. 

// 다형성, 부모 클래스에 뭉뚱그려 정의된 작동을 자식 클래스에서 좀 더 구체화 하여 오버라이드 하는 것을 뜻한다. 
// 오버라이드 된 작동에서 기반 작동을 참조할 수 있는 건 상대적 다형성 덕분이다. 

// 클래스 디자인 패턴
 
// 클래스도 많이 쓰는 디자인 패턴 중 하나다. 
// 몇몇 언어는 만물이 다 클래스다. 
// 자바스크립트 클래스 
// es6 부터 클래스라는 키워드가 명세에 추가되다. 
// 자바스크립트에는 클래스가 없다. 
// 클래스 디자인 패턴으로 코딩할 수 있도록 뜯어 고친 옵션이다. 

// 클래스 체계
// 많은 표준 라이브러리는 스택 자료구조를 Stack 클래스에 구현해 놨다. 
// 스택 클래스를 인스턴스화 해야 비로소 작업을 수행할 구체적인 자료 구조가 마련된다.

// 건축
// 클래스와 인스턴스 중심의 사고방식은 흔히 건축 현장에 빗대어 생각할 수 있다. 
// 건물의 청사진과, 시공사가 지은 건물 물리적인 인스턴스
// 
// 클래스, 구워냄의 최종 결과가 인스턴스라는 객체, 객체 메서드를 직접 호출하거나 데이터 프로퍼티에 접근
// 클래스는 복사 과정을 거쳐 객체형태로 인스턴스화한다. 

// 생성자 
// 인스턴스는 보통 클래스명과 같은 이름의 생성자라는 특별한 메서드로 생성한다. 
// 생성자의 임무는 인스턴스에 필요한 정보를 초기화 하는 일이다. 

// 클래스 상속
// parent class -> child class
// child class는 물려받은 작동을 오버라이드 할 수 있다. 

// 다형성
// 상속 받은 메서드를 같은 명칭의 자체 메서드로 오버라이드.. 
// 이런 기법을 다형성, Polymorphism 이라고 한다. 
// 
// 대부분 언어에서는  inherited 대신 super라는 키워드를 사용한다. 
// 같은 이름의 메서드가 상속 연쇄의 수준별로 다르게 구현되어 있고 이 중 어떤 메서드가 적절한 호출 대상인지
// 자동으로 선택하는 것 또한 다형성의 특징이다. 
// 인스턴스가 어느 클래스를 참조하느냐에 따라 메서드의 정의는 다형적이다. 

// 자식 클래스가 마치 부모 클래스와 연결된 양 다형성을 혼동하지 않길 바란다. 
// 자식은 그저 부모에게서 자신이 필요한 내용을 베껴왔을 뿐이니 ... 

// 다중상속 
// 일부 클래스 지향 언어에서는 복수의 부모 클래스에서 상속받을 수 잇다. 

// Diamond problem
// 이름이 같은 메서드를 여러 다른 클래스에서 상속받아온다면 어느 메서드를 참조해야 할까? 

// 믹스인 
// 자바스크립트 객체는 상속받거나 인스턴스화 해도 자동으로 복사 작업이 일어나지 않는다. 
// 인스턴스를 만들 클래스란 개념 자체가 없고 오직 객체만 있다. 

// 믹스인은 자바스크립트에선 누락된 클래스 복사 기능을 흉내낸 것으로 명시적 암시적 미스인 두 타입이 있다. 

// 명시적 믹스인  // 일부 라이브러리에서는 extend라고 한다 
function mixin (sourceObj, targetObj){
    for(var key in sourceObj){
        if(!(key in targetObj)){
            targetObj[key] = sourceObj[key];
        }
    }
    return targetObj;
}

var Vehicle = {
    engines: 1, 
    ignition: function(){
        console.log("엔진을 켠다");
    },
    drive: function(){
        this.iginition();
        console.log('방향을 맞추고 앞으로 간다');
    }
};

var Car = mixin(Vehicle, {
    wheels: 4, 
    drive: function(){
        Vehicle.drive.call(this);
        console.log(this.wheels + "개의 바퀴로 굴러간다");
    }
})
// Vehicle.drive.call(this) / /Explicit pseudopolymorphism  
// ( 상속 받은 Vehicle객체의 drive를 활용, 다만 명시적으로 지금 객체를 바인딩함)

// 복사가 끝나면, car는 vehicle과 별개로 움직인다. Car에 프로퍼티를 추가해도 vehicle에는 
// 아무런 영향이 없고 그 반대 역시 마찬가지다. 

// 공용함수의 레퍼런스는 두 객체 모두 같이 쓰기 때문에 
// 다른 클래스 지형 언어처럼 100% 클래스 -> 인스턴스의 복사는 어렵다. 

// 복수의 객체를 타깃 객체에 명시적으로 믹스인 할 경우, 부분적으로 다중 상속을 흉내낼 수 있지만
//  이름이 같은 메서드나 프로퍼티가 복사되면 충돌을 피할 대책이 없다. 
// 

// 기생상속 Parasitic Inheritance 
// 명시적/암시적 특징을 모두 갖고 있다. 

function Vehicle(){
    this.engines = 1; 
}
Vethicle.prototype.iginition = function() {
    console.log('엔진을 켠다');
};
Vehicle.prototype.drive = function() {
    this.ignition(); 
    console.log("방향을 맞추고 앞으로 간다");
}
function Car(){
    var car = new Vehicle(); 
    car.wheels = 4; 
    car.vehDrive = car.drive;
    car.drive = function(){
        vehDrive.call(this);
        console.log(
            this.wheels + "개의 바퀴로 굴러간다!"
        );
    };
    return car; 
}
var myCar = new Car();
myCar.drive();

// 암시적 믹스인 
var Something = {
    cool: function() {
        this.greeting = "hello world",
        this.count = this.count? this.count+1:1;
    }
};
Something.cool();
Something.greeting; 
Something.count;

var Another = {
    cool:function(){
        Something.cool.call(this); // this 재 바인딩을 십분 활용
    }
}
Another.cool();
Another.greeting
Another.count;


// 일반적으로 자바스크립트에서 클래스를 모방하는 건 당장 닥친 문제를 해결할 순 있어도 앞으로 터질 시한폭탄을 심어놓는 것과 다름없다. 


