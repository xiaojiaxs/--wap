<template>
  <div class="reg" :class="{'dark':themeName=='dark'}">
    <navbar title="注册" type="detail"></navbar>
    <div class='reg-content-wrapper'>
      <div class="content-reg">
      	
      	<div class='input'>
	      	<img class='tel-img' src='../assets/img/register-header.png'>
	        <input class='tel' v-model="username" placeholder='请输入用户名'> 
	      </div>
	      
	      <div class='input'>
	      	<img class='tel-img' src='../assets/img/password.png'>
	        <input class='tel' v-model="password" placeholder='请输入密码' type="password"> 
	      </div>
	      <div class='input'>
	      	<img class='tel-img' src='../assets/img/password.png'>
	        <input class='tel' v-model="repassword" placeholder='请再一次输入密码' type="password"> 
	      </div>
	      <div class='input'>
	      	<img class='tel-img' src='../assets/img/tel.png'>
	        <input class='tel' v-model="phone" placeholder='请输入手机号码'> 
	      </div>
	      <div class='input'>
	      	<img class='tel-img' src='../assets/img/nickname.png'>
	        <input class='tel' v-model="nickname" placeholder='请输入昵称'> 
	      </div>
	      
	      <button @click="dealReg">注册</button>
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
		 	password:'',
		 	repassword:'',
		 	phone:'',
		 	nickname:''     
    }
  },
  methods:{
  	dealReg(){
  		if(this.username == ""){
  			MessageBox('提示', '请输入用户名!');
				return
			}
			
			if(this.password == ""){
				MessageBox('提示', '请输入密码!');
				return
			}
			
			if(this.repassword == ""){
				MessageBox('提示', '请再次输入密码!');
				return
			}
			
			if(this.password != this.repassword){
				MessageBox('提示', '密码和第一次输入密码不一致!');
				return
			}
			
			if(this.phone == ""){
				MessageBox('提示', '请输入手机号!');
				return
			}
			
			if(this.nickname == ""){
				MessageBox('提示', '请输入昵称!');
				return
			}
			
			var url = this.netif.registerUrl+"&username="+this.username+"&password="+this.password+"&phone="+this.phone+"&nickname="+this.nickname
			
			this.axios.get(url).then((res) => {
				var rd = res.data;
				
				console.log(rd)
				
				var code = rd.code
				var desc = rd.desc

				if(code == "1"){
					MessageBox.alert('注册成功').then(action => {
					  this.$router.replace("/login");
					});

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

.reg-content-wrapper{
  padding-top:44px;
  
}
.content-reg{
	width: 100%;
	padding:20px;
	padding-bottom:107px;
	box-sizing: border-box;
}
.input{
  border:1px solid #e1e1e1;
  border-radius:5px;
  margin-bottom:10px;
  position: relative;
  background: #fff;
}

.input input{
	border-radius:5px;
  width: 100%;
  height: 45px;
  padding-left:55px;
  box-sizing: border-box;
  color: #999999;
  font-size: 14px;
  border:0;
}
.tel-img{
  width: 24px;
  height: 24px;
  position: absolute;
  left:15px;
  top:10px;
}
button{
  width: 100%;
  height: 45px;
  text-align: center;
  line-height:45px;
  color: #999999;
  font-size: 15px;
  background: #dddddd;
  border:0;
  outline: none;;
}


/* dark 夜间模式 */
.reg.dark{
  background: #333;
	color: #ccc;
	border-color: #454530;
}
.reg.dark img{
	opacity: 0.5;
}
</style>
