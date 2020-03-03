// 작동 위임
/*
// 프로토타입 체계는 한 객체가 다른 객체를 참조하기 위한 내부 링크다
// 
// 자바스크립트의 무한한 간으성을 이끌어낼 가장 중요한 핵심 기능이자 실제적인 체계는 
// 전적으로 객체를 다른 객체와 연결하는 것에서 비롯된다. 
// 이 문장 하나가 이 장의 나머지 부분에서 설명할 갖가지 동기와 접근 방식을 이해하는데 대단히 중요한 핵심원리다. 

// 6.1 위임 지향 디자인으로 가는길
// 프로토타입이 클래스와는 근본부터 다른 디자인 패턴이다. 
// 디자인 원칙을 모두 포기하라는 말은 아니다. 
// 캡슐화는 아주 강력한 개념이고 위임과도 호환된다. 

// 클래스 이론 
// 부모 클래스와 유사한 태스크의 공통 작동을 정의한다. 
// 특화된 작동은 두 자식클래스 각자에게 각각 추가한다. 
// 자식클래스의 사본을 인스턴스화 한다. 이 인스턴스는 
// Task의 일반 작동과 xyz의 특수 작동 사본을 모두 포함한다. 

// 위임 이론
// task객체를 정의하는데, 객체!, 다양한 타스크에서 사용할(위임할) 구체적인 작동이 기술된다. 
// 태스크별 객체를 정의하여 고유한 데이터와 작동을 정의하고 태스크 유틸리티 객체에 연결해 
// 필요할때 특정 태스크 객체가 태스크에 작동을 위임하도록 작성한다. 

// 형제 , 동료 객체로부터 작동을 가져온다. 클래스 복사를 통해 이 둘을 조합하지 않아도 
// 각자 별개의 분리된 상태에서 필요할때마다 xyz객체가 task객체에 작동을 위임한다. 

var Task = {
    setID : function(ID) { this.id = ID; },
    outputID : function() { console.log(this.id);}
}

//  XYZ가 T
var XYZ = Object.create(Task);
XYZ.prepareTask = function(ID, Label){
    this.setID(ID);
    this.label =Label;
};
XYZ.outputTaskDetails = function(){
    this.outputID(); 
    console.log(this.label);
}

// OLOO, 객체를 다른 객체에 연결

// 1. 예제  코드에서 id와 label이 두 데이터 멤버는 xyz 직속 프로퍼티다. 
// 위임시 상태값은 xyz, abc에 두고 위임 받는 쪽에 두지 않는다. 
// 2. 일부러 부모 자식의 매서드 이름을 똑같이 붍여 오버라이드 형식을 갖추는 클래스 디자인 패턴과 달리
// 서로 다른 수준의 연쇄에서 같은 명칭이 뒤섞이는 일은 피해야 한다. 
// 각 객체의 작동방식을 잘설명하는 서술적인 명칭이 필요하다 
// 3. this.setId .. 에서 프로토타입 체이닝을 통해 task까지 찾아 올라가서 메서드를 선택한다. 
// 그리고 바인딩 규칙에 따라 매서드 내에 this는 자기 자신으로 설정된다. 

// behavior delegation 
// 작동 위임은 프로퍼티/ 매서드 레퍼런스가 객체에 없으면 다른 객체로 수색 작업을 위임하는 것을 의미한다. 
// 수직적인 클래스 다이어그램은 지우고, 객체들이 서로 수평적으로 배열된 상태에서 위임 링크가 체결된 모습을 떠올리기 바란다. 

// 상호 위임
// 현재는 금지됨 

// 멘탈 모델 비교 
// 

// OO

function Foo(who){
    this.me = who; 
}
Foo.prototype.identify = function() {
    return "I am " + this.me;
}
function Bar(who){
    Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.speak = function() {
    alert("Hello, " + this.identify() + ".");
};

var b1 = new Bar("b1");
var b2 = new Bar("b2");
b1.speak();
b2.speak();


// OLOO
Foo = {
    init: function(who){
        this.me = who;
    },
    identify: function() {
        return "I am" + this.me;
    }
};
Bar = Object.create(Foo);
Bar.speak = function(){
    alert("hello" + this.identify() + ".");
}
var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);
b2.init("b2");
b1.speak();
b2.speak();

// 생성자 프로토 타입 new등을 쓰면서 클래스처럼 보이려고한 장치를 쓰지않고
// 객체를 연결해주기만 했다. 
// OLOO스타일에선 다른 객체와의 연결에만 집중하면 되므로 고민할 요소가 확 줄어든다



//  클래스 vs 객체 
// 위젯 편 ,, 실무에 적용될만한 예를 들어보자 

// 1. 위젯 클래스 
// 공통 기반이 될 클래스 그리고 자식 클래스 ?? 

// 고전적 클래스 디자인
function Widget(width, height){
    this.width = width || 50; 
    this.height = height || 50; 
    this.$elem = null;
}

Widget.prototype.render = function($where){
    if(this.$elem){
        this.$elem.css({
            width: this.width + "px",
            height: this.height + "px"
        }).appendTo($where);
    }
};

function Button(width, height, label){
    Widget.call(this,width, height);
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
}
//Button은 Widget으로부터 상속받는다. 
Button.prototype = Object.create(Widget.prototype);

//상속받은 render()를 오버라이드한다. 
Button.prototype.render = function($where){
    Widget.prototype.render.call(this, $where);
    // 가짜 super 호출을 동원한 명시적 의사다형성 
    this.$elem.click(this.onClick.bind(this));
};

Button.prototype.onClick = function(evt){
    console.log( this.label + " 버튼이 클릭됨!");
}

$(document).ready(function(){
    var $body = $(document.body);
    var btn1 = new Button(125,30, "Hello"); 
    var btn2 = new Button(150, 40, "World");
    btn1.render($body);
    btn2.render($body);
})

// ES6 class 간편 구문

class Widget { 
    constructor(width, height){
        this.width = width || 50
        this.height = height || 60; 
        this.$elem = null 
    }
    render($where){
        if(this.$elem) {
            this.$elem.css({
                width :this.width + "px", 
                height: this.height + "px", 
            })
        }
    }
}

class Button extends Widget { 
    constructor(width,height,label){
        super(width, height);
        this.label = label || "default"; 
        this.$elem = $("<button>").text(this.label);
    }
    render($where){
        super($where);
        this.$elem.click(this.onClick.bind(this));
    }
    onClick(evt){
        console.log(this.label + " 버튼이 클릭됨!");
    }
}
$(document).ready(function(){
    var $body = $(document.body); 
    var btn1 = new Button(125,30, "Hello");
    var btn2 = new Button(125,30, "Hello");
    btn1.render($body);
    btn2.render($body); 
});
//  문제영역을 클래스로 모델링하기 위한 선택사항
//  신경쇠약을 가중시킨다


// 위젯객체의 위임
//  

var Widget = {
    init : function(width, height){
        this.width = width || 50; 
        this.height = height || 50; 
        this.$elem = null;
    },
    insert: function($where){
        if(this.$elem){
            this.$elem.css({
                width: this.width + "px", 
                height: this.height + "px"
            }).appendTo($where);
        }
    }
}
var Button = Object.create(Widget); 
Button.setup = function(width,height, label ){
    this.init(width, height);
    this.label = label || "default";
    this.$elem = $("<button>").text(this.label);
};
Button.build = function($where){
    this.insert($where);
    this.$elem.click(this.onClick.bind(this));
}
Button.onClick = function(evt){
    console.log(this.label + " 버튼이 클릭됨!");
}

$(document).ready(function(){
    var $body = $(document.body);
    var btn = Object.create(Button);
    btn.setup(125,30,"Hello");
    
    var btn2 = Object.create(Button);
    btn2.setup(125,30,"Hello");

    btn.build($body);
    btn.build($body);
});

// Widget이 부모도, Button이 자식도 아니다. 
// Widget은 보통 객체로 갖가지 유형의 위젯이 위임하여 사용할 수 있는 유틸리티 창고다. 

// 같은 이름의 render() 메서드 따위는 공유할 필요가 없다. 

// 생성과, 초기화가 구분되어 있다. 
// Principle of seperation of concerns다. 

// 6.3 더 간단한 디자인 

// 로그인 페이지의 입력 폼을 처리하는 객체
// 서버와 직접 통신하여 인증을 수행하는 객체 
// 두 컨트롤러 객체 가 있다. 

//////////////////////////////////////////////////
// OO
//////////////////////////////////////////////////

//부모클래스
function Controller() { 
    this.errors = []; 
}
Controller.prototype.showDialoa(title, msg){
    // 사용자에게 다이얼로그 창으로 타이틀과 메시지를 표시한다
}
Controller.prototype.success = function(msg){
    this.showDialog("Success", msg);
}
Controller.prototype.failure = function(err){
    this.errors.push(err);
    this.showDialog("error", err);
}

//자식클래스
function LoginController(){
    Controller.call(this);
}
LoginController.prototype = Object.create(Controller.prototype);
LoginController.prototype.getUser = function(){
    return document.getElementById("login_username").value;
}
LoginController.prototype.getPassword = function(){
    return document.getElementById("login_password").value;
}
LoginController.prototype.validateEntry = function(user,pwd){
    user = user || this.getUser(); 
    pw = pw || this.getPassword();

    if(!(user&&pwd)){
        return this.failure(
            "ID와 비밀번호를 입력하여 주십시오"
        );
    }
    else if(pwd.length < 5) {
        return this.failure(
            "비밀번호는 5자 이상이어야 합니다."
        );
    }
    return true;
    //여기까지 왔다면 검증 통과
}
LoginController.prototype.failure = function(err) {
    Controller.prototype.failure.call(
        this, 
        "로그인 실패: " + err 
    );
};

//자식클래스 
function AuthController(login){
    Controller.call(this);
    this.login = login;
}
AuthController.prototype = 
    Object.create(Controller.prototype);
AuthController.prototype.server = function(url,data){
    return $.ajax({
        url, 
        data
    });
};
AuthController.prototype.checkAuth = function(){
    var user = this.login.getUser(); 
    var pw = this.login.getPassword();

    if(this.login.validateEntry(user,pw)){
        this.server("/check-auth", {
            user:user, 
            pw: pw
        })
        .then(this.success.bind(this))
        .fail(this.failure.bind(this));
    }
};
AuthController.prototype.success = function(){
    Controller.prototype.success.call(this, "인증 성공!");
}

AuthController.prototype.failure = function(err){
    Controller.prototype.failure.call(
        this, 
        "인증 실패:" + err
    );
};
// 상속 + 구성 
var auth = new AuthController(new LoginController); 
auth.checkAuth();


// 단순한 구성으로 둘을 포개어 놓고, 협력하게 하는 것이 부모 클래스인 컨트롤로부터 상속의 장점을
// 잘 살리는 길이다. 


//////////////////////////////////////////////////
// OOLO
//////////////////////////////////////////////////
//탈 클래스화 

var LoginController = {
    errors: [], 
    getUser: function() { 
        return document.getElementById("login_username").value;
    },
    getPassword: function(){
        return document.getElemenetById("login_password").value;
    },
    validateEntry: function(user,pw){
        user = user || this.getUser(); 
        pw = pw || this.getPassword(); 
        if(!user&&pw){
            return this.failure(
                "ID와 비밀번호를 입력하여 주십시요!"
            )
        }
        else if( user.length < 5){
            return this.failure(
                "비밀번호는 5자 이상이어야 합니다."
            )
        }
        return true;
    },
    showDialog: function(title, msg){
        // 
    },
    failure: function(err){
        this.errors.push(err);
        this.showDialog("에러", "로그인 실패 : " + err);
    }
};
//AuthController가 LoginController에 위임하도록 연결한다. 
var AuthController = Object.create(LoginController);

AuthController.erros = []; 
AuthController.checkAuth = function() { 
    var user = this.getUser(); 
    var pw = this.getPassword();
    if(this.validateEntry(user,pw)){
        this.server("/check-auth", {
            user: user, 
            pw:pw
        })
        .then(this.accepted.bind(this))
        .fail(this.rejected.bind(this));
    }
};
AuthController.server = function(url,data){
    return $.ajax({
        url:url, 
        data:data
    });
};
AuthController.accepted = function(){
    this.showDialog("성공", "인증성공");
};
AuthController.rejected = function(){
    this.failure("인증 실패: " + err);
};
// 

//작동 위임 패턴에서 AuthC와 loginC는 수평적으로 서로를 엿보는 객체일뿐이며
//클래스 지향 패턴처럼 부모/자식 관계를 억지로 맺을 필요가 없다. 

// 작동을 공유하기 위해 징검다리 역할을 대신할 기본 컨트롤러가 필요 없다. 
// 위임만으로도 강력한 체계이므로 필요한 기능 구현에 문제가 없다. 
// 필요할대 위임을 통해 두 객체가 서로 협조할 수 있는 형태이므로 구성 역시 없어도 된다.

// 마지막으로 두 객체 전부 success()와 failure() 매서드를 똑같은 이름으로 포함하지 않아도 되니
// 클래스 지향 디자인의 고질적인 다형성 문제도 해결된다. 


// 더 멋진 구문 
// 클래스 처럼, 객체 리터럴에 단축 메서드 선언이 가능하다. (function키워드가 없어도 된다. )
// ES6
var LoginController = {
    errors: [], 
    getUser() {
        console.log('a');
    },
    getPassword() { 
        // .. 
        console.log('b');
    }
    //
};

//AuthController가 LoginController에 위임하도록 연결한다. 
var AuthController = Object.create(LoginController);
// 이 부분도 ES6의 Object.setPrototypeOf 를 써보자
Object.setPrototypeOf( AuthController, LoginController);

// 비어휘별 식별자, 
// 단축메서드의 단점,, 
var Foo = {
    bar()
}
// 
var Foo = {
    bar: function(){}
}
// 익명함수표현식이 된다. 
// 재귀 이벤트 바인딩에서 자기 참조가 어려워진다. 

// 인트로스펙션 
// 인스턴스를 조사해서 객체 유형을 거꾸로 유추하는 타입 인트로스펙션 (Type Introspection)
//
*/
// a1과 Foo가 관계를 조사하는 듯 보이지만 실제로는 a1과 Foo.prototype 사이의 관계를 알려주는 일을 한다. 
// OO
/*
function Foo(){
}
function Bar(){
}
Bar.prototype= Object.create(Foo.prototype);
var b1 = new Bar("b1");
console.log(Bar.prototype instanceof Foo);
*/
// Bar instanceof Foo는 의미가 없다. 
// 인스턴스가 상속을 포함한다고 생각하여 그 의미를 혼도하기 쉽기 때문에.. 할 수 있는 실수
// OOLO 축약

var Foo = {};
var Bar = Object.create(Foo);
var b1 = Object.create(Bar);

// 덕타이핑 
//if(a1.somthing){
//    a1.something();
//}
// 위임 가능한 함수를 가진 객체와 a1의 관계를 애써 조사하는대신
// 해당 메서드가 있는지 테스트

// 덕타이핑의 실례가 바로 ES6 프라미스
// thenable..  then()함수가 가졌는지 조사하는 식으로 테스트한다. (프라미스인지 확인할때)

Foo.isPrototypeOf(Bar);
Object.getPrototypeOf(Bar) === Foo; 
Foo.isPrototypeOf(b1)
Bar.isPrototypeOf(b1);

console.log(Object.getPrototypeOf(b1) === Bar)
console.log(Object.getPrototypeOf(b1) === Foo)


// 작동 위임 패턴은 객체를 부모/자식 클래스 관계가 아닌 동등한 입장에서 
// 서로 위임하는 형태로 되어있다. 

// 객체만으로 구성된  코드를 구성한다면, 구문도 단순해질 뿐더러 코드 아키텍쳐또한 간단하게 가져갈 수 잇다. 
// OLOO는 [[prototype]] 기반의 작동 위임을 아주 자연스럽게 구현한다. 