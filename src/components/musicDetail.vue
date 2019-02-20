<template>
	<div>
		<navbar title="音乐详情" type="detail"></navbar>
		<div class="content-detail" :class="{'dark':themeName=='dark'}">
			<div class='cell-wrapper' :class="{'dark':themeName=='dark'}">
				<div class='cell'>
					<div class="audio">
						<audio id="audio" :src="item.media_url?netif.imagePrefix+item.media_url:''" controls="controls"></audio>
					</div>
					<img :src="item.cover?netif.imagePrefix+item.cover:''" alt="" class="cell-cover cover">
					<div class='cell-title-first'>{{item.title}}</div>
					<div class='cell-title-second'>undefined | {{item.title}}</div>
					<div class='cell-title-third'>{{item.title}}</div>
					<div class='cell-author'>作者: {{item.author_name}}</div>
					<div class='cell-story' v-html="item.real_story"></div>
				</div>
			</div>
		</div>
		<toolbar :dict="item"></toolbar>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				item: {}
			}
		},
		created() {
			this.downloadListUrl()	
		},
		mounted(){
			var audio = document.getElementById("audio"); 
			
			audio.addEventListener("play",function(){
				
				$(".cell-cover").removeClass("cover")
			})
			audio.addEventListener("pause",function(){
				
				$(".cell-cover").addClass("cover")
			})		
		},
		methods: {
			downloadListUrl() {
				var id = this.$route.params.id;

				var url = this.netif.musicDetailUrl + "&id=" + id
				
				if(localStorage.isLogin == "1"){
					var user = JSON.parse(localStorage.user)
					url += '&userId='+user.id
				}

				this.axios.get(url).then((res) => {
					var item = res.data.data

					item.real_story = Base64.decode(item.story);

					this.item = item
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.cell-wrapper {
		width: 100%;
		background: #ebebf1;
	}
	
	.content-detail {
		overflow: hidden;
	}
	
	#audio {
		width: 100%;
	}
	
	.cell {
		width: 95%;
		margin: 0 auto;
		overflow: hidden;
		padding: 10px 0;
	}
	
	.cell-cover {
		width: 250px;
		height: 250px;
		border-radius: 50%;
		margin-left: calc(50% - 125px);
		margin-top: 10px;
		animation: myrotate 8s linear infinite;
	}
	
	.cell .cover {
		-webkit-animation-play-state: paused;
		-moz-animation-play-state: paused;
		animation-play-state: paused;
	}
	
	@keyframes myrotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	.cell-title-third {
		width: 100%;
		line-height: 30px;
		font-size: 18px;
		font-weight: bold;
		text-align: center;
	}
	
	.cell-title-first,
	.cell-title-second {
		width: 100%;
		line-height: 30px;
		color: #7c8182;
		font-size: 14px;
		text-align: center;
	}
	
	.cell-author {
		line-height: 30px;
		color: #7c8182;
		font-size: 14px;
		text-align: center;
	}
	
	.WxEmojiView {
		width: 100%;
		line-height: 20px;
		font-size: 17px;
	}
	
	.cell-story {
		font-size: 14px;
	}

	/* dark 夜间模式 */
	.cell-wrapper.dark,
	.content-detail.dark{
		background: #333;
		color: #aaa;
		border-color: #454530;
	}
	
</style>