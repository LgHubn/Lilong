/**
 * Created by DELL on 2018-01-14.
 */

+function(){

    //1.页面的初始渲染一级分类
    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategory',
            success:function(info){
                console.log(info);
                $('.scroll_lt').html(template('lt_tpl',info));

                renderR(info.rows[0].id);
            }
        });
    }

    //2.给一级中的a标签注册点击事件
    $('.scroll_lt').on('click','li',function(){
        console.log('呵呵');
        //发送ajax请求 渲染二级分类
        //获取到一级分类中的id
        //清除其他li中的类名 active 给自己添加
        var id = $(this).data('id');
        $(this).siblings().children('a').removeClass('now');
        $(this).children('a').addClass('now');
        renderR(id);


    });

    //3.二级分类中渲染数据 需要根据一级分类的id渲染
    function renderR(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(info){
                console.log(info);
                $('.scroll_rt').html(template('rt_tpl',info));
            }
        })
    }













    //入口函数的闭合
}();






























