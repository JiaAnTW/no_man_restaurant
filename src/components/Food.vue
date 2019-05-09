<template>
    <div class="Food">
      
      <div class="slide">
        <button class="btn" @click="open"></button>
      </div>
      <div class="choice" :style="fly">
        <button class="btn2" @click="close"></button>
          <div class="list_frame">
          <div class="list" v-for="text in choices" :key="text.menu">
            {{text.menu}}
          </div>
          </div>
      </div>
      <div class="block-container">
        <div class="block" v-for="pictures in lists" :key="pictures.id">
          <!--img :src="pictures.image" alt="food"/-->
          {{pictures.id}}
        </div>
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
      this.lists= this.data;
    }
  },
  mounted:function(){
      this.lists= this.data;
  }
}

</script>
<style scoped>
  .Food{
    display:flex;
    flex-grow:1;
    -webkit-flex-grow:1;
    justify-content:center;
    -webkit-justify-content: center;
  }
  .block{
    border:1px solid gray;
    border-radius:10%;
    width:40vw;
    height:40vw;
    margin: 1rem 0.5rem;

    background-color:rgb(94, 90, 90);
  }
  .slide{
    border:1px solid gray;
    border-radius:12%;
    width:18vw;
    height:26vh;
    position:fixed;
    margin-top:29vh;
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
    margin-top:0vh;
    background-color:rgb(94, 90, 90);
    visibility:visible;
    z-index:1;
    display: flex;
    flex-direction: column;
    justify-content:center;
    -webkit-justify-content: center;
  }

  .list_frame{
    height: 70%;
  }
  .block-container{
    flex-flow: row wrap;
    overflow-y: auto;
    justify-content:flex-start;
    -webkit-justify-content: flex-start;
    align-content:flex-start;
    -webkit-align-content: flex-start;
    width:  90vw;
    height: 85vh;
    border: 1px solid red;
  }
  .list{
    font-family:'Segoe UI';
    font-size: 15px;
    color: lightgray;
    text-align:center;
    border-bottom:1px solid lightgray;
    width: 100%;
    height:7vh;
  }

  .btn{
    position:relative;
    height:26vh;
    float:right;
    border-radius:8%;
    z-index:2;
  }
  .btn2{
    position: absolute;;
    height:85vh;
    width:60vw;
    float:right;
    border-radius:8%;
    opacity:0;
    z-index:3;
  }
</style>
