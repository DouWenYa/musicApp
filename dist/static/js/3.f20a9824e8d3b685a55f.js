webpackJsonp([3],{"W1+L":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("4YfN"),n=s.n(i),r=s("T452"),o=s("m40h"),a=s("Hu4l"),l=s.n(a),c=s("3Q4o"),d=s("9r/T"),u={props:{loop:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!0},interval:{type:Number,default:3e3}},data:function(){return{dots:[],currentIndex:0}},created:function(){var t=this;Object(d.setTimeout)(function(){t._setSliderWidth(),t._initDots(),t._initSlider(),t.autoPlay&&t._play()},20),window.addEventListener("resize",function(){t.slider&&(t._setSliderWidth(!0),t.slider.refresh())})},destroyed:function(){Object(d.clearTimeout)(this.timer)},methods:{_initSlider:function(){var t=this;this.slider=new l.a(this.$refs.slider,{scrollX:!0,scrollY:!1,momentum:!1,snap:!0,snapLoop:this.loop,snapThreshold:.3,snapSpeed:400}),this.slider.on("scrollEnd",function(){var e=t.slider.getCurrentPage().pageX;t.loop&&(e-=1),t.currentIndex=e,console.log("current",e),t.autoPlay&&t._play()}),this.slider.on("beforeScrollStart",function(){t.autoPlay&&Object(d.clearTimeout)(t.timer)})},_setSliderWidth:function(t){this.child=this.$refs.sliderGroup.children;for(var e=0,s=this.$refs.slider.clientWidth,i=0;i<this.child.length;i++){var n=this.child[i];Object(c.a)(n,"slider-item"),n.style.width=s+"px",e+=s}this.loop&&!t&&(e+=2*s),this.$refs.sliderGroup.style.width=e+"px",console.log(e,this.child.length)},_initDots:function(){this.dots=new Array(this.child.length),console.log("arr",this.child)},_play:function(){var t=this,e=this.currentIndex+1;this.loop&&(e+=1),console.log("goto",e),this.timer=Object(d.setTimeout)(function(){t.slider.goToPage(e,0,400)},this.interval)}}},h={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"slider",staticClass:"slider"},[s("div",{ref:"sliderGroup",staticClass:"slider-group"},[t._t("default")],2),t._v(" "),s("div",{staticClass:"dots"},t._l(t.dots,function(e,i){return s("span",{key:i,staticClass:"dot",class:{active:t.currentIndex===i}})}),0)])},staticRenderFns:[]};var m=s("C7Lr")(u,h,!1,function(t){s("gShl")},"data-v-2153a486",null).exports,f=s("qwAB"),p=s("y/jF"),v=s("F4+m"),g=s("2bvH"),_={mixins:[v.a],data:function(){return{recommends:[],discList:[]}},created:function(){this._getRecommend(),this._getDiscList()},methods:n()({selectItem:function(t){this.$router.push({path:"/recommend/"+t.dissid}),this.setDisc(t)},handlePlaylist:function(t){var e=t.length>0?"60px":"0";this.$refs.recommend.style.bottom=e,this.$refs.scroll.refresh()},_getRecommend:function(){var t=this;Object(o.c)().then(function(e){e.code===r.a&&(t.recommends=e.data.slider)})},_getDiscList:function(){var t=this;Object(o.b)().then(function(e){e.code===r.a&&(t.discList=e.data.list)})},loadImage:function(){this.checkImgLoad||(this.$refs.scroll.refresh(),this.checkImgLoad=!0)}},Object(g.d)({setDisc:"SET_DESC"})),components:{Slider:m,Scroll:f.a,Loading:p.a}},y={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"recommend",staticClass:"recommend"},[s("scroll",{ref:"scroll",staticClass:"recommend-content",attrs:{data:t.discList}},[s("div",[t.recommends.length?s("div",{ref:"sliderWrapper",staticClass:"slider-wrapper"},[s("slider",t._l(t.recommends,function(e,i){return s("div",{key:i},[s("a",{attrs:{href:e.linkUrl}},[s("img",{staticClass:"needsclick",attrs:{src:e.picUrl,alt:""},on:{load:t.loadImage}})])])}),0)],1):t._e(),t._v(" "),s("div",{staticClass:"recommend-list"},[s("h1",{staticClass:"list-title"},[t._v("热门歌单推荐")]),t._v(" "),s("ul",t._l(t.discList,function(e,i){return s("li",{key:i,staticClass:"item",on:{click:function(s){return t.selectItem(e)}}},[s("div",{staticClass:"icon"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.imgurl,expression:"item.imgurl"}],attrs:{alt:"",width:"60",height:"60"}})]),t._v(" "),s("div",{staticClass:"text"},[s("h2",{staticClass:"name",domProps:{innerHTML:t._s(e.creator.name)}}),t._v(" "),s("p",{staticClass:"desc",domProps:{innerHTML:t._s(e.dissname)}})])])}),0)])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.discList.length,expression:"!discList.length"}],staticClass:"loading-container"},[s("loading")],1)]),t._v(" "),s("router-view")],1)},staticRenderFns:[]};var C=s("C7Lr")(_,y,!1,function(t){s("l8Rr")},"data-v-32d0fbec",null);e.default=C.exports},gShl:function(t,e){},l8Rr:function(t,e){},m40h:function(t,e,s){"use strict";e.c=function(){var t=o()({},d.b,{uin:"0",paltform:"h5",needNewCode:"1"});return Object(a.a)("https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",t,d.c)},e.b=function(){var t=o()({},d.b,{platform:"yqq",hostUin:0,sin:0,ein:29,sortId:5,needNewCode:0,categoryId:1e7,rnd:Math.random(),format:"json"});return c.a.get("/api/getDiscList",{params:t}).then(function(t){return n.a.resolve(t.data)})},e.a=function(t){var e=o()({},d.b,{disstid:t,type:1,json:1,utf8:1,onlysong:"0",new_format:"1",g_tk:5381,loginUin:"0",hostUin:"0",notice:"0",platform:"yqq.json",needNewCode:"0"});return c.a.get("/api/getCdinfo",{params:e}).then(function(t){return n.a.resolve(t.data)})};var i=s("rVsN"),n=s.n(i),r=s("aA9S"),o=s.n(r),a=s("Gak4"),l=s("aozt"),c=s.n(l),d=s("T452")}});
//# sourceMappingURL=3.f20a9824e8d3b685a55f.js.map