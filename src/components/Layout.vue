<template>
  <div class="Layout">
    <div class="slogan-container">
      <button v-show="!search_f" class="top-btn" @click="changeNowAt(before)" :style="search[0]"><div class="back"></div></button>
      <img v-show="!search_f" src="../assets/icon/logo.png" alt="logo"/>
      <div v-show="!search_f"><!-- true-->
        <button class="top-btn" @click="changeState(search_f)"><img src="../assets/icon/icon_searcher.png" alt="search"/></button>
      </div>
      <div v-show="search_f" class="search_container">
        <div v-show="search_f" class="search_area"><!-- true-->
          <input v-model.trim="searchfood" placeholder="     Search" class="search_bar"> <!--搜尋框-->
          <button class="top-btn" @click="changeState(search_f)" :style="topDist"><img src="../assets/icon/search-b.png" alt="search"/></button>
          <!-- <h1>{{searchfood}}</h1> -->
        </div>
        <div class="result_frame">
          <div class="searchresult" v-for="(result,index) in searched" :key="index">
            <img v-show="search_f" src="../assets/icon/search-b.png" alt="search"/>
            <button @click="viewSingleDish(result.id)">
            {{result.name}}
            </button>
          </div>
        </div>
     </div>
    </div>
    <div class="step-container">
      <!--注意，請把你.vue檔中最外層的div增加兩個css屬性: "flex-grow:1"和"-webkit-flex-grow:1" -->
      <!--這兩個屬性會幫你自動把長寬貼齊step-container，詳情請搜尋css flexbox -->
      <!--把你做的component放在下面。(你可以試試看把order放進來)-->
      <!-- <past-order v-if="nowAt==='menu'"/> -->
      <food v-if="nowAt=== 'menu'" @view-dish="viewSingleDish" :data="menu" :seafood="searchfood" @send-bill="sendBill" @direct-to-show="changeNowAt" @delete-cart="handleCartDelete" @handle-number-change="handleCartChange" @show-loading="shouldShowLoading" :cartData="cart" :token="token"/>
      <order v-else-if="nowAt==='order'" @add-cart="addToCart"  :data="menu[viewDish]" :isCart="isCart"/>
      <member v-else-if="nowAt=== 'profile'" @get-token="gettoken" :onPay="false"/>
      <!--cart v-else-if="nowAt=== 'cart'" :token="token" @send-bill="sendBill" @direct-to-show="changeNowAt" @delete-cart="handleCartDelete" @handle-number-change="handleCartChange" @show-loading="shouldShowLoading" :data="cart"/-->
      <total v-else-if="nowAt=== 'cart'" @get-food="searchCertainFood" :find="find" :bill-data="bill"/>
      <past-order v-else-if="nowAt=== 'favorite'" @get-food="searchCertainFood" :find="find"/>
      <!--把你做的component放在上面。(你可以試試看把order放進來)-->
    </div>
    <div class="nav-bar">
      <button  v-for="(step,index) in steps" v-bind:key="index" v-on:click="changeNowAt(step.name)">
        <img class="nav-icon" :src="step.icon" :alt="step.name"/><br/>
        {{ step.name }}
      </button>
    </div>
    <loading v-if="isLoading"/>
    <!--<pay-center/>-->
  </div>
</template>

<script>
import Order from '../Order.vue';//記得include你做的Component
import Total from '../Total.vue';
import Cart from '../Cart.vue';
import Member from '../Member.vue';
import Loading from './Loading.vue';
import Food from '../Food.vue';
import Map from './Map.vue';
import PayCenter from "./PayCenter.vue";
import PastOrder from "../PastOrder.vue";
import axios from "axios";
import Vue from "vue";
import { defaultCipherList } from 'constants';
Vue.prototype.$axios = axios;
export default {
  name: 'Layout',
  components: {Order,Total,Member,Loading,Food,Cart,Map,PayCenter,PastOrder},//也要把你做的Component在這註冊
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
      search: [{visibility: "hidden"}], //右上角搜尋按鍵的css
      nowAt: "loading", //目前step的顯示元件，loading時不顯示任何元件,
      isLoading: true, //loading畫面是否顯示
      search_f:false,//放大鏡是否顯示
      bill:{},//用來從cart.vue傳進total的訂單
      token:'',
      searchfood:'',
      before: 'menu',
      searched:[],
      find:[],
      topDist:{
        marginTop:'0vh',
      }
    }
  },
  methods:{
    viewSingleDish: function(id){//當點擊Food.vue的其中一個block後，用這個function把選擇的餐點傳入order.vue
      var index=this.menu.findIndex(function(item, index, array){
        return item.id == id;
      });
      this.viewDish=index;
      this.changeNowAt('order');
      this.search_f=false;
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
      if(this.cart[index].num+value>0){
        this.cart[index].num+=value;
      }
      else if(this.cart[index].num+value===0)
        this.handleCartDelete(index);
    },
    handleCartDelete:function(id){ //用商品id去尋找已經在購物車中的特定商品並做刪除
      this.cart.splice(id, 1);
    },
    sendBill:function(data){
      this.bill=data;
    },
    gettoken:function(token){
      this.token=token;
      this.changeNowAt('cart')
    },
    changeState:function(){
      if(!this.search_f)
        this.searchfood=""
      this.search_f=!this.search_f;//改變狀態
      this.topDist={marginTop:'2vh'};
    },
    searchCertainFood:function(target){
      console.log(target)
      this.find.push(target.map(Element=>{
        for(let i=0;i<this.menu.length;i++){
          if(this.menu[i].name==Element){
            return this.menu[i];
          }
        }
      }))
      console.log(find)

    }
  },
    mounted: function(){ //當畫面已經渲染上DOM後，向後端請求資料
      var self=this;
      this.$axios({
        methods: 'get',
        url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/menu',//DataBase的資料 
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
          this.find=[]
        break;
        case 'favorite':
          this.search=[{visibility:"visible"},{visibility:"hidden"}];
          this.before='menu'
          this.find=[]
        break;
        default:
          this.search=[{visibility:"hidden"},{visibility:"hidden"}];
          break;
      }
      if (this.nowAt!="favorite")
        this.find=[];
    },
    searchfood: function(){
      var self=this;
      var output=[]; //使用local variable去避免在第二次的搜尋條件改變前影響搜尋母體
      if(self.searchfood!==""){
        console.log("hello")
        for(let i=0;i<self.menu.length;i++){
          var str=self.menu[i].name;
          var s=str.search(self.searchfood);
          if(s!=-1){
            output.push({name:self.menu[i].name,id:self.menu[i].id});
          }
        }
      }
      self.searched=output;
     },
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
.search_container{
  display: flex;
  justify-content: flex-end;
  -webkit-justify-content:flex-end;
  flex-flow: row wrap;
  position:absolute;
  top:0;
  height:85vh;
  width: 85vw;
  background-color: rgba(243, 243, 243, 0.9);
  z-index:2;
  border-radius:3%;
}
.search_bar{
  justify-content: flex-end;
  -webkit-justify-content:flex-end; 
  align-items: center;
  -webkit-align-items: center;
  display: flex;
  flex-grow: 1;
  border-radius: 50px;
  font-size:16px;
  z-index:3;
  margin-top:2vh;
  /* margin:10vh 5vw 40vh 5svw; */
  /* border-radius: 5%;
  width: 80vw;
  padding:2vh 2vw 2vh 2vw;
  margin-top:5vh;
  background-color: white; */
}
.search_area{
  display: flex;
  justify-content: flex-end;
  width: 70vw;
  height: 7vh;
  z-index:3;
  /* background-color: white;
  height: 165vh;
  z-index:3;
  opacity:0.9;
  border-radius:2.5%; */
}
.result_frame{
  display:flex;
  flex-flow:column;
  height:75vh;
  width:70vw;
  /* border: 1px solid black; */
  margin-top:1vh;
}
.result_frame img{
  height:2.5vh;
  width: 2.5vh;
  position: relative;
  margin: 0.5rem;
}
.searchresult{
  display: flex;
  height:5vh;
  width: 70vw;
  /* border:1px solid black; */
  padding: 3px 3px;
  ;
}
.searchresult button{
  background-color: transparent;
  border:none;
  text-align: left;
  outline: none;
  font-family: 'Microsoft JhengHei';
  font-size: 2vh;
  height: 100%;
  width: 100%;
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
  max-height: 84.5vh;
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
