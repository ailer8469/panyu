$(function(){  

    // change size
    const t1 = new TimelineLite();  
    var wdth=$(window).width();
    $(window).resize(function(){
        wdth=$(window).width();
    });
    $('#range').on('input',function(){
                if(wdth >1200){
                    let range=$('#range').val();
                        if(range <= 1){
                            $('.intro_1').show();
                            $('.intro_2').hide();
                            $("input[name=carousel-3d][value='1']").prop("checked",true);
                        }else if(range <=2){ 
                            $('.intro_1,.intro_3').hide();
                            $('.intro_2').show();
                            $("input[name=carousel-3d][value='2']").prop("checked",true);
                        }else{
                            $('.intro_2').hide();
                            $('.intro_3').show();
                            $("input[name=carousel-3d][value='3']").prop("checked",true);
                } 
            }else{
            return;
        }
    });
    if(wdth <= 1200){
        $('.intro_ctx').show();
        $('#connector').hide();
    };

// mouseWheel
    let intro_box=$('.intro_ctx').length;
    let currentItem = 1;

    $(window).on("mousewheel", _.throttle(function(event, delta) {
        if (delta < 0) {
            if (currentItem < intro_box) {
                currentItem++;
            }
        } else {
            if (currentItem > 1) {
                currentItem--;
            }
        }
        console.log(currentItem);
        $('#range').val(currentItem).trigger('input');  
    }, 1000, { "leading": true, "trailing": false }));


// line to line
    var line = $('#connector');
    var div1 = $('.dot_start');
    var div2 = $('.dot_end');
    var x1 = div1.offset().left + (div1.width()/2);
    var y1 = div1.offset().top + (div1.height()/2);
    var x2 = div2.offset().left + (div2.width()/2);
    var y2 = div2.offset().top + (div2.height()/2);
    line.attr('x1',x1).attr('y1',y1).attr('x2',x2).attr('y2',y2);
});


