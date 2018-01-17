/**
 * Created by DELL on 2018-01-17.
 */


$(function(){

//mui的坑 1.结束下拉刷新的方法,不是endPulldown,而是
    //endPullToRefa

    //2.下拉刷新会禁用click的事件 换成tap事件来替换使用


    //1.下拉刷新
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                //style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                //color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                //height:'50px',//可选,默认50px.下拉刷新控件的高度,
                //range:'100px', //可选 默认100px,控件可下拉拖拽的范围
                //offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                callback :function() {
                    console.log('呵呵');

                    //初始化渲染页面
                    $.ajax({
                        type:'get',
                        url:'/cart/queryCart',
                        success:function(info){
                            if(info.error == 400){
                                //未登录
                                location.href = 'login.html';
                            }
                            $('#OA_task_2').html(template('tpl',{list:info}));
                            //$('.lt_middle').pullRefresh().endPulldown();
                            setTimeout(function(){
                                //结束下拉刷新
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                            },1000)
                        }
                    });

                }
            }
        }
    });



    //2.找到所有的删除按钮注册事件

    $('#OA_task_2').on('tap','btn_delete',function(e){
       //获取到需要的id
        var id = $(this).parent().data('id');

        //生成莫态框
        mui.confirm('您是否要删除这个商品','温馨提示',
        ['否','是'],function(e){
                //根据id发送ajax请求
                $.ajax({
                    type:'get',
                    url:'/cart/deleteCart',
                    data:{
                        //后台需要的是数组
                        id:[id]
                    },
                    success:function(info){
                        if(info.success){
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();

                        }
                    }

                })
            })

    })


    //3.修改功能
    $('#OA_task_2').on('tap','btn_edit',function(){
        //获取购物车的信息
        var data = this.dataset;
        //根据id渲染信息到mui.confirm框
        //把html中所有的换行(\n)替换掉
        //否则会被当做br解析
        var html = template('tpl2',data);
        html = html.replace(/\n/g,'');
        // 根据id来修改数据
        // 然后渲染
        mui.confirm(html,'编辑商品',['确定','取消'],function(e){
            if(e.index == 0){
                //获取懂啊 商品 的id 尺码 数量 发送ajax请求
                var id = data.id;
                var size = $('.lt_edit_size span.now').text();

            }

        });


        //.初始化numbox
        mui('.mui-numbox').numbox();


        //.尺码选择功能


    })
    
    //4.计算价格
    //给所有的ck注册点击事件
    $('OA_task_2').on('change','ck',function(){
        var total = [];
        $('.ck:checked');





        $('.lt_total span').text(total)
    })





});











