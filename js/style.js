window.onload=function(){
function my$(id) {
	return document.getElementById(id);
}

    var box = my$('box');//box
    var inner = my$('inner');//inner
    var img_list = inner.getElementsByTagName('img');//img_list
    var left = my$('left');//left
    var right = my$('right');
    
    var n = img_list.length;
    var btn = true;
    var timer=null;//定时器
    //获取元素当前属性值
    function getStyle(obj, arr) {    
        if (obj.currentStyle) {      
            return obj.currentStyle[arr];  //针对ie
        } else {      
            return document.defaultView.getComputedStyle(obj, null)[arr];    
        }  
    }
    var floatmenu = my$('floatmenu');
    //在线咨询图标的点击事件
	var zxzx = my$('zxzx');
	var num=0;
	floatmenu.onclick=function(){
		if(num%2 == 0){//根据是否能整除进行判断
			floatmenu.style.right='0px';
			floatmenu.style.height='200px';
			zxzx.className='fa fa-times';
			zxzx.style.paddingTop=50+'px';
	   }else{
	        floatmenu.style.right='-180px';
			floatmenu.style.height='120px';
			zxzx.className='fa fa-commenting-o';
			zxzx.style.paddingTop=0+'px';
			
	    }
			num++;
	}
    //自定义的移动函数
    //obj为节点，json为需要变化的属性，interval为动画间隔（决定帧数），sp可以用来改变变化速度，fn为回调函数
    function move(obj, json, interval, sp, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var flag = true;
            for (var arr in json) {
                var icur = 0;
                if (arr == 'toLeft') {
                    //获取的**px转化为整型
                    var icur = parseInt(getStyle(obj, 'left'));
                }
                var speed = (json[arr] - icur) * sp;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                //判断当前属性值与变化的最终结果是否相等
                if (icur != json[arr]) {
                    flag = false;
                }
                //一帧的变化值
                if (arr == "toLeft") {
                    obj.style.left = (icur + speed) + "px";
                }
            }
            //如果变化完成了的话，调用回调函数
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }, interval);
    }

    //点击下一张，把ul第一张复制到尾部，ul左移一个图片宽度，将ul第一张删除，ul的left设置为0（即右移一个图片宽度）
    right.onclick = function () {
        if (btn) {
            btn = false;
            //第一步复制到尾部
            var li_first = img_list[0].cloneNode(true);
            inner.appendChild(li_first);
            //第二步ul左移
            var l = img_list[1].offsetWidth;
            move(inner, {
                toLeft: -l
            }, 10, 0.03, function () {
                inner.removeChild(img_list[0]);
                inner.style.left = '0px';
                btn = true;
            })
        }
    }

    //点击上一张，将最后一张复制到ul头部，将ul左移一个图片宽度，最后ul右移至left为0
    left.onclick = function () {
        if (btn) {
            btn = false;
            var li_last = img_list[n - 1].cloneNode(true);
            inner.insertBefore(li_last, img_list[0]);
            inner.style.left = -img_list[1].offsetWidth + 'px';
            move(inner, {
                toLeft: 0
            }, 10, 0.03, function () {
                inner.removeChild(img_list[n]);
                btn = true;
            })
        }

    }
	//开定时器
    timer=setInterval(toRun,2000);
    box.onmouseover=function(){
        clearInterval(timer);
    };
    box.onmouseout=function(){
        timer=setInterval(toRun,2000);
    };
    //定时函数
    function toRun(){
    var li_first = img_list[0].cloneNode(true);
        inner.appendChild(li_first);
        //第二步ul左移
        var l = img_list[1].offsetWidth;
        move(inner, {
            toLeft: -l
        }, 10, 0.03, function () {
            inner.removeChild(img_list[0]);
            inner.style.left = '0px';
            btn = true;
        })
    }
}
