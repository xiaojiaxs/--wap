<template>
  <div class="user">
    <navbar title="影视收藏" type="detail"></navbar>
    <div class="content-detail" :class="{'dark':themeName=='dark'}">
    	<div class="no-favorite" v-if="isfavorite">
    		您还没有收藏，请去收藏！
    	</div>
		<div class='item' v-for="(item,index) in list" :key="index">
			    
	    	<router-link :to=" '/movieDetail/'+item.id">
		    	<img v-lazy="item.img_url?netif.imagePrefix+item.img_url:''" />
		        <div class='name'>{{item.title}}</div>
			</router-link>
			   
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
		url += "&type=5"
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
	display: flex;
	flex-wrap: wrap;
	min-height: 408px;
}
.item{
  width: 50%;
  padding:10px;
  box-sizing: border-box;
}
.item img{
	width: 100%;
}
.name{
	line-height: 18px;
	font-size: 14px;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp:2;
	overflow: hidden;
}
.no-favorite{
	padding:10px;
	font-size: 14px;
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
