<template>
    <div class="PayCenter">
        <modal width="47vh" height="65vh" @change-now-at="close">
            <div class="content-container">
                <member v-if="progress.width==='25%'" :onPay="true" @change-page="changeProgress"/>
                <Map v-else-if="progress.width==='50%'" @change-page="changeProgress"/>
                <pay v-else-if="progress.width==='75%'"/>
                <comment v-else-if="progress.width==='100%'" :find="find" @get-food="getFood"/>
            </div>
            <div class="progress">
                <div class="bar" :style="progress"></div>
            </div>
        </modal>
        
    </div>
</template>

<script>
import Modal from "./Modal";
import Member from "../Member";
import Pay from "./pay";
import Comment from "./Comment";
import Map from "./Map.vue";
export default {
  props: ['find'],
  name: 'PayCenter',
  components:{Modal,Member,Map,Pay,Comment},
  data () {
  return{
      progress: {width:"100%"},
  }
},
 methods:{
     changeProgress:function(percent){
        if(percent>=0 && percent<100)
            this.progress.width=percent+"%";
        else
            this.progress.width="100%";
     },
     close:function(){
         this.$emit("close");
     },
     getFood(data){
         console.log("center type get ",Array.isArray(data))
         this.$emit("get-food",data)
     }
 },
 watch:{
 },
 mounted(){
 
 }
}
</script>

<style scoped>
    .content-container{
        max-width: 100%;
        width: 100%;
        height: 60vh;
        overflow-y: auto;
        display: flex;
    }
    .progress{
        margin: 2vh 15%;
        width: 70%;
        height: 3px;
        background-color: rgba(0,0,0,0.2);
    }
    .bar{
        height: 100%;
        background-color: gray;
    }
</style>