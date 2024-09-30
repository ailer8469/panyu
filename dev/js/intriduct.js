$(function(){
    var item= $('.item');
    var context=$('.slider_ctx');
    var numItems=item.length;
    var currentItem = 1;
    var li_rotate= $('.rotate_date li');
    var perPage=6;
    var totalPages= Math.ceil(numItems / perPage);
//------------------------------------------
// item carousel
    $('.slider_items').slick({
        infinite:false,
        vertical:true,
        arrows: true,
        speed: 300,
        slidesToShow: perPage,
        slidesToScroll: 1,
        easing: 'linear',
        asNavFor: '.rotate_date',
        focusOnSelect: true,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
            touchMove: true,
            verticalSwiping: true,
            slidesToScroll: 3,
            }
        }
        ]
    });
// date carousel
    $('.rotate_date').slick({
        infinite:false,
        vertical:true,
        arrows: true,
        speed: 300,
        slidesToShow: perPage,
        slidesToScroll: 1,
        easing: 'linear',
        asNavFor: '.slider_items',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                touchMove: true,
                verticalSwiping: true,
                slidesToScroll: 3,
                }
            }
            ]
    });
//------------------------------------------
    $('.slider_items').on('afterChange',function(){
        if($('.slider_items .slick-active').length< perPage){
            for(i= numItems- perPage; i< numItems; i++){
            item.eq(i).addClass('slick-active');
            $('.rotate_date .slick-slide').eq(i).addClass('slick-active');
            } 
        } 
        item.on('click',function(e){
            e.preventDefault();
            $(this).addClass('slick-current').siblings('.item').removeClass('slick-current');
            if(!$(this).hasClass('clk_item')){
                $(this).addClass('clk_item').siblings('.item').removeClass('clk_item');
            }
            let index = $(this).index(); 
            li_rotate.removeClass('clk_date');
            li_rotate.eq(index).addClass('clk_date');
            context.eq(index).show().siblings('.slider_ctx').hide();
        });
    })
//------------------------------------------
    $(window).on("mousewheel", _.throttle(function(event, delta) {
        if (delta < 0) {
            if (currentItem < numItems) {
                currentItem++;
            }
            $('.slick-next').trigger('click');
        } else {
            if (currentItem > 1) {
                currentItem--;
            }
            $('.slick-prev').trigger('click');
        }
        console.log(currentItem);
        let nowItem=$('.item').eq(currentItem - 1);
        if(!nowItem.hasClass('clk_item')){
            nowItem.addClass('clk_item').siblings('.item').removeClass('clk_item');
        }
        li_rotate.removeClass('clk_date');
        li_rotate.eq(currentItem - 1).addClass('clk_date');
        context.eq(currentItem - 1).show().siblings(context).hide();

        let nowPage= Math.ceil(currentItem / perPage);
        $('#nowPage').bind("input",function(){
            $(".pagination li[data-slide]").eq(nowPage-1).addClass('clk_page').siblings($(".current-page")).removeClass('clk_page');
        });
        $('#curItem').val(currentItem).trigger("input"); 
        $('#nowPage').val(nowPage).trigger("input");
    }, 600, { "leading": true, "trailing": false }));
//------------------------------------------
    // pagination
    $(".pagination").append("<li class='current-page clk_page' data-slide=" + 1 + ">" + 1 + "</li>"); 

    for (var i = 2; i <= totalPages; i++) {
        $(".pagination").append("<li class='current-page' data-slide=" + i + ">" + i + "</li>"); 
    };
//------------------------------------------
    $(".pagination li[data-slide]").on("click",function(e){
        if($(this).hasClass('clk_page')){
            return false;
        }else {
            let index=$(this).index();
            let first= perPage * index;
            e.preventDefault();
            $(this).addClass('clk_page').siblings($(".current-page")).removeClass('clk_page');
            $('.slider_items').slick('slickGoTo', first);
            item.eq(first).addClass('clk_item').siblings('.item').removeClass('clk_item');
            li_rotate.removeClass('clk_date');
            li_rotate.eq(first).addClass('clk_date');
            // switch context
            context.eq(first).show().siblings(context).hide();
        }
    });
// modal-----------------------------------
    let modal = document.querySelector("#myModal");
    var wdth=$(window).width();
    $(window).resize(function(){
        wdth=$(window).width();
    });

    // information modal 
    item.click(function(){
        if( wdth <= 1300){
            if(modal.style.display = "flex"){
                return false;
            }else{
                modal.style.display = "flex";
            }
        } else {
            modal.style.display = "none";
        }
    });
    $(".close").eq(0).on('click',function () {
        modal.style.display = "none";
    });
    $(window).on('click',function(event) {
        if ( event.target == modal ) {
            modal.style.display = "none";
        };  
        
    });
})