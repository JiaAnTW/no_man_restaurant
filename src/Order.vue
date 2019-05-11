<template>
    <div class="order">
        <div class="title"><h1>{{ name }}</h1></div>
        <div class="dish">
          <div class="info-container">
            <dish :image="image" :color="colorSet[this.data.id%5]"/>
           </div> 
        </div>
        <div class="number">
          <button value="minus" v-on:click="handleNumberChange">-</button>
          <span>{{ number }}</span>
          <button value="plus" v-on:click="handleNumberChange">+</button>
        </div>
        <div class="cart">
          <button v-on:click="addToCart" :style="btnStyle"><div class="mask" :style="maskStyle">Add to cart</div>Add to cart</button>
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
      image: '',
      isOpen: false,
      colorSet:[
        "linear-gradient(180deg, #f11ca0 0%, #2013f6 100%)",
        "linear-gradient(180deg, #f19b3d 0%, #2013f6 100%)",
        "linear-gradient(180deg, #f0a133 0%, #f42033 100%)",
        "linear-gradient(180deg, #f42033 0%, #270540 100%)",
        "linear-gradient(180deg, #6ce1b9 0%, #673ceb 100%)",
      ],
      isCart: false
    }
  },
  computed:{
    btnStyle:function(){
      if(this.isCart===true){
        const colorSet=[
        "linear-gradient(270deg, #f11ca0 0%, #2013f6 100%)",
        "linear-gradient(270deg, #f19b3d 0%, #2013f6 100%)",
        "linear-gradient(270deg, #f0a133 0%, #f42033 100%)",
        "linear-gradient(270deg, #f42033 0%, #270540 100%)",
        "linear-gradient(270deg, #6ce1b9 0%, #673ceb 100%)",
        ]
        return {backgroundImage: colorSet[this.data.id%5]};
      }
      else
        return{}
    },
    maskStyle:function(){
      return {backgroundColor: "rgba(243,243,243,0.4)"};
    },
  },
  methods:{
    handleNumberChange: function(e){
      if(e.target.value==="plus"){
        this.number++;
        this.isCart=true;
      }
      else if(this.number>0){
        this.number--;
        this.isCart=(this.number==0)?false:true;
      }
    },
    addToCart: function(){
      this.$emit('add-cart',{
        name:this.name,
        num:this.number,
        src:this.image,
        id: this.data.id,
        price: this.data.price
      });
    }
  },
  watch:{
    data: function(){
      this.name= this.data.name;
      this.image=this.data.image;
      //this.menu=this.data.menu;
    }
  },
  mounted:function(){
      this.name= this.data.name;
      this.image=this.data.image;
      //this.menu=this.data.menu;
  }
}
</script>
<style scoped>

  .mask{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }


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
    flex-grow: 1;
    color: white;    
  }

  .title h1{
    font-size: 5rem;
    text-decoration: underline;
  }

  .dish{
    flex-grow: 1.0;
  }

  .dish .info-container{
    height: 45vh;
    width: 50vh;
    display: flex;
    overflow: hidden;
    border: 10px solid rgb(80, 80, 80);
    border-bottom: none; 
    border-radius: 15px;
  }

  .number{
    flex-grow: 1;
  }

  .number button{
    border-radius: 50px;
    width: 3rem;
    height: 3rem;
    color: rgb(45, 45, 45);
    font-size: 6rem;
    font-weight: 600;
    line-height: 0.1rem;
    background-color: rgba(243,243,243,1);
    border: 0px solid gray;
  }

  .number span{
    width: 35%;
    font-size: 6rem;
    text-align: center;
    color: white;
  }

  .cart{
    flex-grow: 1;
    display: flex;
    justify-content: center;
    -webkit-justify-content: center;
  }

  .cart button{
    margin-top: 6%;
    height: 40%;
    width: 90%;
    font-size: 6rem;
    border-radius: 10px;
    background-color: rgba(243,243,243,1);
    border: 1px solid rgb(45, 45, 45);
    position: relative;
  }
  .cart div{
    font-size: 6rem;
    color: 1px solid black;
  }
</style>

