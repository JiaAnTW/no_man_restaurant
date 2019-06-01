<template>
    <div class="test">
        這裡是首頁 
        <modal>
          <member/>
        </modal>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import Modal from "./components/Modal";
import Member from "./Member"
Vue.prototype.$axios = axios
export default {
  components:{Modal,Member},
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
