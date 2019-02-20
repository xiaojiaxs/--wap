<template>
	<div class='navbar' :class="{'dark':themeName=='dark'}">

		<div class="nav-left">
			<router-link class='search-button' v-if="in_type=='list'" to="/search"></router-link>
			<a class='back-button' v-if="in_type=='detail'" href="javascript:history.back()"></a>
		</div>
		<div class="nav-title">
			{{title}}
		</div>
		<div class="nav-right">
			<router-link class="user-button" :to="isLogin?'/user':'/login'"></router-link>
		</div>

	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	props: ['title','type'],
	data() {
		return {
			in_type:'list',
			isLogin:0
		}
	},
	created(){
		if(this.type != undefined){
			this.in_type = this.type
		}
		
		if(localStorage.isLogin != undefined
			&& localStorage.isLogin == "1"){
			this.isLogin = 1
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.navbar {
		width: 100%;
		height: 44px;
		background-color: #f1f1f1;
		border-bottom: 1px solid #999;

		position: fixed;
		left: 0;
		top: 0;
		z-index: 3;
		text-align: center;
		line-height: 44px;

		display: flex;
		justify-content: space-around;
	}

	.nav-left {
		flex-basis: 60px;
	}

	.nav-title {
		flex-grow: 1;
	}

	.nav-right {
		flex-basis: 60px;

	}

	.nav-right .user-button{
		display: block;
		width: 25px;
		height: 25px;
		background: url('../../assets/img/user2.png');
		background-size: 100% 100%;

		margin: 10px auto 0px;
	}
	.nav-left .search-button{
		display: block;
		width: 25px;
		height: 25px;
		background: url('../../assets/img/search_min.png');
		background-size: 100% 100%;

		margin: 10px auto;
	}
	
	.nav-left .back-button{
		display: block;
		width: 25px;
		height: 25px;
		background: url('../../assets/img/back.png');
		background-size: 100% 100%;

		margin: 10px auto;
	}

	/* dark 夜间模式 */
	.navbar.dark {
		background-color: #333;
		border-bottom: 1px solid #eee;		
		color: #ccc;
	}
</style>
