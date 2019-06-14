<template>
    <div>
        <edit-Dish v-for="(dish,index) in menu" :key="index" :data="dish" @delete-dish="deleteDish"/>
        <b-button variant="dark" class="new" v-on:click="addDish">+新增餐點</b-button>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import editDish from "./components/editDish";
Vue.prototype.$axios = axios
export default {
  name: 'Admin',
  components: {editDish},
  data(){
      return{
          menu: [],
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
      }
  },
  mounted: function(){
    var self=this;
    this.$axios({
      methods: 'get',
      //url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/menu',
      url: '/api/get/menu',
      })
      .then((res) => {
        self.menu = res.data;
    });
  },
}
</script>

<style scoped>
.new{
  width: 100%;
  border-radius: 0;
  border: 0.5px solid white;
  height: 15vh;
  font-size: 5rem;
  font-family: 'Noto Sans TC';
}
</style>

