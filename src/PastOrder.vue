<template>
    <div class="pastOrder">
        <div class="head">
            <span style="color:white">Past Order</span>
        </div>
        <div class="order_container">
          <PastOrderList  @change-nowat="changeNowAt" />  
        </div>
    </div>
</template>

<script>
import PastOrderList from './components/PastOrderList.vue';
export default {
    name:'PastOrder',
    components:{PastOrderList},
    data(){
        return{
           
        }
    },
    methods:{
        changeNowAt:function(){
            this.$emit('change-nowat','cart');
        }
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
        height: 8vh;
        font-size: 3.5vh;
        justify-content:center;
    }
    .order_container{
        /*border:0.5px solid red;*/
        display: flex;
        flex-direction:column;
        -webkit-flex-direction:column;  
        flex-grow: 1;
    }
</style>