<!-- banner JS -->

(function(_slides){
    each(_slides,function(_slide,i){
        var _ctrls = _slide.getElementsByTagName('i');
        var _lists = _slide.getElementsByTagName('li');
        each(_ctrls,function(_ctrl,i){
            _ctrl.onclick=function(){
                each(_lists,function(_list,i){
                    delClass(_list,"z-crt");
                });
                each(_ctrls,function(_ctrl,i){
                    delClass(_ctrl,"z-crt");
                });
                addClass(_lists[i],"z-crt");
                addClass(_ctrls[i],"z-crt");
            }
        });
    });

	function hasClass(_object,_clsname){
	    var _clsname = _clsname.replace(".","");
	    var _sCls = " "+(_object.className)+" ";
	    return (_sCls.indexOf(" "+_clsname+" ") != -1) ? true : false;
	}
	function toClass(_str){
	    var _str = _str.toString();
	    _str = _str.replace(/(^\s*)|(\s*$)/g,"");
	    _str = _str.replace(/\s{2,}/g," ");
	    return _str;
	}
	function addClass(_object,_clsname){
	    var _clsname = _clsname.replace(".","");
	    if(!hasClass(_object,_clsname)){
	        _object.className = toClass(_object.className+(" "+_clsname));
	    }
	}
	function delClass(_object,_clsname){
	    var _clsname = _clsname.replace(".","");
	    if(hasClass(_object,_clsname)){
	        _object.className = toClass(_object.className.replace(new RegExp("(?:^|\\s)"+_clsname+"(?=\\s|$)","g")," "));
	    }
	}
	function each(_objects,_fn){
	    for(var i=0,len=_objects.length;i<len;i++){
	        _fn(_objects[i],i);
	    }
	}
})(document.getElementsByTagName('div'));

<!-- banner JS -->	

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
				getdata();
				changeclass();
			}
			if (_i==1){
				formdata.type = 20;
				getdata();
				changeclass();
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
	function getdata(){
		var request = new XMLHttpRequest();
		request.open("GET", url + serializ(formdata));
		request.send(null);
		request.onreadystatechange = function() {
			if (request.readyState===4) {
				if (request.status===200) { 
					 data = JSON.parse(request.responseText);;
				} else {
					alert("发生错误：" + request.status);
				}
			} 
		}
	}
	// 查询地址序列化
	function serializ(data){
		if (!data) return '';
		var pairs =[];
		for (var name in data){
			if(!data.hasOwnProperty(name)) continue;
			if (typeof data[name]==='function') continue;
			var value = data[name].toString();
			name = encodeURIComponent(name);
			value = encodeURIComponent(value);
			pairs.push(name+'='+value);
		}
		return pairs.join('&');
	}
	// var data = getdata(url);
	getdata();
		//修改课程列表
	function changeclass () {
		 var html ='<ul class="course-list clearfix">';
		for (var i=0;i<data.list.length;i++){
			html += '<div id="course-item-tpl">'
			html += '<li class="course-item">'
			html += '<a href="javascript:;" class="course-item-default">'
			html += '<img class="course-img" src="'+data.list[i].bigPhotoUrl+'" alt="">'
			html += '<h3 class="course-title">'+data.list[i].name+'</h3>'
			html += '<span class="course-tearcher">'+data.list[i].provider+'</span>'
			html += '<span class="course-num-border">'+data.list[i].learnerCount+'</span>'
			html += '<span class="course-price">'+(data.list[i].price?data.list[i].price:'免费')+'</span></a>';

			html += '<div class="course-item-details">'
			html += '<img class="course-img" src="'+data.list[i].bigPhotoUrl+'" alt="">'
			html += '<div class="course-item-l">'
			html += '<h3 class="course-title"><a href="#">'+data.list[i].name+'</a></h3>'
			html += '<span class="course-num">'+data.list[i].learnerCount+'在学</span>'
			html += '<span class="course-publisher">发布者：<a href="#">'+data.list[i].provider+'</a></span>'
			html += '<span class="course-class">分类：<a href="#">'+data.list[i].categoryName+'/a></span></div>'
			html += '<p class="course-text">'+data.list[i].description+'</p></div>';
		}
		html +='</li></div>';
		document.getElementById('test').innerHTML = html;
	}