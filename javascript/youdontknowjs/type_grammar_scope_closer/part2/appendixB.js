// 렉스컬 스코프와 같이 언급된 동적 스코프에 관하여 
// 동적 스코프가 자바스크립트의 또 다른 매커니즘 (this) 와 가까운 친척 관계 

// 동적 스코프

// 렉시컬 스코프는 엔진이 변수를 찾는 검색 방식과 위치에 대한 규칙, 주요 특성은 프로그래머 코드를
// 작성할 때 완성된다는 것. 

// 동적 스코프는 런타임때 스코프를 동적으로 결정하는 모델이다. 
// 동적 스코프 체인은 코드 내 스코프의 중첩이 아니라 콜 스택과 관련이 있다. 
   // 어디서 함수가 호출되었는지와 관련이 되어있다. 


function foo(){
    console.log(a);   /// 2  // 동적 스코프에서는 3 
}
function bar(){
    var a =  3; 
    foo(); 
}
var a = 2; 
bar();


// 렉시컬 this
// =>  fat arrow

var obj = {
    id: "awesome", 
    cool : function coolFn(){
        console.log(this.id);
    }
};
var id = "not awesome"
obj.cool(); //awesome
setTimeout(obj.cool, 100);  //not awesome

// 해결책 1. var self = this 

var obj = {
    count : 0 ,
    cool: function coolFn(){
        var self = this; 
        if( self.count < 1){
            setTimeout( function timer() {
                self.count++; 
                console.log("awesome?");
            }, 100 );
        }
    }
};
obj.cool(); // awesome?

// 해결책 2. 화살표 함수 
// 렉시컬 this. 
// 화살표 함수는 예상치 못한 this 바인딩이 해제되는 일 없이 
// 가장 가까운 렉시컬 스코프에서 this를 받아온다.
var obj = {
    count : 0, 
    cool : function coolFn() {
        if(this.count < 1){
            setTimeout( () => {
                this.count++;
                console.log("awesome?");
            }, 100);
        }
    }
}
obj.cool();

// 해결책 3. this 매커니즘을 정확하게 받아들여 사용하기? 
var obj = {
    count: 0, 
    cool : function coolFn(){
        setTimeout( function timer(){
            this.count++; 
            console.log("more awesome!")
        }.bind(this), 100); // bind를 활용한다. 
    }
}
obj.cool();

