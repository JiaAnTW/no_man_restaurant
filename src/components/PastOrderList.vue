<template>
    <div class="pastorderlist">
        <div class="order" v-bind:key="index" v-for="(data,index) in order">
            <div class="data-container" v-for="(elemnt,i) in data">
            <v-touch v-on:swipeleft="move()" class="data_con" >
                <img :src="elemnt.pic" alt="No_pic" style="height:80%;display:flex;">
                <div class="data">
                <span>{{elemnt.name}}</span>
                <span>$ {{elemnt.price}}</span>
                </div>
                <img class="can" src="../assets/icon/can.png" style="height:7vh;width:6.5vw;display:flex;flex-grow:2;">
            </v-touch>
            </div>
            <button class="add_cart_btn" v-on:click="changeNowAt()">Add to Cart</button>
        </div>
    </div>
</template>

<script>
import VueTouch from 'vue-touch';
import axios from "axios";
import Vue from 'vue';
Vue.use(VueTouch, {name: 'v-touch'})
Vue.prototype.$axios = axios;
export default {
    name:"PastOrderList",
    props: ["find"],
    data(){
        return{
            x:0,y:0,
            canz:-1,
            order:[],
        }
    },
    methods:{
        changeNowAt:function(){
            this.$emit('change-nowat','cart');
        },
        move:function(){
            var e =window.event;
            var offset=0;
            console.log("move");
            this.x=e.clientX;
            this.y=e.clientY;
            //data_con = document.getElementById("data_con");
            if(self.isdown==true){
                offset=e.clientX-self.x;
                //console.log(offset);
                //data_con.style.left=offset;
            }
        },
    },
    mounted:function(){
        this.$axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/user/history',
            //url: '/api/post/login',
            data: {
                id: 0
            },
        })//等到get後才執行接下來的code
        .then((res)=>{
            res.data.data.forEach(Element => {
                var target=Element.productName.map(items=>{
                    return items.name
                })
                this.$emit("get-food",target)
            });
            this.order=res.data.data.map((Element,Index)=>{
                return Element.productName.map((items,id)=>{ 
                    return {
                        pic:this.find[Index][id].image,
                        name:items.name,
                        price:this.find[Index][id].price,
                        amout: items.amount
                    }
                })
            });
        })
    }
    
}
</script>

<style scoped>
.data-container{
    width:90%;
    display: flex;
    align-items: center;
    justify-content:center;
    -webkit-filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
}

.pastorderlist{
    /*border: solid 1px red;*/
    display: flex;
    justify-content:space-around;
    flex-direction:column;
    -webkit-flex-direction:column;
    align-items: center;
}
.order{
    /*border: solid 1px blue;*/
    display: flex;
    flex-direction:column;
    -webkit-flex-direction:column; 
    align-items: center;  
    width: 80%;
    border: solid;
    border-radius:20px; 
    background-color:rgb(242,239,237);
    margin-bottom: 1vh;  
}
.data_con{
    /*border: solid 1px red;*/
    margin-top:1vh;
    margin-bottom: 1vh; 
    height: 13vh;
    display: flex;
    background: white;
    flex-grow: 1;
    width:80%;
    align-items: center;
    justify-content: space-evenly;
    border: solid 0px;
    border-radius:10px;
    padding: 5% 5%;
}
.data{
    /*border: solid 1px red;*/
    display: flex;
    flex-grow:8;
    flex-direction:column;
    -webkit-flex-direction:column; 
    margin-left:5vw;
}
.add_cart_btn{
    margin-top: 1vh;
    margin-bottom: 1vh;
    background:rgb(48,48,48);
    color: white;
    border: 0px;
    width: 30%;
    border-radius:10px; 
    font-size: 2vh;
}
.can{
    z-index: -1;
}
span{
    font-size: 2.5vh;
    color: rgb(45,45,45);
    font-family: 'Microsoft JhengHei';
}
</style>