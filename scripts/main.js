	(function(window) {

		document.getElementsByClassName("page1")[0].style.height = (window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight) + "px";

		document.body.onscroll  = function(){
			if (document.body.scrollTop > 400){
				document.getElementsByClassName("header")[0].style.backgroundColor = "#FFFFFF";
		  	}else{
		    	document.getElementsByClassName("header")[0].style.backgroundColor = "";
		  	}
		  	if (document.body.scrollTop+document.documentElement.clientHeight == document.body.offsetHeight){
		  		document.getElementById("nichosi").style.display = "block";
		  	}else{
		  		document.getElementById("nichosi").style.display = "none";
		  	}
		}

		document.getElementById("topPicture__regButton").onclick = function(){
			//document.body.style.overflow = "hidden";
			document.getElementById("register__popupOverlay").className = "active";
		}
		document.getElementById("register__popupOverlay").onclick = function(event){
			var e = event || window.event;
		    if ((e.target|| e.srcElement) == this) {
		        document.getElementById("register__popupOverlay").className = "";
		    }	
		}

		var nativePlaceholderSupport = (function() {
		    var i = document.createElement('input');
		    return i.placeholder !== undefined;
		})();

		if(!nativePlaceholderSupport){
		    var els = document.getElementsByClassName("register__inputTitle");
		    [].slice.call(els).forEach(function(x,i){x.style.display = "block";})
		    
	    }

		document.getElementById("topPicture__loginButton").onclick = function(event){
			var el = document.getElementById("login__popup");
			if (el.className == "active"){
				var e = event || window.event;
				if ((e.target|| e.srcElement) == this) {
		        	el.className = "";
		    	}
			}else{
				el.className = "active";
			}
		}

		try{
			var c1 = document.getElementsByClassName("register__date");
			var a = new InputMask().Initialize(c1,{
			  mask: InputMaskDefaultMask.Date,
			  placeHolder: "Date: 01/01/2015"
			});

			var c2 = document.getElementsByClassName("register__phone");
			var b = new InputMask().Initialize(c2,
			{
				mask: InputMaskDefaultMask.Phone, 
				placeHolder: "Phone: (999) 999-9999"
			});
		}catch(e){

		}

		document.getElementById("register__button").onclick = function(){
			var newF = document.createElement("form");
            newF.action = "http://www.nn-itclub.ru:8080/ru/usercreate";
            newF.method = "POST";
            function create_input(name_input, value_input){
               var newH = document.createElement("input");
               newH.name = name_input;
               newH.type = "hidden";
               newH.value = value_input;
               newF.appendChild(newH);
            }
            var fio = document.getElementById("register__surname").value + " " +
            		  document.getElementById("register__name").value + " " +
            		  document.getElementById("register__thirdname").value;
            create_input("uname", fio);
            var newHCheckbox = document.createElement("input");
               newHCheckbox.name = "unamecanchange";
               newHCheckbox.type = "checkbox";
               newHCheckbox.value = "yes";
               newF.appendChild(newHCheckbox);
            create_input("upassword", document.getElementById("register__password").value);
            create_input("upassword2", document.getElementById("register__password").value);
            create_input("uroom", "");
            create_input("uemailown", document.getElementById("register__email").value);
            create_input("uemailpub", document.getElementById("register__email").value);
            create_input("uuinown", "");
            create_input("uuinpub", "");

            create_input("ucityru", "");
            create_input("ucityen", "");
            create_input("ustudyplaceru", document.getElementById("register__work").value);
			create_input("ustudyplaceen", "");
            create_input("ubirthdate", document.getElementById("register__date").value);
            
            document.getElementsByTagName("body")[0].appendChild(newF);
            newF.submit();
		}
	}(window));


	(function() {
		var els = [].slice.call(document.getElementsByClassName("headerMenu__a"));
		for (var i = 0, l = els.length; i < l; i++) {
			var curHref = els[i].href;
			var neededClass = curHref.substr((curHref.indexOf("#")+1));

			els[i].onclick = (function(klass) {
				return function() {
					var el = document.getElementsByClassName(klass)[0];
					var currentScroll = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
					var elOffset = getTopOffset(el);
					if (currentScroll >= elOffset){
						scrollUp(elOffset);	
					}
					if (currentScroll <= elOffset){
						scrollDown(elOffset);	
					} 
				}
			}(neededClass));
		};



		function getTopOffset(el) {
			if (el.getBoundingClientRect()) {
               var box = el.getBoundingClientRect();
               var body = document.body;
               var docElem = document.documentElement;
               var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
               var clientTop = docElem.clientTop || body.clientTop || 0;
               var top = box.top + scrollTop - clientTop;

               return Math.round(top);
            } else {
               var top = 0;
               while(el) {
                  top = top + Number(el.offsetTop);
                  el = el.offsetParent;
               }
               return top;
            }
		}

		function scrollDown(elOffset, timer) {
			var currentScroll = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
			var totalHeight = document.body.offsetHeight;
			var visibleHeight = document.documentElement.clientHeight;
			if (currentScroll <= (elOffset-20) && (totalHeight > currentScroll + visibleHeight )) {
				window.scrollBy(0, 20);
				timer = setTimeout(function() {
					scrollDown(elOffset, timer);
				}, 1);
			} else {
				clearTimeout(timer);
			};
		}

		function scrollUp(elOffset, timer) {
			var currentScroll = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
			var totalHeight = document.body.offsetHeight;
			var visibleHeight = document.documentElement.clientHeight;
			if (currentScroll >= elOffset && (currentScroll > 0 )) {
				window.scrollBy(0, -20);
				timer = setTimeout(function() {
					scrollUp(elOffset, timer);
				}, 1);
			} else {
				clearTimeout(timer);
			};
		}
	}());