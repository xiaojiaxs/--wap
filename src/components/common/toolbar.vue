<template>
  <div>
  	<div class='toolbar' :class="{'dark':themeName=='dark'}">
  		
		<div @click="dealCollect">
			<span>收藏</span> 
			<img :src="!innerIsCollect?require('../../assets/img/collect.png'):require('../../assets/img/collected.png')"/>
		</div>
		
		<div @click="dealGoods">
			<span>点赞</span> 
			<img :src="!innerIsGood?require('../../assets/img/good.png'):require('../../assets/img/gooded.png')"/>
		</div>
		
		<div @click="dealComment">
			<span>评论</span> 
			<img src="../../assets/img/pinglun.png"/>
		</div>
		
		<div @click="dealShare">
			<span>分享</span> 
			<img src="../../assets/img/share.png"/>
		</div>
			
	  </div>
	  
	  <comments-list v-if="isShowCommentList" :dict = "dict"></comments-list>
	  
	  <share :dict="dict" v-if="isShowShare" @none="dealnone"></share>
	  
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  name: 'HelloWorld',
  props:['dict','goods'],
  data () {
    return {
     	innerIsCollect:0,
     	innerIsGood:0,
     	
     	isShowCommentList:false,
     	isShowShare:false
    }
  },
  created(){
  	this.innerIsCollect = this.dict.is_collect
  	this.innerIsGood = this.dict.is_good 
  },
  watch:{
  	dict(){
			this.innerIsCollect = this.dict.is_collect
			this.innerIsGood = this.dict.is_good
		}
  },
  methods:{	
  	dealnone(){
  		this.isShowShare = false
  	},
  	dealShare(){
  		this.isShowShare = true
  	},
  	dealComment(){	
		this.isShowCommentList = !this.isShowCommentList		
  	},
  	dealCollect(){

  		//1 没有登录
  		if(localStorage.isLogin != '1'){
				MessageBox.confirm('您还没有登录,是否跳转到登录界面?').then(action => {
  				this.$router.push("/login")
  				return
  			})
			}
  		
  		// 2 数据没有下载
  		if(this.dict.title == undefined){
  			console.log(this.dict.title)
  			MessageBox('提示', '数据下载中,请稍后!');
  			return
  		}
  		
  		//3 收藏
  		var user = JSON.parse(localStorage.user)
  		
  		if(this.innerIsCollect == "0"){
  			//发起收藏请求
  			var url = this.netif.saveFavoriteUrl
				url += "&userId="+user.id
				url += "&itemId="+this.dict.id
				url += "&type="+this.dict.category
				url += "&token="+localStorage.token
						
			this.axios.get(url).then((res) => {
				var rd = res.data;
				console.log(rd)
				if(rd.code == 1){
					console.log("收藏成功!")
					this.innerIsCollect = 1
				}else{
					MessageBox('提示', '收藏失败!');
				}
			})
  		}else{
  			var url = this.netif.cancelFavoriteUrl
					url += "&userId="+user.id
					url += "&itemId="+this.dict.id
					url += "&type="+this.dict.category
					url += "&token="+localStorage.token		
			this.axios.get(url).then((res) => {
				var rd = res.data;
				console.log(rd)
				if(rd.code == 1){
					//alert("取消收藏成功!")
					console.log("取消收藏成功!")
					this.innerIsCollect = 0
				}else{
					MessageBox('提示', '取消收藏失败!');
				}
			})
  		}
  	},
  	dealGoods(){
  		// 1 没有登录
  		if(localStorage.isLogin != "1"){	
  			MessageBox.confirm('您还没有登录,是否跳转到登录界面?').then(action => {
  				this.$router.push("/login")
  				return
  			})
  		}
  		
  		// 2 数据没有下载
  		if(this.dict.title == undefined){
  			console.log(this.dict.title)
  			MessageBox('提示', '数据下载中,请稍后!');
  			return
  		}
  		console.log(this.innerIsGood)
  		
  		//3 是否点赞
  		var user = JSON.parse(localStorage.user)

			if(this.innerIsGood == "0"){
				
				var url = this.netif.addGoodUrl
				url += "&userId="+user.id
				url += "&itemId="+this.dict.id
				url += "&token="+localStorage.token
				
				this.axios.get(url).then((res)=>{
					var rd = res.data;
					console.log(rd)
					if(rd.code == 1){
						console.log("点赞成功!")
						this.innerIsGood = 1
						console.log(this.innerIsGood)
					}else{
						MessageBox('提示', '点赞失败!');
					}
				})
				
			}else{
				var url = this.netif.cancelGoodUrl
				url += "&userId="+user.id
				url += "&itemId="+this.dict.id
				url += "&token="+localStorage.token
				
				this.axios.get(url).then((res)=>{
					var rd = res.data;
					console.log(rd)
					if(rd.code == 1){
						//alert("取消点赞成功!")
						console.log("取消点赞成功!")
						
						this.innerIsGood = 0
						console.log(this.innerIsGood)
					}else{
						MessageBox('提示', '取消点赞失败!');
					}
				})
			}
  	}
  }
  
  	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toolbar{
	width: 100%;
	height: 40px;
	background-color: #f1f1f1;
	border-top:1px solid #999;
	
	position: fixed;
	left: 0;
	bottom: 0;
	
	display: flex;
	justify-content: space-around;
	align-items: center;
	
	font-size: 14px;
	color: #333;
}
.toolbar img{
	width: 20px;
	height: 20px;	
	vertical-align: middle;
}

/* dark 夜间模式 */
.toolbar.dark{
  	background: #333 ;
	color: #ccc;
	border-color: #454530;
}
.toolbar.dark img{
  opacity: 0.5;
}
</style>
