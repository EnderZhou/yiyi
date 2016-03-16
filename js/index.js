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
				formdata.pageNo =1;
				// addClass(tabMenus[0],active);
				// delClass(tabMenus[1],active);
				changedata(formdata,tabContents[_i]);
			}
			if (_i==1){
				formdata.type = 20;
				formdata.pageNo =1;
				// addClass(tabMenus[1],active);
				// delClass(tabMenus[0],active);
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

	/*
*   视频弹窗
*/
(function(){
    var videoBtn = document.getElementById('video_btn');
    var popup = new PopupBox('video');
    popup.onclose = function(){
        getElementsByClassName('video')[0].load();
    };
    videoBtn.onclick = function(){
        popup.alert();
    };
})();




/*
*   登录弹窗
*/
var popup_sign = (function(){
    var followBtn = document.getElementById('follow-btn');
    var cancelBtn = getElementsByClassName(followBtn, 'followed-cancel')[0];
    var popup = new PopupBox('signIn');

    followBtn.onclick = function(){
        if(cookies.get('loginSuc') == 'true'){
            followBtn.className = followBtn.className.replace('followed-before', 'followed-after');
            cookies.set('followSuc',1);
            cancelBtn.onclick = function(e){
                e.stopPropagation();
                followBtn.className = followBtn.className.replace('followed-after', 'followed-before');
                cookies.set('followSuc',0);
            }
        }else{
            popup.alert();
            popup.onclose = function(){
                var tips = getElementsByClassName('signinBox-input-tips'),
                    form = document.forms['signinBox'];
                for(var i in tips){
                    tips[i].innerHTML = '';
                }
                form.reset();
            }
        }
    }

    return popup;
})();





// 
function getElementsByClassName(){
    if(typeof arguments[0] == 'object'){
        var obj = arguments[0],
            className = arguments[1];
    }else{
        var className = arguments[0];
    }

    if(document.getElementsByClassName){
        return (obj || document).getElementsByClassName(className);
    }

    var eles = (obj || document).getElementsByTagName('*'),
        className = ' '+className+' ',
        eleArr = [];

    for(var i=0,ele; ele=eles[i]; i++){
        var classStr = ' '+ele.className+' ';
        if(classStr.indexOf(className) != -1){
            eleArr.push(ele);
        }
    }
    return eleArr;
};





/*
*
*   操作cookie
*
*/
var cookies = (function(){

    function getCookie(c_name){
        if(!c_name) return document.cookie;
        var str = document.cookie,
            arr = str.split(';');
            c_name = ' '+c_name+' ';
        for(var i=0,l=arr.length,ck; i<l; i++){
            ck = arr[i].split('=');
            if((' '+ck[0]+' ').indexOf(c_name) != -1){
                return ck[1];
            }
        }
        return false;
    };

    function setCookie(c_name, c_value){
        document.cookie = c_name + '=' + escape(c_value);
    }

    return {
        get : getCookie,
        set : setCookie,
    }
})();





/*
*
*
*   url数据序列化
*
*/
function parseQuery(value){
    var reg = /(\w+[\.\w]*)=(\w+[\.\w]*)|(\w+[\.\w]*)/ig,
        obj = {};

    value = value.replace(/\s/g, '');
    value.replace(reg,function(a,b,c,d,e,f){
        if(b&&c){
            obj[b]=c;
        }else if(d){
            obj[d]='';
        }
    })
    return obj;
};








/*
*
*   合并对象，不影响原有对象
*
*/
function extend(){
    var arg = Array.prototype.slice.call(arguments),
        len = arg.length,
        obj = {};
    for(var i=0; i<len; i++){
        for(var j in arg[i]){
            obj[j] = arg[i][j];
        }
    }
    return obj;
};






/*
*
*   删除className
*
*/
function delClass(className, str){
    var arr = className.split(' ');
    for(var i in arr){
        if(arr[i] == str){
            arr.splice(i,1);
            break;
        }
    }
    return arr.join(' ');
};






/*
*
*   弹窗
*
*/
function PopupBox(name){
    this.mask = getElementsByClassName('mask')[0];
    switch(name){
        case 'video':
            this.popupBox = getElementsByClassName('popup-video')[0];
            break;
        case 'signIn':
            this.popupBox = getElementsByClassName('popup-signinBox')[0];
            break;
    }
    this.init();
};

PopupBox.prototype.init = function(){
    var that = this;
    that.closeBtn = getElementsByClassName(this.popupBox, 'popup-close')[0];
    that.closeBtn.onclick = function(){
        that.close();
    }
};

PopupBox.prototype.alert = function(){
    var that = this;
    this.mask.style.display = 'block';
    this.popupBox.style.display = 'block';
};

PopupBox.prototype.close = function(){
    var that = this;
    that.mask.style.display = 'none';
    that.popupBox.style.display = 'none';
    if(typeof that.onclose == 'function'){
        that.onclose();
    }
};







/*
*
*   Ajax
*
*/
function Ajax(url, data){
    this.request = (function(){
        var request;
        if(window.XMLHttpRequest){
            request = new XMLHttpRequest();
        }else if(window.ActiveXObject){
            request = new ActiveXObject('Msxml2.XMLHTTP') || new ActiveXObject('Microsoft.XMLHTTP');
        }
        return request;
    })();
    this.url = url;
    this.data = data;
};

Ajax.prototype._formatData = function(obj){
    var _data = obj,
        arr = [];
    for(var i in _data){
        arr.push(i + '=' + _data[i]);
    }
    return arr.join('&');
};

Ajax.prototype.get = function(){
    var that = this,
        request = this.request,
        arg = Array.prototype.slice.call(arguments),
        callback = arg.shift();

    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            arg.unshift(request.responseText);
            callback.apply(that,arg);
        };
    };

    var url = this.url+'?'+this._formatData(this.data);
    request.open('get', url, true);
    request.send(null);
};

Ajax.prototype.post = function(callBack){
    var that = this,
        request = this.request,
        arg = Array.prototype.slice.call(arguments),
        callback = arg.shift();

    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            arg.unshift(request.responseText);
            callback.apply(that,arg);
        };
    };

    var url = this.url;
    var data = this._formatData(this.data);
    request.open('post', url, true);
    request.send(data);
};






/*
*
*   banner
*
*/
function Banner(obj){
    this.banner = obj;
    this.box = getElementsByClassName(obj, 'banner-wrap')[0];
    this.counts = getElementsByClassName(obj, 'banner-count')[0];
    this.box_items = getElementsByClassName(this.box, 'banner-item');
    this.counts_items = [];
    this.len = this.box_items.length;
    this.index = 0;
    this.init();

};

Banner.prototype.init = function(){
    var that = this;
    for(var i=0; i<that.len; i++){
        var child = document.createElement('i');
        child.index = i;
        that.counts.appendChild(child);
        that.counts_items.push(child);
        child.onclick = function(){
            that.index = this.index;
            that.move();
        };
    };
    that.counts.children[0].className += ' active';
    that.auto();
};

Banner.prototype.move = function(){
    var that = this,
        box_items = that.box_items,
        counts_items = that.counts_items;
    for(var i=0; i<that.len; i++){
        box_items[i].className = delClass(box_items[i].className, 'active');
        counts_items[i].className = delClass(counts_items[i].className, 'active')
    };
    box_items[that.index].className+=' active';
    counts_items[that.index].className += ' active';
};

Banner.prototype.auto = function(){
    var that = this,
        top = that.banner.offsetHeight + that.banner.offsetTop,
        t;

    t = setInterval(star,5000);
    that.banner.onmouseover = function(){
        clearInterval(t);
        t = null;
    }
    that.banner.onmouseout = function(){
        t = setInterval(star,5000);
    }

    function star(){
        that.index >= that.len-1 ? that.index = 0 : that.index++;
        that.move();
    };
};






/*
*
*   信息滚动
*
*/
function Roll(config){

    this.config = {
        box : null,
        items : null,
        type : 'step',
        way : 'top',
        time : 5000,
        speed : 70,
    };
    this.config = extend(this.config, config);

    this[this.config.type]();
}

Roll.prototype.step = function(){
    var that = this,
        config = that.config,
        box = config.box,
        len = 0,
        target = 0,
        t = null;

    box.innerHTML += box.innerHTML;
    t = setInterval(move,config.time);

    function move(){
        len = len || config.items.length;
        box.style.transition = 'none';
        if(target >= (len/2)*config.speed){
            target = 0;
            box.style[config.way] = -target + 'px';
        }else{
            box.style.transition = 'all .4s';
            target += config.speed;
            box.style[config.way] = -target + 'px';
        }
    };
};





/*
*
*   表单
*
*/
function Form(formName){
    this.form = document.forms[formName];
    this.submitBtn = this.form.elements['submit'];

    this.submitBtn.disabled = true;
    this.submit();
};
Form.prototype.bind = function(ctrlName,fn){
    var that = this,
        form = that.form,
        ctrl = form.elements[ctrlName],
        tip = ctrl.nextSibling.nodeType==1 ? ctrl.nextSibling : ctrl.nextSibling.nextSibling;

    ctrl.onkeyup = function(){
        var value = this.value;
        fn.call(this,form,tip,value);
        that.submitBtn.disabled = false;
    };
};
Form.prototype.format = function(){
    var that = this,
        form = that.form,
        ctrls = form.elements,
        data = '',
        arr = [],
        str = '';

    for(var i=0; ctrl=ctrls[i]; i++){
        switch(ctrl.type){
            case undefined:
            case 'submit':
            case 'button':
            case 'reset':
            case 'file':
                break;
            case 'radio':
            case 'checkbox':
                if(!ctrl.checked){
                    break;
                }
            default:
                if(ctrl.name.length != 0){
                    str = ctrl.name+'='+ctrl.value;
                    arr.push(str);
                }
        }
    }
    data = arr.join('&');
    return data;
};
Form.prototype.submit = function(){
    var that = this,
        ctrls = that.ctrls,
        btn = that.submitBtn;

    btn.onclick = function(e){
        e.preventDefault();
        var data = that.format();
        that.onsubmit.call(that,data);
    };
};
Form.prototype.error = function(fn){
    var that = this,
        form = that.form,
        ctrl = form.elements.userName,
        tip = ctrl.nextSibling.nodeType==1 ? ctrl.nextSibling : ctrl.nextSibling.nextSibling;

    fn.call(this,tip);
};



