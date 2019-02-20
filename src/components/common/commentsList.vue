<template>
	<div class='comments-list'>

		<div class="comments-content" :class="{'dark':themeName=='dark'}">

			<div class="title">
				<div class="list-title">评论列表</div>
				<div class="send-comments" :class="{'dark':themeName=='dark'}" @click="dealShowComments">发表评论</div>
			</div>

			<div class="comment-list-content">

				<div v-if='isShowNoDiscuss' class="no-discuss">
					现在还没有评论,您可以发表评论!
				</div>

				<div class="comment" v-for="(item,index) in list" :key="index">

					<div class="comment-top">

						<img :src="user.image?netif.imagePrefix+user.image:''">
						<div class='name'>{{user.username}}</div>
						<div class="time">{{item.create_time}}</div>

					</div>
					<div class="content-item">
						{{item.comment}}
					</div>

				</div>
			</div>

		</div>
		<comments v-if="isShowComments" @hide="dealHide" :dict="dict"></comments>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		props: ['dict'],
		data() {
			return {
				list: [],
				isShowNoDiscuss: false,
				isShowComments: false
			}
		},
		created() {
			var user = JSON.parse(localStorage.user);
			this.user = user;

			this.downloadList()
		},
		methods: {
			dealHide(isRefresh) {
				this.isShowComments = false
				if (isRefresh) {
					this.downloadList()
				}
			},
			dealShowComments() {
				this.isShowComments = true
			},
			downloadList() {

				var url = this.netif.getCommentUrl
					 + "&itemId=" + this.dict.id
					 + "&token="+localStorage.token

				this.axios.get(url).then((res) => {
					var list = res.data.data

					this.list = list

					if (this.list.length == 0) {
						this.isShowNoDiscuss = true
					} else {
						this.isShowNoDiscuss = false
					}
					console.log(this.isShowNoDiscuss)

				})
			}
		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comments-list {
	position: fixed;
	width: 100%;
	left: 0;
	top: 0px;
	bottom: 40px;

	background-color: rgba(0, 0, 0, 0.5);
}

.comments-content {
	width: 100%;
	height: 270px;
	font-size: 14px;
	position: absolute;
	bottom: 0;
	background-color: #fff;
	border-top: 1px solid black;
	padding: 10px;
	box-sizing: border-box;
}

.title {
	overflow: hidden;
	margin-bottom: 10px;
}

.list-title {
	float: left;
	width: 70px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	border-bottom: 3px solid #000;
}

.send-comments {
	float: right;
	width: 60px;
	height: 25px;
	text-align: center;
	line-height: 25px;
	background: #eaeaea;
	border-radius: 4px;
	font-size: 12px;
}

.comment-list-content {
	height: 207px;
	overflow-y: scroll;
}

.comment {
	border-bottom: 1px solid #ddd;
	padding: 10px 0;
	box-sizing: border-box;
}

.comment-top {
	overflow: hidden;
	color: #666;
}

.comment-top img {
	width: 25px;
	height: 25px;
	margin-right: 10px;
	float: left;
}

.comment-top .name {
	float: left;
	line-height: 25px;
}

.comment-top .time {
	float: right;
	line-height: 25px;
}

.content-item{
	padding: 10px 10px 10px 20px;
	word-break: break-word;
}

.no-discuss {
	padding-left: 10px;
	box-sizing: border-box;
}

	
/* dark 夜间模式 */
.comments-content.dark{
  	background: #333;
	color: #aaa;
	border-color: #454530;
}
.send-comments.dark{
	background: #333;
	color: #aaa;
	border-color: #454530;
}
.comments-content.dark img{
  opacity: 0.7;
}
</style>
