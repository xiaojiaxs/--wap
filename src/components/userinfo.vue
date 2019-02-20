<template>
  <div class="userinfo">
    <navbar title="个人资料" type="detail"></navbar>
    <div class="userinfo-content" :class="{'dark':themeName=='dark'}">
    	<div class="list-item">
    		<span class="headImage-text">头像</span>
    		<img  @click="dealShowHeadImage" class="headImage" :src="headImage" alt="" />
    	</div>
    	<div class="list-item">
    		<span>背景</span>
    		<img src="../assets/img/right.png" alt="" />
    	</div>
    	<div class="list-item">
    		<span>昵称</span>
    		<span class="username">{{oldnickname}}</span>
    		<img @click="dealShowNickname" src="../assets/img/xiugai.png" alt="" />
    	</div>
    	<div class="list-item">
    		<span>密码</span>
    		<span class="password">**** ****</span>
    		<img @click="dealShowpassword" src="../assets/img/xiugai.png" alt="" />
    	</div>
    	<div class="list-item">
    		<span>手机号</span>
    		<span class="no-change">禁止修改</span>
    	</div>
    </div>
    
	<div class="ShowHeadImage" v-if="isShowHeadImage">
		<div class="ShowHeadImage-cont" :class="{'dark':themeName=='dark'}">
			<img class="ChangeHeadImage" :src="selectHeadImage" alt="" />
			<input @change="dealChange" id="upload-file" class="upload-file" type="file" value="" />
			<div @click="dealkeepHeadImage" class="keep">保存</div>
			<div @click="dealcancelHeadImage" class="cancel">取消</div>
		</div>
	</div>
    
    <div class="ShowNickname" v-if="isShowNickname">
    	<div class="ShowNickname-cont" :class="{'dark':themeName=='dark'}">
    		<div class="newnickname">
    			<input type="text" :placeholder="oldnickname" v-model="newnickname" v-focus />
    		</div>
	    	<div @click="dealkeepNickname" class="keep">保存</div>
	    	<div @click="dealcancelNickname" class="cancel">取消</div>
    	</div>
    </div>
    
    <div class="Showpassword" v-if="isShowpassword">
    	<div class="Showpassword-cont" :class="{'dark':themeName=='dark'}">
    		<div class="newpassword">
    			<input type="text" placeholder="请输入原密码" v-model="oldpassword" v-focus />
    		</div>
    		<div class="newpassword newpassword-new">
    			<input type="text" placeholder="请输入新密码" v-model="newpassword"/>
    		</div>
	    	<div @click="dealkeepnewpassword" class="keep">保存</div>
	    	<div @click="dealcancelnewpassword" class="cancel">取消</div>
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
    	headImage:'',
    	selectHeadImage:'',
    	isShowHeadImage:false,
    	
    	uploadFile:null,
		isSelect:false,
		
		oldnickname:'',
		
		isShowNickname:false,
		newnickname:'',
		
		isShowpassword:false,
		oldpassword:'',
		newpassword:''
      
    }
    
  },
  created(){
    	var user = JSON.parse(localStorage.user)
			this.headImage = this.netif.imagePrefix+user.image
			this.selectHeadImage = this.netif.imagePrefix+user.image
			
			this.oldnickname = user.nickname
			console.log(user.nickname)
			
  },
  methods:{
	  //修改密码
  	dealShowpassword(){
  		this.isShowpassword = !this.isShowpassword
	},
	
  	dealcancelnewpassword(){
  		this.isShowpassword = false
	},
  	dealkeepnewpassword(){
		if(this.newpassword == 0){
			MessageBox('提示', '请输入新密码!');
			return
			}
		if(this.oldpassword == 0){
			MessageBox('提示', '请输入原密码!');
			return
			}
  		
  		var user = JSON.parse(localStorage.user)
  					
			var url = this.netif.changePasswordUrl
			+"&userId="+user.id
			+"&password="+this.oldpassword
			+"&newPassword="+this.newpassword
			+"&token="+localStorage.token
			
			this.axios.get(url).then((res) => {
				console.log(res.data)
				
				var rd = res.data;
				
				if(rd.code == "1"){
					MessageBox('提示', '修改成功,请重新登录！');
					
					localStorage.removeItem("isLogin")
					localStorage.removeItem("loginTime")
					localStorage.removeItem("user")
					localStorage.removeItem("token")
					localStorage.removeItem("turn")
					
					this.$router.replace("/login");
				}else{
					MessageBox('提示', rd.desc);
				}
				
			})
			this.isShowpassword = false
  	},
	  
	  //修改昵称
  	dealkeepNickname(){
  		if(this.newnickname == 0){
  			MessageBox('提示', '请输入昵称!');
				return
			}
  		
  		var user = JSON.parse(localStorage.user)
  		
			var url = this.netif.changeNicknameUrl
			+"&userId="+user.id
			+"&newNickname="+this.newnickname
			+"&token="+localStorage.token

			this.axios.get(url).then((res) => {
				console.log(res.data)
				
				var rd = res.data;
				
				if(rd.code == "1"){
					this.oldnickname = this.newnickname
					
					user.nickname = this.newnickname
					localStorage.user = JSON.stringify(user)
					MessageBox('提示', '修改成功!');
				}
			})
			this.isShowNickname = false
			
  	},
  	dealcancelNickname(){
  		this.isShowNickname = false
  	},
  	dealShowNickname(){
  		this.isShowNickname =!this.isShowNickname
	  },
	  
	  //修改头像
  	dealChange(){
  		var inputTag = document.getElementById("upload-file")
			
			//[object File]
			var file = inputTag.files[0]
			console.log("file = "+file)
			
			var url = window.URL.createObjectURL(file)
			console.log("url = "+url)
			
			this.selectHeadImage = url
			
			//设置已经选择图片
			this.isSelect = true
			this.uploadFile = file
  	},
  	dealkeepHeadImage(){
  		
  		if(this.isSelect == false){
  			MessageBox('提示', '请先选择头像!');
				return
			}
  		
  		var user = JSON.parse(localStorage.user)
  		
			var formData = new FormData()
			formData.append("m","user")
			formData.append("a","changeHeadImage")
			formData.append("userId",user.id)
			formData.append("newHeadImage",this.uploadFile)
			formData.append("token",localStorage.token)
			
			var url = this.netif.changeHeadImageUrl

			let config = {
				headers: {
						'Content-Type': 'multipart/form-data'
				}
			}
			
			this.axios.post(url,formData,config).then((res) => {
				console.log(res.data)
				
				var rd = res.data;
				
				if(rd.code == "1"){
					this.headImage = this.selectHeadImage
					
					var newUrl = rd.data.url
					user.image = newUrl
					localStorage.user = JSON.stringify(user)
					MessageBox('提示', '修改成功!');
				}
			})
			this.isShowHeadImage = false
			
  	},
  	dealcancelHeadImage(){
  		this.isShowHeadImage = false
  	},
  	dealShowHeadImage(){
  		this.isShowHeadImage = true
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userinfo-content{
	padding-top:44px;
	padding-bottom:152px;
}
.list-item{
	border-bottom: 1px solid #ddd;
	padding:15px 12px;
	overflow: hidden;
}
.list-item span{
	float: left;
	line-height: 25px;
	font-size: 14px;
	margin-right:10px;
}
.list-item .headImage-text{
	line-height: 50px;
}
.list-item img{
	float: right;
	width: 25px;
	height: 25px;
}
.list-item .headImage{
	width: 50px;
	height: 50px;
	border-radius: 50%;
}
.list-item .no-change{
	float: right;
	color: #666;
	font-size: 13px;
}

.ShowHeadImage,.ShowNickname,.Showpassword{
	position: fixed;
	width: 100%;
	left: 0;
	top: 0px;
	bottom: 0px;
	
	background-color: rgba(0,0,0,0.5);
}
.ShowHeadImage-cont,.ShowNickname-cont,.Showpassword-cont{
	width: 100%;
	height: 260px;
	font-size:14px;
	position: absolute;
	bottom: 0;
	padding:10px;
	box-sizing: border-box;
	background: #fff;
}
.ShowNickname-cont{
	height: 170px;
	padding:15px 10px;
}
.Showpassword-cont{
	height: 200px;
	padding:15px 10px;
}
.ShowHeadImage-cont img{
	width: 100px;
	height: 100px;
	margin:20px 0;
	margin-left:calc(50% - 50px);
	border-radius: 50%;
}
.upload-file{
	height: 100px;
	width: 100px;
	margin:20px 0;
	background-color: lightblue;
	left: calc(50% - 50px);
	position: absolute;
	opacity: 0;
	border-radius: 50%;
	outline: none;
}
.keep,.cancel{
	width:100%;
	height: 35px;
	text-align: center;
	line-height: 35px;
	background: lightblue;
	margin-top:10px;
	border-radius:5px;
	color: #fff;
}
.list-item .username,.list-item .password{
	color: #999;
}
.newnickname,.newpassword{
	width: 100%;
	height: 35px;
	line-height: 35px;
	font-size: 14px;
	border:1px solid #ddd;
	border-radius: 5px;
}
.newnickname input,.newpassword input{
	width: 100%;
	height: 33px;
	border:0;
	outline: none;
	padding-left:5px;
	box-sizing: border-box;
	border-radius: 5px;
}
.newpassword-new{
	margin-top:10px;
}



/* dark 夜间模式 */
.userinfo-content.dark{
  	background: #333 ;
	color: #ccc;
	border-color: #454530;
}
.userinfo-content.dark img{
	opacity: 0.5;
}
.ShowHeadImage-cont.dark,
.ShowNickname-cont.dark,
.Showpassword-cont.dark{
	background: #333 ;
	color: #ccc;
	border-color: #454530;
}
.ShowHeadImage-cont.dark img,
.ShowNickname-cont.dark img,
.Showpassword-cont.dark img{
	opacity: 0.5;
}
</style>
