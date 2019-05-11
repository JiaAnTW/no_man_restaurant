<template>
    <div class="Food">
      <div class="slide">
        <button class="btn" @click="open"></button>
      </div>
      <div class="choice" :style="fly">
        <button class="btn2" @click="close"></button>
          <div class="list_frame">
            <div class="list" v-for="(text,index) in choices" :key="index" :style="listColor[index]">
              <button class="listbtn" @click="scrollTo(index)" :style="fly2"></button>
              {{text.menu}}
            </div>
          </div>
      </div>
      <div class="block-container" id="block" ref="block" @scroll="handleScroll">
        <div class="block" v-for="(pictures,index) in lists" :key="pictures.id" :ref="pictures.type+'-'+pictures.id">
          <button class="btn3" @click="viewDish(pictures.id)"></button>
          <div class="img-container" :style="backgroundImage[index]"></div>
          <h2>{{pictures.name}} |  ${{pictures.price}}</h2>
        </div>
      </div>
      <div class="contact">
        <div class="line"></div>
        <div class="icons">
          <a :href="fb"><img class="fbicon" src="./assets/icon/fb icon.png"></a>
          <a :href="ig"><img class="igicon" src="./assets/icon/ig icon.png"></a>
        </div>
        <div class="line"></div>
      </div>
    </div>
</template>

<script>
import { resolve } from 'url';
export default {
  name: 'Food',
  props:["data"],
  data(){
    return{
      choices:[
        {menu:'burgers'},
        {menu:'drinks'},
        {menu:'french fries'},
        {menu:'salad'},
      ],
      fly:{
        left:'-70vw',
      },
      fly2:{
        left:'-100vw',
      },
      fb:'https://www.facebook.com/JiaAnChang.Andy',
      ig:'https://www.instagram.com/_yang1029/',
      out:false,
      lists:[],
      backgroundImage:[],
      postionRecord:[],
      listColor:[],
      nowAt:0
    }
  },
  computed:{

  },
  methods:{
    open:function(){
      if(this.out===false){
        this.fly={left:'-10.8vw'}
        this.fly2={left:'0vw'}
        this.out=true;
      }
    },
    close:function(){
      if(this.out===true){
        this.fly={left:'-70vw'}
        //this.fly={left:'-10.8vw'}
        this.fly2={left:'-100vw'}
        this.out=false;
      }
    },
    viewDish:function(id){
      this.$emit('view-dish',id);
    },
    scrollTo: function(index){
       var container = this.$refs['block']
       this.scroll(this.postionRecord[index]+150)
    },
    scroll:function(position){
      var container = this.$refs['block']
      container.scrollTop=position
      //if(container.scrollTop<position){
          //container.scrollTop=container.scrollTop+10;
          //setTimeout(this.scroll(position),1000)
      //}
      //else if(container.scrollTop>position){
          //container.scrollTop=container.scrollTop-10;
          //setTimeout(this.scroll(position),1000)
      //}
    },
    handleScroll:function () {
      var index=0;
      var container = this.$refs['block']
      //const setIndex=new Promise((resolve)=>{

        while(container.scrollTop>this.postionRecord[ index ]&& index <this.postionRecord.length)
          index++;
        this.nowAt=index;
        //resolve();
      //})
     
        for(let i=0;i<this.postionRecord.length;i++){
            this.listColor[i]={backgroundColor:'rgba(0,0,0,0)'} ;
        }
            
        //}
      console.log(this.nowAt)
      this.listColor[index-1]={backgroundColor:'rgba(0,0,0,0.3)'} 
      //setIndex.then(()=>{this.listColor[index-1]={backgroundColor:'rgba(0,0,0,0.3)'}})
      
    },
  },
  watch:{
    data: function(){
      this.lists= this.data;
    }
  },
  created:function(){
      this.lists= this.data;
      this.data.forEach(Element=>{
        this.backgroundImage.push({backgroundImage:'url('+Element.image+')'})
      })
  },
  mounted:function(){
    var watchType='';
    for(let i=0;i<this.lists.length;++i){
      if(this.lists[i].type!=watchType){
        watchType=this.lists[i].type;
        this.listColor.push({backgroundColor:'rgba(0,0,0,0)'})
        this.postionRecord.push(this.$refs[watchType+'-'+this.lists[i].id][0].offsetTop-this.$refs['block'].offsetTop-150)
        if(this.lists.length>1 && this.postionRecord[this.postionRecord.length-1]==this.postionRecord[this.postionRecord.length-2])
          this.postionRecord[this.postionRecord.length-1]+=50;
      }
    }
    this.listColor[0]={backgroundColor:'rgba(0,0,0,0.3)'}
  },

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
  .slide{
    border:1px solid gray;
    border-radius:12px;
    width:18vw;
    height:40vw;
    position:fixed;
    margin-top:28vh;
    left:-15vw;
    background-color:rgb(94, 90, 90);
    z-index:1;
  }
  .choice{
    border:1px solid gray;
    border-radius:4%;
    width:60vw;
    height:73.15vh;
    position:fixed;
    margin-top:3vh;
    background-color:rgb(94, 90, 90);
    z-index:1;
    display: flex;
    flex-direction: column;
  }
  .block{
    position: relative;
    border:0px solid gray;
    border-radius:10%;
    width:40vw;
    height:40vw;
    margin: 1rem 0.7rem;
    background-color:rgb(94, 90, 90);
    z-index:0;
  }
  .block-container{
    flex-flow: row wrap;
    overflow-y: auto;
    display:flex;
    justify-content:flex-start;
    -webkit-justify-content: flex-start;
    align-content:flex-start;
    -webkit-align-content: flex-start;
    margin-top:1.5vh;
    margin-left:1.5vw;
    width: 88vw;
    height: 75vh;
  }

  .img-container{
    width: 100%;
    height: 85%;
    background-position: 50% 50%;
    background-size: 65% auto;
    background-repeat: no-repeat;
  }


  .block h2{
    font-family: 'Microsoft JhengHei';
    width: 100%;
    font-size: 1.7vh;
    text-align: center;
    color: white;
  }

  .list_frame{
    height: 28vh;
    margin: 10vh 0vw 10vh 0vw;
  }
  .list{
    font-family:'Segoe UI';
    font-size: 15px;
    color: rgb(231, 224, 224);
    text-align:center;
    border-bottom:1px solid lightgray;
    width: 100%;
    height:7vh;
    padding:2vh 2vh 2vh 7vh;
    z-index:2;
  }

  .btn{
    position:relative;
    height:26vh;
    float:right;
    border-radius:8%;
    z-index:2;
  }
  .btn2{
    position:absolute;
    height:73.15vh;
    width:60vw;
    float:right;
    border-radius:8%;
    opacity:0;
  }
  .btn3{
    position:absolute;
    top:0;
    left: 0;
    border-radius:10%;
    height:100%;
    width:100%;
    opacity:0;
    z-index: 4;
  }
  .listbtn{
    position:fixed;
    width:49vw;
    height:5vh;
    margin-top:0;
    opacity:0;
  }
  .contact{
    position:fixed;
    height:7.2vh;
    width:100vw;
    background-color:rgb(48, 48, 48);
    display:flex;
    flex-flow:row;
    margin-top:76.15vh;
    color:white;
    padding:3vh 0vw 2vh 0vw;
    justify-content:center;
  }
  .icons{
    width: 16vw;
    height:7vh;
  }
  .fbicon{
    height:2vh;
    position: fixed;
    margin:0vh 2vw 0vh 2.5vw;
    left:43vw;
    z-index:2;
  }
  .igicon{
    width:3.5vw;
    height:2vh;
    position: fixed;
    margin:0vh 2vw 0vh 3vw;
    right: 43vw;
    z-index:2;
  }
  .link{
    width:3vw;
    height:2vh;
    position: fixed;
    margin:0vh 2vw 0vh 2vw;
    z-index:3;
    opacity:0;
  }
  .line{
    margin:1vh 0vw 1vh 0vw;
    border-top:1px solid white;
    position: relative;
    width:10vw;
    height:1vh;
  }
</style>
