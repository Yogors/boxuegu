// 设置ajax请求时页面出现刷新标志， 以让用户不再重复触发请求
define(["jquery", "text!tpls/loading.html"], function ($, loadingTpl) {
    var $loadingTpl = $(loadingTpl);

    $.ajaxSetup({
        //ajax发送数据前触发
        beforeSend: function () {
            // console.log("start");
            $loadingTpl.appendTo("body").modal({
                backdrop: "static" //模态框不会自动关闭
            })
        },
        //ajax完成数据请求时
        complete: function () {
            // console.log("over");
            $loadingTpl.modal("hide");
        }
    })
});