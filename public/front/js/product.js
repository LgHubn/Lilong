/**
 * Created by DELL on 2018-01-17.
 */













//3.加入购物车
$('.btn_add_cart').on('click',function(){


    //获取到大小
    var size = $('.mui-numbox-input').val();


    //获取到数量
    var num = $('').val();

    //发送ajax请求
    $.ajax({
        type:'post',
        url:'',
        data:{
            size:size,
            num:num
        },
        success:function(info){
            console.log(info);

        // 未登录状态
            if(info.error == 400){
                location.href = "login.html?retUrl="+location.href;
            }
            if(info.success){
                mui.confirm("添加成功",
                    "温馨提示",
                    ["去购物车", "继续浏览"],function(e){
                        if(e.index == 0){
                            location.href = "cart.html";
                        }
                    });
            }

        }
    })

});





















