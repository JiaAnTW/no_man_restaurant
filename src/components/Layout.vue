<template>
  <div class="Layout">
    <div class="slogan-container">
      <button class="top-btn">music</button>
      <h1>Sun Burger</h1>
      <button class="top-btn">login</button>
    </div>
    <div class="step-container">
      <!--注意，請把你.vue檔中最外層的div增加兩個css屬性: "flex-grow:1"和"-webkit-flex-grow:1" -->
      <!--這兩個屬性會幫你自動把長寬貼齊step-container，詳情請搜尋css flexbox -->
      <!--把你做的component放在下面。(你可以試試看把order放進來)-->

      <!--把你做的component放在上面。(你可以試試看把order放進來)-->
    </div>
    <div class="nav-bar">
      <button  v-for="(step,index) in steps" v-bind:key={index}>{{ step }}</button>
    </div>
  </div>
</template>

<script>
import Order from '../Order.vue'//記得include你做的Component
import { normalize } from 'path';
export default {
  name: 'Layout',
  components: {Order},//也要把你做的Component在這註冊
  data () {
    return {
      msg: '這裡是固定的版面',
      order: [{name:"漢堡",price:1},{name:"漢堡",price:1}],
      steps:["menu","favorite","cart","profile"],
      nowAt: 1,
    }
  },
  watch:{
    nowAt: function(){
      const handleStyleChange=()=>{
        if(this.nowAt===1){
        }
      }
      handleStyleChange();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Layout{
  display:flex;  
  flex-direction:column;
  -webkit-flex-direction:column;   
  position: absolute;
  left: 0;
  top: 0;
  width: 100rem;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
}
.slogan-container{
  border-bottom: 1px solid gray;
  height: 7.5vh;
  display: flex;
  justify-content: space-around;
  -webkit-justify-content:space-around; 
  align-items: center;
  -webkit-align-items: center;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
}

.slogan-container h1{

  font-weight: 300;
  font-size: 5.5rem;
  color: gray;

}

.top-btn{
  background-color: rgba(0, 0, 0, 0);
  padding:  5px 10px;
  font-size: 4.5rem;
  border: none;
  outline: none;
  color: gray;
}

.step-container{
  flex-grow:3;
  -webkit-flex-grow:3;
  display: flex;
}

.nav-bar{
  border-top: 1px solid gray;
  height: 7.0vh;
  display: flex;
  justify-content: space-around;
  -webkit-justify-content:space-around; 
  align-items: center;
  -webkit-align-items: center;
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
}


.nav-bar button{
  font-size: 5rem;
  color: gray;
  background-color: rgba(0, 0, 0, 0);
  width: 5em;
  height: 5rem;
  border: none;
  outline: none;
}

</style>
