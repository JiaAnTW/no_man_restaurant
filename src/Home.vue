<template>
    <div class="test">
        這裡是首頁 
        <Map/>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import Map from './components/Map.vue';
Vue.prototype.$axios = axios
export default {
  components:{Map},
  name: 'Home'
}
</script>
<style scope>
    .test{
  display:flex;
  height: 105vh; 
  flex-direction:column;
  -webkit-flex-direction:column; 
    }
</style>
