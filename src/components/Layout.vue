<template>
  <div class="Layout">
    <div class="slogan-container">
      <button class="top-btn"><div class="back"></div></button>
      <h1>Sun Burger</h1>
      <button :style="search" class="top-btn"><img src="../assets/icon/icon_searcher.png" alt="search"/></button>
    </div>
    <div class="step-container">
      <!--注意，請把你.vue檔中最外層的div增加兩個css屬性: "flex-grow:1"和"-webkit-flex-grow:1" -->
      <!--這兩個屬性會幫你自動把長寬貼齊step-container，詳情請搜尋css flexbox -->
      <!--把你做的component放在下面。(你可以試試看把order放進來)-->

      <food v-if="nowAt=== 'menu'" :data="menu"/>
      <!--order v-else-if="nowAt==='favorite'" @add-cart="addToCart"  :data="menu[1]"/-->
      <!--order v-else-if="nowAt==='favorite'"  :data="menu[1]"/-->
      <line-pay @show-loading="shouldShowLoading" v-else-if="nowAt==='favorite'"/>
      <member v-else-if="nowAt=== 'profile'" />
      <cart v-else-if="nowAt=== 'cart'" :data="cart"/>
      
      <!--把你做的component放在上面。(你可以試試看把order放進來)-->
    </div>
    <div class="nav-bar">
      <button  v-for="(step,index) in steps" v-bind:key={index} v-on:click="changeNowAt(step.name)">
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
      msg: '這裡是固定的版面',
      menu:[],
      cart: [],
      viewDish: 0,
      steps:[
        {name:"menu",icon:require('../assets/icon/burger.png')},
        {name:"favorite",icon:require('../assets/icon/love.png')},
        {name:"cart",icon:require('../assets/icon/cart.png')},
        {name:"profile",icon:require('../assets/icon/member.png')}
      ],
      search: {visibility: "hidden"},
      nowAt: "loading",
      isLoading: true
    }
  },
  methods:{
    viewSingleDish: function(id){
      this.viewDish=id;
    },
    addToCart: function(items){
      this.cart.push(items);
    },
    changeNowAt: function(next){
      this.nowAt=next;
    },
    shouldShowLoading: function(show){
      this.isLoading=show;
    }
  },
    mounted: function(){
      var self=this;
      this.$axios({
        methods: 'get',
        url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/menu',
        //url: '/api/get/menu',
      })
      .then((res) => {
        self.menu = res.data;
        self.isLoading=false;
        self.nowAt="menu";
      });
  },
  watch:{
    nowAt: function(){
      switch(this.nowAt){
        case 'menu':
          this.search={};
          break;
        default:
          this.search={visibility:"hidden"};
          break;
      }
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
  height: 7.5vh;
  display: flex;
  justify-content: space-around;
  -webkit-justify-content:space-around; 
  align-items: center;
  -webkit-align-items: center;

}

.slogan-container h1{
  border: 1px solid rgb(48, 48, 48);
  font-weight: 300;
  font-size: 5.5rem;
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
  height: 7.0vh;
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
  font-size: 2rem;
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
