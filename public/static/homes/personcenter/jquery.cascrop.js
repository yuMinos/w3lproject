(function(t){if(typeof define==="function"&&define.amd){define(["jquery"],t)}else{t(jQuery)}})(function(g){var s=function(t,h){var f=this;var e={width:g(h).width(),height:g(h).height(),value:0,min:0,max:20,onSelect:null,onChange:null};this.options=g.extend(e,t);this.cropData={x:0,y:0,w:this.options.width,h:this.options.height,scaleX:1,scaleY:1};this.zoomData={zoomValue:0};this.init=function(){var t='<div class="cascrop_holder unselect">'+'\t\t\t\t\t  <image class="cascrop_avatar" src="'+window.parent.localInfo.avatPath+'"></image>'+'\t\t\t          <image class="cascrop_target" style="display: none;"></image>'+"             \t  </div>"+'                 <div class="cascrop_slider_bar unselect"></div>';g(t).appendTo(g(h));g(h).addClass("unselect");var e=g(h).find(".cascrop_slider_bar"),i=g(h).find(".cascrop_holder");i.css({width:f.options.width+"px",height:f.options.height+"px"});e.SliderBar({value:f.options.value,min:f.options.min,max:f.options.max,disabled:true,change:function(t){f.zoomData.zoomValue=t;f.zoom()}})};this.setImage=function(t){var e=g(h).find(".cascrop_target"),i=g(h).find(".cascrop_holder"),s={imageUrl:"",imageWidth:0,imageHeight:0};if(g(h).find(".cascrop_target").length>0){g(h).find(".cascrop_target").empty()}f.imgData=g.extend(s,t);f.cropData.w=f.options.width;f.cropData.h=f.options.height;i.css({width:f.options.width+"px",height:f.options.height+"px"});e.show();e.attr({"src":f.imgData.imageUrl});f.zoomData.zoomValue=f.options.value;e[0].onload=function(){f.zoom();f.updateCropData();e.draggable({stop:function(t){f.adjustImage();f.updateCropData()}});g(h).find(".cascrop_slider_bar").SliderBar("reset");g(h).find(".cascrop_slider_bar").SliderBar("enable")}};this.adjustImage=function(){var t=parseInt(g(h).find(".cascrop_target").css("top")),e=parseInt(g(h).find(".cascrop_target").css("left")),i=parseInt(g(h).find(".cascrop_target").css("width")),s=parseInt(g(h).find(".cascrop_target").css("height")),a=f.options.width,n=f.options.height;if(i>a||s>n){t=t>0?0:t;t=t<-(s-n)?-(s-n):t;e=e>0?0:e;e=e<-(i-a)?-(i-a):e}else{t=0;e=0}g(h).find(".cascrop_target").css({top:t+"px",left:e+"px"})};this.zoom=function(){var t=g(h).find(".cascrop_target"),e=0,i=0,s=0,a=0,n=f.imgData.imageWidth,o=f.imgData.imageHeight,r=f.options.width,l=f.options.height;if(f.zoomData.zoomValue<f.options.min){s=f.options.width;a=f.options.height}else{var d=f.zoomData.zoomValue-f.options.min;var c=f.options.max-f.options.min;var p=parseInt(t.css("top"));var u=parseInt(t.css("left"));s=r+(n-r)*(d/c);a=l+(o-l)*(d/c);i=p*(a/o);e=u*(s/r)}s=s>=r?s:r;a=a>=l?a:l;if(n>=o){s=n*a/o}else{a=o*s/n}setTimeout(function(){t.css({top:i,left:e,width:s,height:a});f.adjustImage();f.updateCropData()},100)};this.updateCropData=function(){var t=g(h).find(".cascrop_target");f.cropData.x=Math.abs(parseInt(t.css("left")));f.cropData.y=Math.abs(parseInt(t.css("top")));f.cropData.scaleX=parseInt(t.css("width"))/f.imgData.imageWidth;f.cropData.scaleY=parseInt(t.css("height"))/f.imgData.imageHeight;f.cropData.x=Math.round(f.cropData.x/f.cropData.scaleX);f.cropData.y=Math.round(f.cropData.y/f.cropData.scaleY);f.cropData.w=Math.round(f.options.width/f.cropData.scaleX);f.cropData.h=Math.round(f.options.height/f.cropData.scaleY);if(typeof f.options.onChange=="function"){f.options.onChange(f.cropData)}};this.init();return this};g.fn.Cascrop=function(t,e){var i=this[0];if(typeof t=="object"){i.cascrop=new s(t,i)}if(typeof e=="function"){e.call(i.cascrop)}return this};var i=function(t,o){var r=this;var e={value:0,min:0,max:0,disabled:false,change:null};this.options=g.extend(e,t);this.slider={ui:{value:r.options.value},state:{isOnSlider:false,isDispatch:true,disabled:r.options.disabled},screenX:0,sliderLength:0,segmentLength:0,dispatchTimer:null};this.init=function(){r.initUI();r.initEvent();r._prepareData();r._setValue(r.options.value,true)};this.initUI=function(){var t='<div class="slider-bar-holder">'+'                 <div class="slider-bar-zoom-out unselect"></div>'+'\t\t\t\t  <div class="slider-bar-control unselect">'+'\t\t\t\t      <div class="slider-bar-slider">'+'\t\t\t\t\t      <div class="slider-bar-range"></div>'+'                         <div class="slider-bar-handler"></div>'+"\t\t\t\t      </div>"+"\t\t\t\t  </div>"+'\t\t\t      <div class="slider-bar-zoom-in unselect"></div>'+"\t\t\t  </div>";g(o).append(g(t))};this.initEvent=function(){g(o).on("click",".slider-bar-zoom-out",function(){r._setValue(r.slider.ui.value-1)}).on("click",".slider-bar-zoom-in",function(){r._setValue(r.slider.ui.value+1)}).on("click",".slider-bar-control",function(t){r._stopBubble(t);r._setPos(t.clientX-r.slider.screenX)}).on("mousedown",".slider-bar-handler",function(t){r._stopBubble(t);r.slider.state.isOnSlider=true}).on("mouseup",".slider-bar-handler",function(t){r._stopBubble(t);r.slider.state.isOnSlider=false});window.onmouseup=function(t){r._stopBubble(t);r.slider.state.isOnSlider=false};window.onmousemove=function(t){r._stopBubble(t);if(r.slider.state.isOnSlider&&r._isOnMousedown(t)&&t.offsetX>=0&&t.clientX-r.slider.screenX>=0&&t.clientX-r.slider.screenX<=r.slider.sliderLength){r._setPos(t.clientX-r.slider.screenX)}}};this._isOnMousedown=function(t){var e=false;if(navigator.userAgent.indexOf("MSIE")>-1){if(window.event.button==1){e=true}}else if(navigator.userAgent.indexOf("Firefox")>-1){if(t.buttons==1){e=true}else{e=false}}else if(navigator.userAgent.indexOf("Chrome")>-1){if(t.buttons==1){e=true}}else{e=true}if(!e){r.slider.state.isOnSlider=false}return e};this._stopBubble=function(t){if(t&&t.stopPropagation){t.stopPropagation()}else{window.event.cancelBubble=true}};this._prepareData=function(){r.slider.screenX=r._getX(g(o).find(".slider-bar-slider")[0]);r.slider.sliderLength=parseInt(g(o).find(".slider-bar-slider").width());r.slider.segmentLength=r.slider.sliderLength/(r.options.max-r.options.min)};this._setValue=function(t,e){if(!e){if(r.slider.state.disabled){return}if(t>r.options.max||t<r.options.min){return}}r._updateSlider(t*r.slider.segmentLength,e)};this._setPos=function(t){if(r.slider.state.disabled){return}r._updateSlider(t)};this._updateSlider=function(t,e){if(t>r.slider.sliderLength||t<0){return}var i=r.slider.segmentLength;var s=Math.ceil(t/i);var a=t-(s-1)*i;var n=s*i-t;if(a<=n){t=(s-1)*i;r.slider.ui.value=s-1}else{t=s*i;r.slider.ui.value=s}g(o).find(".slider-bar-handler").css("left",t+"px");g(o).find(".slider-bar-range").css("width",t+"px");if(typeof r.options.change=="function"&&r.slider.state.isDispatch&&!e){r.options.change(r.slider.ui.value);r.slider.state.isDispatch=false;r.slider.dispatchTimer=setTimeout(function(){r.slider.state.isDispatch=true},20)}};this._getX=function(t){return t.offsetLeft+(t.offsetParent?this._getX(t.offsetParent):t.x?t.x:0)};this.disable=function(){r.slider.state.disabled=true};this.enable=function(){r.slider.state.disabled=false};this.reset=function(){r._setValue(r.options.value,true)};this.init();return this};g.fn.SliderBar=function(t){var e=this[0];if(typeof t=="object"){e.cascrop=new i(t,e)}else if(typeof t=="string"){switch(t){case"disable":{e.cascrop.disable();break}case"enable":{e.cascrop.enable();break}case"reset":{e.cascrop.reset()}default:{break}}}return this}});