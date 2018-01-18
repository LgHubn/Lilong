/**
 * Created by DELL on 2018-01-17.
 */



$(function(){

    //1.获取都地址栏传过来的productId
    var productId = getSearchObj("productId");
    //console.log(productId);//验证完成
    var id = productId.productId
    //console.log(id);
    //渲染初始化页面
    render();
    //2.根据此id发送ajax请求获取数据
    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetail',
            data:{
                id:id
            },
            success:function(info){
                console.log(info);
                $('.mui-scroll')
                    .html(template('tpl_lb',info));
                //重新初始化轮播图组件
                mui(".lt_middle").slider({
                    interval:1000
                });

                //初始化数字输入框
                mui('.mui-numbox').numbox();

                //尺码选择高亮{
                $('.lt_product_size span').on('click',function(){
                    //console.log('呵呵');
                    $(this).siblings('span').removeClass('active');
                    $(this).addClass('active');
                });
            }
        })
    }



    
    //4.加入购物车
    $('.btn_add_cart').on('click',function(){

        console.log('呵呵');
        //获取到大小
        var size = $('.mui-numbox-input').val();


        //获取到数量
        var num = $('.lt_product_num input').val();

        //发送ajax请求
        $.ajax({
            type:'post',
            url:'/cart/addCart',
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
});































