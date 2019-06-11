<template>
    <div class="PayCenter">
        <modal width="47vh" height="65vh" @change-now-at="close">
            <div class="content-container">
                <member v-if="progress.width==='25%'" :onPay="true" @change-page="changeProgress"/>
                <Map v-else-if="progress.width==='50%'" @change-page="changeProgress"/>
                <pay v-else-if="progress.width==='75%'"/>
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
import Map from "./Map.vue";
export default {
  name: 'PayCenter',
  components:{Modal,Member,Map,Pay},
  data () {
  return{
      progress: {width:"25%"},
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