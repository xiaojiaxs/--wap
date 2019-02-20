<template>
  <div class="user">
    <navbar title="阅读收藏" type="detail"></navbar>
    <div class="content-detail" :class="{'dark':themeName=='dark'}">
    	<div class="no-favorite" v-if="isfavorite">
    		您还没有收藏，请去收藏！
    	</div>
			<div class='item' v-for="(item,index) in list" :key="index">
			    <div class="box">
			    	<router-link :to=" '/readDetail/'+item.id">
				    	<img src='../assets/img/collected.png' />
				      <div class='name'>{{item.title}}</div>
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
		url += "&type=1"
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
	min-height:408px;
}
.item{
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ddd;
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
	width: 25px;
	height: 25px;
	vertical-align: middle;
	margin-right:8px;

}
.name{
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;

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
.content-detail.dark a{
	color: #aaa;
}
</style>
