<template>
    <div class="pastOrder">
        <div class="header">
            <span style="color:white">Past Order</span>
        </div>
        <div class="order_container">
            <div class="order_box"  v-bind:key="index" v-for="(data,index) in order">
            <div class="order_data">
                <img :src="data.pic" alt="No_pic">
                <span>{{data.name}}</span><br>
                <span>$ {{data.price}}</span>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            order:[{pic:require("./assets/beef.png"),name:"測試一號",price:100},{pic:"./assets/8.png",name:"測試二號",price:150},],
        }
    }
}
</script>


<style scoped>
    .pastOrder{
        display: flex;
        flex-grow: 1;
        border:0.5px solid red;
        flex-direction:column;
        -webkit-flex-direction:column;  
    }
    .header{
        border:0.5px solid red;
        display: flex;
        height: 8vh;
    }
    .order_container{
        border:0.5px solid red;
        display: flex;
        flex-direction:column;
        -webkit-flex-direction:column;  
        flex-grow: 1;
    }
    .order_box{
        display: flex;
        flex-direction:column;
        -webkit-flex-direction:column;  
        flex-grow: 1;
        background: rgb(48,48,48);
        border-radius:5%;
    }
    .order_data{
        border:0.5px solid red;
        display: flex;
        background: white;
    }
</style>