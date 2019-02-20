<template>
  <div class="home" :class="{'dark':themeName=='dark'}">
    <navbar title="首页"></navbar>
    <div class="content-list">   	
    	<div class="swiper">	
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div v-for="(item,index) in adslist" :key="index" class="swiper-slide">
							<router-link :to="item.pageName+item.id">	
								<img :src="item.img_url?netif.imagePrefix+item.img_url:''" />
							</router-link>
						</div>
					</div>
					<!--下面的小圆点-->
					<div class="swiper-pagination"></div>
				</div>
			</div>
       <div class="cell-wrapper" :class="{'dark':themeName=='dark'}" v-for="(item,index) in list" :key="index">
					<div class="cell">
						<router-link :to="item.pageName+item.id">
			        <div class='cell-type'>-{{item.categoryName}}-</div>
			        <div class='cell-title'>{{item.title}}</div>
			        <div class='cell-author'>作者:</div>
			        <img v-lazy="item.img_url?netif.imagePrefix+item.img_url:''" alt="" class="cell-img">
			        <div class='cell-forward'>{{item.forward}}</div>
			        <div class='cell-he'>
			          <div class='cell-post'>更新时间:{{item.post_date}}</div>
			          <div class='cell-lick'>收藏:{{item.like_count}}</div>
			        </div>
			      </router-link>
					</div>
       </div>

      <div class="loading" :class="{'dark':themeName=='dark'}" v-if="isShowLoading">
	  		<img src="../assets/img/loading.gif" alt="" />
	  		<span class="loading-text">加载中...</span>
	  	</div>

    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      list:[],
      adslist:[],
      isShowLoading:true
    }
  },
  created(){
    this.downLoadList()
    this.downLoadAdsList()
  },
  methods:{
    downLoadList(){

      var url = this.netif.mainListUrl

      this.axios.get(url).then((res)=>{
        var list = res.data.data
				
				for (var k in list) {
          var item = list[k]
          if (item.category == '1') {
            item.categoryName = "阅读"
            item.pageName = "/readDetail/"
          } else if (item.category == '4') {
            item.categoryName = "音乐"
            item.pageName = "/musicDetail/"
          } else if (item.category == '5') {
            item.categoryName = "影视"
            item.pageName = "/movieDetail/"
          }
        }
				
        this.list = list

        if(this.list.length!=0){
          this.isShowLoading = false
        }
      })
    },
    downLoadAdsList(){

      var url = this.netif.adsUrl

      this.axios.get(url).then((res)=>{
        var list = res.data.data
				
				for (var k in list) {
          var item = list[k]
          if (item.category == '1') {
            item.categoryName = "阅读"
            item.pageName = "/readDetail/"
          } else if (item.category == '4') {
            item.categoryName = "音乐"
            item.pageName = "/musicDetail/"
          } else if (item.category == '5') {
            item.categoryName = "影视"
            item.pageName = "/movieDetail/"
          }
        }
				
        this.adslist = list
        
        this.$nextTick(function(){
					
					var mySwiper = new Swiper(".swiper-container",{
						//指定分页组件
						pagination: ".swiper-pagination",
						//自动切换时间
						autoplay: 2000,
						//循环滚动
						loop:true,
						//点击分页是否可以切换图片
						paginationClickable: true,
						//点击后，轮播图继续播放
						autoplayDisableOnInteraction : false
						
						//direction:"vertical"
					})
					
				})
      })
      
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
	background: #eaeaea;
}
.swiper,.swiper img{
	width: 100%;
  height: 200px;
}
.cell-wrapper{
	width: 100%;
  background: #fff;
}
.cell{
  width: 95%;
  margin:0 auto;
  margin-bottom:10px;
  border-bottom:1px solid #c0bfc4;
}
.cell-type{
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #828288;
  font-size:16px;
}
.cell-author{
  line-height: 30px;
  color: #7c7c82;
  font-size: 14px;
}
.cell-title{
  width: 100%;
  line-height: 20px;
  font-size:16px;
}
.cell-img{
  width: 100%;
  height: 200px;
}
.cell-forward{
  width: 100%;
  line-height:20px;
  color: #85858b;
  font-size: 14px;
}
.cell-he{
  height: 30px;
  overflow: hidden;
}
.cell-post{
  line-height: 20px;
  color: #85858b;
  font-size: 12px;
  float: left;
}
.cell-lick{
  line-height: 20px;
  color: #85858b;
  font-size: 12px;
  float: left;
  margin-left: 5px;
}

.loading{
	width: 100%;
	text-align: center;
	line-height: 40px;
	font-size: 16px;
	position:fixed;
	top:44px;
	left:0;
  background: #fff;
}
.loading img{
	width: 30px;
	height: 30px;
	vertical-align: middle;
}


/* dark 夜间模式 */
.cell-wrapper.dark,
.home.dark,
.loading.dark{
  background: #333 !important;
	color: #ccc!important;
	border-color: #454530!important;
}
.cell-wrapper.dark img,
.home.dark img,
.loading.dark img{
  opacity: 0.5!important;
}
.cell-wrapper.dark a{
  color: #aaa;
}
</style>
