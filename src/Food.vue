<template>
    <div class="Food">
      <div class="slide">
        <button class="btn" @click="open"></button>
      </div>
      <div class="choice" :style="fly">
        <button class="btn2" @click="close"></button>
        <div class="list_frame">
          <span class="list" v-for="text in choices" :key="text.menu">
            {{text.menu}}
          </span>
        </div>
      </div>
      <div class="block" v-for="pictures in lists" :key="pictures.food">
        {{pictures.food}}
      </div>
    </div>
</template>

<script>
export default {
  name: 'Food',
  props:["data"],
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
      choices:[
        {menu:'burgers'},
        {menu:'drinks'},
        {menu:'salad'},
        {menu:'french fries'},
      ],
      fly:{
        left:'-70vw',
      },
      out:false,
    }
  },
  methods:{
    open:function(){
      if(this.out===false){
        this.fly={left:'-10.8vw'}
        this.out=true;
      }
    },
    close:function(){
      if(this.out===true){
        this.fly={left:'-70vw'}
        this.out=false;
      }
    }
  },
  watch:{
    data: function(){
      this.name= this.data.name;
      this.image=this.data.image;
    }
  },
  mounted:function(){
      this.name= this.data.name;
      this.image=this.data.image;
  }
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
    margin-left:8vw;
    flex-grow:1;
    -webkit-flex-grow:1;
    overflow-y: auto;
  }
  .block{
    border:1px solid gray;
    border-radius:10%;
    width:40vw;
    height:40vw;
    margin-left:0.5rem;
    margin-right:0.5rem;
    background-color:rgb(94, 90, 90);
  }
  .slide{
    border:1px solid gray;
    border-radius:12%;
    width:18vw;
    height:26vh;
    position:fixed;
    margin-top:25vh;
    left:-14vw;
    background-color:rgb(94, 90, 90);
    z-index:1;
  }
  .choice{
    border:1px solid gray;
    border-radius:8%;
    width:60vw;
    height:85vh;
    position:fixed;
    margin-top:-4vh;
    background-color:rgb(94, 90, 90);
    visibility:visible;
    z-index:1;
  }
  .list_frame{
    margin-top:14vh;
    height: 60vh;
  }
  .list{
    font-family:'Segoe UI';
    font-size: 15px;
    color: lightgray;
    position: absolute;
    text-align:end;
    right:0;
    border-bottom:1px solid lightgray;
    height:7vh;
    width:100vw;
  }
  .btn{
    position:relative;
    height:26vh;
    float:right;
    border-radius:8%;
    z-index:2;
  }
  .btn2{
    position:relative;
    height:85vh;
    width:60vw;
    float:right;
    border-radius:8%;
    opacity:0;
    z-index:3;
  }
</style>
