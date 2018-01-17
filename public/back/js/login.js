/**
 * Created by DELL on 2018-01-11.
 */


+function(){
    //设置表单验证
    //要求用户名和密码不能为空而且密码为6~12为
    //表单校验的功能
    //1. 用户名不能为空
    //2. 用户密码不能为空
    //3. 用户密码的长度是6-12位

    //如何使用表单校验插件：
    //1. 引包
    //2. 调用bootstrapValidator
    var $form = $('form');
    $form.bootstrapValidator({
        //配置校验时的图标,
        feedbackIcons: {
            //校验成功的图标
            valid: 'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置校验的规则
        //字段，你想要校验哪些字段
        fields: {
            //username对应的表单中name属性。
            username: {
                //username的规则
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    callback: {
                        message:"用户名不存在"
                    }
                }

            },
            password: {

                //password的规则
                validators: {
                    notEmpty: {
                        message: "用户密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度是6-12位"
                    },
                    callback: {
                        message:"密码错误"
                    }
                }

            }
        }


        //入口函数的括号
    });

    //重置功能，重置样式
    $("[type='reset']").on("click", function () {

        //重置样式
        $form.data("bootstrapValidator").resetForm();

    });

    //需要给表单注册一个效验成功的事件
    $form.on("success.form.bv",function(e){
        //阻止表单的提交
        e.preventDefault();
        //发送ajax的请求
        console.log('准备发送请求啦');
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$form.serialize(),
            success:function(info){
                //登录成功的话
                if(info.success){
                    location.href = 'index.html';
                }
                if(data.error == 1000){
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }
                if(data.error === 1001){
                    //alert("密码错误");

                    $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }

            }
        })

    });

    //入口函数的括号
}();















