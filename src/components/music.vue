<template>
  <div class="music" :class="{'dark':themeName=='dark'}">
    <navbar title="音乐列表"></navbar>
    <div class="content-list">
       <div class='cell-wrapper' :class="{'dark':themeName=='dark'}" v-for="(item,index) in list" :key="index">
	      <div class='cell'>
			<router-link :to="'/musicDetail/'+item.id">
		        <div class='cell-title'>{{item.title}}</div>
		        <div class='cell-author'>作者:{{item.author_name}}</div>
		       	<img v-lazy="item.img_url?netif.imagePrefix+item.img_url:''" alt="" class="cell-img">
		        <div class='cell-mask' :class="{'dark':themeName=='dark'}"></div>
		        <div class='cell-forward'>{{item.forward}}</div>
		        <div class='cell-lick'>7小时前 收藏:{{item.like_count}}</div>
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

<script>import { MessageBox } from 'mint-ui';
export default {
	name: 'HelloWorld',
	data() {
		return {
			list: [],

			isLoadMore: false,
			page: 1,
			count: 10
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

			if(scrollTop + showHeight >= scrollHeight - 2) {
				console.log("滚动到底部")

				if(self.isLoadMore == false) {
					self.page++;
					this.isLoadMore = true
					self.downloadList()

				} else {
					console.log("正在加载,请稍后!")
				}
			}
		}
	},
	destroyed() {
		window.onscroll = null
	},
	methods: {
		downloadList() {

			var start = (this.page - 1) * this.count
			var url = this.netif.musicListUrl + "&start=" + start + "&count=" + this.count

			this.axios.get(url).then((res) => {
				var list = res.data.data
				console.log(list.length)
				if(list.length == 0) {
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
.music {
	background: #eaeaea;
}

.cell-wrapper {
	width: 100%;
	height: 105px;
	background: #fff;
	margin-top: 10px;
}

.cell {
	width: 95%;
	margin: 0 auto;
	border-top: 1px solid #c0bfc4;
	border-bottom: 1px solid #c0bfc4;
	margin-bottom: 10px;
	position: relative;
	height: 105px;
}

.content-list>:first-child{
	margin-top:0;
}

.cell-author {
	line-height: 30px;
	color: #7c7c82;
	font-size: 14px;
	position: absolute;
	left: 100px;
	top: 30px;
}

.cell-title {
	height: 20px;
	line-height: 20px;
	font-size: 16px;
	position: absolute;
	left: 100px;
	top: 10px;
	overflow: hidden;
}

.cell-img {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	position: absolute;
	left: 10px;
	top: 10px;
}

.cell-mask {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: #fff;
	position: absolute;
	left: 37px;
	top: 37px;
}

.cell-forward {
	height: 20px;
	line-height: 20px;
	color: #85858b;
	font-size: 14px;
	position: absolute;
	left: 100px;
	top: 80px;
	overflow: hidden;
}

.cell-lick {
	line-height: 20px;
	color: #85858b;
	font-size: 12px;
	position: absolute;
	left: 100px;
	top: 55px;
}

.loading {
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
.music.dark,
.loading.dark{
  	background: #333 !important;
	color: #ccc!important;
	border-color: #454530!important;
}
.cell-wrapper.dark img,
.music.dark img,
.loading.dark img{
  opacity: 0.5!important;
}
.cell-mask.dark{
	background: #999;
}
.cell-wrapper.dark a{
	color: #aaa;
}
</style>
