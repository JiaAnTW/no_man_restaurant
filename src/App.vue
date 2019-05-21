<template>
  <div id="app">
      <router-view/> 
  </div>
</template>
<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
export default {
  name: 'App'
}
</script>
<style>
html {
  font-size: 4px;
  font-size: 1vw;
  font-family: 'Segoe UI';
}

button,h1,h2,h3,div,span{
  font-family: 'Segoe UI';
}

@media (min-width: 596px){
  html {
    font-size: 6px;
    font-size: 1.0vw;
  }
}

@media (min-width: 896px){
  html {
    font-size: 8px;
    font-size: 1.0vw;
  }
}

@media (min-width: 1024px){
  html {
    font-size: 10px;
    font-size: 1.0vw;
  }
}
</style>
