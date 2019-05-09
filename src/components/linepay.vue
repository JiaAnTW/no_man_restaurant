<template>
    <div>
        這裡是首頁
        <button v-on:click="post123">點我啊</button>
        <button v-on:click="confirm">確認</button>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
Vue.prototype.$axios = axios
export default {
  name: 'Home',
  mounted: function(){
    var self=this;
    this.$axios({
      method: 'post',
      //url: '/api/post/login',
      url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/login',
      data: {
        username:"admin",
        password:"admin123"
      },
    }).then((res) => {
        this.token=res.data["token"];
      });
  },
  methods:{
    test: function(){
      this.$axios({
      method: 'post',
      url: '/api/post/index',
      data: {
        token:this.token,
      },
    }).then((res) => {
      })
    },
    post123: function(){
      this.$emit('show-loading',true);
      this.$axios(
        {
          method: "post",
          url: '/api/post/pay'
        }
      ).then(response=>{
        window.open(response.data["url"], "_blank")
        this.$emit('show-loading',false);
      })
    },
    confirm: function(){
      this.$emit('show-loading',true);
      this.$axios(
        {
          method: "post",
          url: '/api/post/pay/confirm'
        }
      ).then(response=>{
        this.$emit('show-loading',false);
      })
    }
  }
}
</script>