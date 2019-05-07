<template>
    <div class="dish">
      <img class="dish-img" :src="image" alt="dish"/>
      <div class="background"></div>
      <div class="detail">
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
  props: ["image"],
  data () {
    return {
      score: 3,
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

  }
}
</script>
<style scoped>
    .dish{
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .dish-img{
      height: 70%;
      
    }
    .open-btn{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0);
        border: none;
        outline: none;
    }
    .background{
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.7;
      background-image: linear-gradient(180deg, #2af598 0%, #009efd 40%);
    }
    .detail{
      position: absolute;
      color: white;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: rgba(243,243,243,0.5);
      padding: 4rem 2rem;
    }

    .detail ul{
      list-style: none;
      font-size: 2.7rem;
      letter-spacing: 0.2rem;
      line-height: 1.4rem;
    }
    .detail li{
      list-style: none;
      font-size: 2.7rem;
      letter-spacing: 0.2rem;
      line-height: 1.5rem;
    }
</style>

