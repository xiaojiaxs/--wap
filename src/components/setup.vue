<template>
  <div class="setup">
    <navbar title="设置" type="detail"></navbar>
    <div class="setup-content" :class="{'dark':themeName=='dark'}">
    	<div class="list-item">
    		<div class="title">设置</div>
    		<div class="list" :class="{'dark':themeName=='dark'}">
    			<div class="item">
    				<span class="black">夜间模式</span>
    				<mt-switch @change="dealturn()" class="switch" v-model="value"></mt-switch>
    			</div>
    			<div class="item" @click="dealClear">
    				<span>清理缓存</span>
    				<img src="../assets/img/right.png" alt="" />
    			</div>
    		</div>
    	</div>
    	<div class="list-item">
    		<div class="title">反馈</div>
    		<div class="list" :class="{'dark':themeName=='dark'}">
    			<div class="item">
    				<router-link to="/feedback">
	    				<span>意见与反馈</span>
	    				<img src="../assets/img/right.png" alt="" />
	    			</router-link>
    			</div>
    			<div class="item">
    				<span>关注我们</span>
    				<img src="../assets/img/right.png" alt="" />
    			</div>
    			<div class="item">
    				<span>给一个评分</span>
    				<img src="../assets/img/right.png" alt="" />
    			</div>
    		</div>
    	</div>
    	<div class="list-item">
    		<div class="title">关于</div>
    		<div class="list" :class="{'dark':themeName=='dark'}">
    			<div class="item">
    				<span>用户协议</span>
    				<img src="../assets/img/right.png" alt="" />
    			</div>
    			<div class="item">
    				<span>版本号</span>
    				<img src="../assets/img/right.png" alt="" />
    			</div>
    		</div>
    	</div>
    	
    </div>

	<div class="loading" v-if="isShowLoading" :class="{'dark':themeName=='dark'}">
		<img src="../assets/img/loading.gif" alt="" />
		<span class="loading-text">正在清理中...</span>
	</div>
    
  </div>
 
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
    	value:false,
		themeName:"light",
		isShowLoading:false
    }
    
  },
  created(){
	
	var turn_now = JSON.parse(localStorage.turn)

	this.value = turn_now

	this.themeName = localStorage.themeName

  },
  methods:{
	  
	dealClear(){
		this.isShowLoading = true
		var self = this
		setTimeout(function(){
			MessageBox('提示', '缓存清理完成!');
			self.isShowLoading = false
		},3000)
	},
	
  	dealturn(){
		  

		if(this.value == true){
			this.themeName = 'dark'

			localStorage.turn = true

			localStorage.themeName = this.themeName
			
			location.reload()
			
		}else{
			this.themeName = 'light'
			localStorage.turn = false
			localStorage.themeName = this.themeName
			location.reload()
			
		}

  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setup{
	background: #efeff4;
}
.setup-content{
	padding-top:44px;
	min-height: 457px;
}
.title{
	
	line-height: 40px;
	padding-left:10px;
	font-size: 14px;
}
.item{
	border-bottom: 1px solid #ddd;
	overflow: hidden;
	line-height: 20px;
	padding:10px;
	background: #fff;
}
.black{
	line-height: 30px;
}
.item span{
	float: left;
	font-size: 14px;
	margin-right:10px;
}
.item img{
	float: right;
	width: 20px;
	height: 20px;
}
.switch{
	float: right;
}
.loading{
	width: 100%;
	text-align: center;
	line-height: 40px;
	font-size: 16px;
	position:fixed;
	top:240px;
	left:0;
}
.loading img{
	width: 30px;
	height: 30px;
	vertical-align: middle;
}


/* dark 夜间模式 */
.setup-content.dark{
  	background: #333;
	color: #ccc;
	border-color: #454530;
}
.setup-content.dark img{
	opacity: 0.5;
}
.list.dark .item{
	background: #666;
	color: #aaa;
}
.list.dark .item a{
	color: #aaa;
}
.list.dark .item .switch{
	opacity: 0.5;
}
.loading.dark{
	color: #aaa;
}


</style>
