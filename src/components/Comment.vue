<template>
    <div class="Comment">
        <div class="banner">
            <img class="icon" src="../assets/icon/icon.png" />
            <h1>Past order evalution</h1>
        </div>
        <div class="past-container">
            <past-order-list :data="order" :isPay="true" :sendData="send"/>
        </div>
        <div class="btn-container">
                <button class="add_cart_btn" @click="$emit('change-page',75)">Skip</button>
                <button class="add_cart_btn" @click="sendData">Send</button>
        </div>
    </div>
</template>

<script>
import PastOrderList from "./PastOrderList";
export default {
    props:['find'],
    name: 'Comment',
    components: {PastOrderList},
    data () {
        return{
            order:[],
            send: false
        }   
    },
    methods:{
        sendData(){
            this.send=!this.send
            this.$emit('change-page',75)
        }
    },
    mounted:function(){
        this.$axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            //url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/user/history',
            url: '/api/post/login',
            data: {
                id: 0
            },
        })//等到get後才執行接下來的code
        .then((res)=>{
            var size=0;
            res.data.data.forEach(Element=>{
              size++;
            })
            const test=res.data.data[size-1]
            var nameArray=[]
            test.productName.forEach(items=>{
                nameArray.push(items.name)
            });
            console.log(Array.isArray(nameArray))
            const getData=new Promise(resolve=>{
                this.$emit("get-food",nameArray)
                resolve()
                //console.log(nameArray)
            })
            getData.then(resolve=>{
                this.order=test.productName.map((items,id)=>{ 
                    return {
                        src:this.find[0][id].image,
                        name:this.find[0][id].name,
                        price:this.find[0][id].price,
                        amout: items.amount
                    }
                })
            })
            console.log("find is "+this.find)

        })
    }
}
</script>

<style scoped>
    .Comment{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .banner{
        height: 24%;
        width: 100%;
        max-width: 47vh;
        display: flex;
        align-items: flex-end;
        padding: 4% 7%;
    }
    .banner img{
        height: 100%;
        
    }
    .banner h1{
        font-size: 3vh;
        font-weight: 700;
        margin-left: 4%;
    }
    .past-container{
        flex-grow: 1;
        width: 100%;
        overflow-y: scroll;
    }
    .btn-container{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 12vh;
    }
    .add_cart_btn{
        margin-top: 3%;
        margin-bottom: 3%;
        height: 4vh;
        background-image: linear-gradient(270deg, rgb(155,51,84) 0%, rgb(58,44,105) 80%);
        color: white;
        border: 0px;
        width: 25%;
        border-radius:15px; 
        font-size: 2vh;
        margin-right: 4%;
    }
</style>