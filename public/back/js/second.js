/**
 * Created by DELL on 2018-01-13.
 */

!function(){
    //生成分页 的变量
    var page = 1;
    var pageSize = 10;

    //分页的渲染
    //定义一个函数渲染
    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                //渲染到页面上
                $('tbody').html(template('tpl',info));
                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, p) {
                        //修改page的值，重新渲染
                        page = p;
                        render();
                    }
                });

            }
        })
    }

    //2.添加,显示模态框
    $('.btn_add').on('click',function(){
        $('#addModal').modal('show');
        //3. //发送ajax请求.获取所有的一级分类数据渲染到下拉框
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info);
                $(".dropdown-menu").html(template("addtpl", info));
            }
        });
    });

    //3. 下拉列表选中功能
    //3.1 给下拉列表中的a注册点击事件
    //3.2 获取点击的a标签的内容，设置给dropdown-text的内容

    $('.dropdown-menu').on('click','li',function(){
        //获取到li标签中a便签中的text值并赋值给
        //dropdown-text
        var txt = this.firstElementChild.text ;
        //console.log(txt);
        $('.dropdown-text').text(txt);
        //$('.dropdown > button').text(txt);
        var id = this.firstElementChild.getAttribute('data-id');
        //console.log(id);
        $('#categoryId').val(id);
        $('form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });
    
    //初始化文件上传功能
    $('#fileupload').fileupload({
        dataType: 'json',
        //文件上传成功时，会执行的回调函数
        done: function (e, data) {
            //通过data.result可以获取到一个对象，这个对象的picAddr属性就是图片的地址
            console.log(data);
            var result = data.result.picAddr;
            $(".img_box img").attr("src", result);

            //修改隐藏域的value值
            $("#brandLogo").val(result);

            //让brandLogo改为VALID状态
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

    //表单验证功能----------------------------------------------------------------
    var $form = $("form");
    $form.bootstrapValidator({
        //配置不做校验的内容，给空数组，目的是让隐藏的和禁用的都做校验
        excluded:[],
        //配置校验时显示的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置校验规则
        fields:{

            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入品牌的名称"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传品牌的图片"
                    }
                }
            }
        }
    });

    //给表单注册验证成功事件
    $('form').on('success.form.bv',function(e){
        //阻止默认提交
        e.preventDefault();

        //发送ajax请求
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('form').serialize(),
            success:function(info){
                if(info.success){
                    //隐藏莫态框
                    $("#addModal").modal("hide");
                    //渲染页面
                    page=1;
                    render();
                    //重置表单样式
                    $form.data("bootstrapValidator").resetForm(true);
                    //重置按钮的值，图片的值
                    //dropdown-text是一个span，不能用val，用text方法
                    $(".dropdown-text").text('请选择一级分类');
                    $(".img_box img").attr("src", 'images/none.png');

                }
            }
        })
    })









    //下边为入口函数的闭合
}();




























