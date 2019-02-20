<template>
	<div class='comments'>
		<div class="comment-content" :class="{'dark':themeName=='dark'}">
			<textarea :class="{'dark':themeName=='dark'}" v-model="message" placeholder="在这里写下你想说的" v-focus :disabled='off' @input='dealWrite($event)'></textarea>
			<div class="buttons" :class="{'dark':themeName=='dark'}">
				<span class="cont-number">{{result}}</span>
				<button @click="dealSend" class="send">发布</button>
				<button @click="dealCancel" class="cancel">取消</button>
			</div>
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
	name: 'HelloWorld',
	props: ['dict'],
	data() {
		return {
			message: '',
			off: false
		}
	},
	computed: {
		result() {
			var numberAll = 500;
			var num = (this.message).toString().replace(/\s/g, "").length;
			return numberAll - num;
		}
	},
	methods: {
		dealWrite(e) {
			if (this.message.length >= 500) {
				this.off = true
			}

		},
		dealCancel() {
			this.$emit("hide", false)
		},
		dealSend() {
			//1 没有登录
			if (localStorage.isLogin != "1") {

				MessageBox.confirm('您还没有登录,是否跳转到登录界面?').then(action => {
					this.$router.push("/login")
					return
				})

			}

			//2  字数为0
			if (this.message.length == 0) {
				MessageBox('提示', '请输入内容!');
				return
			}

			//3 发表评论
			var user = JSON.parse(localStorage.user);

			var url = this.netif.addCommentUrl
					+'&userId=' + user.id
					+ '&itemId=' + this.dict.id 
					+'&comment=' + this.message;
					+"&token="+localStorage.token
			console.log("send url=" + url)
			this.axios.get(url).then((res) => {
				var data = res.data;
				if (data.code == 1) {

					this.$emit("hide", true)
				}
			})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comments {
	width: 100%;
	background: #fff;
	position: fixed;
	bottom: 40px;
	left: 0;
}

textarea {
	width: 100%;
	min-height: 223px;
	padding: 15px;
	box-sizing: border-box;
	border: 0;
	font-size: 14px;
	line-height: 20px;
	outline: none;
}

.buttons {
	border-top: 1px solid #ddd;
	overflow: hidden;
	padding: 0 10px;
}

.cont-number {
	line-height: 41px;
}

.cancel,
.send {
	width: 50px;
	height: 25px;
	background: #eaeaea;
	border-radius: 5px;
	text-align: center;
	line-height: 25px;
	float: right;
	margin: 8px;
	border: 0;
	outline: none;
	font-size: 14px;
}

/* dark 夜间模式 */
.comment-content.dark,
.buttons.dark button,
textarea.dark{
  	background: #333;
	color: #aaa;
	border-color: #454530;
}

</style>
