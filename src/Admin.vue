<template>
    <div>
        <edit-Dish v-for="(dish,index) in menu" :key="index" :data="dish"/>
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
      sendImage: function(){
        var self=this;
        this.$axios({
        method: 'post',
        url: '/api/post/image',
        data:{
            image: self.image,
            filename: 'testpic'
        }
      })
      .then((res) => {
            
        });
      },
      changeImage:function(e) {
        var file = e.target.files[0]
        var reader = new FileReader()
        var self = this
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          self.image = this.result
        }
      },
      addDish:function(){
        const newData={
          id:-1,
          name:"點擊編輯新餐點",
          price:999,
          detail:""
        };
        this.menu.push(newData)
      }
  },
  mounted: function(){
    var self=this;
    this.$axios({
      methods: 'get',
      url: '/api/get/menu'
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

