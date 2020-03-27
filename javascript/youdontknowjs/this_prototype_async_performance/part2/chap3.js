// 프로미즈
// 이면의 추상화를 파악하기 위해서, api가 지향하는 바와 대상이 무엇인지 알고 제대로 써야 한다. 
// 두가지 비유를 통해 설명한다. 

// 1. 미랫값
// IOU, 영수증의 적힌 주문번호를, 치즈버거의 Placeholer로 생각한다. 
// 이 자리끼움은, time independent인 값, 미랫값 future value 이다. 

// 지금값과 나중값
// 
var x,y = 2; 
console.log(x+y) ; // NaN

// x+y 연산은 x,y가 이미 세팅된 값이라고 본다. 
// x,y 값은 이미 귀결됬다 (resolved)라고 볼 수 있다. 

// + 연산자가 홀로 x,y상태를 감지하다가 모두 귀결된(준비된) 후 
// 덧셈 연산을 해주리라 기대하는 건 무리다. 

function add(getX, getY, cb){
    var x,y; 
    getX( function(xVal){
        x = xVal;
        if(y!= undefined){
            cb(x+y);
        }
    });
    getY(function(yVal){
        y = yVal;
        if(x!=undefined){
            cb(x+y);
        }
    })
}
var fetchX =()=>{};
var fetchY =()=>{};
add(fetchX,fetchY, function(sum){
    console.log(sum);
});

// 
// 정교하지 않은 접근법이지만 
// 지금과 나중을 모두 일관적으로 다루려면 둘 다 나중으로 만들어 모든 작업을 비동기화하면 된다. 

// 위 코드를 프라미스 식으로
function add(xPromise, yPromise){
    return Promise.all([xPromise, yPromise])
    .then(function(values){
        return values[0] + values[1];
    })
} 
add(fetchX(), fetchY())
.then(function(sum){
    console.log(sum);
}, function(err){
    console.err(err);
}
);
//  then함수는 이룸 함수를 첫번째 인자로, 버림 함수를 두번째 인자로 각각 넘겨받는다.

// 프로미스는 이룸 fulfillment
// 버림 rejection으로 귀결될 수 있다. 
// 버림 값은 프로그램 로직에 따라 세팅되거나 런타임 예외에 의해 암시적으로 생겨나기도 한다. 

// 프라미스는 시간 의존적인 상태를 외부로부터 캡슐화 하기 때문에 프라미스 
// 자체는 시간 독립적이고 그래서 타이밍 또는 내부 결괏값에 상관없이 예측 가능한 방향으로 구성(조합) 할 수 있다. 

// 프라미스는 일단 귀결된 후에는 상태가 그대로 유지되며( 불변값) 
// 몇번이든 꺼내 쓸 수 있다. 

// 미랫값을 캡슐화하고 조립할 수 있게 해주는 손쉬운 반복 장치다. 

// d완료 이벤트
// foo()가 언제 끝나 다음 상태로 알수 있을지, 알림을 받고자 한다. 

// 전통적인 자바스크립트 사고방식에서는 알림 자체를 하나의 이벤트로 보고 리스닝한다. 
// foo()의 완료 이벤트를 리스닝 함으로써 알림 요건을 재구성하는 것이다. 

function foo(x){
    // 이벤트 구독기를 생성하여 반환한다 
    // return listener;
}

var evt = foo(42);
evt.on("completion", function(){ 
    console.log('completion');
})
evt.on("failure", function(err){
    console.log(err);
})
// 일반적인 콜백 지향 코드와 정반대인데 의도적으로 그렇게 코딩한 것이다. 

// 콜백은 그 자신이 제어의 역전이라고 했다. 
// 따라서 콜백 패턴을 뒤지븐 다는것 제어의 되역전 
// 제어권을 호출부에 되돌려놓게 된다. 

//여러 파트로 나뉘어진 코드가 이벤트를 리스닝하면서, foo()완료시 독립적으로 알림을 받아
//이후 단계를 진행하게 된다

var evt = foo(42); 
bar(evt);
baz(evt);
// 우아하게 관심사를 분리하여, bar, baz는 foo호출에 끼어들 이유가 전혀 없어졌다. 
// 결국 evt객체가 분리된 관심사 간의 중립적인 중재자 역할을 수행하는 것이다. 

// 이 evt 구독기가 프라미스와 유사하다. 
//
// 프라미스 '이벤트'
// 프라미스 귀결 이벤트는 엄밀히 얘기해서 이벤트가 아니고 완료나 에러라고 하지 않는게 보통이다. 
// then 이벤트의 등록으로 
// 더 엄밀히, 이룸, 귀결 이벤트의 등록이다. 

function foo(x) {
    return new Promise(function(resolve, reject){
        //
    })
}
var p = foo(42);
bar(p);
baz(p);

function  bar(fooPromise){
    fooPromise.then(
        function(){
            // 
        },
        function(){
            // 에러처리
        }
    )
}
/// 또는 다음과 같은 형식도 가능하다. 

function bar(){

}
function oopsBar(){

}
var p = foo(42);
p.then(bar, oopsBar);
p.then(baz, oopsBaz);
// foo의 성공시에만 bar, 그 외엔 oopsBar를 호출한다. 

// 데너블 덕 타이핑
// 

//진짜 프라미스는 then()메서드를 가진 데너블(thenable)이라는 객체 또는 함수를 정의하여 판별하는것으로 규정됐다. 
// 어떤 값의 타입을 그 형태 (어떤 프로퍼티가 있는 가)를 보고 짐작하는 타입 체크를 일반적인 용어로는
// 덕 타이핑이라고 한다. 


// then메서드를 프로토타입에 추가해도 
// 데너블이 되버린다. 
//  

// 우연히 then이라는 메서드가 사용되어 프라미스식 코드와 호환되지 못하는 라이브러리도 종종 있다. 


// 프라미스 믿음
//

// 비동기 코딩의 신뢰를 회복할 수 있을것인가. 
// 콜백을 넘긴 후 일어날수 있는 경우는 다음과 같다. 

// 너무 일찍 콜백을 호출
// 너무 늦게 콜백을 호출
// 너무 적게 아니면 너무 많이 콜백을 호출
// 필요한 완경/ 인자를 정상적으로 콜백에 전달 못함
// 발생 가능한 에러 / 예외를 무시함

// 이와 같은 모든 일들에 유용하고 되풀이 될 수 있는 해결책을 제시한다.  

// 1. 너무 일찍 호출
// 프라미스의 정의상 프라미스가 이미 귀결된 후라 하더라도 then()에 건넨 콜백은 항상
// 비동기적으로만 부른다. 

// 2. 너무 늦게 호출
// 어떤 동기적인 작업 연쇄가 실제로 예정된 다른 콜백의 실행을 지연시키는 방향으로 움직일 수는 없다. 
/*
p.then( function () { 
    p.then( function() {
        console.log("C");
    })
    console.log("A"):
});
p.then( function() { 
    console.log("B");
})
*/
// ABC
// C가 툭 끼어들어 B를 앞지를 가능성은 없다. 

// 프라미스 스케쥴링의 기벽 
// 별개의 두 프라미스에서 연쇄된 콜백 사이의 상대적인 실행 순서는 장담할 수 없다. 

var p3 = new Promise(function(resolve, reject){
    resolve("B");
})
var p1 = new Promise(function(resolve, reject){
    resolve(p3);
})
var p2 = new Promise(function(resolve, reject){
    resolve("A");
})
p1.then(function(v){
    console.log(v);
})
p2.then(function(v){
    console.log(v);
})
// A, B  // (B,A가 아니다.)

// p1은 즉시값으로 귀결되지 않도 다른 프라미스 p3로 귀결되고, 다시 B로 귀결된다. 
// p1콜백은 p2콜백보다 비동기 잡 큐에서 후순위로 밀리게 된다. 

// 애매한 문제로 밤을 지새지 않으려면 여러 프라미스에 걸친 콜백의 순서/ 스케쥴링에 의존해선 안된다. 
// 다중 콜백의 순서가 문제를 일으키지 않는 방향으로 코딩하는 편이 바람직하다. 


// 한번도 콜백을 안 호출
// 프라미스 스스로 귀결 사실을 알리지 못하게 막을 방도는 없다. 
// 이룸 버림 콜백이 프라미스에 모두 등록된 상태라면, 귀결시 둘중 하나는 반드시 부른다. 

// 어느 쪽으로도 귀결되지 않으면, 경합이라는 상위 수준의 추상화를 이용하면 프라미스로 해결할 수 있다. 

// 프라미스를 타임아웃시키는 유틸리티 
// 

function timeoutPromise(delay){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            reject("타임아웃");
        }, delay)
    })
}
Promise.race([
    foo(), 
    timeoutPromise(3000)
])
.then(
    function(){
        // foo가 제시간에 이루어지다.
    },
    function(err){
        // foo가 버려지거나 , 제사긴에 못미쳤다. 
    }
)
// 너무 가끔 너무 종종 호출 
// 콜백의 호출 횟수는 당연히 한번이다. 
// 프라미스는 정의상 단 한번만 귀결된다. 
// 만약 resolve나 reject 를 여러 차례호출하려고 한다면
// 최초의 귀결만 처리하고 이후의 시도는 조용히 무시한다. 

// 단 같은 콜백을 두번 이상 등록하면 그 횟수만큼 호출할 것
// p.then(f) p.then(f);

// 인자/환경 전달 실패 
// 프라미스 귀결값은 딱 하나 뿐이다. 

// 프라미스는 모든 등록한 콜백으로 반드시 전해진다.
// resolve, reject함수를 부를때 인자를 두개 넘겨도 두번째 이후 인자는 그대로 무시한다. 
// 값을 여러개 넘기고 싶다면, 배열이나 객체를 활용해야 한다. 

// 자바스크립트 함수는 자신이 정의된 스코프의 클로져를 항상 간직하므로, 클로져를 통해 얼마든지 계속
// 주변 상태에 접근할 수 있다. 
// 그런대로 믿을만한 장치다.

// 에러/예외 삼키기 
// 프라미스가 생성 또는 귀결을 기다리는 도중 언제라도 typeerror referenceerror등의 자바스크립트 에러가 나면
// 예외를 잡아 주어진 프라미스를 강제로 버린다. 

// 프라미스는 자바스크립트 예외조차도 비동기적 작동으로 바꾸어 경합조건을 상당히 줄인다. 
// 만약, then에 등록한 콜백에서 에러가 발생한다면 ?? 


var p = new Promise(function(resolve, reject){
    resolve(42);
});
p.then(
    function fulfilled(msg){
        foo.bar();  // err
        console.log(msg); //실행되지 않는다.
    },
    function rejected(err){
        //  실행 X
    }
)
// 프라미즈는 이미 42로 이룸 상태, 
// 여기서만 에러 감지기를 실행하도록 하고 나머지는 콜백을 실행하도록 하면, 엄청난 혼란이 야기된다 
// 

// p.then()이 반환한 또 다른 프라미스에서 TypeError가 나면서 버려지게 된다.
//

// 미더운 프라미스
// 
// 프라미스는 콜백을 완전히 없애기 위한 장치가 아니다. 콜백을 넘겨주는 위치만 달리할 뿐이다. 
// 반환받은 뭔가가 미더운 프라미스라고 어떻게 장담할 수 있을까? 

// 프라미스에 구현되어 있다. 
// Promise.resolve
// 프라미스 아닌, 데너블 아닌, 즉시값들을 건네부며 이 값으로 이루어진 프라미스를 손에 넣게 된다. 

var p1 = new Promise( function(resolve, reject){
    resolve(42);
})
var p2 = Promise.resolve(42);


var p1 = Promise.resolve(42); 
var p2 = Promise.resolve(p1); 
p1 === p2 // true

// 데너블 값을 Promise.resolve에 주면, 이 값을 풀어보고 
// 최종적으로 프라미스 아닌 것 같은 구체적인 값이 나올 때까지 계속 풀어본다. 
// 그리고 그 값으로 진짜 순종 프라미스를 반환한다. 

// 어떤 p라도 Promise.resolve()에 넣으면 정규화하므로 안전한 결과를 기대할 수 있다. 

Promise.resolve(p)
.then(
    function fulfilled(val){
        console.log(val);
    },
    function rejected(err){
        //
    }
)

//  믿음 형성 
// 왜 프라미스가 믿음직한지, 견고하고 유지 보수가 용이한 소프트웨어를 제작하는 과정에서 
// 이러한 믿음이 결정적인 역할을 하는지 마음 속에서 충분히 귀결됬기 바란다. 


// 연쇄 흐름
// 프라미스에 then()을 부를때 마다 생성하여 반환하는 새 프라미스를 연쇄할 수 있다. 
// then()의 이룸 콜백 함수가 반환한 값은 어떤 값이든 자동으로 연쇄된 프라미스의 이룸으로 세팅된다. 

// 
var p = Promise.resolve( 21 ); 
p
.then( function(v) { 
    console.log(v);
    return v * 2; 
})
.then( function (v) { 
    console.log(v);
})
// 프라미스 시퀀스가 각 단계마다 진짜 비동기적으로 작동하게 만드는 핵심은 
// Promise.resolve()에 넘긴 어떤 값이 프라미스/데너블일때 Promise.resolve()의 작동 로직이다. 

// 원하는 값이 나올때까지 재귀적으로 계속 풀어본다. 
// 이룸/ 버림 처리기에서 데너블/ 프라미스를 반환해도 마찬가지로 풀어본다. 

var p = Promise.resolve( 21); 
p.then( function(v){
    console.log(v) ; 
    return new Promise(function(resolve, reject){
        setTimeout( function() { 
            resolve( v*2 );
        }, 100);
    });
})
.then(function(v){
    console.log(v);
    // 100ms 있다가 실행한다. 
})
 // 프라미스 연쇄의 어느 단계에서 문제가 발생하면, 에러 예외는 프라미스단위로 한정되므로, 
 // 전체 연쇄  어느 곳에서 에러가 발생한다면.. 그 지점부터 리셋하여 연쇄를 다시 정상 가동시킨다. 

 /*
request("...")
.then(function (response1){
    foo.bar(); /// error!!!!!
    return request("..." + response1)
})
.then(
    function fulfilled(response2){

    },
    function rejected(err){ // 3단계
        console.log(err);
        return 42
    }
)
.then (function(msg){ // 4단계 
    console.log(msg);
})
//
// 42가 출력된다. 

// 3단계 버림 처리기가 에러를 잡고, 어떤 값을 반환해 
// 다음 4단계의 프라미스가 이루어지게 된다. 

// 기본 버림 처리기 또는 이룸 처리기 
// 함수가 아닌 다른 값이 전달될 경우,, 

p.then(
    null, null
)

p.then (
    function(v){
        return v; 
    },
    function(err){
        throw err;
    }
)
// 다음과 같은 이룸 처리기 ,
// 버림 처리기가 있다고 가정하고 진행한다. 
 */

//

// then을 호출하면 그 결과 자동으로 새 프라미스를 생성하여 반환한다. 
// 이룸/버림 처리기 안에서 어떤값을 반환하거나 예외를 던지면, 이에 따라 새 프라미스가 귀결된다. 
// 이룸/버림 처리기가 반환한 프라미스는 풀린 상태로 귀결값이 무엇이든 간에 
// 현재의  then에서 반환된 연쇄된 프라미스의 귀결 값이 된다. 

// 순차적 연쇄 표현은 대단한 개선
// 그러나 여전히 많은 관용코드가 필요하다.


// 귀결 Resolve
// 이룸 Fullfill
// 버림 reject
// 용어정리 

// Promise.resolve 
 //  진짜 프라미스를 넘기면 반환하고 데너블을 받으면 풀어본다. 
 //  데너블 상태가 버림이면, 반환한 프라미스도 버림, 
 //  fullfilled 가 아니라 resolve가 합당.. 

 // promise 생성자의 첫번째 콜백 인자는 데너블, 진짜 프라미스 중 하나를 풀어볼 것이다. 
 // 그래서 
 // new Promise(function (resolve, rejcet ))!!


 // then에 전달할 콜백명은 .. 
 // 이룸을 처리한다는 의미에서 fulfilled
 // 버림을 처리한다는 의미에서 rejected

 // 에러 처리 

 // try, catch가 가장 익숙한 에러 처리형태이다. 
 // 동기적으로만 사용 가능하므로 비동기 코드 패턴에서는 무용지물이다. 

 // 에러 우선 콜백 스타일 ( error - first callback)
 function foo(cb){
     setTimeout( function() { 
         try{
             var x = baz.bar(); 
             cb(null, x); 
         }catch(err){
            cb(err);
         }
     }, 100)
 }
 foo(function(err,bar){
    if(err){
        console.error(err);
    }else{
        console.log(val);
    }
 });

 // 수준이 제각각인 에러 우선 콜백이 if 문이 여기저기 널린 상태로 뒤엉키다 보면, 
 // 결국 콜백 지옥을 피하기 어렵다. 

 //  프라미스는 분산 콜백 스타일 ( split callback)
 // 
 var p = Promise.reject('허걱');
 p.then(
     function fulfilled(msg){
        // msg.toLowerCase();
        // 만약 숫자가 넘어왔다면 에러를 던지는데 못잡는다. 
     },
     function rejected(err){
         console.log(err);
     }
 );

 //p는 불변값이므로 에러 알림은, p.then이 반환한 프라미스 만이 가능한다. 이 프라미스를 포착할 방법이 없다. 

 // 참고로 
 // 프라미스 생성과정에서 에러가 난다면, 바로 예외를 던진다. 
 // 


 // 프로그래밍 언어는 대부분 개발자가 사고를 치면 절망의 구덩이에 빠져 혹독한 대가를 치르는 방향으로 
 // 설계가 되어 있어서 제대로 실행하려면 정신을 바짝 차리고 열심히 코딩하여야 한다. // - Jeff Atwood

 // 절망의 구덩이 
 // 프라미스가 침묵속에 에러 또한 파묻히는 것을 막으려면, 반드시 연쇄 끝부분에 catch를 써야 한다고 주장하는 개발자들이 있다. 
  
 // 그러나 만약 handleErrors() (catch에 넘겨준 함수)
 // 도 에러가 난다면, 여전히 catch가 반환한 프라미스는 방치되어 있다. 

 // 프라미스 연쇄의 마지막 단계에 프라미스에서 에러가 나면 잡히지 않고 매달려 있을 가능성은 항상 존재한다. 

 // 잡히지 않는 에러처리 

 // 일부 프라미스 라이브러리는 전역 미처리 버림 처리기 같은 것을 등록하는 메서드를 추가하여 
 // 잡히지 않은 에러인지 식별하기 위해, 버림 직후 임의의 시간 동안 타이머를 걸어 놓는 시간 동안 타이머를 걸어놓는 식으로 구현한 것이다. 
 // 프라미스가 버려졌으나, 작동전 등록된 에러처리기가 없으면, 에러는 잡히지 않는다. 

 // 또는  done을 통해 연쇄 끝에 완료를 알려줘야 한다는 의견도 있다. 
 // done 내부에서 에러가 나면, 잡히지 않는 전역 에러로 던진다. 

 // 브라우져에는 가비지콜렉션기능이 있다. 
 // 프라미즈 객체를 추적하면서 언제 가비지를 수거하면 될지 분명히 알고 있으며, 
 // 프라미즈가 버려지면, 이를 개발자 콘솔창에 나타낼수 있다. 
 // 그러나 제대로 가비지콜렉션 되지 않을 가능성이 있다. 

 // 성공의 구덩이 
 
 // 향후 변화할 방향을 제시하기 위한 이론적인 이야기 
 // 본인이 만든 asynquence 프라미스 추상화 라이브러리 

 // 기본적으로 프라미스는 그 다음 잡/이벤트 루프 틱 시점에 에러 처리기가 등록되어 있지 않을 경우, 모든 버림을 알리도록 되어 있다.
 // 감지 되기 전까지 버림 프라미스의 버림 상태를 계속해서 유지하려면 defer()를 호출해서 해당 프라미스에 관한 자동 에러 알림기능을 끈다.

var p = Promise.reject('허걱').defer();
foo(42)
.then(
    function fulfilled(){
    },
    function rejected(){
    },
)
// p 또한 버림 상태를 사용/감지하려면 잠시 대기해야 하므로 defer를 호출, 알림이 일어나지 않는다.
// foo가 반환한 프라미스에는 에러처리기가 달리므로 알림이 일어나지 않는다.

// then이 반환한 프라미스엔 defer나 에러처리기가 달려있지 않아 버림되면, 잡히지 않은 에러 형태로 개발자 
// 콘솔 창에 나타나게 된다. 

// 프라미스 패턴 
// 여러 비동기 패턴들 

// 1. promise all 
// 모두 완료된뒤 기다림
// 
Promise.all([p1,p2])
.then(
 // p1, p2,  둘다 이루어져 메시지가 전달된다. 
)
// 인자로 넘기는 배열에는, 프라미스, 데너블, 즉시값 모두 가능하다. 
// 빙 배열로 넘기는 경우는 프라미스는 바로 이루어진다. 
// 배열내 프라미스중 하나라도 버려지면, 곧 바로 버려진다.

// 2. promise race
Promise.race([])
.then(
// 즉시값도 가능하디만, 즉시값은 승자가 될 운명.. 아무런 의미가 없다. 
)
// 빈배열을 넘길 경우,  결코 귀결되지 않는다.
// 하나라도 이루어진 프라미스가 있을 경우에 이루어지고 
// 하나라도 버려지는 프라미스가 있으면 버려진다. 

// 타임아웃 패턴.. 

// foo()는 프라미스 인식형 함수다. 
// timeoutPromise는 일정 시간 지연 후 버려진 프라미스를 반환한다.
Promise.arguments([
    foo(),
    timeoutPromise(300)
])
.then(
    function(){

    },
    function(err){
        // foo()가 버려졌거나 제때 마치지 못했다.
    }
)


// 결론
// 폐기 무시된 프라미스는 어떻게 되는가? 
// 취소가 안되고, 외부적인 불변성에 대한 믿음을 무너뜨리면 안되기에 조용히 묻히다. 
// 
// finally 같은 콜백을 등록해서, 뒷정리를 할 수 있도록 제안한다. 
// ES7이후 나올지 모르니 지켜보자 

// 프라미스 귀결을 알아채보자 
// 다음과 같은 정적 헬퍼 유틸리티를 만들어 프라미스 귀결을 알아챌 수 있다. 

if(!Promise.observe){
    Promise.observe = funciton(pr, cb){
        //  프라미스의 귀결을 부수적으로 감지한다.
        pr.then(
           function fulfilled(msg){
               // 비동기 콜백(잡)을 스케쥴한다. 
               Promise.resolve(msg).then(cb);
           } ,
           function rejected(err){
               Promise.resolve(err).then(cb);
           }

        );
        return pr;
    }
}

// 방금 유틸의 사용법

Promise.race([
    Promise.observe(
        foo(),
        function cleanup(msg){
            // 제시간에 끝나지 않더라도 이후 뒷정리를 한다.
        }
    ),
    timeoutPromise(300)
]);


// all/ race을 변형한 패턴

// none - all과 비슷하지만, 이룸/ 버림이 정반대다 , 모든 프라미스는 버려져야 되며, 버림이 이룸값이 되고 이룸이 버림값이 된다. 
// any - all과 유사하지만, 버림은 모두 무시하며, 하나만 이루어지면 된다. 
// first - any의 경합과 비슷하다. 프라미스가 이루어지고 난 다음에 다른 이룸/버림은 간단히 무시한다. 
// last - any의 경합과 비슷하다. 최후의 이룸 프라미스 하나만 승자가 된다는 것만  다르다. 

// 동시 순회 
// 비동기적인 작업에 각각에 대해 어떤 처리를 하고 싶다면.. 

if(!Promise.map){
    Promise.map = function (vals, cb){
        return Promise.all(
            vals.map(function(val){
                return new Promise(function (resolve){
                    cb(val,resolve);
                })
            })
        );
    }
}
 
var p1 = Promise.resolve(21); 
var p2 = Promise.resolve(42); 
var p3 = Promise.reject("허걱");

Promise.map([p1,p2,p3], function(pr,done){
    Promise.resolve(pr)
    .then(
        function(v){
            done(v*2);
        },
        done
    )
})
.then(function(vals){
    console.log(vals);
});

// 프라미스 API 복습

// 1. new Promise
//  reject 는 그냥 프라미스를 버리지만
//  resolve 는 넘어온 값에 따라 처리한다.
//  프라미스/데너블 값이 전달되면, 재귀적으로 풀어보고 그 최종값을 귀결상태로 한다. 

// 2. Promise.resolve   Promise.reject 
// // , 버려지거나 귀결된 프라미스를 생성하는 지름길
// resolve 재귀적으로 풀어보고 그 최종값을 resolve 반환된 프라미스에 값이 된다. 
// 진짜 프라미스를 여기다 넣는다면 아무 일도 일어나지 않느다는 것 

// 3. then, catch 
// catch() == then(null, )이나 나름없다. 
// 이룸, /버림 콜백에서 예외가 발생하면, 반환된 프라미스는 버린다. 
// 콜백 반환값이 특정 프라미스나 데너블 값을 반환하면 이를 풀어 이 값을 반환된 프라미스의 값으로 한다. 

// 4. all, race 
// 이루어지면, 이룸값이 담긴 배열을
// 하나라도 버려지면, 처음 버려진 프라미스의 버림 사유를 돌려받는다. 

// 최초로 귀결된 프라미스만 승자가 되고 그 귀결값이 귀결값이 된다. 



// 프라미스 한계 
// 시퀀스 에러 처리
//  시퀀스를 전체를 가리킬 개체가 마땅치 않다. 
//  중간에 어떤 단계에서 에러 처리를 하면, 에러를 감지할 방법이 하단부에서는 없다. 

var p = foo(42)
    .then(step2)
    .then(step3);

// p 가 가리키는 대상은, step3호출 후 반환된 마지막 프라미스다. 

p.catch(handleErrors); 
// 프라미스 연쇄 시퀀스에서 중간 단계를 참조할 레퍼런스가 없다. 

// 단일 값
// 프라미스는 하나의 이룸값 아니면 하나의 버림 사유를 갖는다. 
// 로직이 복잡해지면, 이게 발목을 잡는다. 

// 2개 이상의 프라미스로 분해해보자 
// before
function getY(x){
    return new Promise(function(resolve, reject){
        setTimeout(function() { 
            resolve((3*x)-1);
        },100)
    })
}
function foo(bar, baz){
    var x = bar* baz; 
    return getY(x)
    .then(function(y){
        return [x,y]
    })
}
foo(10,20)
.then(function(msgs){
    var x = msgs[0]; 
    var y = msgs[1];
    console.log(x,y);
})

// after

function foo(bar,baz){
    var x = bar * baz; 
    return [ 
        Promise.resolve(x), 
        getY(x)
    ]
}

Promise.all(
    foo(10,20)
)
.then(function(msgs){
    var x = msgs[0]; 
    var y = msgs[1]; 
    console.log(x,y);
})


// x,y계산을 분리해서, 리팩토링하기가 훨씬 쉽고,
// 호출부 안에서 두 프라미스를 알아서 조정하도록 놔두는 편이 훨씬더 깔끔하고 유연하다. 

// 약간더 기능적인 꼼수를 부린다면
function spread(fn){
    return Function.apply.bind(fn,null);
}
Promise.all(
    foo(10,20)
)
.then(
    spread(function(x,y){
        console.log(x,y);
    })
)

// 또는 디스트력선(es6)

.then(function(msgs){
    var [x,y] = msgs;
    console.log(x,y);
})

// 인자도 배열 해체 

.then(function([x,y]){
    console.log(x,y);
})

//


// 단일 귀결 
// 프라미스가 단 1회만 귀결된다는 점, 가장 중요한 본질
//데이터 이벤트/스트림에 더 가까운, 다른 모델과 어울리는 비동기 케이스도 많다. 
// 다수의 귀결 값을 처리하는 상황에 바로 적용하기는 어려울 것이다. 

// 클릭이벤트가 발생했을 경우.. 

click("#mybtn", function(evt){
    var btnID = evt.currentTarget.id; 
    request("..."+btnID)
    .then(function(text){
        console.log(text);
    })
})
// 이렇게 이벤트 처리기 안쪽에 연쇄를 정의하는 코드가 들어가야 한다. 
// 적잖이 어색하고 불편한 패턴

// 타성 
// 지금 운영 중인 콜백식 코드 베이스는 똑똑한 프라미스-인식형 개발자가 작정하지 않으면
// 계속 현 상태 그대로 남아있게 될 것이다. 

function foo(x,y,cb){
    ajax(
        "...."+x+y,
        cb
    );
}
foo(11,31,function(err,text){
    if(err){
        console.log(err);
    }else{
        console.log(text);
    }
});

// 이 코드를 변경해보자 
//  일단 ajax도 콜백식이 아닌 프라미스 인식형 유틸리티가 있어서 
//  request를 부를 수 있어야 한다. 

// 1. 헬퍼 작성 

if(!Promise.wrap){
    Promise.wrap = function(fn){
        return function() { 
            var args = [].slice.call(argumetns);
            return new Promise(function(resolve, reject){
                fn.apply(
                    null, 
                    args.concat(function(err,v){
                        if(err){
                            reject(err); 
                        }else{
                            resolve(v)
                        }
                    })
                )
            })
        }
    }
}

// 용례.. 
var request = Promise.wrap(ajax);

// 콜백식 함수를 프라미스 -인식형 함수로 감싸는 것을 
// lifting 또는  Promisifying이라고 한다. 

// 2. 프라미서리로 변경하자 (프라미스를 만드는 공장?)
// foo ajax둘다 wrap으로 감싸줘야한다.


// 최종

var request = Promise.wrap(ajax); 

// 다른 부분의 코드와의 호환성을 위해, 외부적으로는 콜백체계를 유지하고
// request프라미스는 내부적으로만 사용한다. 
function foo(x,y,cb){
    request(
        'url'
    )
    .then(
        function fulfilled(text){
            cb(null, text); 
        },
        cb
    );
}
// 이 예제의 목적인 foo()에 대한 프라미서리를 만든다. 

var betterFoo = Promise.wrap(foo); 
betterFoo(11,31)
.then(
    function fulfilled(text){
        console.log(text); 
    },
    function rejected(err){
        console.err(err);
    }
)

// 또는 foo를 프라미스로 
function foo(x,y){
    return request("....");
}

// 프라미스는 취소 불가 
// 작업 자체를 의미없게 만드는 일이 발생하더라도 
// 프라미스 진행을 멈출 방법이 없다. 

// 예시 프라미스 타임아웃

var p = foo(42);

Promise.race([
    p,
    timeoutPromise(3000)
])
.then(
    doSomething,
    handleError
)
p.then(function(){
    // 타임아웃이 되어도 여전히 실행된다...
})

// 귀결 콜백을 직접  작성해보자.. 

var OK = true; 
var p = foo(42); 
Promise.race( [ 
    p, 
    timeoutPromise(3000)
    .catch(funciton(err){
        OK = false
        throw err; 
    })

])
.then(
    doSomething, 
    handleError
);

p.then(function() { 
    if(OK){
        //타임 아웃이 없을때에만 실행된다. 
    }
})

// 자구책.. 보통 이런 코딩은 피하는게 좋다. 
// 프라미스 취소는 더 상위 프라미스 추상화 수준에서 구현해야 할 기능
// 프라미스 추상화 라이브러리를 찾아 쓰자. 

// 프라미스 하나씩은 취소 불가지만, 시퀀스 형태라면 프라미스처럼 단일 불변값을
// 통째로 전달할 일은 없을 테니, 취소가 되어야 사리에 맞다. 


// 프라미스 성능
// 
// 프라미스는 병목이 아니고, 믿음성/ 조합성을 제공한다는 점에서 
// 약간의 느리다는 단점을 상쇄한다. 

