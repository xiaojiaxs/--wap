<template>
  <div>
    <navbar title="影视详情" type="detail"></navbar>
    <div class="content-detail" :class="{'dark':themeName=='dark'}"> 
	    <div class='cell-wrapper' :class="{'dark':themeName=='dark'}">
		    <div class='cell'>
					<img :src="item.img_url?netif.imagePrefix+item.img_url:''" alt="" class="cell-img">
		      <video :class="{'dark':themeName=='dark'}" :src="item.media_url?netif.imagePrefix+item.media_url:''" controls ></video> 
		      <div class='cell-title'>{{item.title}}</div>
		      <div class='cell-author' v-html="item.info"></div>
		      <div class='cell-text'>-剧情简介-</div>
		      <div class='cell-officialstory'>{{item.officialstory}}</div>
		    </div>
		  </div>
	  </div>
	  <toolbar :dict="item"></toolbar>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
     item:{}
    }
  },
  created(){
  	this.downloadListUrl()
  },
  methods:{
  	downloadListUrl(){
  		var id = this.$route.params.id;

      var url = this.netif.movieDetailUrl+"&id="+id
      
      if(localStorage.isLogin == "1"){
					var user = JSON.parse(localStorage.user)
					url += '&userId='+user.id
			}

      this.axios.get(url).then((res)=>{
        var list = res.data.data


        this.item = list
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-detail{
  min-height: 408px;
}
.cell-wrapper{
  width: 100%;
  padding:10px 0;
  background: #ebebf1; 
}
.cell{
  width: 95%;
  margin:0 auto;
  overflow: hidden;
}
.cell-img{
  width:100%;
  height: 200px; 
}
.cell-title{
  width: 90%;
  line-height: 30px;
  font-size:18px;
  font-weight: bold;
  text-align: center;
  margin:0 auto;
}

.cell-author{
  line-height:25px;
  color: #8f8f94;
  font-size: 14px;
  text-align: center;
  margin:10px 0;
}
.cell-text{
  font-size: 16px;
  line-height: 25px;
  text-align: center;
}
.cell-officialstory{
  
  font-size: 14px;
  line-height: 25px;
  color: #8f8f94;
  text-align: center;
  margin-bottom: 10px;

}
video{
  width:100%;
}

/* dark 夜间模式 */
	.cell-wrapper.dark,
  .content-detail.dark{
		background: #333;
		color: #aaa;
		border-color: #454530;
	}
	.cell-wrapper.dark img{
		opacity: 0.5;
	}
  video.dark{
    opacity: 0.5;
  }
</style>
