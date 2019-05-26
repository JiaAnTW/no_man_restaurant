<template>
    <div class="map">
        <div class="header">
        </div>
        <div class="container">
            <iframe 
            :src="user_loc" 
            allowfullscreen
            width="100%"
            height="80%"
            frameborder="0">
            </iframe>
        </div>
        <div v-bind:key="index" v-for="(data,index) in store" class="list">
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
            <button class="con_btn" @click="location()">Confirm</button>
            </div>
            <br>
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
            {site:"https://www.google.com/maps/embed/v1/place?key=AIzaSyBjqFTlhHf0ukxuVOGIdAgqFMKcaVRI7S8&q=成功大學電機系館",name:"成功大學電機系館",location:"大學路",time:"0000~2400",ps:"全年無休"},
            {site:"https://www.google.com/maps/embed/v1/place?key=AIzaSyBjqFTlhHf0ukxuVOGIdAgqFMKcaVRI7S8&q=台南火車站",name:"台南火車站",location:"台南市前鋒路",time:"0500~2200",ps:""},
            {site:"https://www.google.com/maps/embed/v1/place?key=AIzaSyBjqFTlhHf0ukxuVOGIdAgqFMKcaVRI7S8&q=安平古堡",name:"安平古堡",location:"安平區",time:"0800~2200",ps:""},],
            user_loc:"",
        }
    },
    methods:{

    },
    beforeMount:function(){
        var self=this;
        navigator.geolocation.watchPosition((position) => {
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

    }
    .container{
        display: flex;
        flex-grow: 8;
        /*border: 0.5px solid red;*/
    }
    .list{
        display: flex;
        flex-grow: 1;
       /* border: 1px solid blue;*/
        flex-direction:column;
        -webkit-flex-direction:column;   
    }
    .storedata{
        display: flex;
        /*border: 1px solid red;*/
        background-color:rgb(48,48,48);
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
    }
    .location{
        font-style: italic;
    }
    .time{
        color: grey;
    }
</style>