<template>
    <div class="dish">
      <img class="dish-img" :src="image" :style="imgStyle" alt="dish"/>
      <button class="open-btn" @click="changeOpen" :style="btnStyle"><div></div></button>
      <div class="background" :style="backgroundStyle"></div>
      <div class="detail" :style="detailStyle">
        <ul>
          {{bornStar}}<br/><br/>
          {{whatItMade}}<br/><br/>
          <li v-for="(item,index) in nut" :key="index">
            | {{item.name}} : {{item.value}}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Dish',
  props: ["image","color"],
  data () {
    return {
      score: 3,
      isOpen: true,
      backgroundStyle:{ marginTop:"0",backgroundImage:"linear-gradient(180deg, #2af598 0%, #009efd 40%)"},
      imgStyle:{filter:"blur(2px)",opacity:"0.3"},
      detailStyle:{ marginTop:"0"},
      btnStyle:{top:0},
      madeof:["小麥麵包","法式香草醬"],
      nut:[
          { name:"熱量", value:87},
          { name:"蛋白質", value:87},
          { name:"脂肪", value:87},
          { name:"碳水化合物", value:87},
          { name:"納", value:87}
      ]
    }
  },
  computed:{
    whatItMade(){
      var output='';
      for(let i=0;i<this.madeof.length;++i){
        if(i!==0)
          output+="、"
        output+=this.madeof[i];
      }
     return output;
    },
    bornStar(){
      var output='';
      let i=0
      for(;i<this.score;++i)
        output+="★";
      for(;i<5;++i)
        output+="☆";
      return output;
    }
  },
  methods:{
    changeOpen:function(){
      this.isOpen=!this.isOpen;
    }
  },
  watch:{
    isOpen:function(){
      if(this.isOpen===true){
        this.detailStyle={marginTop:"0"};
        this.backgroundStyle={marginTop:"0",backgroundImage:this.color};
        this.imgStyle={filter:"blur(3px)",opacity:"0.3"};
        this.btnStyle={top:"0",transform:"rotate(0deg)"}
        const changeStyle=()=>{
          this.btnStyle={ top:"0",transform:"rotate(0deg)"}
        }
        setTimeout(changeStyle,1500);
      }
      else{
        this.detailStyle={marginTop:"100%"};
        this.backgroundStyle={marginTop:"100%",backgroundImage:this.color};
        this.imgStyle={};
        this.btnStyle={top:"95%",transform:"rotate(180deg)"}
        const changeStyle=()=>{
          this.btnStyle={top:"95%", transform:"rotate(180deg)"}
        }
        setTimeout(changeStyle,1000);
      }
    }
  },
  created:function(){
    this.backgroundStyle={marginTop:"0%",backgroundImage:this.color};
  }
}
</script>
<style scoped>
    .dish{
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #505050;
    }
    .dish-img{
      height: 90%;
      
    }
    .open-btn{
        position: absolute;
        z-index: 4;

        outline: none;
        border: none;
        background-color: transparent;
        top: 0;
        -webkit-transition: top 0.98s ease-in-out;
        -moz-transition: top 0.98s ease-in-out;
        -o-transition: top 0.98s ease-in-out;
        transition: top 0.98s ease-in-out; 
    }

    .open-btn div{
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 7px 12.5px 0 12.5px;
  
        border-color: white rgba(243,243,243,0) rgba(243,243,243,0) rgba(243,243,243,0);
    }
    .background{
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.4;
      z-index: 2;
      -webkit-transition: margin-top 1s ease-in-out;
      -moz-transition: margin-top 1s ease-in-out;
      -o-transition: margin-top 1s ease-in-out;
      transition: margin-top 1s ease-in-out; 
    }
    .detail{
      position: absolute;
      color: white;
      width: 100%;
      height: 100%;
      z-index: 3;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: rgba(243,243,243,0);
      padding: 4rem 2rem;
      -webkit-transition: margin-top 1s ease-in-out;
      -moz-transition: margin-top 1s ease-in-out;
      -o-transition: margin-top 1s ease-in-out;
      transition: margin-top 1s ease-in-out; 
    }

    .detail ul{
      font-family: 'Microsoft JhengHei';
      list-style: none;
      font-size: 3.5rem;
      letter-spacing: 0.2rem;
      line-height: 1.4rem;
    }
    .detail li{
      font-family: 'Microsoft JhengHei';
      list-style: none;
      font-size: 3.5rem;
      letter-spacing: 0.2rem;
      line-height: 2.5rem;
    }
</style>

