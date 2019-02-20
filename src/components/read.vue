<template>
  <div class="read" :class="{'dark':themeName=='dark'}">
    <navbar title="阅读列表"></navbar>
    <div class="content-list">
      <div class='cell-wrapper' :class="{'dark':themeName=='dark'}" v-for="(item,index) in list" :key="index">
		    
	      <div class='cell'>
					<router-link :to="'/readDetail/'+item.id">
		        <div class='cell-type'>-阅读-</div>
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
		name: 'HelloWorld',
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
				var url = this.netif.readListUrl+"&start="+start+"&count="+this.count
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
.read{
	background: #eaeaea;
}
.cell-wrapper{
  width: 100%;
  margin-top:10px;
  background: #fff; 
}
.cell{
  width: 95%;
  margin:0 auto;
  border-bottom:1px solid #c0bfc4;
}
.content-list>:first-child{
	margin-top:0;
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
  line-height:30px;
  color: #7c7c82;
  font-size:14px;
}
.cell-title{
  width: 100%;
  line-height: 20px;
  font-size:16px;
}
.cell-img{
  width: 100%;
  height:200px;
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
.read.dark,
.loading.dark{
  background: #333;
	color: #ccc;
	border-color: #454530;
}
.cell-wrapper.dark img,
.read.dark img,
.loading.dark img{
  opacity: 0.5!important;
}
.cell-wrapper.dark a{
	color: #aaa;
}
</style>
