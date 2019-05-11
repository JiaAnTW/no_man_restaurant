<template>
  <div class="Layout">
    <div class="slogan-container">
      <button class="top-btn" @click="changeNowAt(before)" :style="search[0]"><div class="back"></div></button>
      <h1>Sun Burger</h1>
      <button :style="search[1]" class="top-btn"><img src="../assets/icon/icon_searcher.png" alt="search"/></button>
    </div>
    <div class="step-container">
      <!--注意，請把你.vue檔中最外層的div增加兩個css屬性: "flex-grow:1"和"-webkit-flex-grow:1" -->
      <!--這兩個屬性會幫你自動把長寬貼齊step-container，詳情請搜尋css flexbox -->
      <!--把你做的component放在下面。(你可以試試看把order放進來)-->

      <food v-if="nowAt=== 'menu'" @view-dish="viewSingleDish" :data="menu"/>
      <order v-else-if="nowAt==='order'" @add-cart="addToCart"  :data="menu[viewDish]" :isCart="isCart"/>
      <member v-else-if="nowAt=== 'profile'" @get-token="gettoken"/>
      <cart v-else-if="nowAt=== 'cart'" :token="token" @send-bill="sendBill" @direct-to-show="changeNowAt" @delete-cart="handleCartDelete" @handle-number-change="handleCartChange" @show-loading="shouldShowLoading" :data="cart"/>
      <total v-else-if="nowAt=== 'total' || nowAt=== 'favorite'" :bill-data="bill"/>
      <!--把你做的component放在上面。(你可以試試看把order放進來)-->
    </div>
    <div class="nav-bar">
      <button  v-for="(step,index) in steps" v-bind:key="index" v-on:click="changeNowAt(step.name)">
        <img class="nav-icon" :src="step.icon" :alt="step.name"/><br/>
        {{ step.name }}
      </button>
    </div>
    <loading v-if="isLoading"/>
  </div>
</template>

<script>
import Order from '../Order.vue';//記得include你做的Component
import Total from '../Total.vue';
import Cart from '../Cart.vue';
import Member from '../Member.vue';
import LinePay from './linepay.vue';
import Loading from './Loading.vue';
import Food from '../Food.vue';
import axios from "axios";
import Vue from "vue";
import { defaultCipherList } from 'constants';
Vue.prototype.$axios = axios;
export default {
  name: 'Layout',
  components: {Order,Total,Member,LinePay,Loading,Food,Cart},//也要把你做的Component在這註冊
  data () {
    return {
      menu:[],//菜單
      cart: [],//購物車
      viewDish: 0,
      steps:[ //用來建立最下面的導覽列
        {name:"menu",icon:require('../assets/icon/burger.png')},
        {name:"favorite",icon:require('../assets/icon/love.png')},
        {name:"cart",icon:require('../assets/icon/cart.png')},
        {name:"profile",icon:require('../assets/icon/member.png')}
      ],
      search: [{visibility: "hidden"},{visibility: "hidden"}], //右上角搜尋按鍵的css
      nowAt: "loading", //目前step的顯示元件，loading時不顯示任何元件,
      isLoading: true, //loading畫面是否顯示
      bill:{},//用來從cart.vue傳進total的訂單
      token:'',
      before: 'menu'
    }
  },
  methods:{
    viewSingleDish: function(id){//當點擊Food.vue的其中一個block後，用這個function把選擇的餐點傳入order.vue
      var index=this.menu.findIndex(function(item, index, array){
        return item.id == id;
      });
      this.viewDish=index;
      this.changeNowAt('order');
    },
    addToCart: function(items){ //用來增加商品至購物車，輸入參數為一物件，格式見Dish.vue
      var index=this.cart.findIndex(function(item, index, array){
        return item.id == items.id;
      });
      
      if(index!=-1){
        this.cart[index].num+=items.num;
      }
      else
        this.cart.push(items);
      this.changeNowAt('cart');
    },
    changeNowAt: function(next){ //改變step-container的顯示元件
      this.nowAt=next;
    },
    shouldShowLoading: function(show){ //用來顯示/隱藏loading畫面
      this.isLoading=show;
    },
    handleCartChange: function(value,index){ //對已經在購物車中的商品作數量改變，value為1或-1
      if(this.cart[index].num+value>=0){
        this.cart[index].num+=value;
      }
    },
    handleCartDelete:function(id){ //用商品id去尋找已經在購物車中的特定商品並做刪除
      var index=this.cart.findIndex(function(item, index, array){ 
        return item.id == id;
      });
      this.cart.splice(index, 1);
    },
    sendBill:function(data){
      this.bill=data;
    },
    gettoken:function(token){
      this.token=token;
      this.changeNowAt('cart')
    }
  },
    mounted: function(){ //當畫面已經渲染上DOM後，向後端請求資料
      var self=this;
      this.$axios({
        methods: 'get',
        url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/menu',
        //url: '/api/get/menu',
      })
      .then((res) => {
        self.menu = res.data;
        self.isLoading=false;//在資料抓到之前會顯示讀取畫面，抓到之後讓讀取畫面消失
        self.nowAt="menu";
      });
  },
  watch:{
    nowAt: function(){
      switch(this.nowAt){
        case 'menu':
          this.search=[{visibility:"hidden"},{visibility:"visible"}];
          break;
        case 'order':
          this.search=[{visibility:"visible"},{visibility:"hidden"}];
          this.before='menu'
          break;
        case 'cart':
          this.search=[{visibility:"visible"},{visibility:"hidden"}];
          this.before='menu'
        break;
        default:
          this.search=[{visibility:"hidden"},{visibility:"hidden"}];
          break;
      }
    }
  },
  computed:{
    isCart:function(){
      var self=this;
      var index=this.cart.findIndex(function(item, index, array){
        return item.id == self.menu[self.viewDish].id;
      });
      if(index!=-1)
        return true;
      else
        return false; 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Layout{
  display:flex;  
  flex-direction:column;
  -webkit-flex-direction:column;   
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  background-color: rgb(48, 48, 48);
  max-height: 100%;
}
.slogan-container{
  background-color: rgb(48, 48, 48);
  
  border-bottom: 1px solid rgb(48, 48, 48);
  height: 8.5vh;
  display: flex;
  justify-content: space-around;
  -webkit-justify-content:space-around; 
  align-items: center;
  -webkit-align-items: center;

}

.slogan-container h1{
  border: 1px solid rgb(48, 48, 48);
  font-weight: 300;
  font-size: 3.5vh;
  color: white;

}

.top-btn{
  display: flex;
  background-color: rgba(0, 0, 0, 0);
  padding:  5px 10px;
  font-size: 4.5rem;
  width: 5rem;
  border: none;
  outline: none;
  color: white;
  justify-content: center;
  -webkit-justify-content:center; 
  align-items: center;
  -webkit-align-items: center;
}


.top-btn img{
  width: 2rem;
  margin: 0 0;
}

.step-container{
  flex-grow:3;
  -webkit-flex-grow:3;
  background-color: rgb(48, 48, 48);
  display: flex;
  overflow: hidden;
}

.nav-bar{
  border-top: 1px solid gray;
  height: 8.0vh;
  display: flex;
  justify-content: center;
  -webkit-justify-content:center; 
  align-items: center;
  -webkit-align-items: center;
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  background-color: rgb(243, 243, 243);
}


.nav-bar button{
  font-size: 2.9rem;
  color: gray;
  background-color: rgba(0, 0, 0, 0);
  margin: 0rem 1.3rem;
  width: 5.5em;
  height: 100%;
  border: none;
  outline: none;
}

.nav-bar img{
  height: 40%;
}

.back{
  width: 1.5rem;
  height: 1.5rem;
  border-top:1.2px solid white;
  border-right:1.2px solid white;
  transform:rotate(-135deg);
  font-size: 2rem;
}

</style>
