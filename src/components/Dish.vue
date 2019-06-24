<template>
    <div class="dish">
      <img class="dish-img" :src="image" :style="imgStyle" alt="dish"/>
      <button class="open-btn" @click="changeOpen" :style="btnStyle"><div></div></button>
      <div class="background" :style="backgroundStyle"></div>
      <div class="detail" :style="detailStyle">
        <div class="score">{{4.7 + bornStar}}</div>
          <div class="patch">
            <h2>What's new</h2>
            <div class="info">我真的很好吃，我超級好吃。我真的真的很好吃。</div>
            <div class="info_btn"><button><img src="../assets/icon/arrow.png" alt="arrow"/></button></div>
          </div>
          <div class="interact" v-for="(element,index) in interact" :key="index">
              <div id="comment">
                <h3 class="date">{{element.date}}</h3>
                {{element.comment}}</div>
                <h3 class="res">Responese</h3>
              <div id="comment">{{element.reply}}</div>
          </div>
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
      interact:[
          { date:"2019-06-09", comment:"不知道有沒有提供兒童餐?", reply:"您好!請問您的兒童餐要快樂的嗎?"},
          { date:"2019-06-09", comment:"東西很好吃，希望有快樂分享餐，可以給多人一起吃", reply:"您好!請問您的分享餐要快樂的嗎?"},
          { date:"2019-06-09", comment:"ˇ店員很正，服務很親切!", reply:"您好，感謝您的讚賞，只是我們這間店沒有店員耶......你看到的是?"},
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
        const changeStyle1=()=>{
          this.btnStyle={ top:"0%",transform:"rotate(180deg)"}
        }
        setTimeout(changeStyle1,0);
        const changeStyle=()=>{
          this.btnStyle={ top:"0",transform:"rotate(0deg)"}
        }
        setTimeout(changeStyle,1000);
      }
      else{
        this.detailStyle={marginTop:"100%"};
        this.backgroundStyle={marginTop:"100%",backgroundImage:this.color};
        this.imgStyle={};
        this.btnStyle={top:"108%",transform:"rotate(0deg)"}
        const changeStyle=()=>{
          this.btnStyle={top:"97%", transform:"rotate(180deg)"}
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
        margin-top: 0;
        -webkit-transition: top 1s ease-in-out;
        -moz-transition: top 1s ease-in-out;
        -o-transition: top 1s ease-in-out;
        transition: top 1s ease-in-out; 
    }
    .score{
      color: white;
      background-color: rgba(255,255,255,0.5);
      font-size: 2.7vh;
      border-radius: 10px;
      width: 45%;
      padding: 0.5vh 2%;
      text-align: center;
    }
    h2{
      font-size: 3vh;
      font-weight: 400;
    }
    .open-btn div{
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 7px 12.5px 0 12.5px;
        -webkit-filter: drop-shadow(1px 1px 1px rgba(0,0,0,.5));
        filter: drop-shadow(1px 1px 1px rgba(0,0,0,.5));
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
      padding-top: 2vh;
      -webkit-transition: margin-top 1s ease-in-out;
      -moz-transition: margin-top 1s ease-in-out;
      -o-transition: margin-top 1s ease-in-out;
      transition: margin-top 1s ease-in-out; 
    }

    .detail ul{
      font-family: 'Microsoft JhengHei';
      list-style: none;
      font-size: 2.0vh;
      letter-spacing: 0.1vh;
      line-height: 2.0vh;
    }
    .detail li{
      font-family: 'Microsoft JhengHei';
      list-style: none;
      font-size: 2.0vh;
      letter-spacing: 0.1vh;
      line-height: 3.5vh;
    }
    .patch{
      padding-top: 3vh;
      padding-left: 2vh ;
      margin-bottom: 2vh;
    }
    .info{
      height: 22vh;
    }
    .info_btn {
      padding-top: 1vh;
      width: 100%;
      height: 5vh;
      display: flex;
      justify-content: flex-end;
    }
    .info_btn button{
      
      background-color: transparent;
      width: 30%;
      font-size: 2.3vh;
      height: 3vh;
      color: white;
      border: none;
    }

    .info_btn button img{
      height: 100%;
    }
    .interact{
      padding-right: 2vh;
      background-color: rgb(255,255,255,0.3);
      margin-bottom: 2vh;
      max-width: 97%;
      border-radius: 10px;
      padding: 2vh 4vh;
    }
    .interact .date{
      font-size: 1.9vh;
      font-weight: 300;
    }
    .interact #comment{
      font-family: 'Microsoft JhengHei';
      font-size: 2vh;
      margin-bottom: 1vh;
    }
    .interact .res{
      font-size: 2.3vh;
      color: rgb(45,45,45)
    }
</style>

