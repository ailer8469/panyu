$(function(){
    TweenMax.to('#line_bg_1',100,{
        x: -200 ,
        y: 500 ,
        scale:1.5,
        rotation:-10,
        repeat:-1,
        yoyo: true,
        yoyoEase: true
    })

    TweenMax.to('#line_bg_2',100,{
        x: 200 ,
        y: -500 ,
        scale:2,
        rotation:-30,
        repeat:-1,
        yoyo: true,
        yoyoEase: true
    })
})
