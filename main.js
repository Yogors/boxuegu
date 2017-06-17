require.config({
    baseUrl: "./js",
    paths: {
        jquery: "lib/jquery-1.11.1",
        bootstrap: '../assets/bootstrap/js/bootstrap',
        uploadify: '../assets/uploadify/jquery.uploadify',
        cookie: 'lib/jquery.cookie',
        text: 'lib/text',
        template: 'lib/template-web',
        tpls: '../tpls',
        assets: '../assets',
        lang: '../assets/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN',
        uEditor: '../assets/UEditor/ueditor.all',
        uEditorConf: '../assets/UEditor/ueditor.config'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        uploadify: {
            deps: ['jquery']
        },
        lang: {
            deps: ['jquery']
        }
    }
})

require(["jquery", 'courseCategory/list', 'course/list', 'common/courseManageApi', 'courseManage/courseTimeManage', 'course/addBaseInfo', 'course/pic', 'teacher/list', 'personalCenter/edit', 'common/charts', 'common/loading', 'common/checkLogin'], function ($, counseCategoryList, courseManageList, api, courseTimeManage, addBaseInfo, picEdit, teacherList, personalInfoEdit, charts) {

    //获取登录后用户名及头像cookie
    var tc_name = $.cookie('tc_name');
    var tc_avatar = $.cookie('tc_avatar');
    //根据cookie内容设置用户名及头像
    // $('.userIcon img').attr('src', tc_avatar);
    $('.userName').html(tc_name);

    //退出登录功能，返回登录页面
    $('#quitBtn').click(function () {
        $.post('/api/logout', function (res) {
            if (res.code == 200) {
                $.removeCookie('tc_name');
                $.removeCookie('tc_avatar');
                location.href = "login.html";
            }
        })
    });
    //设置左方管理列表各项点击事件
    //讲师管理模块点击事件
    $('.section-container button').click(
        function () {
            $('.section-container button').removeClass('active');
            $(this).addClass('active');
        }
    )
    $('#teacherManager').click(function () {
        $('.module-container').empty();
        // $('.module-container').append('讲师管理');
        teacherList();
    });
    //课程列表模块点击事件
    $('#courseListManager').click(function () {
        $('.module-container').empty();
        // $('.module-container').append('课程列表');
        courseManageList();
    });
    //课程列表4个子列表
    //创建课程
    $('#courseCreat').click(function () {
        // courseCreate();
        api.courseCreate();
    })
    $('#courseListAdd').click(function () {
        $('.module-container').empty();
        $('.module-container').append('添加课程');
    })
    $('#courseListImgs').click(function () {
        $('.module-container').empty();
        // $('.module-container').append('添加课程图片');
        // console.log($(this).attr('cs_id'));
        picEdit($(this).attr('cs_id'));
    })
    $('#courseTimeManager').click(function () {
        $('.module-container').empty();
        courseTimeManage();
    })
    //课程添加按钮
    $('#courseInfoAdd').click(function () {
        $('.module-container').empty();
        addBaseInfo();
    })

    //课程分类模块点击事件
    $('#courseCategoryManager').click(function () {
        $('.module-container').empty();
        //调用courseCategory中list.js 
        counseCategoryList();
    });
    //图表统计模块点击事件
    $('#chartsManager').click(function () {
        $('.module-container').empty();
        // $('.module-container').append('图表统计');
        charts();
    });
    //个人中心
    $('#personalCenter').click(function () {
        $('.module-container').empty();
        personalInfoEdit();
        // $('.module-container').append('个人中心');
    })
    $('#courseCategoryManager').click();
})