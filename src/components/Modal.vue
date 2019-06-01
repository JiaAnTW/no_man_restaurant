<template>
    <div class="modal-DIY">
        <div class="content" :style="style">
            <slot></slot>
        </div>
        <button class="background" @click="close"></button>
    </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ["width","height"],
  data () {
  return{
      style: {width:"60vw",height:"60vw"}
  }
},
 methods:{
    close:function(){
        
    }
 },
 watch:{
    width:function(){
        this.style.width=this.width;
    },
    height: function(){
        this.style.height=this.height;
    }
 },
 mounted(){
    if(this.width)
        this.style.width=this.width;
    if(this.height)
        this.style.height=this.height;
 }
}
</script>

<style scoped>
    .modal-DIY{
        position: absolute;
        top:0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
    }
    .background{
        position: absolute;
        top:0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0,0, 0.7);
        border: none;
        outline: none;
        z-index: 3;
        -webkit-filter:blur(10px);
        filter:blur(10px);
        padding: 0 0;
    }
    .content{
        position: relative;
        background-color: rgb(241,241,241);
        z-index: 4;
        overflow-y: auto;
        border-radius: 15px;
        margin-top: 11.5vh;
    }
</style>