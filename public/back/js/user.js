/**
 * Created by DELL on 2018-01-13.
 */

+function(){

    var page = 1;//记录页码
    var pageSize = 5; //每页的条数

    render();
    //创建render渲染函数
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                //渲染数据
                $('tbody').html(template('tpl',info));
                //渲染分页
                $("#paginator").bootstrapPaginator({

                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: page,//设置当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    numberOfPages: 5,//空间上显示的条数
                    onPageClicked:function(a,b,c,p){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page=p;
                        render();
                    }
                });
            }

        })
    }

    var id ;
    var isDelete;
    $('tbody').on('click','button',function(){
        //获取到需要的数据
        id = $(this).parent('td').data('id');
        isDelete = $(this).hasClass("btn-success") ? 1 : 0;
        //让模态框显示
        $("#userModal").modal("show");
    });
    $('#userModal .btn-default').on('click',function(){
        console.log('取消');
        $("#userModal").modal('hide');
    });
    $('#userModal .btn_logout').on('click',function(){
        console.log('确认');
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(info){
                if(info.success) {
                    //关闭模态框
                    $("#userModal").modal('hide');
                    //重新渲染页面
                    render();
                }
            }
        })
    });





    //入口函数的括号
}();
























