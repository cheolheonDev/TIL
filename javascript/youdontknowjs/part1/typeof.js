var a; 
console.log(typeof a); 
console.log(typeof b); 
// console.log(b);
// 선언조차 하지 않은 변수도 typeof가 가능하며, 이때 'undefined'를 반환함 
// 이 typeof의 안전가드는 쓸모가 많다. 
// 어떤 함수가 선언되었는지 체크할때?

if (typeof atob === 'undefined'){
    atob = function(){ /* 폴리필*/
        console.log('atob');
    }
    // var atob 로 하지 않는 이유?  
    // 최상위 스코프로 호이스팅 ... 중복 선언되면, 에러를 던지는 브라우져가 있다.
}

// 유틸리티에 특정 변수가 정의되어있는지 체크하는 상황
// type of
function doSomethingCool(){
    var helper = 
    (typeof FeatureXYZ !== 'undefined')?
    FeatureXYZ : 
    function(){ /* 기능 */ return 'a' }
    var val = helper();
    console.log(val);
}

// 명시적 의존관계 삽입
// type of 
function doSomethingCool(FeatureXYZ){
    var helper = FeatureXYZ || function(){return 'a' }
    var val = helper();
    console.log(val);
}

