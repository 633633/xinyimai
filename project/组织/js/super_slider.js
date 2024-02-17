/*
	* ***Juery焦点图切换插件***
	* 作者: Xukai.json
	* MIT License.
	* 版本: V2.0
	* 文件名: super_slider.js
	* 日期: 2015-08-31
	* 使用说明: 利用函数传参调用
	$(".box").superSlider({//选择器必须是插件最外层盒子class或ID，包含上下按钮和轮播内容
				prevBtn: 	 ".prevBtn",//上一页按钮
				nextBtn: 	 ".nextBtn",//下一页按钮
				listCont: 	 ".content",//滚动列表外层
				delayTime: 	 1000,//自动轮播时间间隔,默认1秒
				speed: 		 1000,//滚动速度,默认1秒/次
				amount: 	 1,//单次滚动数量,默认1个
				showNum: 	 4,//默认显示个数,默认4个
				autoPlay: 	 false///是否自动自动轮播,默认否，若要自动轮播请设置成true
				scrollWhere: "prev",//自动滚动方向，默然是上，下的参数为 next
			});
*/
(function ($){
	$.fn.superSlider = function (options){
		var _this = $(this);//模块最外层盒子
		//默认参数
		var defaults = {
						prevBtn: 	 ".prevBtn",//上一页按钮
						nextBtn: 	 ".nextBtn",//下一页按钮
						listCont: 	 ".content",//滚动列表外层
						delayTime: 	 1000,//自动轮播时间间隔,默认1秒
						speed: 		 1000,//滚动速度,默认1秒/次
						amount: 	 1,//单次滚动数量,默认1个
						showNum: 	 4,//默认显示个数,默认4个
						autoPlay: 	 false,///是否自动自动轮播,默认否，若要自动轮播请设置成true
						scrollWhere: "prev"//自动滚动方向，默然是上，下的参数为 next
					};
		var opts = $.extend(defaults, options);
		//缓存后续常用全局变量
		var gb = {
					cont: 	 	  _this.find(opts.listCont),//轮播内容区域
					prevBtn: 	  _this.find(opts.prevBtn),//上一页按钮
					nextBtn: 	  _this.find(opts.nextBtn),//下一页按钮
					time: 	 	  opts.delayTime,//延迟时间
					speed: 	 	  opts.speed,//自动轮播速度
					oneContWidth: _this.find(opts.listCont).children().eq(0).outerWidth(true),//单个内容宽度
					n: opts.amount,//单次滚动数量
					len: 		  _this.find(opts.listCont).children().length,//轮播子元素数量
					contWidth: 	  _this.find(opts.listCont).children().length*_this.find(opts.listCont).children().eq(0).outerWidth(true),//元素总宽
					showNum: 	  opts.showNum//显示个数
				};
		//动画对象
		var slider = {
				scrollLNext: function (){
					if(!gb.cont.is(":animated")){
						gb.cont.children().slice(0,gb.n).clone().appendTo(gb.cont);
						gb.cont.width(gb.cont.children().length*gb.oneContWidth+'px');//设置轮播内容的宽度
						gb.cont.animate({
							"margin-left": "-"+gb.oneContWidth*gb.n+"px"
							}, gb.speed, function() {
							$(this).children().slice(0,gb.n).remove();
							$(this).css('margin-left', '0px');
						});
					}else{
						//cont.stop(true,true);
					}
				},
				scrollPrev: function (){
					if(!gb.cont.is(":animated")){
						gb.cont.children().slice(gb.len-gb.n,gb.len).clone().prependTo(gb.cont);
						gb.cont.css({
						"margin-left": "-"+gb.oneContWidth*gb.n+"px",
						"width": gb.cont.children().length*gb.oneContWidth+"px"
						});
						gb.cont.animate({
							"margin-left": "0px"
							}, gb.speed, function() {
								$(this).children().slice((gb.cont.children().length - gb.n),gb.cont.children().length).remove();
						});
					}
				},
				init: function (){
					//一点点样式的初始化，为了增加插件的易用性
					gb.cont.parent().css({
					"overflow": "hidden",
					"width": gb.showNum*gb.oneContWidth
					});//为父级设置超出隐藏
					gb.cont.width(gb.contWidth+'px');//设置轮播内容的宽度
					//判断如果多出显示个数则加滚屏效果
					if(gb.cont.children().length <= gb.showNum){
						gb.prevBtn.hide();
						gb.nextBtn.hide();
					}
					else{
						gb.prevBtn.show();
						gb.nextBtn.show();
						gb.prevBtn.off().on('click',this.scrollPrev);
						gb.nextBtn.off().on('click',this.scrollLNext);
					}
					if(opts.autoPlay === true){
						if(opts.scrollWhere === "prev"){
							var fn = this.scrollPrev;
						} else{
							var fn = this.scrollLNext;
						}
						var t = opts.delayTime + opts.speed;
						var timer = setInterval(fn, t);
						$(opts.listCont+","+opts.prevBtn+","+opts.nextBtn).hover(function() {
							clearInterval(timer);
						}, function() {
							timer = setInterval(fn, t);
						});

					}
				}
		}
		slider.init();
	}
})(jQuery);