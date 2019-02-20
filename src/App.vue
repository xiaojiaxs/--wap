<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
body{
  margin: 0;
  color: #333;
}
.content-list{
  padding-top:44px;
  padding-bottom:49px;
  min-height: 408px;
}
.content-detail{
  padding-top:44px;
  padding-bottom:40px;
  min-height: 408px;
}
a{
  text-decoration: none;
  color:#333;
}
</style>
