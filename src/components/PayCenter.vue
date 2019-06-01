<template>
    <div class="PayCenter">
        <modal width="47vh" height="65vh">
            <div class="content-container">
                <member :onPay="true"/>
            </div>
            <div class="progress">
                <div class="bar" :style="progress"></div>
            </div>
        </modal>
        
    </div>
</template>

<script>
import Modal from "./Modal";
import Member from "../Member"
export default {
  name: 'PayCenter',
  components:{Modal,Member},
  data () {
  return{
      progress: {width:"10%"},
  }
},
 methods:{
     changeProgress:function(percent){
        if(percent>=0 && percent<100)
            this.progress.width=percent+"%";
        else
            this.progress.width="100%";
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