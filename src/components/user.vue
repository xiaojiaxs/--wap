<template>
  <div class="user">
    <navbar title="用户主页" type="detail"></navbar>
    <div class="user-content" :class="{'dark':themeName=='dark'}">
    	<div class='user-home'>
	      <img class='user-home-img' :src="user.image?netif.imagePrefix+user.image:''">
	      <div class='username'>{{user.username}}</div>
	    </div>
	    <div class='list list1'>
	    	<router-link to="/readFavorite">
	      	<img class='list-img' src='../assets/img/read.png'>
	      	<div class='list-text'>阅读</div>
	      </router-link>
	    </div>
	    <div class='list'>
	    	<router-link to="/musicFavorite">
	      	<img class='list-img' src='../assets/img/music.png'>
	      	<div class='list-text'>音乐</div>
	      </router-link>
	    </div>
	    <div class='list'>
	    	<router-link to="/movieFavorite">
	      	<img class='list-img' src='../assets/img/movie.png'>
	      	<div class='list-text'>影视</div>
	      </router-link>
	    </div>
	    <div class='list list2'>
	    	<router-link to="/userinfo">
		      <img class='list-img' src='../assets/img/user2.png'>
		      <div class='list-text'>个人资料</div>
	      </router-link>
	    </div>
	    <div class='list'>
	    	<router-link to="/setup">
		      <img class='list-img' src='../assets/img/setup.png'>
		      <div class='list-text'>设置</div>
		    </router-link>
	    </div>
	    <div class='list list3'>
        <img class='list-img' src='../assets/img/loginout.png'>
        <div class='list-text' @click="dealLoginout">退出登录</div>
	    </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
    	user:{}  
    }  
  },
  created(){
    	var user = JSON.parse(localStorage.user);
			this.user = user;
			
			if(localStorage.isLogin != "1"){
 
  			this.$router.push("/login")
  		}
  },
  methods:{
  	dealLoginout(){
  		
  		MessageBox.confirm('您真的要退出吗?').then(action => {
			  localStorage.removeItem("isLogin")
				localStorage.removeItem("loginTime")
				localStorage.removeItem("user")
				localStorage.removeItem("token")
				
				this.$router.replace("/login");
			}).catch(function(err){
				return
			});	
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user{
	background: #eaeaea;
}
.user-home{
  width: 100%;
  height:250px;
  background: url('../assets/img/user_home.png') no-repeat;
	background-size: 100% 100%；
  
}
.user-content{
	padding-top:44px;
  padding-bottom:49px;
}
.user-home-img{
  width: 120px;
  height:120px;
  margin-left:calc(50% - 60px);
  margin-top:40px;
  margin-bottom:25px;
  border-radius: 50%;
}
.username{
  width: 100%;
  color: #fff;
  text-align: center;
}
.list{
  width:100%;
  height:47px;
  border-bottom:1px solid #f2f2f2;
  background: #fff;
  
  display: flex;
	align-items: center;
}
.list a{
	display: flex;
	align-items: center;
}
.list-img{
  width:25px;
  height:25px;
  vertical-align: middle;
  
  margin:0 10px;
}
.list-text{
  height: 47px;
  line-height: 47px;
  font-size: 14px;
}
.list1,.list2,.list3{
  margin-top: 10px;
}


/* dark 夜间模式 */
.user-content.dark{
  	background: #ccc;
		color: #aaa;
		border-color: #454530;
}
.user-content.dark img{
  opacity: 0.5;
}
.user-content.dark .list{
		background: #333;
		color: #aaa;
		border-color: #454530;
}
.user-content.dark a{
	color: #aaa;
}
</style>
