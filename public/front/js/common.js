/**
 * Created by DELL on 2018-01-14.
 */

+function(){

    //1.初始化窗口滚动效果
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
    });
    //2.初始化轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
        //interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });

    //入口函数的括号
}();

//封装的获取地址栏中的数据
function getSearchObj(){
    //获取地址栏中的参数
    var search = location.search;
    //将获取到参数解码
    //console.log(search);
    search = decodeURI(search);
    //console.log(search);
    search = search.slice(1);
    var arr = search.split("&");
    //把数据变成对象
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var key = arr[i].split("=")[0];
        var value = arr[i].split("=")[1];
        obj[key] = value;
    }
    return obj;
}















