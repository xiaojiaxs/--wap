<template>
  <div class="user">
    <navbar title="音乐收藏" type="detail"></navbar>
    <div class="content-detail" :class="{'dark':themeName=='dark'}">
    	<div class="no-favorite" v-if="isfavorite">
    		您还没有收藏，请去收藏！
    	</div>
		<div class='item' v-for="(item,index) in list" :key="index">
			<div class="box">
				<router-link :to=" '/musicDetail/'+item.id">
					<img :src="item.img_url?netif.imagePrefix+item.img_url:''" />
					<div class="text">
						<div class='name'>{{item.title}}</div>
						<div class='author'>{{item.author_name}}</div>
					</div>
				</router-link>
			</div>
	    </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>export default {
	name: 'HelloWorld',
	data() {
		return {
			list: [],
			isfavorite:false
		}
	},
	created() {
		var user = JSON.parse(localStorage.user)

		var url = this.netif.getFavoriteUrl
		url += "&userId=" + user.id
		url += "&type=4"
		url += "&token="+localStorage.token

		this.axios.get(url).then((res) => {

			var list = res.data.data
			this.list = list
			
			if(this.list.length == "0"){
				this.isfavorite = true
			}

		})
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-detail{
	min-height: 408px;
}
.no-favorite{
	padding:10px;
	font-size: 14px;
}
.item{
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding:10px 0;
}
.box{
	padding:0 10px;
	box-sizing: border-box;
}
.item a{
	display: flex;
	align-items: center;
}
.item img{
	width: 50px;
	height: 50px;
	vertical-align: middle;

}
.text{
 	margin-left:10px;
}
.name{
	margin:8px 0;
	box-sizing: border-box;
	font-size: 14px;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
}
.author{
	line-height:15px;
	font-size: 14px;
	color: #999;
}

/* dark 夜间模式 */
.content-detail.dark{
  	background: #333;
	color: #ccc;
	border-color: #454530;
}
.content-detail.dark img{
	opacity: 0.5;
}
.content-detail.dark a{
	color: #aaa;
}
</style>
