<template>
    <div class="map">
       <div class="header">
            <img class="sbpic" src="../assets/icon/icon.png" alt="vue">
            <span class="topic">Select Your location</span>
        </div>
        <div class="container">
            <iframe 
            :src="user_loc" 
            allowfullscreen
            width="100%"
            height="100%"
            frameborder="0">
            </iframe>
        </div>
        <br>
        <div class="list">
        <div v-bind:key="index" v-for="(data,index) in store" >
           <div class="storedata"> 
            <div  class="map_contain">
            <img src="../assets/MAP.png">
            </div>
            <div class="info">
                <span class="name">{{data.name}}</span>
                <span class="location">{{data.location}}</span>
                <span class="time">{{data.time}}</span>
            </div>
            <button class="con_btn" @click="changePage()">Confirm</button>
            </div>
            <br>
        </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);
export default {
    name:"Map",
    data(){
        return{
            store:[
            {site:"https://www.google.com/maps/embed/v1/place?key=AIzaSyBjqFTlhHf0ukxuVOGIdAgqFMKcaVRI7S8&q=安平古堡",name:"安平古堡",location:"安平區",time:"0800~2200",ps:""},{site:"https://www.google.com/maps/embed/v1/place?key=AIzaSyBjqFTlhHf0ukxuVOGIdAgqFMKcaVRI7S8&q=成功大學電機系館",name:"成功大學電機系館",location:"大學路",time:"0000~2400",ps:"全年無休"},
            {site:"https://www.google.com/maps/embed/v1/place?key=AIzaSyBjqFTlhHf0ukxuVOGIdAgqFMKcaVRI7S8&q=台南火車站",name:"台南火車站",location:"台南市前鋒路",time:"0500~2200",ps:""},],
            user_loc:"",
        }
    },
    methods:{
        changePage:function(){
            this.$emit('change-page',50);
        }
    },
    beforeMount:function(){
        var self=this;
        navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
        self.user_loc= "https://www.google.com/maps/embed/v1/view?key=AIzaSyBjqFTlhHf0ukxuVOGIdAgqFMKcaVRI7S8&zoom=15&center="+position.coords.latitude+","+position.coords.longitude+""})
    },
    
}
</script>

<style scope>
    .map{
        display:flex;
        flex-grow:1;
        flex-direction:column;
        -webkit-flex-direction:column; 
           
    }
    .header{
        display: flex;
        height:14vh;
        margin-left: 2vh;
        align-items: flex-end;
    }
    .sbpic{
        border-radius: 50%;
        height:10vh;
        width:auto;
    }
    .topic{
        margin-left:2vw;
        margin-bottom:1.5vh;
        font-weight:700;
        font-size:3vh;
    }
    .container{
        display: flex;
        flex-grow: 8;
        background: white;
        border-radius:5%; 
    }
    .list{
        display: flex;
        height: 15vh;
        flex-direction:column;
        -webkit-flex-direction:column; 
        align-items: center;
    }
    .storedata{
        display: flex;
        flex-grow: 1;
        background-color:white;
        border-radius:5%; 
        justify-content: space-between;
        align-items: center;
        width: 80vw;
        
    }
    .info{
        display: flex;
        color: white;
        flex-grow: 1;
        flex-direction:column;
        -webkit-flex-direction:column;
        justify-content: flex-start;
        
    }
    .map_contain{
        display: flex;
        justify-content: center;
        width:25%;
    }
    .iframe_style{
        width:100%;
        height:200%;
        margin-top:-40%;
        border:0;
    }
    .con_btn{
        color:white;
        background-image: linear-gradient(270deg, rgb(155,51,84) 0%, rgb(58,44,105) 80%);
        margin-right: 10px;
        border:none;
        border-radius:25px; 
        height: 20%;
        font-weight:500;
        font-size:2vh;
    }
    .name{
        font-weight: bold;
        color: black;
        font-family: 'Microsoft JhengHei';
    }
    .location{
        font-style: italic;
        color: black;
        font-family: 'Microsoft JhengHei';
    }
    .time{
        color: grey;
        font-family: 'Microsoft JhengHei';
    }
</style>