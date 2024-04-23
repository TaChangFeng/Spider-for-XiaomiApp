(function () {
    var mychart = echarts.init(document.querySelector(".lup .chart"));
    
    // 发送 AJAX 请求获取所有数据总数
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_all_collection_data_count', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var data_counts = JSON.parse(xhr.responseText);

             // 总数据量
             var total_data_count = Object.values(data_counts).reduce((acc, val) => acc + val, 0);
            
            // 将数据总数转换为数组
            var data_values = Object.values(data_counts);
            
            // 使用获取到的数据总数更新图表数据
            var option = {
                color: ["#2f89cf"],
                tooltip: {
                    trigger:"axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    left: "0%",
                    top: "10px",
                    right: "0%",
                    bottom: "0%",
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ["金融理财","聊天社交","旅行交通","居家生活","实用工具","摄影摄像","图书阅读"],
                    axisLabel: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: "12",
                        rotate: 45  // 旋转角度为45度
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: "12"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)",
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)"
                        }
                    }
                },
                series: [
                  {
                    name: "直接访问",
                    type: "bar",
                    // 修改柱子宽度
                    barWidth: "35%",
                    data: data_values,
                    itemStyle: {
                        barBorderRadius: 5
                    }
                  }
                ]
            };
            mychart.setOption(option);
            document.getElementById('total_data_count').innerText = total_data_count; // 更新总数据量
        }
    };
    xhr.send();
})();

(function () {
    var mychart2 = echarts.init(document.querySelector(".ldown .chart"));
    var categories = ['金融理财', '聊天社交', '旅行交通', '居家生活', '实用工具', '摄影摄像', '图书阅读'];
    
    // 发送 AJAX 请求获取所有数据总数
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_all_collection_data_count', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var data_counts = JSON.parse(xhr.responseText);

            // 将数据总数转换为数组
            var data_values = Object.values(data_counts);
            
            // 构造饼图数据格式，并使用预设的属性名称
            var pie_data = categories.map(function(category, index) {
                return { value: data_values[index], name: category };
            });
            
            // 使用获取到的数据总数更新饼图数据
            var option = {
                color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9'],
                tooltip: {
                    trigger: 'item'
                  },
                series: [
                {
                    name: '各分类应用存储数量',
                    type: 'pie',
                    radius: [50, 250],
                    center: ['50%', '55%'],
                    radius: ['10%', '80%'],
                    roseType: 'radius',
                    itemStyle: {
                        borderRadius: 11
                    },
                    data: pie_data
                }]
            };
            mychart2.setOption(option);
        }
    };
    xhr.send();
})();


(function(){
    var mychart3 = echarts.init(document.querySelector(".rup .chart"));
    
    // 定义类别名称映射对象
    var categoryMapping = {
        'apps1': '金融理财',
        'apps2': '聊天社交',
        'apps3': '旅行交通',
        'apps4': '居家生活',
        'apps5': '实用工具',
        'apps6': '摄影摄像',
        'apps7': '图书阅读'
    };

    // 发送 AJAX 请求获取每个集合的评分大于8分的数据数量
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_high_rating_data_count', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            // 构造饼图数据格式
            var pie_data = [];
            for (var key in data) {
                // 获取类别名称
                var category = categoryMapping[key] || key;
                pie_data.push({ value: data[key], name: category });
            }

            // 使用获取到的数据更新饼图数据
            var option = {
                tooltip: {
                  trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center',
                    textStyle: { color: "rgba(255,255,255,.6)" },
                    padding: [-10, 0, 0, 0]
                },
                
                grid: {
                    left: "0%",
                    top: "10px",
                    right: "0%",
                    bottom: "0%",
                    containLabel: true
                },
                series: [
                  {
                    name: '高于8分应用数量',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center:['50%','60%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                      borderRadius: 10,
                      borderColor: 'rgba(255,255,255,.6)',
                      borderWidth: 2
                    },
                    label: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                      }
                    },
                    labelLine: {
                      show: false
                    },
                    data: pie_data
                  }
                ]
            };
            mychart3.setOption(option);
        }
    };
    xhr.send();
})();

(function(){
    var mychart5 = echarts.init(document.querySelector(".mid .chart"));

    // 定义类别名称映射对象
    var categoryMapping = {
        'apps1': '金融理财',
        'apps2': '聊天社交',
        'apps3': '旅行交通',
        'apps4': '居家生活',
        'apps5': '实用工具',
        'apps6': '摄影摄像',
        'apps7': '图书阅读'
    };

    // 发送 AJAX 请求获取所有数据总数
    var xhrDataCount = new XMLHttpRequest();
    xhrDataCount.open('GET', '/get_all_collection_data_count', true);
    xhrDataCount.onreadystatechange = function () {
        if (xhrDataCount.readyState === XMLHttpRequest.DONE && xhrDataCount.status === 200) {
            var dataCounts = JSON.parse(xhrDataCount.responseText);
            
            // 提取数据数量并转换为数组
            var dataValues = Object.values(dataCounts);

            // 发送 AJAX 请求获取评分大于8的数据数量
            var xhrHighRatingCount = new XMLHttpRequest();
            xhrHighRatingCount.open('GET', '/get_high_rating_data_count', true);
            xhrHighRatingCount.onreadystatechange = function () {
                if (xhrHighRatingCount.readyState === XMLHttpRequest.DONE && xhrHighRatingCount.status === 200) {
                    var highRatingCounts = JSON.parse(xhrHighRatingCount.responseText);
                    
                    // 提取评分大于8的数据数量并转换为数组
                    var highRatingValues = Object.values(highRatingCounts);
                    
                    // 发送 AJAX 请求获取评分人数大于1000的数据数量
                    var xhrRatingNumbers = new XMLHttpRequest();
                    xhrRatingNumbers.open('GET', '/rating_numbers', true);
                    xhrRatingNumbers.onreadystatechange = function () {
                        if (xhrRatingNumbers.readyState === XMLHttpRequest.DONE && xhrRatingNumbers.status === 200) {
                            var ratingNumbers = JSON.parse(xhrRatingNumbers.responseText);
                            
                            // 提取评分人数大于1000的数据数量并转换为数组
                            var ratingNumberValues = Object.values(ratingNumbers);
                            
                            // 设置图表选项
                            var option = {
                                legend: { textStyle: { color: "rgba(255,255,255,.6)" } },
                                tooltip: { textStyle: { color: "rgba(255,255,255,.6)" } },
                                dataset: {
                                  source: [
                                    ['product', '数据数量', '评分大于8数量', '评分人数大于1000数量'],
                                    ['金融理财'].concat(dataValues[0], highRatingValues[0], ratingNumberValues[0]),
                                    ['聊天社交'].concat(dataValues[1], highRatingValues[1], ratingNumberValues[1]),
                                    ['旅行交通'].concat(dataValues[2], highRatingValues[2], ratingNumberValues[2]),
                                    ['居家生活'].concat(dataValues[3], highRatingValues[3], ratingNumberValues[3]),
                                    ['实用工具'].concat(dataValues[4], highRatingValues[4], ratingNumberValues[4]),
                                    ['摄影摄像'].concat(dataValues[5], highRatingValues[5], ratingNumberValues[5]),
                                    ['图书阅读'].concat(dataValues[6], highRatingValues[6], ratingNumberValues[6])
                                  ]
                                },
                                xAxis: { type: 'category', axisLabel: { color: "rgba(255,255,255,.6)" } },
                                yAxis: { axisLabel: { color: "rgba(255,255,255,.6)" } },
                                series: [
                                    { type: 'bar', name: '数据数量', itemStyle: { color: '#006cff' } },
                                    { type: 'bar', name: '评分大于8数量', itemStyle: { color: '#60cda0' } },
                                    { type: 'bar', name: '评分人数大于1000数量', itemStyle: { color: '#ed8884' } }
                                ]
                            };
                            mychart5.setOption(option);
                        }
                    };
                    xhrRatingNumbers.send();
                }
            };
            xhrHighRatingCount.send();
        }
    };
    xhrDataCount.send();
})();
