/**
 * Created by DELL on 2018-01-16.
 */

+function(){
    //获取历史记录
    function getHistory(){
        var hisstory = localStorage.getItem('lt_search_history')||'[]';
        //因为获取到的sessionStorage中的数据中的中文会被编码
        //因此需要解码后 传出
        var arr = JSON.parse(hisstory);

        return arr;
    }
    //1.初始化渲染历史记录
    render();
    function render(){
        //console.log('猪');
        //1.1 获取localStorage中lt_search_history对应的值
        var arr = getHistory();
        //1.2 使用模版引擎渲染数据, 模版和数据绑定之后，
        // 模版是通过对象的属性来获取对象的值。
        console.log(arr);
        //console.log($(".history_content > ul"));
        $(".lt_history")
            .html( template("tpl",{arr:arr}));
    }

    //2.当点击清空历史记录的时候清除历史记录
    $('.lt_history').on('click','.btn_empty',function(){
        mui.confirm("您是否要清空所有的历史记录?",
            "温馨提示",
            ["是", "否"],
            function(e){
                if(e.index ===0){
                    //直接把localStorage中的lt_search_history删掉
                    localStorage.removeItem("lt_search_history");
                    render();
                }
            })
    });

    //3.删除单条的历史记录
    $('.lt_history').on('click','.btn_delete',function(){
        //找到x号 对应的index
        var index = $(this).data('index');
        //获取到现有的历史记录
        var arr = getHistory();
        //在数组arr中删除对应的信息
        arr.splice(index,1);
        //将arr重新编码
        var arr = JSON.stringify(arr);
        //放回session.Storage中的lt_search_history中
        localStorage.getItem('lt_search_history',arr);
        //重新渲染历史记录数据
        render();
    });

    //4.历史记录的需求
    var arr = getHistory();
    //添加的需求：
    // 给按钮注册点击事件
    $('.search_btn').on('click',function(){
        var history = $('.lt_search input').val().trim();
        $(".lt_search input").val('');
        if(!history){
            mui.toast("请输入搜索关键字");
            return;
        }
        //. 如果搜索的历史记录，已经存在，需要把这个历史记录移动到最前面。
        //获取到搜索框的值

        if(arr.indexOf(history) != -1){
            arr.splice(arr.indexOf(history),1);
        }

        //. 历史记录最大不超过10
        //这里直接判断arr的的长度如果大于10就从后边删一条
        if(arr.length >=10){
            arr.pop();
        }

        //. 添加历史记录
        arr.unshift(history);
        //将历史记录数据储存在localStorage中
        localStorage.setItem("lt_search_history", JSON.stringify(arr));
        render();
        //页面跳转到商品展示列表区
        location.href = "searchList.html?key="+history;
    });






// 入口函数的闭合
}();
































