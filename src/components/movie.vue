<template>
  <div class="movie" :class="{'dark':themeName=='dark'}">
    <navbar title="影视列表"></navbar>
    <div class="content-list">
      <div class='cell-wrapper' :class="{'dark':themeName=='dark'}" v-for="(item,index) in list" :key="index">
	      <div class='cell'>
          <router-link :to="'/movieDetail/'+item.id">
		        <div class='cell-title'>{{item.title}}</div>
		        <img v-lazy="item.img_url?netif.imagePrefix+item.img_url:''" alt="" class="cell-img">
		        <div class='cell-subtitle'>《{{item.subtitle}}》</div>
		        <div class='cell-forward'>注:{{item.forward}}</div>
          </router-link>
	      </div>
	  	</div>
	  	<div class="loading" :class="{'dark':themeName=='dark'}">
	  		<img src="../assets/img/loading.gif" alt="" />
	  		<span class="loading-text">加载中...</span>
	  	</div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'movie',
		data() {
			return {
				list: [],
				
				isLoadMore:false,
				page:1,
				count:10
			}
		},
		created() {
			this.downloadList()
		},
		mounted() {
			
			var self = this
			window.onscroll = function() {	
				var scrollHeight = document.documentElement.scrollHeight
				var scrollTop = document.documentElement.scrollTop
				var showHeight = document.documentElement.clientHeight	
				if(scrollTop+showHeight >= scrollHeight-2){
					console.log("滚动到底部")
					
					if(self.isLoadMore == false){
						self.page++;
						self.downloadList()		
					}else{
						console.log("正在加载,请稍后!")
					}
				}
			}
		},
		destroyed(){
			window.onscroll = null
		},
		methods: {
			downloadList() {
				
				var start = (this.page-1)*this.count

				var url = this.netif.movieListUrl+"&start="+start+"&count="+this.count
				
				this.axios.get(url).then((res) => {
					var list = res.data.data
					console.log(list.length)
					if(list.length == 0){
						MessageBox('提示', '所有数据加载完了!');
						$(".loading").hide()
					}
					this.list = this.list.concat(list)
					this.isLoadMore = false
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie{
	background: #eaeaea;
}
.cell-wrapper{
  width: 100%;
  background: #fff;
  margin-top:10px; 
}
.content-list>:first-child{
	margin-top:0;
}
.cell{
  width: 95%;
  margin:0 auto;
  border-bottom:1px solid #c0bfc4;
  
}
.cell-title{
  width: 100%;
  line-height:40px;
  font-size:15px;
  white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.cell-img{
  width: 100%;
  height: 200px;
}
.cell-forward{
  width: 100%;
  padding-bottom:5px;
  line-height:20px;
  color: #85858b;
  font-size: 14px;
}
.cell-subtitle{
  height: 30px;
  line-height: 40px;
  font-size: 14px;
}
.loading{
	text-align: center;
	line-height: 40px;
	background: #fff;
	font-size: 16px;
}
.loading img{
	width: 30px;
	height: 30px;
	vertical-align: middle;
}


/* dark 夜间模式 */
.cell-wrapper.dark,
.movie.dark,
.loading.dark{
  	background: #333 !important;
		color: #ccc!important;
		border-color: #454530!important;
}
.cell-wrapper.dark img,
.movie.dark img,
.loading.dark img{
  opacity: 0.5!important;
}
.cell-wrapper.dark a{
	color: #aaa;
}
</style>
