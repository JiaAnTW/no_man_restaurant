<template>
    <div class="pastorderlist">
        <div class="order" :style="width">
        <div class="data-container" v-for="(elemnt,index) in order" :key="index">
            <v-touch v-on:swipeleft="move()"  class="data_con">
                <div style="height: 11vh; width:100%;display:flex;padding: 5% 5%;position:relative;">
                    <button class="openComment" @click="isComment=!isComment"></button>
                    <img :src="elemnt.src" alt="No_pic" style="width:20%;display:flex;">
                    <div class="data">
                        <span>{{elemnt.name}}</span>
                        <span>${{elemnt.price}} (x{{elemnt.num}})</span>
                    </div>
                    <div class="star-container">
                        <star-rating @rating-selected="elemnt.rating = $event" :rating="elemnt.rating" v-bind:star-size="15"></star-rating>
                    </div>
                </div>
                <!--img class="can" src="../assets/icon/can.png" style="height:7vh;width:6.5vw;display:flex;flex-grow:2;"-->
                <div class="input-container" v-if="isComment||isPay">
                    <input type="text" v-model="elemnt.comment"/>
                </div>
            </v-touch>

            </div>
            <button class="add_cart_btn" v-on:click="addToCart" v-if="!isComment && !isPay">Add to Cart</button>
            <div class="btn-container" v-if="isComment && !isPay">
                <button class="add_cart_btn" v-on:click="isComment=!isComment" >Close</button>
                <button class="add_cart_btn" v-on:click="handleComment" >Send</button>
            </div>
        </div>
    </div>
</template>

<script>
import VueTouch from 'vue-touch';
import axios from "axios";
import Vue from 'vue';
import StarRating from 'vue-star-rating'
Vue.use(VueTouch, {name: 'v-touch'})
Vue.prototype.$axios = axios;
export default {
    components:{StarRating},
    name:"PastOrderList",
    props: ["data","isPay","sendData"],
    data(){
        return{
            x:0,y:0,
            canz:-1,
            order:[],
            width:(this.isPay)?{width:"90%"}:{width:"80%"},
            isComment:false
        }
    },
    methods:{
        open:function(index){

        },
        addToCart:function(){
            this.order.forEach(Element=>{
                this.$emit('list-method','add-cart',Element);
            })
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
        handleComment:function(index){
            this.order.forEach(Element=>{
                this.$axios({
                    method: "post",
                    //url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/comment',
                    url: '/api/post/comment',
                    data:{
                        id:Element.id,
                        score: Element.rating,
                        content: Element.comment
                    }
                }).then(response=>{
                })
            })
        }
    },
    watch:{
        data:function(){
            this.order=this.data;
        },
        sendData:function(){
            this.handleComment();
        }
    },
    mounted:function(){
        this.order=this.data;
    }
    
}
</script>

<style scoped>
.data-container{
    width:90%;
    display: flex;
    flex-wrap: wrap;
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
    border: none;
    border-radius:20px; 
    background-color:rgb(242,239,237);
    margin-bottom: 1vh;  
}
.data_con{
    /*border: solid 1px red;*/
    margin-top:1vh;
    margin-bottom: 1vh; 
    display: flex;
    flex-wrap: wrap;
    background: white;
    flex-grow: 1;
    width:80%;
    align-items: center;
    justify-content: space-evenly;
    border: solid 0px;
    border-radius:10px;
}
.data{
    /*border: solid 1px red;*/
    display: flex;
    width: 40%;
    flex-direction:column;
    -webkit-flex-direction:column; 
    margin-left:5vw;
}
.add_cart_btn{
    margin-top: 3%;
    margin-bottom: 3%;
    height: 4vh;
    background-image: linear-gradient(270deg, rgb(155,51,84) 0%, rgb(58,44,105) 80%);
    color: white;
    border: 0px;
    width: 30%;
    border-radius:15px; 
    font-size: 2vh;
    margin-right: 4%;
}
.can{
    z-index: -1;
}
span{
    font-size: 2.5vh;
    color: rgb(45,45,45);
    font-family: 'Microsoft JhengHei';
}

.star-container{
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content:center;
}

.input-container{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10vh;
}

input{
    width: 90%;
    height: 70%;
    background-color: rgb(219,218,218);
    border: none;
    border-radius: 10px;
}

.openComment{
    position: absolute;
    top:0;
    left: 0;
    width: 60%;
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
}

.btn-container{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.img_container{
    width: 20%;
    border: 1px solid red;
}
</style>