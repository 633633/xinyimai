var data = {
    "name": "国家与地区分布",
    "children": [
        {
            "name": "亚洲",
            "children": [
                { "name": "日本", "value": 17 },
                { "name": "中国大陆", "value": 10 },
                { "name": "香港地区", "value": 4 },
                { "name": "台湾地区", "value": 6 },
                { "name": "韩国", "value": 2 },
                { "name": "泰国", "value": 3 },
                { "name": "伊朗", "value": 4 },
                { "name": "印度", "value": 5 },
                { "name": "阿曼", "value": 1 },
                { "name": "黎巴嫩", "value": 1 },
            ]
        },
        {
            "name": "欧洲",
            "children": [
                { "name": "比利时", "value": 3 },
                { "name": "法国", "value": 81 },
                { "name": "英国", "value": 25 },
                { "name": "意大利", "value": 30 },
                { "name": "瑞典", "value": 7 },
                { "name": "捷克", "value": 1 },
                { "name": "斯洛伐克", "value": 1 },
                { "name": "德国", "value": 13 },
                { "name": "丹麦", "value": 3 },
                { "name": "匈牙利", "value": 2 },
                { "name": "瑞士", "value": 5 },
                { "name": "西班牙", "value": 9 },
                { "name": "波兰", "value": 1 },
                { "name": "荷兰", "value": 3 },
                { "name": "俄罗斯", "value": 1 },
                { "name": "葡萄牙", "value": 2 },
                { "name": "奥地利", "value": 1 },
            ]
        },
        {
            "name": "非洲",
            "children": [
                { "name": "阿尔及利亚", "value": 2 },
                { "name": "马里", "value": 4 },
                { "name": "塞内加尔", "value": 2 },
                { "name": "安哥拉", "value": 1 },
                { "name": "毛里塔尼亚", "value": 2 },
                { "name": "加纳", "value": 1 },

            ]
        },
        {
            "name": "大洋洲",
            "children": [
                { "name": "澳大利亚", "value": 2 },
                { "name": "新西兰", "value": 1 },

            ]
        },
        {
            "name": "北美洲",
            "children": [
                { "name": "多米尼克", "value": 1 },
                { "name": "墨西哥", "value": 4 },
                { "name": "加拿大", "value": 4 },

            ]
        },
        {
            "name": "南美洲",
            "children": [
                { "name": "阿根廷", "value": 4 },
                { "name": "古巴", "value": 2 },
                { "name": "巴西", "value": 3 },
                { "name": "智利", "value": 1 },

            ]
        }
    ]
}

var width = 1150;
var height = 400;
var radius = Math.min(width, height) / 2;

var colors = ["#C19A6B", "#C2B280", "#988558", "#483C32", "#966919", "#967969"];
var color = d3.scaleOrdinal()
    .domain(data.children.map(function (d) { return d.name; }))
    .range(colors);

var treemap = d3.treemap()
    .size([width, height]);

var root = d3.hierarchy(data)
    .sum(function (d) { return d.value; })
    .sort(function (a, b) { return b.value - a.value; });

treemap(root);

var svg = d3.select(".tiny-view-3")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var cell = svg.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
    .attr("transform", function (d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
    .on("mouseover", function (d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr("transform", function (d) {
                var dx = d.x0 - 20;
                var dy = d.y0 - 20;
                var dw = d.x1 - d.x0 + 10;
                var dh = d.y1 - d.y0 + 10;
                return "translate(" + dx + "," + dy + ")";
            });
    })
    .on("mouseout", function (d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr("transform", function (d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });
    });

cell.append("rect")
    .attr("width", function (d) { return d.x1 - d.x0; })
    .attr("height", function (d) { return d.y1 - d.y0; })
    .attr("stroke", 'white')
    .attr("fill", function (d) { return color(d.parent.data.name); });

cell.append("text")
    .attr("x", function (d) { return (d.x1 - d.x0) / 2; })
    .attr("y", function (d) { return (d.y1 - d.y0) / 2; })
    .attr("dy", "0.35em")
	.attr("font-size", "12px")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .text(function (d) { return d.data.name; });


// var body = document.body;
// body.style.backgroundImage = 'url(./Movies4.png)';	 