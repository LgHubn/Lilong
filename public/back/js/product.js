/**
 * Created by DELL on 2018-01-15.
 */
!function(){

    var page= 1;
    var pageSize = 5;
    var imgArr = [];//功能是为了储存上传图片的结果


    //1.动态渲染初始化数据

    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data: {
                page: page,
                pageSize: pageSize
            },
            success:function(info){
                //console.log(info);
                $('.lt_content tbody').html(template('tpl_list',info));
                //分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    size: "normal",//设置控件的大小

                    //type: 具体的页码，返回page  首页-->first  上一页-->prev  下一页-->next  最后一页-->last
                    //这个函数的返回值，就是按钮的内容
                    itemTexts: function (type, page, current) {
                        //根据type的不同，返回不同的字符串
                        console.log(type, page, current);
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            case "page":
                                return page;
                        }
                        //return 111;
                    },
                    tooltipTitles: function (type, page, current) {
                        //根据type的不同，返回不同的字符串
                        console.log(type, page, current);
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            case "page":
                                return "去第"+page+"页";
                        }
                        //return 111;
                    },
                    useBootstrapTooltip:true,//使用boostrap的tooltip
                    onPageClicked: function (a, b, c, p) {
                        page = p;
                        render();
                    }
                });
            }
        })
    }


    // 2. 模态框的显示隐藏 以及其中表单的验证

    //$('#AddModal').modal('show');
    $('.lt_content .btn_add').on('click',function(){
        $('#AddModal').modal('show');
    });


    //3..渲染模态框中的一级分类数据

    $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{
            page: 1,
            pageSize: 100
        },
        success:function(info){
            //console.log(info);
            $('.dropdown-menu').html(template('one-level',info));

        }
    });


    //4.下拉框中的a注册事件

    $('.dropdown-menu').on('click','a',function(){
        //console.log(this);
        //获取到对应下拉选项的值赋值给button按钮
        var txt = $(this).text();
        //console.log(txt);
        $('.dropdown-text').text(txt);
        //获取到id,赋值给brandId
        $("#brandId").val($(this).data("id"));
        //然后让表单通过验证
        $('form').data("bootstrapValidator").updateStatus("brandId", "VALID");
    });


    //5.表单的验证

    var $form = $('form');
    $form.bootstrapValidator({
        //1.指定不效验的类型
        excluded:[],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3.指定效验的字段
        fields:{
            brandId:{
                validators: {
                    //不能为空的时候的提示信息
                    notEmpty: {
                        message: "你二级分类还没选"
                    },
                    //设置长度限制
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                    }
                }
            },
            proName:{
                validators: {
                    //不能为空的时候的提示信息
                    notEmpty: {
                        message: "商品名字你不写吗?"
                    },
                    //设置长度限制
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                    }
                }
            },
            proDesc:{
                validators: {
                    //不能为空的时候的提示信息
                    notEmpty: {
                        message: "稍稍的描述一下呀你"
                    }
                }
            },
            num:{
                validators: {
                    //不能为空的时候的提示信息
                    notEmpty: {
                        message: "大锅没有库存你买什么?"
                    },
                    //正则效验
                    regexp:{
                        regexp: /^[1-9]\d*$/,
                        message: "请输入合法的库存"
                    }
                }
            },
            size:{
                validators:{
                    //不能为空的时候的提示信息
                    notEmpty: {
                        message: "填写尺码呀"
                    },
                    //正则效验
                    regexp:{
                        regexp: /^\d{2}-\d{2}$/,
                        message: "输入正常的尺码好吧，还是你感觉100的尺码很正常?"
                    }
                }
            },
            oldPrice:{
                validators:{
                    //不能为空的时候的提示信息
                    notEmpty: {
                        message: "原价是多少呢?"
                    }
                }
            },
            price:{
                validators:{
                    //不能为空的时候的提示信息
                    notEmpty: {
                        message: "现在价钱是多少呢?"
                    }
                }
            },
            productLogo:{
                validators:{
                    //不能为空的时候的提示信息
                    notEmpty: {
                        message: "图片要三张懂否?"
                    }
                }
            }

        }
    });


    //6.上传图片,并展示
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，
        // 通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            console.log(data);
            //上传成功的时候 每次触发回调函数
            // 就将图片地址储存在imgArr中 然后判断其长度
            // 来限制上传图片的数量;
            if(imgArr.length >= 3){
                return false
            }

            //console.log(data.result.picAddr);
            imgArr.push(data.result);
            console.log(imgArr);
            var img = document.createElement('img');
            img.src = data.result.picAddr;
            $('.img_box').append(img);

            //根据imgArr的长度来手动来设置表单的验证功能
            if(imgArr.length === 3){
                $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
            }else{
                $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
            }
        }
    });



    //7. 给表单注册校验成功事件
    $form.on("success.form.bv", function (e) {
        e.preventDefault();


        var param = $form.serialize()+'&brandLogo=';

        //拼接上数组中picName和picAddr
        param += "&picName1=" + imgArr[0].picName + "&picAddr1=" + imgArr[0].picAddr;
        param += "&picName2=" + imgArr[1].picName + "&picAddr2=" + imgArr[1].picAddr;
        param += "&picName3=" + imgArr[2].picName + "&picAddr3=" + imgArr[2].picAddr;

        console.log(param);
        //发送ajax请求
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: param,
            success: function (info) {
                if (info.success) {
                    //1. 隐藏模态框
                    $("#AddModal").modal("hide");
                    //2. 重新渲染第一页
                    page = 1;
                    render();

                    //3. 重置表单
                    $form.data("bootstrapValidator").resetForm(true);

                    $(".dropdown-text").text("请选择二级分类");
                    $(".img_box img").remove();//图片自杀

                    //4. 清空数组
                    imgArr = [];

                }
            }
        })

    })



//    入口函数的括号
}();















