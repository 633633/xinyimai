let bookList = d3.select(".book-list");
let tinyView2 = d3.select(".svg2");
let books = new Array();
let authorFreList = new Array();
let numOfDecade = new Array(12).fill(0);

class authorFre{
    constructor(name, fre){
        this.name = name;
        this.fre = fre;
    }
}

let p = new Promise((resolve)=>{
    d3.csv("./data/shiting_top250.csv", function(csvdata){ 
            books.push(csvdata);
            // 因为这个操作为异步,所以要加锁,不然后续length为0
            resolve(books);
        });
    }
)

p.then((books)=>{
    console.log(books);
//side-bar
    for(book of books){
        let li = bookList.append("li");
        li.append("h4").attr("class","rank").text(`${book.rank}`);
        li.append("h4",".name").attr("class","name").text(`${book.name}`);
        let flag = false;
        li.on("mouseenter", function(){
            li.attr("style","color:#ebebd3");
        })
        li.on("mouseleave", function(){
            li.attr("style","color:rgb(0,0,0)");
        })

        for(let son of authorFreList){
            if(son.name == book.author){
                son.fre += 1;
                flag = true;
            }
        }
        if(!flag){
            authorFreList.push(new authorFre(book.author, 1));
        }
        
        let decadeIndex = Math.floor((book.year - 1910) / 10);
        if (decadeIndex >= 0 && decadeIndex < 12) {
            numOfDecade[decadeIndex] += 1;
        }
    }

//tiny-view2 泡泡
    authorFreList.sort(function(a, b){ //默认情况为正序排列
        return b.fre - a.fre; 
    });
    let colorSet = ["rgb(25,202,173)","rgb(140,199,181)","rgb(160,238,225)",
    "rgb(190,237,199)","rgb(190,231,233)","rgb(214,213,183)","rgb(209,186,116)",
    "rgb(230,206,172)","rgb(236,173,158)","rgb(244,96,108)","#1abc9c","#2ecc71","#3498db"
    ,"#16a085","#27ae60","#2980b9","#f1c40f","#e67e22","#f39c12","#d35400"
    ,"#58B19F","#9AECDB","#182C61","#D6A2E8","#B33771"];
    for(let author of authorFreList){
        let authorX = 13.5 + 
                    Math.pow(-1, Math.floor(2 * Math.random() + 1)) * 
                    (11 / Math.pow(author.fre,0.2) * Math.random()) + "rem";
        let authorY = 5.5 + 
                    Math.pow(-1, Math.floor(2 * Math.random() + 1)) * 
                    (5 / author.fre * Math.random()) + "rem";
        let authorR = Math.pow(author.fre, 1.5) / 10  + "rem";
        let authorColor = colorSet[Math.floor(25 * Math.random())];
        let circle = tinyView2.append("circle").attr("cx",`${authorX}`)
                            .attr("cy",`${authorY}`)
                            .attr("style",`r:${authorR}`)
                            .attr("fill",`${authorColor}`)
        if(author.fre >= 2){
            circle.on("mouseenter", function(){
                circle.attr("fill","#2C3A47");
                d3.select(".svg2").append("text")
                                .attr("id",`${author.name}`)
                                .text(`${author.name}`)
                                    .attr("x",`${authorX}`)
                                    .attr("y",`${authorY}`)
                                    .attr("dx", "1.5rem")
                                    .attr("dy", "1.5rem")
                                    .attr("fill","#f6c196")
                                
            })
            circle.on("mouseleave", function(){
                circle.attr("fill",`${authorColor}`);
                let text = d3.select(`#${author.name}`);
                text.remove();
            })
        }
    }

//tiny-view1 23年(00-22) 每年的上榜数量 numOfYear
    // 定义 SVG 和直方图的参数
let svgWidth = 35; // SVG的总宽度，单位为rem
let chartWidth = svgWidth * 0.9; // 直方图宽度为画布的90%
let numBars = numOfDecade.length; // 柱子的数量
let barPadding = 0.5; // 柱子之间的间距，单位为rem
let barWidth = (chartWidth - barPadding * (numBars - 1)) / numBars; // 计算每个柱子的宽度
let svgHeight = 12.35; // SVG容器的高度，单位为rem
let maxBarHeight = svgHeight - 2; // 最大柱子高度，留出空间用于显示文本标签
let maxDataValue = Math.max(...numOfDecade); // 数据中的最大值
let heightScale = maxBarHeight / maxDataValue; // 高度缩放比例
let xOffset = (svgWidth - chartWidth) / 2; // 左右两侧的空白宽度

// 创建 SVG 容器
let svg = d3.select('.svg1')
    .attr('width', svgWidth + 'rem')
    .attr('height', svgHeight + 'rem');

// 绘制柱子
let chart = svg.selectAll('rect')
    .data(numOfDecade).enter()
    .append('rect')
    .attr('x', (d, i) => xOffset + (barWidth + barPadding) * i + 'rem') // 设置柱子的 x 位置
    .attr('y', d => svgHeight - (d * heightScale) + 'rem') // 设置柱子的 y 位置
    .attr('width', barWidth + 'rem') // 设置柱子的宽度
    .attr('height', d => d * heightScale + 'rem') // 设置柱子的高度
    .attr("fill", "#f6c196")
    .attr("stroke", "white");

// 添加文本标签
svg.selectAll(".bar-label")
    .data(numOfDecade)
    .enter()
    .append("text")
    .text(d => d)
    .attr("x", (d, i) => xOffset + (barWidth + barPadding) * i + barWidth / 2 + 'rem') // 设置文本的 x 位置
    .attr("y", d => svgHeight - (d * heightScale) - 0.2 + 'rem') // 设置文本的 y 位置
    .attr("font-family", "sans-serif")
    .attr("font-size", "0.5rem")
    .attr("fill", "#f6c196")
    .attr("text-anchor", "middle");

// 添加标题
svg.append("text")
    .text("统计单位：每十年")
    .attr("y", "1rem")
    .attr("x", "24rem")
    .attr("font-family", "sans-serif")
    .attr("fill", "#f6c196")
    .attr("font-weight", "1000");

// 添加交互效果
let rects = document.querySelectorAll('.svg1 rect');
let year = 1910;
for (let rect of rects) {
    rect.onmouseenter = function () {
        rect.style.fill = "rgb(96,143,159)";
    };
    rect.onmouseleave = function () {
        rect.style.fill = "#f6c196";
    };
    year++;
}


//tiny-view3 地图
    
})

/* fetch('/api/data')
.then(response => response.json())
.then(data => {
  drawHistogram(data);
  drawBubbleChart(data);
  drawHistogram(data);
})
.catch(error => console.error('Error fetching data:', error)); */