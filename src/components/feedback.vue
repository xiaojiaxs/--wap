<template>
  <div class="feedback" :class="{'dark':themeName=='dark'}">
    <navbar title="用户反馈" type="detail"></navbar>
 		<div class="feedback-cont">
 			
 			<div class="question" :class="{'dark':themeName=='dark'}">
 				问题类型
 			</div>
 			<div class="question-type" :class="{'dark':themeName=='dark'}">
 				<div @click="dealselect(1)" :class="{'select':in_index == 1}" class="question-name">问题咨询</div>
 				<div @click="dealselect(2)" :class="{'select':in_index == 2}" class="question-name">意见和建议</div>		
 			</div>
 			<div class="question" :class="{'dark':themeName=='dark'}">
 				问题描述
 			</div>
 			<div class="question-cont">
 				<textarea :class="{'dark':themeName=='dark'}" v-model="msg" placeholder="至少5个字（如有截图，请务必上传）"></textarea>
 			</div>
 			
 			<div class="question" :class="{'dark':themeName=='dark'}">
 				联系方式
 			</div>
 			<div class="cantact">
 				<input :class="{'dark':themeName=='dark'}" v-model="email" placeholder="建议留下常用邮箱" type="text" />
 			</div>
 			
 			<button @click="dealSubmit" class="question-submit">确认提交</button>
 			
 		</div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
    	msg:'',
    	email:'',
    	
    	in_index:1 
    }  
  },
  methods:{
  	dealselect(index){
  		this.in_index = index
  	},
  	dealSubmit(){
  		
  		if(this.msg.length<5 && this.msg.length>0){
  			MessageBox('提示', '字数必须大于5!');
  			return
  		}
  		
  		if(this.msg==0){
  			MessageBox('提示', '请输入反馈意见!');
  			return
  		}
  		
  		if(this.email==0){
  			MessageBox('提示', '请输入联系方式!');
  			return
  		}
  		
  		var user = JSON.parse(localStorage.user)
			
			var url = this.netif.feedbackAdd
				+"&userId="+user.id
				+"&type="+this.in_index
				+"&message="+this.msg+"&connectType="+this.email
				+"&token="+localStorage.token
  			console.log(url)
  			this.axios.get(url).then((res)=>{
  			
  			var rd = res.data;
				
				console.log(rd)
				
				var code = rd.code
				var desc = rd.desc

				if(code == "1"){
					MessageBox('提示', '提交成功!');
					this.msg = ""
					this.email = ""
					
				}else{
					alert(desc)
				}	
  		})
  	
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.feedback{
	font-size: 14px;
}
.feedback-cont{
	padding-top:44px;
}
.question{
	width: 100%;
	height: 40px;
	background: #efeff4;
	line-height: 40px;
	font-size: 14px;
	padding:0 10px;
	box-sizing: border-box;
}
.question-type{
	padding:20px 10px;
	display: flex;
}
.question-name{
	padding:8px 10px;
	border:1px solid #ddd;
	border-radius:5px;
	margin-right:10px;
	background: #efeff4;
}
textarea{
	width: 100%;
	min-height: 180px;
	border:0;
	outline: none;
	padding:10px;
	line-height: 20px;
	box-sizing: border-box;
}
.cantact{
	padding:5px 0;
}
.cantact input{
	width: 100%;
	height:35px;
	line-height: 35px;
	padding:0 10px;
	box-sizing: border-box;
	border:0;
	outline: none;
}
.question-submit{
	width: 100%;
	height: 35px;
	background: #333;
	color: #fff;
	line-height: 35px;
	text-align: center;
	border:0;
	outline: none;
}
.select{
	border-color: #007AFF;
	color: #007AFF!important;
}

/* dark 夜间模式 */
.question.dark{
  	background: #333;
	color: #ddd;
}
textarea.dark,
input.dark{
	background: #999;
	color: #000;
}
.feedback.dark{
	background: #333;
}
.question-type.dark .question-name{
	background: #eaeaea;
	color: #666;
}
textarea.dark::-webkit-input-placeholder,
input.dark::-webkit-input-placeholder{
	color: #000;
}
</style>
