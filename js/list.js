window.onload=function(){
	left_scroll();
}
function left_scroll(){
	var moveUl = document.querySelector('.main_left ul');
	var parentHeight = moveUl.parentNode.parentNode.offsetHeight;
	var ulHeight = moveUl.offsetHeight;
	//计算移动的范围
	var minDistance = parentHeight-ulHeight;

	var maxDistance = 0;
	console.log(ulHeight);
	console.log(parentHeight);
	//通过touch事件修改ul的移动
	var startY=0;
	var moveY = 0;
	var distanceY =0;
	//设置吸附距离
	var delayDistance =100;
	moveUl.addEventListener('touchstart',function(e){
		startY =e.touches[0].clientY;
	
	});
	moveUl.addEventListener('touchmove',function(e){
		moveY = e.touches[0].clientY-startY;
		//移动
		if((moveY+distanceY)>maxDistance+delayDistance){
			moveY=0;
			distanceY=maxDistance+delayDistance;
		}else if((moveY+distanceY)<minDistance-delayDistance){
			moveY=0;
			distanceY=minDistance-delayDistance;
		}
		moveUl.style.transition='';
		moveUl.style.transform='translateY('+(moveY+distanceY)+'px)';
		
		

	});
	moveUl.addEventListener('touchend',function(e){
		distanceY+=moveY;
		//吸附范围
		if (distanceY>maxDistance) {
			distanceY = maxDistance;
		}else if(distanceY<minDistance){
			distanceY = minDistance;
		}
		// 加上过度效果
		moveUl.style.transition='all 0.5s';
		moveUl.style.transform='translateY('+distanceY+'px)';
	});
	// 逻辑2
		var liArr = document.querySelectorAll('.main_left ul li');
		var liHeight =document.querySelector('.main_left ul li').offsetHeight;
		for(var i=0;i<liArr.length;i++){
				liArr[i].dataset['index']=i;
			}

		fox_tap(moveUl,function(e){
			console.log(e);
			console.log(e.target);
			console.log(e.target.parentNode);

			
			for(var i=0;i<liArr.length;i++){
				liArr[i].className='';
			}
			e.target.parentNode.className='current';

			var currentIndex=e.target.parentNode.dataset['index'];
			console.log(currentIndex);
			var moveDistance = currentIndex*liHeight*-1;
			//移动范围
			if(moveDistance>maxDistance){
				moveDistance=maxDistance
			}else if(moveDistance<minDistance){
				moveDistance=minDistance;
			}
			moveUl.style.transition='all 1s';
			moveUl.style.transform='translateY('+moveDistance+'px)';

		});

		


}
