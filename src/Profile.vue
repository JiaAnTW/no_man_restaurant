<template>
    <div class="profile">
        <div class="head">
            <div class="name">
            <span style="font-weight:bold">Name</span>
            <span style="font-weight:lighter">{{name}}</span></div>
        <div class="userpic"><div class="inner"></div></div>
        </div>

        <div class="number">
            <span >Email address</span>
            <div class="box">
            <span >{{email}}</span></div>
            <span >Mobile number</span>
            <div class="box">
            <span >{{mobile}}</span></div>
        </div>

        <div class="bottom">
            <img class="icon" src="./assets/icon/fb icon.png">
            <img class="icon" src="./assets/icon/ig icon.png">
            <span style="color:white">Follow Us!</span>
            <button class="button">Save</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
Vue.prototype.$axios = axios;
export default {
    name:'profile',
    components:{},
    data(){
        return{
           data:[],
           name:"test",
           email:"test@gmail.com",
           mobile:"09123456789",
        }
    },
    methods:{

    },
     mounted: function(){ //當畫面已經渲染上DOM後，向後端請求資料
      var self=this;
      this.$axios({
        methods: 'post',
        url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/index',//DataBase的資料 
      })
      .then((res) => {
        self.data=res.data;
        console.log(data);
        /*self.menu = res.data;
        self.isLoading=false;//在資料抓到之前會顯示讀取畫面，抓到之後讓讀取畫面消失
        self.nowAt="menu";*/
      });
  },
}
</script>

<style scoped>
    .profile{
        /*border:0.5px solid red;*/
        display: flex;
        flex-grow: 1;
        flex-direction:column;
        -webkit-flex-direction:column;  
    }
    .head{
        /*border:0.5px solid red;*/
        display: flex;
        height: 18vh;
        font-size: 3.5vh;
        justify-content:space-around;
        align-content: center;
        background: #fff;
        border-radius: 5%;
    }
    .name{
       /*border:0.5px solid red;*/
        display:flex;
        flex-direction:column;
        -webkit-flex-direction:column;
        justify-content: center;  
        
    }
    .number{
        border:0.5px solid red;
        color:white;
        display:flex;
        flex-direction:column;
        -webkit-flex-direction:column;
        justify-content: center; 
    }
    .box{
        border:0.5px solid white;
        border-style:none;
        border-bottom-style: solid;
        padding-bottom: 1.5vh;
    }
    .userpic{
        /*border:0.5px solid red;*/
        background:#fff;
        display: inline-block;
        width: 25vw;
        height:14.5vh;
        border-radius: 50%;
        margin-top:1.8vh;
    }
    .inner {
        background-image:url("./assets/icon/icon.png");
        background-size:cover;
        background-position:center center;
        height: 100%;
        border-radius:50%;
    }
    .bottom{
        border:0.5px solid red;
        display:flex;
       /* margin-top:40vh;*/
        justify-content: space-evenly; 
    }
    .icon{
        /*height: 20vh;
        width:20vw;*/
        border-radius:50%;
        background-image: linear-gradient(270deg, rgb(155,51,84) 0%, rgb(58,44,105) 80%);
    }
    .button{
        background-image: linear-gradient(270deg, rgb(155,51,84) 0%, rgb(58,44,105) 80%);
        border:none;
        border-radius:25%; 
        height: 5vh;
        width: 15vw;
        color:white;
    }
</style>