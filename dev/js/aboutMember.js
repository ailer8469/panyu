$(function(){
    var slider1 = $("#sync1");
    var slider2= $('#sync2');
    var slider1FirstSlideIndex; 
    var prevIndex = 0;
    var totalItem= $('#sync2 li').length;
    var oPic = document.getElementById('user_pic');
    var aLi = oPic.getElementsByTagName('li');
    var arr = [];

     // change size
    var wdth=$(window).width();
    $(window).resize(function(){
        wdth=$(window).width();
    });

    for(var i = 0; i < aLi.length; i++) {
        var oImg = aLi[i].getElementsByClassName('sm_slider_wrap')[0];
        arr.push([parseInt(getStyle(aLi[i], 'left')), 
            parseInt(getStyle(aLi[i], 'top')),
            getStyle(aLi[i], 'zIndex'), 
            oImg.width, 
            parseFloat(getStyle(aLi[i], 'opacity') * 100),
            parseFloat(getStyle(oImg, 'opacity') * 100),
        ]);
    };

    // bigCarousel(use owlCarousel)
    slider1.owlCarousel({
        loop: true,
        nav: true,
        center: true,
        smartSpeed: 800,
        dots: false,
        items: 1,
        mouseDrag:false,
        touchDrag:false,
        navText: ['<svg xmlns="http://www.w3.org/2000/svg" width="67" height="67" viewBox="0 0 67 67" fill="none"><circle r="33.5" transform="matrix(-1 0 0 1 33.5 33.5)" fill="#BFB29E" fill-opacity="0.4" /><path d="M57 33.5H10M10 33.5L22.838 21M10 33.5L22.838 46" stroke="white"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="67" height="67" viewBox="0 0 67 67" fill="none"><circle cx="33.5" cy="33.5" r="33.5" fill="#BFB29E" fill-opacity="0.4"/><path d="M10 33.5H57M57 33.5L44.162 21M57 33.5L44.162 46" stroke="white"/></svg>'],
        onInitialized: function(event) {
            slider1FirstSlideIndex = event.item.index; 
        },
        onTranslate: function(event) {
            sliderSync(event);
        }
    });
    function sliderSync(event) {
        var index = event.item.index;
        var loop = event.relatedTarget.options.loop;
        var slider2CloneCount = slider2.find('.owl-item.cloned').length / 2;
        
        if(loop) {
            if(index < slider1FirstSlideIndex) { 
                slider2.trigger('prev.owl.carousel');
            } else {
                if(event.item.count === 2 && event.item.index === 2 && prevIndex === 3) {
                    slider2.trigger('next.owl.carousel');
                } else {
                    slider2.trigger('to.owl.carousel', index - slider2CloneCount);
                }
            }
            prevIndex = event.item.index; 
        } else {
            slider2.trigger('to.owl.carousel', index);
        }
    };
    // owl-prev&owl-next event
    $('.owl-prev').click(function(){
        arr.push(arr[0]);
        arr.shift();
        for(var i = 0; i < aLi.length; i++) {
            var oImg = aLi[i].getElementsByTagName('img')[0];
            var pcBox=$('.slider_box_pc');
                
            aLi[i].style.zIndex = arr[i][2];
            startMove(aLi[i], { left: arr[i][0], top: arr[i][1], opacity: arr[i][4] });
            startMove(oImg, { width: arr[i][3] });
            if( aLi[i].style.zIndex == 3){
                aLi[i].classList.add('current');
                pcBox.eq(i).addClass('active');
                $('#list_num').text(($('#user_pic li.current').index())+1 +"/"+ totalItem);
            }else{
                aLi[i].classList.remove('current');
                pcBox.eq(i).removeClass('active');
            }
        };
    });
    $('.owl-next').click(function(){
        arr.unshift(arr[arr.length - 1]);
        arr.pop();
        for(var i = 0; i < aLi.length; i++) {
            var oImg = aLi[i].getElementsByTagName('img')[0];
            var pcBox=$('.slider_box_pc');

            aLi[i].style.zIndex = arr[i][2];
            startMove(aLi[i], { left: arr[i][0], top: arr[i][1], opacity: arr[i][4] });
            startMove(oImg, { width: arr[i][3] });
            if( aLi[i].style.zIndex == 3){
                aLi[i].classList.add('current');
                pcBox.eq(i).addClass('active');
                $('#list_num').text(($('#user_pic li.current').index())+1 +"/"+ totalItem);
            }else{
                aLi[i].classList.remove('current');
                pcBox.eq(i).removeClass('active');
            }
        }
    });

    TweenMax.from($('.owl-item.active .bg_slider_photo p'),.7,{
        y:'-100',
        repeat:0,
        delay:.5,
    })
    TweenMax.from($('.owl-item.active .slider_title'),1,{
        x:'200',
        repeat:0,
    })
    TweenMax.from($('.owl-item.active .ctx_p'),.8,{
        x:'200',
        repeat:0,
        delay:.5,
    })
    // bigCarousel animation
    $('.owl-stage').on('transitionrun',function(){
            TweenMax.from($('.owl-item.active .bg_slider_photo p'),.7,{
                y:'-100',
                repeat:0,
                delay:.5,
            })
            TweenMax.from($('.owl-item.active .slider_title'),1,{
                x:'200',
                repeat:0,
            })
            TweenMax.from($('.owl-item.active .ctx_p'),.8,{
                x:'200',
                repeat:0,
                delay:.5,
            })
    });
    // smallCarousel mousewheel
    $(window).on("mousewheel", _.throttle(function(event, delta) {
        if (delta > 0) { 
            $('.owl-prev').trigger('click');

        } else {
            $('.owl-next').trigger('click');  
        }
    }, 1000, { "leading": true, "trailing": false }));
    
    if(wdth <1200){
            var startX = startY = endX =endY =0;    
            var body=$("body");
            body.bind('touchstart',function(event){
                var touch = event.targetTouches[0];
                //滑動起點座標
                startX = touch.pageX;
                startY = touch.pageY;
    
            });
            body.bind("touchmove",function(event){
                //取最後一點的座標->最终終點座標
                var touch = event.targetTouches[0];
                    endX = touch.pageX;
                    endY = touch.pageY;
        })
        body.bind("touchend",function(event){

            var distanceX=endX - startX;
            //手機屏幕寬度
            var clientＷidth = document.documentElement.clientWidth;
            if(startX!=Math.abs(distanceX)){
                if(Math.abs(distanceX)>clientＷidth*0.2){
                //向下someAction1，向上someAction2
                distanceX <0 ? someAction1():someAction2();
            }
            }
            startX = startY = endX =endY =0;
        })
    }
    function someAction1(){
        $('.owl-next').trigger('click');  
    }
    function someAction2(){
        $('.owl-prev').trigger('click');  
    }

    function getStyle(obj, name) {
        if(obj.currentStyle) {
            return obj.currentStyle[name];
        } else {
            return getComputedStyle(obj, false)[name];
        }
    };
    function startMove(obj, json, fnEnd) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true;
        for(var attr in json) {
        var cur = 0;

    if(attr == 'opacity') {
        cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
    } else {
        cur = parseInt(getStyle(obj, attr));
    }
    var speed = (json[attr] - cur) / 5;
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

    if(cur != json[attr]) bStop = false;

    if(attr == 'opacity') {
        obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
        obj.style.opacity = (cur + speed) / 100;
    } else {
        obj.style[attr] = cur + speed + 'px';
        }
    }

        if(bStop) {
            clearInterval(obj.timer);
        if(fnEnd) 
            fnEnd();
            }
        }, 30)
    };

    $('.sendMail').click(function(){
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($('#copyMail').text()).select();
        document.execCommand("copy");
        $temp.remove();

        let modal = document.getElementById("alert_modal");
        let span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
            }
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            }
        }
        window.ontouchend = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    });

    // contect modal
    let modal = document.getElementById("contect_modal");
    let span = document.getElementsByClassName("contect_close")[0];
    $('.contact').click(function(){
        modal.style.display = "block";
        $('.contect_ctx').show();
        $('.send_modal').hide();
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";}
        }
    });
    $('.contact_pc').click(function(){
        modal.style.display = "block";
        $('.contect_ctx').show();
        $('.send_modal').hide();
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";}
        }
        window.ontouchend = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";}
        }
    });
    // submit
    $('#ct_submit').click(function(e){
        e.preventDefault();
        $('.contect_ctx').hide();
        $('.send_modal').show();
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";}
        }
        window.ontouchend = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";}
        }
    });
});