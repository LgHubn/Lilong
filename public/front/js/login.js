/**
 * Created by DELL on 2018-01-17.
 */


+function(){
  //1.获取到用户名和密码

    //给登录按钮注册点击事件 阻止表单提交

    $('.btn_login').on('click',function(e){
        e.preventDefault();
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();

        if(!username){
            mui.toast("用户名不能为空");
            return;
        }
        if(!password){
            mui.toast("密码不能为空");
            return;
        }

        //发送ajax请求
        $.ajax({
            type:'post',
            url:"/user/login",
            data:{
                username:username,
                password:password
            },
            success:function(info){
                if(info.error){
                    mui.toast(info.message);
                }
                if(info.success){
                    //在跳转过来的页面传来一个ret参数
                    //里边携带啦原本的地址
                    //这里需要判断是否存在此参数
                    if(location.search.indexOf("retUrl")== -1){
                        //没有
                        location.href = "user.html";
                    }else{
                        //var retUrl = getSearch('retUrl');
                        //有的话就跳转
                        var search = location.search;
                        search = search.replace("?retUrl","");
                        location.href = search;
                    }

                    //成功的处理


                }
            }
        })

    })



}();











