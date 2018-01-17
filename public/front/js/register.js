/**
 * Created by DELL on 2018-01-17.
 */

$(function(){
    //1.获取验证码
    $('.btn_getCode').on('click',function(){
        //阻止默认行为
        e.preventDefault();

        //禁用调用按钮
        $this = $(this);

        $this.prop('disabled',true).addClass('disabled')
            .text('发送送中')

        //ajax发送请求

        $.ajax({
            type:'get',
            url:'/user/vCode',
            success:function(info){

                //开启定时器
                var time = 5;
                var timeID = setInterval(function(){
                    time--;
                    $this.text(time + '秒后再次发送');

                    if(time <= 0){
                        //清除定时器
                        clearInterval(timeID);
                        //按钮的样式复原
                        $this.removeClass('disabled').prop('disabled',false)
                            .text("再次发送");
                    }
                },1000)
            }

        })

    })


    //2.注册功能
    $('.btn_register').on('click',function(e){
        e.preventDefault();

        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        var repass = $('[name="repass"]').val();
        var mobile = $('[name="mobile"]').val();
        var vCode = $('[name="vCode"]').val();

        //验证表单
        if(!username){
            mui.toast('请输入用户名');
            return;
        }
        if(!password){
            mui.toast('请输入密码');
            return;
        }
        if(repass != password){
            mui.toast('两次输入的密码不一致');
            return;
        }
        if(!mpbile){
            mui.toast('请输入手机号');
            return;
        }
        if(!/^1[3-9]\d{9}$/.test(mobile)){
            mui.toast('请输入正确的手机号');
            return;
        }
        if(!vCode){
            mui.toast('输入验证码');
            return;
        }

        //发送ajax请求
        $.ajax({
            type:'post',
            url:'/user/register',
            data:$('form').serialize(),
            success:function(info){
                if(info.error){
                    mui.toast(info.message);
                }
                if(info.success){
                    mui.toast('')
                }

            }
        })


    })
});











