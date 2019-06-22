<template>
    <div class="Food">
      <div class="slide">
        <button class="btn" @click="open"></button>
      </div>
      <div class="choice" :style="fly">
          <div class="list_frame">
            <div class="list" v-for="(text,index) in choices" :key="index" :style="listColor[index]">
              <button class="listbtn" @click="scroll(text.menu,index)" :style="fly2"></button>
              {{text.menu}}
            </div>
          </div>
          <div class="cart_frame">
            <cart :token="token" @foodmethod="foodmethod" :data="cartData" :place="place" />
          </div>
          <button class="btn2" @click="close"></button>
      </div>
      <div class="block-container" id="block" ref="block" @scroll="handleScroll">
        <div class="block" v-for="(pictures,index) in lists" :key="pictures.id" :ref="pictures.type+'-'+pictures.id" :id="'dish-'+pictures.id">
          <button class="btn3" @click="viewDish(pictures.id)"></button>
          <div class="img-container" :style="backgroundImage[index]"></div>
          <h2>{{pictures.name}} |  $ {{pictures.price}}</h2>
        </div>
      </div>
      <div class="contact">
        <div class="icons">

        </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';
import Cart from './Cart.vue';
var options = {
     container: "#block",
     easing: "ease",
     offset: -10,
     force: true,
     cancelable: true,
     onStart: false,
     onDone: false,
     onCancel: false,
     x: false,
     y: true
 }
import { resolve } from 'url';
export default {
  name: 'Food',
  props:["data","seafood","cartData","token","addOrder"],
  components:{Cart},
  data(){
    return{
      cart: [],
      choices:[
        {menu:'burger'},
        {menu:'drinks'},
        {menu:'fried'},
        {menu:'salad'},
      ],
      fly:{
        left:'-100vw',
      },
      fly2:{
        left:'-150vw',
      },
      fb:'https://www.facebook.com/JiaAnChang.Andy',
      ig:'https://www.instagram.com/_yang1029/',
      out:false,
      lists:[],
      backgroundImage:[],
      postionRecord:[],
      //listColor:[],
      nowAt:1,
      isScroll: false
    }
  },
  methods:{
    open:function(){
      if(this.out===false){
        this.fly={left:'0vw'}
        this.fly2={left:'0vw'}
        this.out=true;
      }
    },
    close:function(){
      if(this.out===true){
        this.fly={left:'-100vw'}
        //this.fly={left:'-10.8vw'}
        this.fly2={left:'-150vw'}
        this.out=false;
      }
    },
    viewDish:function(id){
      this.$emit('view-dish',id);
    },
    place:function(place){
      var self=this;
      this.$emit('place',self.place);
      console.log("food"+self.place);
    },
    scroll:function(type,index){
      const changeView=new Promise((resolve=>{
        this.isScroll=true;
        var target=1;
        for(target=1;target<=this.lists.length;++target){
          if(this.lists[target-1].type===type)
            break;
        }
        VueScrollTo.scrollTo('#dish-'+target,500,options)
        this.nowAt=index+1;
        resolve()
        this.close();
      }))
      changeView.then(()=>{setTimeout(()=>{this.isScroll=false},500)})
    },
    handleScroll:function () {
      if(this.isScroll==false){
      var index=0;
      var container = this.$refs['block']
        while(container.scrollTop>this.postionRecord[ index ]&& index <this.postionRecord.length)
          index++;
        this.nowAt=index;
      }
    },
    foodmethod(way,...args){
      this.$emit(way,...args);
    }
  },
  computed:{
    listColor(){
      var output=[];
      for(let i=0;i<this.postionRecord.length;++i){
        if(i==this.nowAt-1)
          output.push({backgroundColor:'rgba(219,218,218,0.45)'})
        else
          output.push({backgroundColor:'rgba(0,0,0,0)'})
      }
      return output;
    }
  },
  watch:{
    data: function(){
      this.lists= this.data;
    },
    seafood: function(){
      var self=this;
      var output=[]; //使用local variable去避免在第二次的搜尋條件改變前影響搜尋母體
      for(let i=0;i<self.data.length;i++){
        var str=self.data[i].name;
        var s=str.search(self.seafood);
        if(s!=-1){
          output.push(self.data[i]);
        }
      }
      self.lists=output;
      },
  },
  created:function(){
      this.lists= this.data;
      this.data.forEach(Element=>{
        this.backgroundImage.push({backgroundImage:'url('+Element.image+')'})
      })
  },
  mounted:function(){
    var watchType='',self=this;
    for(let i=0;i<this.lists.length;++i){
      if(this.lists[i].type!=watchType){
        watchType=this.lists[i].type;
        this.postionRecord.push(this.$refs[watchType+'-'+this.lists[i].id][0].offsetTop-this.$refs['block'].offsetTop-150)
        if(this.lists.length>1 && this.postionRecord[this.postionRecord.length-1]==this.postionRecord[this.postionRecord.length-2])
          this.postionRecord[this.postionRecord.length-1]+=50;
      }
    }
    if(self.addOrder==true){//若將產品放入cart則跳出sidebar
      self.open();
    }
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
    background-color:rgb(80, 80, 80);
    z-index:1;
  }
  .choice{
    border:1px solid gray;
    border-top-right-radius: 13px;
    border-bottom-right-radius: 13px;
    width:78vw;
    height:73.15vh;
    position:fixed;
    margin-top:3vh;
    background-color:rgb(240,240,240);
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
    background-color:rgb(255, 255, 255,0.17);
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
  }
  .list{
    position: relative;
    font-family:'Segoe UI';
    font-size: 15px;
    color: rgb(48, 48, 48);
    text-align:center;
    border-bottom:1px solid white;
    width: 100%;
    height:7vh;
    padding:2vh 2vh 2vh 2vh;
    z-index:2;
  }
  .cart_frame{
    border:1px solid lightgray;
    border-top-right-radius: 5%;
    border-bottom-right-radius: 5%;
    height:40vh;
    margin: 8vh 0vw 0vh 0vw;
    display: flex;
    z-index: 2;
  }
  .mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3)
  }

  .btn{
    position:relative;
    height:26vh;
    float:right;
    border-radius:8%;
    z-index:2;
  }
  .btn2{
    position: absolute;
    height:73.15vh;
    width:100vw;
    float:right;
    background-color: rgba(0,0,0,0.5);
    border-radius:8%;
    opacity:0;
    z-index: 1;
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
