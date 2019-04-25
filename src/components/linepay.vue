<template>
    <div>
        這裡是首頁
        <button v-on:click="post123">點我啊</button>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
Vue.prototype.$axios = axios
export default {
  name: 'Home',
  methods:{
    post123: function(){
      console.log("快給我錢")
      this.$axios(
        {
          method: "post",
          baseURL: "/line",
          url: '/v2/payments/request',
          data:{
	          "productName": "媽祖託夢器",
            "amount": 1,
            "confirmUrl": "loacalhost:8081/#/Home",
            "currency": "TWD",
            "orderId": "9487",
            "productImageUrl": "https://img5.cna.com.tw/www/WebPhotos/1024/20190418/337616899030.jpg"
          },
            headers:{
              'X-Requested-With': 'XMLHttpRequest', // 若有送出header需求, PHP要設定相對的header參數 
              "X-LINE-channelId": "1567873613",
              "X-LINE-channelSecret": "7121812b7e2a57010730d79eedc3aa01",
              "content-type":"application/json;charset=UTF-8"
          },
          withCredentials: true,
        }
      ).then(response=>{
        window.open(response.body["info"]["paymentUrl"]["web"], "_blank")
      })
    }
  }
}
</script>
