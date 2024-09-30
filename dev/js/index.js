let svg = document.getElementById("mask");
const ratio = 0.5625;
// 時間軸
let tl = new TimelineMax({
    onUpdate:update
});
function update() {
    tl.progress();
};

function mouseHandler() {
tl.reversed(!tl.reversed());
};
//處理SVG的座標點
let pt = svg.createSVGPoint();
function getPoint(e){
    pt.x = e.clientX; 
    pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
};

// 重新計算座標
function mouseMove(e) {
let newPoint = getPoint(e);
gsap.to("#masker", 0.6, {
    attr:{
        cx:newPoint.x, 
        cy:newPoint.y}, 
    ease:"power2.out"});
};
 // change size
var wdth=$(window).width();
$(window).resize(function(){
    wdth=$(window).width();
});
    window.addEventListener("mousedown", mouseHandler);
    window.addEventListener("mouseup", mouseHandler);
    window.addEventListener("mousemove", mouseMove);




//background animation------------------------------------------
$(function(){

TweenMax.to('#ball_1',35,{
    y:'-450',
    rotation:-90,
    repeat:0,
    onComplete:function(){
        TweenMax.staggerFrom('#ball_1',40,{
            y:'800',
            rotation:90,
            repeat:-1           
})
}
});
TweenMax.to('#ball_2',55,{
    y:'-1000',
    rotation:90,
    repeat:0,
    onComplete:function(){
        TweenMax.staggerFrom('#ball_2',60,{
            y:'400',
            rotation:-90,
            repeat:-1           
        }
    )}
});
TweenMax.to('#ball_3',45,{
    y:'-330',
    rotation:-90,
    repeat:0,
    onComplete:function(){
        TweenMax.staggerFrom('#ball_3',50,{
            y:'700',
            rotation:90,
            repeat:-1           
        }
    )}
});
TweenMax.to('#ball_4',35,{
    y:'-900',
    rotation:90,
    repeat:0,
    onComplete:function(){
        TweenMax.staggerFrom('#ball_4',45,{
            y:'600',
            rotation:-90,
            repeat:-1           
        }
    )}
});
TweenMax.to('#ball_5',30,{
    y:'-330',
    rotation:-90,
    repeat:0,
    onComplete:function(){
        TweenMax.staggerFrom('#ball_5',60,{
            y:'700',
            rotation:90,
            repeat:-1           
        }
    )}
});
TweenMax.to('#ball_6',90,{
    y:'-1500',
    rotation:-90,
    repeat:-1,
    delay:20          
})
TweenMax.to('#ball_7',70,{
    y:'-1400',
    rotation:-90,
    repeat:-1,
    delay:15           
})
TweenMax.to('#ball_8',90,{
    y:'-1400',
    rotation:-90,
    repeat:-1,
    delay:25           
})
TweenMax.to('#ball_9',100,{
    y:'-1400',
    rotation:-90,
    repeat:-1,
    delay:6              
})
TweenMax.to('#ball_10',90,{
    y:'-1400',
    rotation:90,
    repeat:-1,
    delay:2           
})
});
