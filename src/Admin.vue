<template>
    <div class="admin">
        <div class="choose-area">
            <food :isAdmin="true" @view-dish="viewSingleDish" :data="menu" :seafood="searchfood"/>
        </div>
        <div class="edit-area">
          <edit-Dish :data="menu[viewDish]" @delete-dish="deleteDish" :comments="comments"/>
          <!--b-button variant="dark" class="new" v-on:click="addDish">+新增餐點</b-button-->
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Food from "./Food"
import Vue from "vue";
import editDish from "./components/editDish";
Vue.prototype.$axios = axios
export default {
  name: 'Admin',
  components: {editDish,Food},
  data(){
      return{
          menu: [],
          comments:[],
          searchfood: "",
          viewDish: 0,
      }
  },
  methods:{
      addDish:function(){
        const newData={
          id:-1,
          name:"點擊編輯新餐點",
          price:999,
          detail:""
        };
        this.menu.push(newData)
      },
      deleteDish:function(id){
        var index=this.menu.find(function(item, index, array){
         return item.id == id;           // 取得大於五歲的
        });
        this.menu.splice(index, 1);
        this.viewDish=(this.viewDish!=0)?this.viewDish-1:this.viewDish+1;
      },
      viewSingleDish: function(id){//當點擊Food.vue的其中一個block後，用這個function把選擇的餐點傳入order.vue
        var index=this.menu.findIndex(function(item, index, array){
          return item.id == id;
        });
        this.viewDish=index;
      },
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
        self.menu.push({
          detail:"",
          feedback:null,
          id:self.menu.length+1,
          image: null,
          name:"新增餐點",
          price:0,
          type:"burger",
        })
    });
      this.$axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/feedback',
            data: {
                id: this.viewDish+1
            },
        })//等到get後才執行接下來的code
        .then((res)=>{
            this.comments=res.data
        })
  },
  watch:{
    viewDish:function(){
            this.$axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/feedback',
            data: {
                id: this.viewDish+1
            },
        })//等到get後才執行接下來的code
        .then((res)=>{
            this.comments=res.data
        })
    }
  }
}
</script>

<style scoped>
.admin{
  display: flex;
}


.new{
  width: 100%;
  border-radius: 0;
  border: 0.5px solid white;
  height: 15vh;
  font-size: 5rem;
  font-family: 'Noto Sans TC';
}
.choose-area{
  width: 20%;
  height: 100vh;
  background-color: rgb(48, 48, 48);
  overflow-y: scroll;
}


.edit-area{
  flex-grow: 1;
  height: 100%;
}

.choose-area::-webkit-scrollbar,.list-A::-webkit-scrollbar,.list-B::-webkit-scrollbar
{
  width: 6px;
  background-color: transparent;
  border: none;
}

.choose-area::-webkit-scrollbar-thumb,.list-A::-webkit-scrollbar-thumb,.list-B::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  background-color: rgb(84,177,244);
  opacity: 0.5;
}

.choose-area::-webkit-scrollbar-track,.list-A::-webkit-scrollbar-track,.list-B::-webkit-scrollbar-track
{
background-color: transparent;
border: 0px solid;
}

.choose-area::-webkit-scrollbar-track-piece,.list-A::-webkit-scrollbar-track-piece,.list-B::-webkit-scrollbar-track-piece{
 /* 4 */ 
 border: none;
}
</style>

