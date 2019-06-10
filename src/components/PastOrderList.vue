<template>
    <div class="pastorderlist">
        <div class="order" v-bind:key="index" v-for="(data,index) in order">
            <div class="data_con" v-on:mousedown="go()" v-on:mousemove="coord()">
                <img :src="data.pic" alt="No_pic" style="height:15vh;width:15vw;display:flex;flex-grow:2.5;">
                <div class="data">
                <span>{{data.name}}</span>
                <span>$ {{data.price}}</span>
                <span>x:{{x}} y:{{y}}</span>
                </div>
            </div>
            <button class="add_cart_btn" v-on:click="changeNowAt()">Add to Cart</button>
        </div>
    </div>
</template>

<script>
export default {
    name:"PastOrderList",
    data(){
        return{
            x:0,y:0,
            order:[{pic:[require("../assets/beef.png")],name:"測試一號",price:[100]},{pic:require("../assets/8.png"),name:"測試二號",price:150},],
        }
    },
    methods:{
        changeNowAt:function(){
            this.$emit('change-nowat','cart');
        },
        coord:function(){
            var e =window.event;
            var offset=e.clientX-this.x;
            console.log(offset);
            this.y=e.clientY;
            if(offset<0){
                //往左移
            }
        },
        go:function(){
            var e =window.event;
            this.coord(e)
        }
  },
    
}
</script>

<style scoped>
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
    border-radius:5%; 
    background-color:grey; 
}
.data_con{
    /*border: solid 1px red;*/
    margin-top:2vh;
    margin-bottom: 1vh; 
    display: flex;
    background: white;
    flex-grow: 1;
    width:90%;
    align-items: center;
    justify-content: space-evenly;
    border: solid 0px;
    border-radius:5%;
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
    margin-bottom: 1vh;
    background:rgb(48,48,48);
    color: white;
    border: 0px;
    border-radius:20%; 
}
</style>