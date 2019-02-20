<template>
  <div class="search" :class="{'dark':themeName=='dark'}">
    <navbar title="搜索" type="detail"></navbar>
    <div class='content-search'>
		  <div class='search-cont'>
		    <img src='../assets/img/search_min.png' alt="" class="search-img">
		    <input class='serch-input' placeholder='搜索关键字' v-focus v-model="keyword" @keydown.enter='dealsearch' @change="dealNull">
		    <button class='serch-button' @click="dealsearch">搜索</button>
		  </div>
		  
		  <div class="search-info">
				<span v-if='isHaveSearch == 0'></span>
				<span v-if='isHaveSearch == 1'>
					搜索 <span class='show-keyword'>{{showKeyword}}</span>, 共有<span class='show-keyword'>{{total}}</span>条内容
				</span>
			</div>
	
		  <div class='serch-list' v-for="(item,index) in list" :key="index" :class="{'dark':themeName=='dark'}">
		  	<router-link :to='item.pageName+item.id'>
			    <div class='list-title'>{{item.title}}</div>
			    <div class='list-cont'>
			      <img class="list-img" v-lazy="item.img_url?netif.imagePrefix+item.img_url:''" alt="" />
			      <div class='list-des'>{{item.forward}}</div>
			    </div>
			  </router-link>
			 </div>
			  
		</div>
  </div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'HelloWorld',
		data() {
			return {
				list: [],
				keyword:'',
				
				isHaveSearch:"0",
				showKeyword:"",
				total:"",
				
				
				isLoadMore:false,
				page:1,
				count:10
			}
		},
		mounted() {
			
			var self = this

			window.onscroll = function() {
				var scrollHeight = document.documentElement.scrollHeight
				var scrollTop = document.documentElement.scrollTop
				var showHeight = document.documentElement.clientHeight
				
				if(scrollTop+showHeight >= scrollHeight-3){
					
					console.log("滚动到底部")
					
					if(self.isLoadMore == false){
						self.page++;
						
						self.dealsearch()
						
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
				// 处理输入框中的value是否变化，若变化则重新加载
				// 也就是说当重新搜索内容时，先让list置空  然后在重新请求接口
			dealNull(){
				this.list = []
				this.dealsearch()
			},
			dealsearch() {
				
				var keyword = this.keyword
				
				if(keyword.length == 0){
					MessageBox('提示', '请输入关键字!');
					return
				}
				
				var start = (this.page-1)*this.count
				
				
				var url = this.netif.searchUrl+"&keyword="+keyword+"&start="+start
				console.log(url)
				

				this.axios.get(url).then((res) => {
					var list = res.data.data
				
				
					this.total = res.data.total
					this.showKeyword = this.keyword
					
					this.isHaveSearch = 1
					
					console.log(list.length)
					if(list.length == 0){
						console.log(1111111111111)
						MessageBox('提示', '所有数据加载完了!');
						return
					}
					
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
					

					this.list = this.list.concat(list)
					this.isLoadMore = false
					

				})
			}
		}
	}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search{
	background: #eaeaea;
	font-size:14px;
	height: 100%;
}
.content-search{
	padding-top:44px;
	min-height: 455px;
}
.search-cont{
  width: 90%;
  margin:15px auto;
  margin-bottom: 0;
  border-radius:5px;
  border:1px solid #c1c1c1;
  position: relative;
  overflow: hidden;
}
.search-img{
  width: 20px;
  height: 20px;
  position: absolute;
  left:15px;
  top:10px;
}
.serch-input{
  width: 100%;
  height: 40px;
  padding-left:50px;
  box-sizing: border-box;
  background: #fff;
  font-size: 14px;
  border:0;
  outline: none;
}
.serch-button{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #ddd;
  color: #9a9a9a;
  font-size: 14px;
  border:0;
  outline: none;
}
.serch-list{
  width: 100%;
  border-top:1px solid #dfdfe3;
  border-bottom:1px solid #dfdfe3;
  background: #fff;
  margin-bottom:10px;
}

.list-title{
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding-left:15px;
  box-sizing: border-box;
  border-bottom: 1px solid #f1f1f1;
}
.list-cont{
  width: 100%;
  height: 80px;
  font-size: 14px;
  padding:15px;
  box-sizing: border-box;
  
  display: flex;
}
.list-img{
  width: 80px;
  height: 55px;
  margin-right:15px;
   
}
.list-des{
  color: #948a8e;
  font-size: 13px;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp:2;
	overflow: hidden;
}
.show-keyword{
	font-size:16px;
	color: hotpink;
	margin:0 3px;
}
.search-info{
	width: 90%;
	margin:0 auto;
	padding:10px 0;
}

/* dark 夜间模式 */
.search.dark,
.serch-list.dark{
  background: #333;
	color: #ccc;
	border-color: #454530;
}
.search.dark img,
.serch-list.dark img{
	opacity: 0.5;
}
.search.dark a,
.serch-list.dark a{
	color:#aaa;
}

</style>
