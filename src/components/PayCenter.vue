<template>
    <div class="PayCenter">
        <modal width="47vh" height="65vh" @change-now-at="close">
            <div class="content-container">
                <member v-if="progress.width==='0%'" :onPay="true" @change-page="changeProgress"/>
                <Map v-else-if="progress.width==='25%'" @change-page="changeProgress"/>
                <pay v-else-if="progress.width==='75%'" :index="index" :bill="bill" @finish="finish"  @get-food="getFood" :find="find"/>
                <comment v-else-if="progress.width==='50%'" :find="find" @get-food="getFood" @change-page="changeProgress"/>
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
  props: ['find','token','bill','index'],
  name: 'PayCenter',
  components:{Modal,Member,Map,Pay,Comment},
  data () {
  return{
      progress: {width:"0%"},
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
     },
     showLoading(){
         this.$emit('loading')
     },
     finish(){
         this.close();
         this.$emit('finish',"bill");
     }
 },
 watch:{

 },
 mounted(){
     if(this.token!='')
        this.progress.width="25%"
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