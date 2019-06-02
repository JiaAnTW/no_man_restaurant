<template>
    <div class="map">
       <div class="header">
            <img class="sbpic" src="../assets/icon/no_user.png" alt="vue">
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
            <iframe class="iframe_style" 
            :src="data.site"
            frameborder="0">
            </iframe>
            </div>
            <div class="info">
                <span class="name">{{data.name}}</span><br>
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
            this.$emit('change-page');
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
        height:10vh;
        margin-left: 12vw;
    }
    .sbpic{
        border-radius: 50%;
        width: 25%;
        height: auto;
        background: white;
    }
    .topic{
        font-weight: bold;
        margin-left:2vw;
        margin-top:6vh;
    }
    .container{
        display: flex;
        flex-grow: 8;
        /*border: 0.5px solid red;*/
        background: white;
        border-radius:5%; 
    }
    .list{
        display: flex;
        /* border: 1px solid blue;*/
        height: 15vh;
        flex-direction:column;
        -webkit-flex-direction:column; 
        align-items: center;
        overflow-x:hidden;
        overflow-y:auto;
        overflow: auto;
    }
    .storedata{
        display: flex;
        /*border: 1px solid red;*/
        background-color:white;
        border-radius:5%; 
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
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
        /*border: 1px solid red;*/
        width:50%;
        height: 200%;
        overflow: hidden;
    }
    .iframe_style{
        width:100%;
        height:200%;
        margin-top:-40%;
        border:0;
    }
    .con_btn{
        display: flex;
        flex-direction:column;
        -webkit-flex-direction:column;
        justify-content: center;
        color:white;
        margin-right: 10px;
        background-color: rgb(48,48,48);
        border-radius: 25%;
        height: 20%;
        border:0px;
    }
    .name{
        font-weight: bold;
        color: black;
    }
    .location{
        font-style: italic;
        color: black;
    }
    .time{
        color: grey;
    }
</style>