/**
 * Created by DELL on 2018-01-16.
 */

!function(){


    //1.获取到传来的数据
    var searchData = getSearchObj();
    console.log(getSearchObj());
    //2.将数据复制给当前页面的input框
    $('.lt_search input').val(searchData.key);
    //3.根据此数据渲染初始页面


    //4.渲染初始页面
    render();
    function render(){
        //.1获取到搜索框的value的值传给后台渲染数据
        var param = {};
        param.page = 1;
        param.pageSize = 100;
        param.proName = $(".lt_search input").val();
        //2.发送ajax请求
        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:param,
            success:function(info){
                //渲染数据
                console.log(info);
                $('.lt_product').html(template('tpl_list',info))
            }
        })
    }

    //5.给按钮注册点击事件 点击渲染搜索
    $('.search_btn').on('click',function(){
        render();
    });

    //6.渲染排序
    $('.lt_sort > a[data-type]').on('click',function(){
        //当a标签被点击时 给其添加类名new
        //并且使其 箭头朝上
        if ($(this).hasClass("new")) {
            //有now这个类，修改a标签下面的span标签的 fa-angle-down
            $(this).find("span").toggleClass("fa-angle-down").toggleClass('fa-angle-up');
        } else {
            //没有now这类，添加这个类
            $(this).addClass("new").siblings().removeClass("new");
            //让所有的箭头都向下
            $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
    })





}();