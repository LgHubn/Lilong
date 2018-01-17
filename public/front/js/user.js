/**
 * Created by DELL on 2018-01-17.
 */

$(function(){
    //1.ajax请求获取当前用户的信息

    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        success:function(info){
            if(info.error ==400){
                //没登陆
                location.href ="login.html";
            }
            //已经登录的话
            $('.userinfo').html(template('tpl',info));
        }
    })

    //2.
    $('.btn_logout').on('click',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            success:function(info){
                if(info.success){
                    location.href= "login.html";
                }
            }
        })
    })

});


















