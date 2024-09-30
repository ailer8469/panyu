$(function(){
    $(".lg_btn").click(function(){
        if( $('.nav_use_pc').css.display="block"){
            $('.nav_use_pc').hide(700);
        }
            $('.open_login').slideToggle(1000);
            $('.content').slideToggle(1000); 
            $('.global_line').slideToggle(1000);  
    });

    $('#lg_close').click(function(){
        $('.open_login').slideToggle(1000);
        $('.content').slideToggle(1000);
        $('.global_line').slideToggle(1000);   
    })
})
