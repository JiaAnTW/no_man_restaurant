<template>
    <div class="order">
        <div class="title"><h1>{{ name }}</h1></div>
        <div class="dish">
          <div class="info-container">
            <dish/>
           </div> 
        </div>
        <div class="number">
          <button value="minus" v-on:click="handleNumberChange">-</button>
          <span>{{ number }}</span>
          <button value="plus" v-on:click="handleNumberChange">+</button>
        </div>
        <div class="cart">
          <button v-on:click="addToCart">Add to cart</button>
        </div>
    </div>
</template>

<script>
import Dish from './components/Dish.vue'
export default {
  name: 'Order',
  components: {Dish},//也要把你做的Component在這註冊
  props:["data"],
  data () {
    return {
      number: 0,
      name: "無資料",
      isOpen: false,
    }
  },
  methods:{
    handleNumberChange: function(e){
      if(e.target.value==="plus")
        this.number++;
      else if(this.number>0)
        this.number--;
    },
    addToCart: function(){
      this.$emit('add-cart',{name:this.name,number:this.number});
    }
  },
  watch:{
    data: function(){
      this.name= this.data.name;
    }
  }
}
</script>
<style scoped>
  button{
    outline: none;
  }
  .title,.dish,.number{
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-justify-content: center;
    -webkit-align-items: center; 
  }

  .title{
    align-items:flex-end;
    -webkit-align-items: flex-end;
  }



  .order{
    flex-grow:1;
    -webkit-flex-grow:1;
    display: flex;
    flex-direction:column;
    -webkit-flex-direction:column;  
  }

  .title{
    flex-grow: 0.5;    
  }

  .title h1{
    font-size: 5rem;
  }

  .dish{
    flex-grow: 6;
  }

  .dish .info-container{
    height: 85%;
    width: 85%;
    overflow: hidden;
    border: 1px solid gray;
    display: flex;
    border-radius: 15px;
  }

  .number{
    flex-grow: 1.5;
  }

  .number button{
    border-radius: 50px;
    width: 3rem;
    height: 3rem;
    background-color: rgba(0,0,0,0);
    border: 1px solid gray;
  }

  .number span{
    width: 35%;
    font-size: 6rem;
    text-align: center;
  }

  .cart{
    flex-grow: 1;
    display: flex;
    justify-content: center;
    -webkit-justify-content: center;
  }

  .cart button{
    margin-top: 3%;
    height: 45%;
    width: 90%;
    font-size: 6rem;
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
    border: 1px solid black;
  }
</style>

