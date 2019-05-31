<template>
    <div class="back-stage">
      <div class="menu">
        <b-list-group>
          <b-list-group-item href="/#/admin"><img class="icon" src="./assets/icon/profit.png" alt="edit"/>分析系統</b-list-group-item>
          <b-list-group-item href="/#/admin/menu"><img class="icon" src="./assets/icon/edit.png" alt="edit"/>編輯餐點</b-list-group-item>
        </b-list-group>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { Slide } from 'vue-burger-menu'
Vue.prototype.$axios = axios
export default {
  name: 'BackStage',
  components: {Slide},
  data(){
      return {
        
      }
  }
}
</script>
<style scoped>
  .back-stage{
    display: flex;
  }
  .menu{
    height: 100vh;
    width: 10vw;
    background-color: rgb(45,45,45)
  }
  .content{
    height: 100vh;
    flex-grow: 1;
    overflow: auto;
  }
  .list-group-item{
    font-family: 'Noto Sans TC';
    font-weight: 100;
    border-radius: 0;
    background-color: rgba(0,0,0,0);
    color: white;
    outline: none;
    padding-top:4%;
  }
  .icon{
    width: 15%;
    margin-right: 10%;
  }

</style>

