<!-- banner -->
   function initImg(){
    var slide=document.getElementsByClassName("m-slide")[0],
        startIndex=0,
        ntags=document.getElementsByClassName("pointer"),
        value,
        t,
        autoChange=function(){
        var toId=(startIndex==2)?0:startIndex+1;
        fadeImg(startIndex,toId,ntags);
        startIndex=toId;
        };
    var id=setInterval(autoChange,5000);
    slide.onmouseover=function(){
        clearInterval(id);
    }
    slide.onmouseout=function(){
        id=setInterval(autoChange,5000);
    }

    for (var i = 0; i < ntags.length; i++) {
        (function(_i){
            ntags[_i].onclick = function () {
                fadeImg(startIndex,_i,ntags);
                startIndex=_i;
        }
        })(i);
    };
}

function fadeImg(fromId,toId,ntags){
    var lists=document.getElementsByClassName("slide");
    var fromImg=lists[fromId],
        toImg=lists[toId],
        deg=0;

        toImg.style.zIndex='2';
        toImg.style.display='block';

        ntags[toId].className='z-crt pointer';
        ntags[fromId].className='pointer';
        fromImg.style.opacity=1;//初始图显示
        fromImg.style.filter='alpha(opacity:100)'//兼容老版本IE
        var t=setInterval(change, 10);
        function change(){
            if(deg<100){
                deg+=2;
                toImg.style.opacity=deg/100;
                toImg.style.filter='alpha(opacity:'+deg+')';
            }
            else{
                clearInterval(t);
                toImg.style.zIndex='2';
                fromImg.style.zIndex='1';
                fromImg.style.display='none';
                fromImg.style.opacity=0;
                fromImg.style.filter='alpha(opacity:0)';
            }
        }
        return t;
}
initImg();
<!-- banner -->


<!-- main  tabe部分 -->

function settab (root) {
	//获得tabMenu和tabContent的DOM节点，并保存在变量中
	var tabMenus=root.getElementsByClassName("J_tab-menu");
	var tabContents=root.getElementsByClassName('J_tab-content');

	//遍历数组,让tabMenu监听click事件
	for (var i = 0; i<tabMenus.length; i++) {
		(function(_i){
		tabMenus[_i].onclick=function  () {
			for (var j = 0; j < tabContents.length;j++) {
				tabContents[j].style.display="none";
			};
			tabContents[_i].style.display=" block";
			if (_i==0){
				formdata.type = 10;
				formdata.pageNo =1;
				// addClass(tabMenus[0],active);
				// delClass(tabMenus[1],active);
                tabMenus[0].className = "m-course-tabs-item active J_tab-menu";
                tabMenus[1].className = "m-course-tabs-item J_tab-menu";
				changedata(formdata,tabContents[_i]);
			}
			if (_i==1){
				formdata.type = 20;
				formdata.pageNo =1;
				// addClass(tabMenus[1],active);
				// delClass(tabMenus[0],active);
                tabMenus[1].className = "m-course-tabs-item active J_tab-menu";
                tabMenus[0].className = "m-course-tabs-item J_tab-menu";
				changedata(formdata,tabContents[_i]);
			}
		}
		})(i);
	}
}

var tabs=document.getElementsByClassName(" J_tab");
for (var i = 0; i < tabs.length; i++) {
	settab(tabs[i]);
};

<!-- 课程列表部分js -->
	var formdata = {
		psize : 20,
		type : 10,
		pageNo : 1,
	};
	var url = "http://study.163.com/webDev/couresByCategory.htm?";

	// 获取课程列表
	function changedata(a,elm){
		request = new XMLHttpRequest();
		request.open("GET", url + serializ(a));
		request.send(null);
		request.onreadystatechange = function() {
			if (request.readyState===4) {
				if (request.status===200) { 
					 data = JSON.parse(request.responseText);
					 changeclass(elm);
				} else {
					alert("发生错误：" + request.status);
				}
			} 
		}
	}
	// 查询地址序列化
	function serializ(data){
		if (!data) return  '';
		var pairs =[];
		for (var name in data){
			if(!data.hasOwnProperty(name)) continue;
			if (typeof data[name]==='function') continue;
			var value = data[name].toString();
			name = encodeURIComponent(name);
			value = encodeURIComponent(value);
			pairs.push(name+'='+value);
		}
		return  pairs.join('&');
	}

		//修改课程列表
	function changeclass (elm) {
		 var html ='<ul class="m-course-list clearfix">';
		for (var i=0;i<data.list.length;i++){
			html += '<li class="m-course-item">'
			html += '<a href="javascript:;" class="m-course-item-default">'
			html += '<img class="m-course-img" src="'+data.list[i].bigPhotoUrl+'" alt="">'
			html += '<h3 class="m-course-title">'+data.list[i].name+'</h3>'
			html += '<span class="m-course-tearcher">'+data.list[i].provider+'</span>'
			html += '<span class="m-course-num-border">'+data.list[i].learnerCount+'</span>'
			html += '<span class="m-course-price">'+(data.list[i].price?data.list[i].price:'免费')+'</span></a>';

			html += '<div class="m-course-item-details">'
			html += '<img class="m-course-img" src="'+data.list[i].bigPhotoUrl+'" alt="">'
			html += '<div class="m-course-item-l">'
			html += '<h3 class="m-course-title"><a href="#">'+data.list[i].name+'</a></h3>'
			html += '<span class="m-course-num">'+data.list[i].learnerCount+'在学</span>'
			html += '<span class="m-course-publisher">发布者：<a href="#">'+data.list[i].provider+'</a></span>'
			html += '<span class="m-course-class">分类：<a href="#">'+data.list[i].categoryName+'</a></span></div>'
			html += '<div class="course-text"><p class="m-course-text">'+data.list[i].description+'</p></div></li>';
		}
		html +='</ul>';
		elm.innerHTML = html;
	}
	var tab1 = document.getElementsByClassName("tab111");
	changedata(formdata,tab1[0]);



