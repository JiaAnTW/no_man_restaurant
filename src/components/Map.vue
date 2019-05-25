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
            <iframe 
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBjqFTlhHf0ukxuVOGIdAgqFMKcaVRI7S8&q=台南火車站"
            width="50%"
            height="80%"
            frameborder="0">
            </iframe>
            <div class="info">
                <span class="name">{{store[1].name}}</span><br>
                <span class="location">{{store[1].location}}</span>
                <span class="time">{{store[1].time}}</span>
            </div>
            <button class="con_btn">Confirm</button>
            </div>
            <div class="storedata">
             <iframe 
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBjqFTlhHf0ukxuVOGIdAgqFMKcaVRI7S8&q=安平古堡" 
            width="50%"
            height="80%"
            frameborder="0">
            </iframe>
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
            {name:"安平古堡",location:"安平區",time:"0800~2200",ps:""},],
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
    }
    .list{
        display: flex;
        flex-grow: 2;
        flex-direction:column;
        -webkit-flex-direction:column;   
    }
    .storedata{
        display: flex;
        /*border: 1px solid red;*/
        justify-content: space-between;
       align-items: center
    }
    .info{
        display: flex;
        /*border: 1px solid red;*/
        flex-grow: 1;
        flex-direction:column;
        -webkit-flex-direction:column;
        justify-content: flex-start;
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