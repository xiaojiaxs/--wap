<template>
  <div class='share'>
		<div class="share-list" :class="{'dark':themeName=='dark'}">
			
			<div class="share-contont">
				<!-- <div class="share-item">
					<img src="../../assets/picture/open.jpg" alt="" />
					<div>浏览器中打开</div>
				</div> -->
				<div class="share-item">
					<img @click="dealSetClipboard" src="../../assets/picture/lj.jpg" alt="" />
					<div>复制链接</div>
				</div>
				<div class="share-item">
					<img @click="dealShare($event,'weixin')" src="../../assets/picture/wechat.jpg" alt="" />
					<div>微信好友</div>
				</div>
				<div class="share-item">
					<img @click="dealShare($event,'weixin')" src="../../assets/picture/wechat_firend.jpg" alt="" />
					<div>微信朋友圈</div>
				</div>
				<div class="share-item">
					<img @click="dealShare($event,'sinaminiblog')" src="../../assets/picture/sina.jpg" alt="" />
					<div>新浪微博</div>
				</div>
				<div class="share-item">
					<img @click="dealShare($event,'qqim')" src="../../assets/picture/QQ.jpg" alt="" />
					<div>QQ好友</div>
				</div>
				<div class="share-item bds_qzone" data-cmd="qzone" title="分享到QQ空间">
					<img @click="dealShare($event,'qzone')" src="../../assets/picture/QQ_zone.jpg" alt="" />
					<div>QQ空间</div>
				</div>
				<!-- <div class="share-item">
					<img src="../../assets/picture/info.jpg" alt="" />
					<div>保存二维码分享</div>
				</div> -->
				<div class="share-item">
					<img @click="dealShare($event,'more')" src="../../assets/picture/more.jpg" alt="" />
					<div>更多</div>
				</div>
				
			</div>
			
			<div class="cancel" @click="dealCancel">取消</div>
			
		</div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  name: 'share',
  props: ['dict'],
  data () {
    return {
    }
  },
  methods:{
		dealSetClipboard(){
				
			//window.clipboardData.setData('Text',location.href);

			
			//信息框
			MessageBox('提示', '链接已经复制到剪贴板!');

		},
  	dealCancel(){
  		this.$emit("none")
		},
		dealShare(event, type) {
				
			console.log("type = "+type)

			//设置分享内容
			bShare.addEntry({
				title: this.dict.title,
				url: location.href,
				summary: this.dict.forward,
				pic: this.netif.imagePrefix+this.dict.img_url
			});

			if(type != "more"){
				//开始分享
				bShare.share(event, type, 0)
				return false
			}else{
				bShare.more(event);
				return false
			}

		}
  }
  	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.share{
	position: fixed;
	width: 100%;
	left: 0;
	top: 0px;
	bottom: 0px;
	
	background-color: rgba(0,0,0,0.5);
}
.share-list{
	width: 100%;
	height: 290px;
	font-size:14px;
	position: absolute;
	bottom: 0;
	box-sizing: border-box;
	background: #fff;
}
.share-contont{
	border-top:1px solid #ddd;
	border-bottom:1px solid #ddd;
	padding:15px 10px;
	box-sizing: border-box;
	overflow: hidden;
}
.share-item img{
	width: 60px;
	height: 60px;
	margin:0 calc(50% - 30px);
}
.share-item{
	font-size: 10px;
	width: 20%;
	float: left;
	text-align: center;
	margin:10px 0;
}
.cancel{
	margin:10px auto;
	width: 50px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	font-size: 14px;
	color: orange;
}


/* dark 夜间模式 */
.share-list.dark{
  	background: #333;
	color: #aaa;
	border-color: #454530;
}
.share-list.dark img{
	opacity: 0.7;
}

</style>
