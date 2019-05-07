<template>
    <div class="Food">
      <div class="slide">
        <button class="btn" @click="choose"></button>
      </div>
      <div class="choice" :style="fly"></div>
      <div class="block" v-for="pictures in lists" :key="pictures.food">
        {{pictures.food}}
      </div>
    </div>
</template>

<script>
export default {
  name: 'Food',
  data(){
    return{
      lists:[
        {food:''},
        {food:''},
        {food:''},
        {food:''},
        {food:''},
        {food:''},
      ],
      fly:{
        left:'-70vw',
      },
      out:false,
    }
  },
  methods:{
    choose:function(){
      console.log("123");
      if(this.out===false){
        this.fly={left:'-11.5vw'}
        this.out=true;
      }
      
    }
  }, 
    
}

</script>
<style scoped>
  .Food{
    height:80vh;
    position:fixed;
    display:flex;
    flex-flow:row;
    flex-wrap:wrap;
    margin-top:4vh;
    margin-left:7vw;
    flex-grow:1;
    -webkit-flex-grow:1;
  }
  .block{
    border:1px solid gray;
    border-radius:10%;
    width:40vw;
    height:22vh;
    margin-left:0.5rem;
    margin-right:0.5rem;
  }
  .slide{
    border:1px solid gray;
    border-radius:8%;
    width:18vw;
    height:26vh;
    position:fixed;
    margin-top:25vh;
    left:-14vw;
    z-index:2;
  }
  .choice{
    border:1px solid gray;
    border-radius:8%;
    width:60vw;
    height:85vh;
    position:fixed;
    margin-top:-4vh;
    background-color:transparent;
    visibility:visible;
    z-index:1;
  }
  .btn{
    position:relative;
    height:26vh;
    float:right;
    border-radius:8%;
    /*visibility:;*/
    z-index:2;
  }
</style>
