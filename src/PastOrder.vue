<template>
    <div class="pastOrder">
        <div class="head">
            <span style="color:white">Past Order</span>
        </div>
        <div class="order_container">
            <past-order-list v-for="(data,index) in order" :key="index" :data="data"  @list-method="listMethod" :isPay="false"/>
        </div>
    </div>
</template>

<script>
import PastOrderList from './components/PastOrderList.vue';
export default {
    name:'PastOrder',
    props: ["find"],
    components:{PastOrderList},
    data(){
        return{
            order:[],
        }
    },
    methods:{
        listMethod(way,...args){
            this.$emit(way,...args);
        },
        getFood:function(target){
            this.$emit("get-food",target)
        }
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
            console.log("Center "+this.find)
            this.order=res.data.data.map((Element,Index)=>{
                return Element.productName.map((items,id)=>{ 
                    return {
                        src:this.find[Index][id].image,
                        rating:0,
                        name:items.name,
                        price:this.find[Index][id].price,
                        num: items.amount,
                        comment: '',
                        id:this.find[Index][id].id
                    }
                })
            });
        })
    }
}
</script>


<style scoped>
    .pastOrder{
        /*border:0.5px solid red;*/
        display: flex;
        flex-grow: 1;
        flex-direction:column;
        -webkit-flex-direction:column;  
    }
    .head{
        /*border:0.5px solid red;*/
        display: flex;
        height: 15%;
        font-size: 3vh;
        font-weight: 600;
        justify-content:center;
        align-items: center;
    }
    .order_container{
        /*border:0.5px solid red;*/
        display: flex;
        flex-grow: 1;
        flex-direction:column;
        -webkit-flex-direction:column; 
        overflow-y: auto;
        max-height: 100%;
    }
</style>