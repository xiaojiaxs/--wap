<template>
  <div class="login" :class="{'dark':themeName=='dark'}">
    <navbar title="登录" type="detail"></navbar>
    <div class='content-login'>
	    <div class='input'>
	      <input class='username' v-model="username" placeholder='请输入用户名'>
	      <input class='password' v-model="password" type='password' placeholder='请输入密码'>
	    </div>
	    
	    <div class="button-area">
	    	<button @click="dealLogin">登录</button>
	    </div>
	    
	    <div class='he'>
	      <router-link to="/reg">
	        <span class='free'>免费注册</span>
	      </router-link>
	      
	        <span class='forget' :class="{'dark':themeName=='dark'}">忘记密码</span>
	      
	    </div>
	  </div>
    
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
    	username:'',
		 	password:''
      
    }
  },
  methods:{
  	dealLogin(){
  		if(this.username == ""){
  			MessageBox('提示', '请输入用户名!');
				return
			}
			
			if(this.password == ""){
				MessageBox('提示', '请输入密码!');
				return
			}
			
			var url = this.netif.loginUrl+"&username="+this.username+"&password="+this.password
			
			this.axios.get(url).then((res) => {
				
				var rd = res.data;
				console.log(rd)
				
				var code = rd.code
				var desc = rd.desc
				var user = rd.data
				var token = rd.token
				if(code == "1"){
					
					localStorage.isLogin = "1"
					localStorage.loginTime = Date.now()
					localStorage.token = token
					localStorage.user = JSON.stringify(user)
					
					this.$router.replace("/user");
					
					MessageBox('提示', '登录成功!');
					
				}else{
					MessageBox('提示', desc);
				}
				
			})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.login{
	padding-top:44px;
	font-size: 14px;
}
.content-login{
  width: 100%;
  padding:20px;
	padding-bottom:242px;
  box-sizing: border-box;
}
.input{
  border:1px solid #e1e1e1;
  margin-bottom:20px;
}
.input input{
  width: 100%;
  height: 45px;
  padding-left:20px;
  box-sizing: border-box;
  border:0;
}
.input .username{
  border-bottom:1px solid #e1e1e1;
}
button{
  width: 100%;
  height: 45px;
  text-align: center;
  line-height: 45px;
  color: #999999;
  font-size: 16px;
  background: #eeeeee;
  border:0;
  outline: none;
}

.he{
  margin-top:20px;
  color: #333;
  overflow: hidden;
}
.free{
  float: left;
}
.forget{
  float:right;
}

/* dark 夜间模式 */
.login.dark{
  background: #333;
	color: #aaa;
	border-color: #454530;
}
.login.dark a{
	color: #aaa;
}
.forget.dark{
	color: #aaa;
}
</style>
