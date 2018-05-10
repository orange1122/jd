window.onload=function(){
	//顶部的通栏 滚动的效果
	headerScroll();
	//倒计时的效果
	cutDownTime();
	//轮播图的效果
	banner();
}

function headerScroll(){
	//获取导航栏
	var navDom = document.querySelector('.jd_nav');
	//获取 顶部的通栏
	var headerDom = document.querySelector('.jd_header');
	//  希望获取的是 从顶部 到 导航栏 底部的 距离
	var maxDistance = navDom.offsetTop+navDom.offsetHeight;
	headerDom.style.backgroundColor='rgba(201,21,35,0)';
	window.onscroll=function(){
		var scrollDistance = document.body.scrollTop;
		var percent = scrollDistance/maxDistance;
		// console.log(percent);
		if(percent>1){
			percent=1;
		}
	headerDom.style.backgroundColor='rgba(201,21,35,'+percent+')';
	// console.log(headerDom.style.backgroundColor);
	}


}
function cutDownTime(){
	var totalHour=3;
	var totalSec=3*60*60;
	var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');
	// console.log(liArr);
	clearInterval(timer);
	var timer =setInterval(function(){
		if(totalSec<0){
			clearInterval(timer);
			console.log('结束了');
			return;
		}
		totalSec--;
		var hour = Math.floor(totalSec/3600);
		var minute = Math.floor(totalSec%3600/60);
		var sec = Math.floor(totalSec%3600%60);
		// console.log(sec);
		liArr[0].innerHTML=Math.floor(hour/10);
		liArr[1].innerHTML=Math.floor(hour%10);

		liArr[3].innerHTML=Math.floor(minute/10);
		liArr[4].innerHTML=Math.floor(minute%10);

		liArr[6].innerHTML=Math.floor(sec/10);
		liArr[7].innerHTML=Math.floor(sec%10);
	},1000);
}
function banner(){
	var width=document.body.offsetWidth;
	var moveUI = document.querySelector('.banner_images');
	var indexLiArr = document.querySelectorAll('.banner_index li');
	console.log(moveUI);
	//添加过渡效果
	
	// 定义 index 记录 当前的 索引值
	// 默认 我们的ul 已经 往左边 移动了 一倍的宽度
	// (为什么 一位 最左边的图片 是用来做无限轮播的 
	var index=1;
	var timer = setInterval(function(){
		index++;
		
		moveUI.style.transition='all 0.3s';
		moveUI.style.transform='translateX('+index*width*-1+'px)';

			
	},1500);

	moveUI.addEventListener('webkitTransitionEnd',function(){
		if(index>8){
			index=1;

			moveUI.style.transition='';
			moveUI.style.transform = 'translateX('+index*width*-1+'px)';

		}
		//底下小圆点
		for(var j=0;j<indexLiArr.length;j++){
				indexLiArr[j].className='';
			}
		indexLiArr[index-1].className='current';	
	});

	// 注册 三个 touch事件

	// 定义变量 记录 开始的X
	var startX = 0;

	// 记录移动的值
	var moveX = 0;

	// 记录 distanceX
	var distanceX = 0;


	// 触摸开始
	moveUI.addEventListener('touchstart',function (event) {
		// 关闭定时器
		clearInterval(timer);

		// 关闭过渡效果
		moveUI.style.transition = '';

		// 记录开始值
		startX = event.touches[0].clientX;

	})

	// 触摸中
	moveUI.addEventListener('touchmove',function (event) {
		// 计算移动的值
		moveX = event.touches[0].clientX - startX;

		// 移动ul
		// 默认的移动值是 index*-1*width 
		moveUI.style.transform = 'translateX('+(moveX+index*-1*width)+'px)';
	})

	// 触摸结束
	/*
		手指松开的时候 判断 移动的距离 进行 是否吸附
			由于 不需要考虑 正负 只需要考虑 距离 Math.abs()
				吸附回的值是 index*-1*width
			如果移动的距离较大
				需要判断正负
					index++;
					index--;
					 index*-1*width
	*/
	moveUI.addEventListener('touchend',function (event) {

		// 定义 最大的 偏移值
		var maxDistance = width/3;

		// 判断 是否超过
		if (Math.abs(moveX)>maxDistance) {
			// 判断 到底是 往左 还是往右移动
			if (moveX>0) {
				index--;
			}else{
				index++;
			}
			// 为了好看 将 过渡效果开启
			moveUI.style.transition = 'all .3s';

			// 吸附 一整页
			moveUI.style.transform = 'translateX('+(index*-1*width)+'px)';

		}else{
			// 如果 进到这里了 说明 没有超过 我们定义的 最大偏移值 吸附回去即可

			// 为了好看 将 过渡效果开启
			moveUI.style.transition = 'all .3s';

			// 吸附回去
			moveUI.style.transform = 'translateX('+(index*-1*width)+'px)';
		}

		// 记录结束值

		// 开启定时器
		timer = setInterval(function () {
			// 累加
			index++;

			// 将 过渡开启 管你三七二十一 只要进来 就开启过渡 保证 过渡效果一直存在
			moveUI.style.transition = 'all .3s';

			// 修改 ul的位置
			moveUI.style.transform = 'translateX('+index*width*-1+'px)';
		},1000)
	})
}