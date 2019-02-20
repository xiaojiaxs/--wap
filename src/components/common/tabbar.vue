<template>
  <div class='tabbar' :class="{'dark':themeName=='dark'}">
		
		<router-link to="/home">
			<span class="home home-active" id="home"></span>
			<span class="item-title">首页</span>
		</router-link>

		<router-link to="/read">
			<span class="read read-active" id="read"></span>
			<span class="item-title">阅读</span>
		</router-link>

		<router-link to="/music">
			<span class="music music-active" id="music"></span>
			<span class="item-title">音乐</span>
		</router-link>

		<router-link to="/movie">
			<span class="movie movie-active" id="movie"></span>
			<span class="item-title">影视</span>
		</router-link>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabbar{
	width: 100%;
	height: 49px;
	background-color: #f1f1f1;
	border-top:1px solid #999;
	
	position: fixed;
	left: 0;
	bottom: 0;
}

.tabbar a{
	display: block;
	width: 25%;
	height: 100%;
	float: left;	
	
	padding-top: 5px;
	text-align: center;
}
.item-title{
	font-size: 14px;
	text-align: center;
	display: block;
}
.router-link-active{
	color: #5a94f9!important;
}
#home,#read,#music,#movie{
	display: block;
	width: 22px;
	height: 22px;
	background-size: 22px 22px;
	margin:0 auto;
}
.home{
	background:url(../../assets/img/main.png);
}
.read{
	background:url(../../assets/img/read.png);
}
.music{
	background:url(../../assets/img/music.png);
}
.movie{
	background:url(../../assets/img/movie.png);
}
.router-link-active .home{
	background:url(../../assets/img/main_active.png);
}
.router-link-active .read{
	background:url(../../assets/img/read_active.png);
}
.router-link-active .music{
	background:url(../../assets/img/music_active.png);
}
.router-link-active .movie{
	background:url(../../assets/img/movie_active.png);
}


/* dark 夜间模式 */
.tabbar.dark{	
	background-color: #333;
	border-top: 1px solid #eee;	
}
.tabbar.dark a{
	color: #ccc;
}
</style>
