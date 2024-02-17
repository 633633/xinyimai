var relationElem = document.getElementById("relation")
var width = (relationElem.clientWidth) * 0.98;
var height = (relationElem.clientHeight) * 1.0;
var img_h = 50;
var img_w = 50;
var radius = 10;
var svg = d3.select("#relation")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


var nodes = [
    { name: "维托·柯里昂", image: "./relationPhoto/维托·柯里昂.png", intro: "第一任教父，具有绅士风度和摄人的威严", },//0
    { name: "迈克·柯里昂", image: "./relationPhoto/迈克·柯里昂.png", intro: "维托的小儿子，也是家中最小的孩子，继承了父亲沉着、冷静、精明、坚强的性格。", },//1
    { name: "桑提诺·桑尼·柯里昂", image: "./relationPhoto/桑提诺·桑尼·柯里昂.png", intro: "桑提诺·桑尼·柯里昂", },//2
    { name: "凯·亚当斯", image: "./relationPhoto/凯·亚当斯.png", intro: "凯·亚当斯", },//3
    { name: "弗雷多·柯里昂", image: "./relationPhoto/弗雷多·柯里昂.png", intro: "弗雷多·柯里昂", },//4
    { name: "康妮·柯里昂·瑞兹", image: "./relationPhoto/康妮·柯里昂·瑞兹.png", intro: "康妮·柯里昂·瑞兹", },//5
    { name: "包纳萨拉", image: "./relationPhoto/包纳萨拉.png", intro: "包纳萨拉", },//6
    { name: "路卡•布拉西", image: "./relationPhoto/路卡•布拉西.png", intro: "路卡•布拉西", },//7
    { name: "强尼•方亭", image: "./relationPhoto/强尼•方亭.png", intro: "强尼•方亭", },//8
    { name: "杰克•华尔兹", image: "./relationPhoto/杰克•华尔兹.png", intro: "杰克•华尔兹", },//9
    { name: "索洛佐", image: "./relationPhoto/索洛佐.png", intro: "索洛佐", },//10
    { name: "布鲁诺•塔托里亚", image: "./relationPhoto/布鲁诺•塔托里亚.png", intro: "布鲁诺•塔托里亚", },//11
    { name: "彼特•克里曼沙 ", image: "./relationPhoto/彼特•克里曼沙.png", intro: "彼特•克里曼沙 ", },//12
    { name: "泰西欧", image: "./relationPhoto/泰西欧.png", intro: "泰西欧", },//13
    { name: "保利", image: "./relationPhoto/保利.png", intro: "保利", },//14
    { name: "安索", image: "./relationPhoto/安索.png", intro: "安索", },//15
    { name: "麦克劳斯基队长", image: "./relationPhoto/麦克劳斯基队长.png", intro: "麦克劳斯基队长" },//16
    { name: "法布利奇欧", image: "./relationPhoto/法布利奇欧.png", intro: "法布利奇欧", },//17
    { name: "艾波洛妮亚", image: "./relationPhoto/艾波洛妮亚.png", intro: "艾波洛妮亚", },//18
    { name: "托马西诺", image: "./relationPhoto/托马西诺.png", intro: "托马西诺", },//19
    { name: "巴西尼", image: "./relationPhoto/巴西尼.png", intro: "巴西尼", },//20
    { name: "菲立浦•塔托里亚", image: "./relationPhoto/菲立浦•塔托里亚.png", intro: "菲立浦•塔托里亚", },//21
    { name: "莫格林", image: "./relationPhoto/莫格林.png", intro: "莫格林", },//22
    { name: "卡洛", image: "./relationPhoto/卡洛.png", intro: "卡洛", },//23
    { name: "安东尼", image: "./relationPhoto/安东尼.png", intro: "安东尼", },//24
    { name: "汤姆·黑根", image: "./relationPhoto/汤姆·黑根.png", intro: "汤姆·黑根", },//25
];

var edges = [
    { source: 0, target: 1, relation: "小儿子" },
    { source: 0, target: 2, relation: "大儿子" },
    { source: 0, target: 4, relation: "儿子" },
    { source: 0, target: 5, relation: "女儿" },
    { source: 6, target: 0, relation: "求助" },
    { source: 0, target: 7, relation: "手下" },
    { source: 0, target: 8, relation: "成就事业" },
    { source: 0, target: 12, relation: "手下" },
    { source: 0, target: 13, relation: "手下" },
    { source: 10, target: 0, relation: "刺杀未遂" },
    { source: 0, target: 25, relation: "军师" },
    { source: 0, target: 14, relation: "保镖、叛徒" },

    { source: 10, target: 7, relation: "杀害" },
    { source: 9, target: 8, relation: "被迫签约" },
    { source: 23, target: 5, relation: "丈夫" },
    { source: 20, target: 23, relation: "操控" },
    { source: 20, target: 2, relation: "主使杀害" },

    { source: 11, target: 10, relation: "勾结" },
    { source: 11, target: 21, relation: "父亲" },

    { source: 24, target: 1, relation: "儿子" },
    { source: 3, target: 1, relation: "妻子" },
    { source: 24, target: 3, relation: "儿子" },
    { source: 1, target: 22, relation: "对立、铲除" },
    { source: 1, target: 17, relation: "西西里叛徒" },
    { source: 1, target: 18, relation: "西西里前妻" },
    { source: 19, target: 18, relation: "父亲" },
    { source: 15, target: 1, relation: "医院相助" },
    { source: 1, target: 21, relation: "对立、铲除" },
    { source: 1, target: 20, relation: "对立、铲除" },
    { source: 1, target: 16, relation: "枪杀" },
    { source: 1, target: 10, relation: "枪杀" },
    { source: 10, target: 16, relation: "收买" },
];

var force = d3.layout.force()
    .nodes(nodes)
    .links(edges)
    .size([width, height])
    .linkDistance(200)
    .charge(-700)
    .start();
//提示框部分
var tooltip = d3.selectAll("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.0);

//箭头绘制	
var defs = svg.append("defs");
var radius = 10;
var arrowMarker = defs.append("marker")
    .attr("id", "arrow")
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", "4")
    .attr("markerHeight", "4")
    .attr("viewBox", "0 0 4 4")
    .attr("refX", 20 + radius / 8 - 2)
    .attr("refY", 2)
    .attr("orient", "auto");

var arrow_path = "M0,1 L4,2 L0,3 L0,0";

arrowMarker.append("path")
    .attr("d", arrow_path);

var color = d3.scale.category20();
var path = svg.selectAll("path")
    .data(edges)
    .enter()
    .append("path")
    .attr("id", function (d, i) {
        return "edgepath" + i;
    })
    .attr("class", "edges")
    .attr("marker-end", "url(#arrow)")
    .style("stroke", "rgb(110, 28, 0)")
    .style("stroke-width", 1)
    .style("opacity", 1);

var pathtext = svg.selectAll('.pathText')
    .data(edges)
    .enter()
    .append("text")
    .attr("class", "pathText")
    .append('textPath')
    .attr("text-anchor", "middle")//居中
    .attr("startOffset", "60%")
    .style("fill", "#BE8B9C")
    //.style("fill",function(d,i){return color(i);})
    .attr('xlink:href', function (d, i) { return "#edgepath" + i; })
    .text(function (d) { return d.relation; });

var img_h = 30;
var img_w = 50;
var radius = 23;
var circles = svg.selectAll("forceCircle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", "forceCircle")
    .attr("r", radius)
    .style("stroke", "black")
    .style("stroke-width", "1.0px")
    .attr("fill", function (d, i) {
        //创建圆形图片
        var defs = svg.append("defs").attr("id", "imgdefs");
        var catpattern = defs.append("pattern")
            .attr("id", "catpattern" + i)
            .attr("height", 1)
            .attr("width", 1);
        catpattern.append("image")
            .attr("x", - (img_w / 2 - radius + 5.8))
            .attr("y", - (img_h / 2 - radius + 3.5))
            .attr("width", img_w + 11)
            .attr("height", img_h + 6)
            .attr("xlink:href", d.image);
        return "url(#catpattern" + i + ")";
    })
    .on("mouseover", function (d, i) {    //加入提示框
        tooltip.html("角色简介：" + d.intro)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 20) + "px")

            .style("opacity", 1.0);
    })
    .on("mousemove", function (d) {
        tooltip.style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 20) + "px");
    })

    .on("mouseout", function (d) {
        tooltip.style("opacity", 0.0);
    })
    .call(force.drag);

var texts = svg.selectAll(".forceText")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "forceText")
    .attr("x", function (d) { return d.x; })
    .attr("y", function (d) { return d.y; })
    .style("fill", "#664B5E")
    //.style("fill",function(d,i){return color(i);})
    .style("font-size", 15)

    .attr("dx", "-1.5em")
    .attr("dy", "2em")
    .text(function (d) { return d.name; });

force.on("tick", function () {
    path.attr("d", function (d) {
        var dx = d.target.x - d.source.x;//增量
        var dy = d.target.y - d.source.y;
        return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
    });
    circles.attr("cx", function (d) { return d.x; });
    circles.attr("cy", function (d) { return d.y; });
    texts.attr("x", function (d) { return d.x; });
    texts.attr("y", function (d) { return d.y; });
});