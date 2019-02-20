<template>
  <div class="content-detail" :class="{'dark':themeName=='dark'}">
  	<navbar title="阅读详情" type="detail"></navbar>
    <div class='cell-wrapper' :class="{'dark':themeName=='dark'}">
	    <div class='cell'>
	      <div class='cell-title'>{{item.hp_title}}</div>
	      <div class='cell-author'>作者:{{item.author_name}}</div>
	       <div class='cell-forward'>
	       	<div v-html="item.real_content"></div>
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
     item:{},
    
    }
  },
  created(){
  	this.downloadListUrl()	
  },
  methods:{
  	downloadListUrl(){
  		var id = this.$route.params.id;

      var url = this.netif.readDetailUrl+"&id="+id
      
      if(localStorage.isLogin == "1"){
					var user = JSON.parse(localStorage.user)
					url += '&userId='+user.id
			}

      this.axios.get(url).then((res)=>{
        var item = res.data.data
        
        item.real_content = Base64.decode(item.hp_content);
        
        this.item = item
      })
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cell-wrapper{
  width: 100%;
  background: #fff; 
}
.cell{
  width: 95%;
  margin:0 auto;
  overflow: hidden;
}

.cell-author{
  line-height: 30px;
  color: #7c7c82;
  font-size: 15px;
}
.cell-title{
  width: 100%;
  padding:10px 0;
  line-height: 20px;
  font-size:15px;
  font-weight: bold;
  text-align: center;
}
.cell-forward{
	font-size: 14px;
	line-height: 25px;
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
</style>
