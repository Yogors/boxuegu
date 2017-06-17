define(['jquery', 'lib/echarts.common.min', 'common/courseManageApi'], function ($, echarts, api) {
    return function () {
        $('<div id="main" style="width: 600px;height:400px;">图标统计</div>').appendTo($('.module-container'));
        api.getTeacherList(function (res) {
            console.log(res);
            var genderArr = res.result;
            var gender = [{
                name: '男',
                value: 0
            }, {
                name: '女',
                value: 0
            }]
            genderArr.forEach(function (value) {
                if (value.tc_gender == 0) {
                    gender[0].value++;
                } else {
                    gender[1].value++;
                }
            })
            var myChart = echarts.init($('#main').get(0));
            // 指定图表的配置项和数据
            option = {
                title: {
                    text: '讲师男女比例',
                    subtext: '传智播客',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: ['男', '女']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        }
                    }
                },
                calculable: true,
                series: [{
                    name: '半径模式',
                    type: 'pie',
                    radius: [20, 110],
                    center: ['50%', '50%'],
                    roseType: 'radius',
                    x: 'center',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: gender
                }, ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        })

    }
})