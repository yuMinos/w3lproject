(function(t){if(typeof define==="function"&&define.amd){define(["jquery"],t)}else{t(jQuery)}})(function(_){function r(t,a,i){return t.replace(i||/\\?\{([^{}]+)\}/g,function(t,i){var e=i.split(".");var o=a;for(var s=0;s<e.length;s++){o=typeof o=="object"?o[e[s]]:null}return o===undefined?"":o})}function d(t){if(typeof t=="string"){return t.replace(/<script>/g,"&lt;script&gt;").replace(/<\/script>/g,"&lt;/script&gt;")}else{return t}}var e=function(t){var o=this;var i={title:"",titleUnderline:false,btnLeft:{text:"btnLeft",fn:null},btnRight:{text:"btnRight",fn:null,color:null},html:"Dialog content...",beforeAction:function(){},beforeAppendTo:function(){},dialogStyle:"dialog",overlayClass:"global_black_overlay",actions:{}};var e="<div>{html}</div>";var s='<h3><div class="ellipsis" id="dialog_content" style="line-height: 18px;" title="{html}">{html}</div></h3>';var a="";if(t.btnLeft&&t.btnRight){t.btnLeft.text=toUperCaseStr(t.btnLeft.text);t.btnRight.text=toUperCaseStr(t.btnRight.text);a='    <div class="global_dialog_confirm_ft">'+'        <div class="dialog-left-btn-wrap l" id="dialog_leftBtn"><div class="global_dialog_confirm_nor" role="cancel"><span></span></div></div>'+'        <div class="dialog-right-btn-wrap r" id="dialog_rightBtn"><div class="global_dialog_confirm_nor" role="confirm" id="rightBtn_confirm"><span id="rightBtnText"></span><div class="errortip"></div></div></div>'+"    </div>"}else if(!t.btnLeft&&t.btnRight){t.btnRight.text=toUperCaseStr(t.btnRight.text);a='    <div class="global_dialog_confirm_ft" id="dialog_rightBtn">'+'       <div id="dialogConfirmBtn" class="global_dialog_confirm_nor dialog-middle-btn-wrap" role="confirm"><span></span><div class="errortip"></div></div>'+"    </div>"}this.options=_.extend(i,t);this.options.html=d(this.options.html);var l="";if("tab"==this.options.dialogStyle){l='<div class="global_dialog_confirm_main_fullScreen" style="display: block;">'+'    <div class="global_dialog_confirm_title">'+'        <h3 class="ellipsis" id="dialog_title"></h3>'+"    </div>"+'    <div class="global_dialog_confirm_content">{content}</div>'+a+"</div>"+'<div class="'+this.options.overlayClass+'"></div>'}else{var n="display: block;";if(this.options.width){n=n+"width:"+this.options.width+";"}if(this.options.height){n=n+"height:"+this.options.height+";"}if(this.options.top){n=n+"top:"+this.options.top+";"}if(this.options.left){n=n+"left:"+this.options.left+";"}l='<div class="global_dialog_confirm_main" style="'+n+'">'+'    <div class="global_dialog_confirm_title">'+'        <h3 class="ellipsis" id="dialog_title"></h3>'+"    </div>"+'    <div class="global_dialog_confirm_content">{content}</div>'+a+"</div>"+'<div class="'+this.options.overlayClass+'"></div>'}if(/<.*?>/.test(t.html)){this.options.content=r(e,this.options)}else{this.options.content=r(s,this.options)}this.dialogHtml=r(l,this.options);this.$dialogWrap=null;this.init=function(){this.$dialogWrap=_(this.dialogHtml);this.$mask=this.$dialogWrap.last();this.$dialog=this.$dialogWrap.first();if(this.options.title){this.$dialog.append('<div class="dialog-cancel" role="cancel2" id="dialog_cancel_btn"></div>')}if(this.options.titleUnderline){this.$dialog.find(".global_dialog_confirm_title h3").css({"text-decoration":"underline"})}this.$dialog.find("[title]").each(function(){var t=_(this).attr("title");if(/^\<.*?\>.*?\<.*?\>$/.test(t))_(this).attr("title",_(t).text())});this.$dialog.on("click","[role=confirm]",function(t){t.stopPropagation();if(_(this).attr("disabled")){return}var i=o.options.btnRight.fn;if(typeof i=="function"){i.call(o)}}).on("click","[role=cancel]",function(){var t=o.options.btnLeft.fn;if(typeof t=="function"){t.call(o)}o.$dialog.trigger("close")}).on("click","[act]",function(t){t.stopPropagation();var i=o.options.actions[_(this).attr("act")];if(typeof i=="function"){i.call(o)}}).on("click","[role=cancel2]",function(){var t;if(o.options.cancelFn){t=o.options.cancelFn}else if(o.options.btnLeft){t=o.options.btnLeft.fn}if(typeof t=="function"){t.call(o)}o.$dialog.trigger("close")}).on("close",function(){o.hide()});this.$mask.on("selectstart",function(){return false}).on("mousedown",function(){return false})};this.show=function(){this.init();if(typeof this.options.beforeAppendTo=="function"){this.options.beforeAppendTo.call(this)}this.$dialogWrap.appendTo("body");this.$dialog.find(".global_dialog_confirm_title h3").attr("title",this.options.title);this.$dialog.find(".global_dialog_confirm_title h3").text(this.options.title);if(this.options.title===""){o.$dialog.find(".global_dialog_confirm_title").remove()}this.$dialog.find(".global_dialog_confirm_ft .dialog-left-btn-wrap>div").attr("title",(this.options.btnLeft||{}).text);this.$dialog.find(".global_dialog_confirm_ft .dialog-left-btn-wrap>div>span").text((this.options.btnLeft||{}).text);this.$dialog.find(".global_dialog_confirm_ft .dialog-right-btn-wrap>div").attr("title",(this.options.btnRight||{}).text);this.$dialog.find(".global_dialog_confirm_ft .dialog-right-btn-wrap>div>span").text((this.options.btnRight||{}).text);this.$dialog.find(".global_dialog_confirm_ft .dialog-middle-btn-wrap").attr("title",(this.options.btnRight||{}).text);this.$dialog.find(".global_dialog_confirm_ft .dialog-middle-btn-wrap>span").text((this.options.btnRight||{}).text);if((this.options.btnRight||{}).color){this.$dialog.find(".global_dialog_confirm_ft .dialog-right-btn-wrap>div>span").css("color",(this.options.btnRight||{}).color)}if(typeof this.options.beforeAction=="function"){this.options.beforeAction.call(this)}_("#login_password").blur();this.$dialogWrap.fadeIn(function(){if("tab"!=o.options.dialogStyle){t()}if(/msie\s+(7|8|9)/.test(navigator.userAgent.toLowerCase())){_("#passwdEye").remove()}function t(){if(!o.$dialog.hasClass("global_dialog_confirm_main"))return;var t=o.$dialog[0].scrollHeight;var i=(_(window).height()-t)/2;if(i<8){i=8;var e=_(window).height()-i*2-o.$dialog.find(".global_dialog_confirm_ft").outerHeight()-o.$dialog.find(".global_dialog_confirm_title").outerHeight()-o.$dialog.find(".global_dialog_confirm_content").css("padding-top").split("px")[0]*1-o.$dialog.find(".global_dialog_confirm_content").css("padding-bottom").split("px")[0]*1-32;if(e<0){o.$dialog.css("overflow-y","scroll")}else{o.$dialog.find(".global_dialog_confirm_content").height(e);o.$dialog.find(".global_dialog_confirm_content").css("overflow-y","scroll")}o.$dialog.css("bottom",i+"px");o.$dialog.css("top",i+"px")}else{o.$dialog.css("overflow-y","visible");o.$dialog.find(".global_dialog_confirm_content").css("overflow-y","visible");o.$dialog.find(".global_dialog_confirm_content").height("auto");o.$dialog.css("bottom","auto");o.$dialog.css("top",i+"px")}}_(".global_black_overlay").focus()})};this.hide=function(){if(this.$dialogWrap&&this.$dialogWrap.length>0){this.$dialogWrap.fadeOut(function(){o.$dialogWrap.remove()})}};this.enable=function(){o.$dialog.find("[role=confirm]").removeAttr("disabled");o.$dialog.find("[role=confirm]").removeClass("globle_dialog_btn_disabled");o.$dialog.find("[role=confirm]").css({"cursor":"pointer"})};this.disabled=function(){o.$dialog.find("[role=confirm]").attr("disabled",true);o.$dialog.find("[role=confirm]").addClass("globle_dialog_btn_disabled");o.$dialog.find("[role=confirm]").css({"cursor":"auto"})};return this};_.fn.Dialog=function(t){var i=this[0];if(!i){return}if(typeof t=="string"){switch(true){case t=="show":i.dialog.show();break;case t=="hide":i.dialog.hide();break;case t=="enable":i.dialog.enable();break;case t=="disabled":i.dialog.disabled();break;default:alert("error param");break}}else if(typeof t=="object"){i.dialog=new e(t);_(i).on("click",function(){if(_(this).attr("disabled")){return}this.dialog.show()})}else{alert("error param")}return this};var i=function(t){var i=this;var e={text:"",btnText:"",btnFn:function(){this.hide()},btnColor:null,btnLeftText:null,dialogStyle:"dialog"};var o="<div class='global_dialog_confirm_main'>";var s;this.options=_.extend(e,t);this.options.text=d(this.options.text);if("tab"==this.options.dialogStyle){o="<div class='global_dialog_confirm_main_fullScreen'>"}this.init=function(){this.options.btnLeftText=toUperCaseStr(this.options.btnLeftText);this.options.btnText=toUperCaseStr(this.options.btnText);var t=o+"<div class='textArea center'>"+this.options.text+"</div>"+"<div class='btn-area' style='width:42%;margin:auto'><a class='btn-EMUI5-2' id='rightBtn' href='javascript:void(0)'></a></div></div>";if(this.options.btnLeftText){t=o+"<div class='textArea'>"+this.options.text+"</div>"+"<div class='btn-area clearfloat'>"+"<a class='btn-EMUI5-2 l ' style='width:40%' id='leftBtn' href='javascript:void(0)'></a>"+"<a class='btn-EMUI5-2 r'  style='width:40%' id='rightBtn' href='javascript:void(0)'></a>"+"</div></div>"}t+="<div class='global_black_overlay'></div>";s=_(t);_("body").append(s);s.find("#rightBtn").text(this.options.btnText);s.find("#leftBtn").text(this.options.btnLeftText);if(this.options.btnColor){s.find("#rightBtn").css("color",this.options.btnColor)}addCssActive(_(".btn-EMUI5-2"),"btn-EMUI5-2-active");_("#rightBtn",s).click(function(){i.options.btnFn.call(i)});_("#leftBtn",s).click(function(){i.hide()})};this.show=function(){this.init();return this};this.hide=function(){s.remove()};return this};_.fn.DialogSimple=function(t){i.call(this,t);return this};var o=function(t,o){var s=this;var i={items:[{value:0,label:"defaultValue",other:""}],defaultValue:null,onChange:function(){}};this.selectHtml='<input type="hidden">'+'<b class="dptick r"></b>'+'<span class="ar-eg"></span>'+'<ul class="dpmenu" style="display: none;z-index:1000;"></ul>';this.options=_.extend(i,t);this.init=function(){this.$obj=_(o).addClass("ddrop").append(this.selectHtml);var t=this.$obj.find(".dpmenu");t.parents(".global_dialog_confirm_main, .global_dialog_alert_main").css("overflow","visible");var i=null;for(var e=0;e<this.options.items.length;e++){t.append("<li></li>");t.find("li:last").attr("data-other",this.options.items[e].other);t.find("li:last").attr("data-value",this.options.items[e].value);t.find("li:last").text(n(this.options.items[e].label));if(!this.options.defaultValue&&this.options.defaultValue!==0&&e==0){i=this.options.items[e]}else if(this.options.defaultValue===this.options.items[e].value){i=this.options.items[e]}}if(!i){i=this.options.items[0]}this.$obj.find("span").text(n(i.label));this.$obj.find("input").val(i.value);this.$obj.on("click",function(){var t=_(this).data("open");if(!t){_(this).children(".dpmenu").attr("tabindex",0).fadeIn(300).focus();_(this).data("open",true)}}).on("click",".dpmenu > li",function(){var t=_(this).closest(".ddrop");if(typeof _(this).data("value")=="object"){t.children("input").val(JSON.stringify(_(this).data("value")))}else{t.children("input").val(_(this).data("value"))}t.children("span").text(_(this).text());_(this).parent().fadeOut(300,function(){t.data("open",false)});if(typeof s.options.onChange=="function"){s.options.onChange.call(s,_(this).data("value"),_(this).text(),_(this).data("other"))}}).on("blur",".dpmenu",function(){_(this).fadeOut(300,function(){_(this).parent().data("open",false)})})};this.selectValue=function(t){var i=null;for(var e=0;e<this.options.items.length;e++){if(t===this.options.items[e].value){i=this.options.items[e]}}this.$obj.find("span").text(i.label);this.$obj.find("input").val(i.value)};return this};_.fn.DropList=function(t){var i=this[0];if(typeof t=="string"){switch(true){case t=="select":i.droplist.selectValue(arguments[1]);break;default:alert("error param");break}}else if(typeof t=="object"){i.droplist=new o(t,i);i.droplist.init()}else{alert("error param")}return this};var s=function(t,d){var f=this;var i={items:[{value:0,label:"defaultValue",other:""}],defaultValue:null,onChange:function(){},showDefaultValue:true,suffix:"",selShowSuffix:true,selectSpace:true,style:"auto",parent:"",dir:"down"};this.options=_.extend(i,t);this.selectHtml='<input type="hidden">'+'<span class="select-text ar-eg"></span><span class="suffix" style="color:#999" >'+'</span><div class="select-ico"></div><ul class="dpmenu-EMU5" style="display:none;"></ul>';this.init=function(){this.$obj=_(d).addClass("ddrop-EMU5").html(this.selectHtml);this.$obj.find(".suffix").text(this.options.suffix);var s=this.options;var a=this;var l=this.$obj.find(".dpmenu-EMU5");this.$ul=l;var n=this.$obj.css("overflow");if(this.options.dir=="up"){l.addClass("dpmenu-EMUI5-up")}else{l.addClass("dpmenu-EMUI5-down")}var t=null;var r=this.options.items.length;l.append('<div class="flow-top"></div>');var i=h(this.options.items);if(this.options.style=="full"){this.options.parent.css("position","relative");this.$obj.css("position","static");i=this.options.parent.width()-32;l.width(i+32);l.css("min-width",i+32);l.css("max-width",i+32);l.css("left","0");l.css("right","0");var e=this.options.parent.height()+this.options.parent.css("padding-top").split("px")[0]*1+8;l.css("top",e+"px")}if(r>6){l.css("overflow-y","scroll");l.css("min-width",l.width()+20+"px");l.css("max-width",l.css("max-width").split("px")[0]*1+20+"px")}l.width(i+32);for(var o=0;o<r;o++){if(o!=r-1){l.append("<li class='dropListEMUI5_li ar-eg'></li><div class='uc-line' style='width:"+i+"px'><div></div></div>");l.find(".dropListEMUI5_li:last").text(this.options.items[o].label);l.find(".dropListEMUI5_li:last").attr("data-other",this.options.items[o].other);l.find(".dropListEMUI5_li:last").attr("data-value",this.options.items[o].value)}else{l.append("<li class='dropListEMUI5_li ar-eg'></li>");l.find(".dropListEMUI5_li:last").text(this.options.items[o].label);l.find(".dropListEMUI5_li:last").attr("data-other",this.options.items[o].other);l.find(".dropListEMUI5_li:last").attr("data-value",this.options.items[o].value)}if(!this.options.defaultValue&&this.options.defaultValue!==0&&o==0){t=this.options.items[o]}else if(this.options.defaultValue==this.options.items[o].value){t=this.options.items[o]}}if(!t){t=this.options.items[0]}if(r==1&&!s.defaultText){t=this.options.items[0];this.$obj.find(".select-ico").addClass("select-ico-gray")}if(!this.options.showDefaultValue){if(this.options.selectSpace){this.$obj.find(".select-text").text(t?t.label:"").css("visibility","hidden")}this.$obj.find("input").val(t?t.value:"")}else{this.$obj.find(".select-text").text(t?t.label:"");this.$obj.find("input").val(t?t.value:"");this.$obj.find(".suffix").css("color","#333")}if(s.showday&&!s.selShowSuffix&&this.$obj.find(".select-text").css("visibility")!="hidden"){this.$obj.find(".suffix").text("")}if(s.defaultText){this.$obj.find(".select-text").text(s.defaultText);this.$obj.find("input").val("")}this.$obj.unbind();this.$obj.on("click",function(e){var o=e.target||e.srcElement;e.stopPropagation();_(".dpmenu-EMU5").each(function(t,i){if(!(_.contains(i,e.target)||i==o)){_(i).hide();_(i).parent().data("open",false)}});if(r==1&&!s.defaultText||_(this).hasClass("ddrop-disabled"))return;var t=_(this).data("open");if(!t){a.$obj.css("overflow","visible");_(this).children(".dpmenu-EMU5").attr("tabindex",0).show().focus();_(this).data("open",true);if(a.options.style=="full"){var i=a.options.parent.height()+a.options.parent.css("padding-top").split("px")[0]*1+8;l.css("top",i+"px")}}else{l.hide();l.parent().data("open",false);a.$obj.css("overflow",n)}}).on("click",".dpmenu-EMU5 > li",function(t){t.stopPropagation();a.$obj.css("overflow",n);var i=_(this).closest(".ddrop-EMU5");if(typeof _(this).data("value")=="object"){i.children("input").val(JSON.stringify(_(this).data("value")))}else{i.children("input").val(_(this).data("value"))}i.children(".select-text").text(_(this).text()).css("visibility","visible");if(!s.selShowSuffix){i.children(".suffix").text("")}_(this).parent().hide();i.data("open",false);if(typeof f.options.onChange=="function"){f.options.onChange.call(f,_(this).data("value"),_(this).text(),_(this).data("other"))}i.children(".suffix").css("color","#333")});this.$obj.find(".dpmenu-EMU5")[0].onmousewheel=function(t){if(!t)t=window.event;this.scrollTop=this.scrollTop-(t.wheelDelta?t.wheelDelta:-t.detail*10);return false};_(document).bind("click",function(t){l.hide();l.parent().data("open",false);a.$obj.css("overflow",n)});addItemActive(_(".dpmenu-EMU5 > li",this.$obj),"li-active")};this.selectValue=function(t){var i=null;for(var e=0;e<this.options.items.length;e++){if(t==this.options.items[e].value){i=this.options.items[e]}}this.$obj.find(".select-text").text(i.label).css("visibility","visible");this.$obj.find(".suffix").css("color","#333");this.$obj.find("input").val(i.value)};function h(t){var i=104;var e;var o;for(var s=0;s<t.length;s++){e='<span id="contLength" style="visibility:hidden;font-size:15px;"></span>';_("body").append(e);_("#contLength:last").text(t[s].label);o=_("#contLength")[0].offsetWidth+1;if(o>i)i=o;_("#contLength").remove()}return i}return this};_.fn.DropListEMUI5=function(t){var i=this[0];if(!i){return}if(typeof t=="string"){switch(true){case t=="select":i.droplistEMUI5.selectValue(arguments[1]);break;default:alert("error param");break}}else if(typeof t=="object"){i.droplistEMUI5=new s(t,i);i.droplistEMUI5.init()}else{alert("error param")}return this};var a=function(l,n){var r;var d;var f;var h;var c;var p;var u={yearChange:function(){},monthChange:function(){},dayChange:function(){},format:"Y-M-D",yearSuffix:"",monthSuffix:"",daySuffix:"",itemSuffix:false,yearSpace:true,monthSpace:true,daySpace:true,dir:"down"};this.init=function(){l=_.extend(u,l);var t="<div> <input class='year' type='hidden'  /><input class='month' type='hidden' /> <input class='day' type='hidden'> <div class='yearDiv dateItems'></div> <div class='monthDiv dateItems'></div> <div class='dayDiv dateItems'> </div></div>";var i=n;i.html(t);r=_(".dayDiv",i);d=_(".monthDiv",i);f=_(".yearDiv",i);h=_(".day",i);c=_(".year",i);p=_(".month",i);h.val("N");c.val("N");p.val("N");var e=g();var o=v();var s=b(2016,1);var a=true;if(localInfo.lang!="zh-cn"&&localInfo.lang!="zh-hk"&&localInfo.lang!="zh-tw"){a=false}if(l.format.indexOf("Y")!=-1){f.DropListEMUI5({items:e,defaultValue:"N",showDefaultValue:false,suffix:l.yearSuffix,selShowSuffix:a,selectSpace:l.yearSpace,onChange:function(t,i){c.val(t);m(a);l.yearChange()},dir:l.dir})}if(l.format.indexOf("M")!=-1){d.DropListEMUI5({items:o,defaultValue:"N",showDefaultValue:false,suffix:l.monthSuffix,selShowSuffix:a,selectSpace:l.monthSpace,onChange:function(t,i){p.val(t);m(a);l.monthChange()},dir:l.dir})}if(l.format.indexOf("D")!=-1){r.DropListEMUI5({items:s,defaultValue:"N",showDefaultValue:false,suffix:l.daySuffix,selShowSuffix:a,selectSpace:l.daySpace,onChange:function(t,i){h.val(t);l.dayChange()},dir:l.dir})}};this.getValue=function(t){if(t=="Y"){return c.val()*1}else if(t=="M"){return p.val()*1}else if(t=="D"){return h.val()*1}};this.setDate=function(t,i,e){t=t||1900;i=i||1;e=e||1;f.DropListEMUI5("select",t);d.DropListEMUI5("select",i);r.DropListEMUI5("select",e);h.val(e);c.val(t);p.val(i)};function g(){var t=(new Date).getFullYear();var i=[];for(var e=t;e>=1900;e--){if(l.itemSuffix){t={value:e,label:e+l.yearSuffix}}else{t={value:e,label:e+""}}i.push(t)}return i}function v(){var t=[];var i={};for(var e=1;e<=12;e++){if(l.itemSuffix){i={value:e,label:e+l.monthSuffix}}else{i={value:e,label:e+""}}t.push(i)}return t}function b(t,i){var e=[30,31,28,31,30,31,30,31,31,30,31,30,31];if(i==2&&t%400==0||t%4==0&&t%100!=0){e[2]=29}var o=[];var s={};for(var a=1;a<=e[i];a++){if(l.itemSuffix){s={value:a,label:a+l.daySuffix}}else{s={value:a,label:a+""}}o.push(s)}return o}function m(t){if(l.format.indexOf("D")==-1)return;var i=c.val()*1;var e=p.val()*1;var o=h.val();var s=b(i,e);var a=false;if(o!="N"){a=true;if(o*1>s.length){o=1}}if(!isNaN(i)&&!isNaN(e)){r.DropListEMUI5({items:s,defaultValue:o,suffix:l.daySuffix,showDefaultValue:a,selShowSuffix:t,showday:true,onChange:function(t,i){h.val(t);l.dayChange()},dir:l.dir})}}};_.fn.datePickEMUI5=function(t){var i=this[0];if(!i){return}if(typeof t=="object"){i.datePickEMUI5=new a(t,_(i));i.datePickEMUI5.init()}else if(typeof t=="string"){return i.datePickEMUI5.getValue(t)}else if(typeof t=="number"){i.datePickEMUI5.setDate.apply(i.datePickEMUI5,arguments)}};_(document).on("click",".radio",function(){if(_(this).data("check")){return}var t=_(this).data("group");l(_(this),true);l(_("[data-group='"+t+"']").not(this),false);_("#"+t).val(_(this).data("value"));_("#"+t).trigger("change")}).on("check",".radio",function(){_(this).trigger("click")});function l(t,i){if(i){t.removeClass("roff").addClass("ron")}else{t.removeClass("ron").addClass("roff")}t.data("check",i)}function n(t){if(t.length>28){if(t.indexOf("*")>0){var i=t.substring(0,t.indexOf("*"));var e=t.substring(t.lastIndexOf("*"),t.length);i=i.substring(0,24-e.length);t=i+"****"+e}}return t}});