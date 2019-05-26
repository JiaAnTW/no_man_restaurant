<template>
    <div class="map">
        <div class="container">
            <!--<iframe 
            src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyBjqFTlhHf0ukxuVOGIdAgqFMKcaVRI7S8&origin=成功大學&destination=赤崁樓" 
            allowfullscreen
            width="100%"
            height="50%">
            </iframe>-->
        </div>
        <div class="list">
           <div class="storedata">
            <div  class="map_contain">
            <iframe class="iframe_style" 
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBjqFTlhHf0ukxuVOGIdAgqFMKcaVRI7S8&q=台南火車站"
            frameborder="0">
            </iframe>
            </div>
            <div class="info">
                <span class="name">{{store[1].name}}</span><br>
                <span class="location">{{store[1].location}}</span>
                <span class="time">{{store[1].time}}</span>
            </div>
            <button class="con_btn">Confirm</button>
            </div>
            <br>
            <div class="storedata">
            <div class="map_contain">
             <iframe class="iframe_style"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBjqFTlhHf0ukxuVOGIdAgqFMKcaVRI7S8&q=安平古堡"
            frameborder="0">
            </iframe>
            </div>
             <div class="info">
                <span class="name">{{store[2].name}}</span><br>
                <span class="location">{{store[2].location}}</span>
                <span class="time">{{store[2].time}}</span>
            </div>
            <button class="con_btn">Confirm</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            store:[
            {name:"成功大學電機系館",location:"大學路",time:"0000~2400",ps:"全年無休"},
            {name:"台南火車站",location:"台南市前鋒路",time:"0500~2200",ps:""},
            {name:"安平古堡保",location:"安平區",time:"0800~2200",ps:""},],
        }
    }
}
</script>

<style scope>
    .map{
        display:flex;
        flex-grow:1;
        flex-direction:column;
        -webkit-flex-direction:column;    
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