<template>
    <div class="cart">
      <div class = "order">
        <b-container v-if="data.length!=0">
          <b-row class=cartdata v-for = "(cartdatas,index) in data"  :key="index">
            <b-col class="image">
              <img class="foodimg" :src="cartdatas.src" style="display:block; margin:auto;" alt="cartdatas.name" />
            </b-col>
            <b-col class="foodname">
              <h1>{{cartdatas.name}}<br/>${{cartdatas.price}}</h1>
            </b-col>
            <b-col class="num">
              <button class="minus_"  value="minus" v-on:click="handleNumberChange(-1,index)">-</button>
              <h3>{{ cartdatas.num }}</h3>
              <button class="plus_"  value="plus" v-on:click="handleNumberChange(1,index)">+</button>
           </b-col>
          </b-row>
        </b-container>
        <div class="none-message" v-else>選了餐點<br/>才能看到我歐</div>
      </div>
      <div class = "send">
        <button v-if="notPay" v-on:click="linePay">Place your order</button>
        <button v-else v-on:click="linePayConfirm">Check your pay</button>
      </div>
    </div>
</template>

<script>
import { error } from 'util';
export default {
  name: 'Cart',
  props: ['data','token'],
  data () {
  return{
    cont:0,
    notPay: true,
    transactionId:0,
    place:false,
    
  }
},
computed:{
  tot:function(){
    var sum=0;
    this.data.forEach(Element=>{
      sum+=Element.num*Element.price;
    })
    return sum;
  },
  product:function(){
    return this.data.map(Element=>{
      return {name:Element.name,amount:Element.num}
    })
  }
},
 methods:{
    handleNumberChange: function(value,index){
        this.$emit("foodmethod",'handle-number-change',value,index)
    },
    deleteDish:function(index){
      this.$emit("foodmethod",'delete-cart',index)
    },
    loginConfirm:function(){
      this.$axios(
          {
            method: "post",
            //url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/index',
            url: '/api/post/index',
            data:{
              token:this.token
          }
        }
      ).then(response=>{
          if(response.data==='你是會員')
            return true;
          else 
            return false
      })
    },
    linePay: function(){
      var self=this;
      if(this.tot>0){
        //if(this.token!=''){
          //self.place=true;
        this.$emit("foodmethod",'start-pay')//以一個變數名叫做'place'傳送place出去
        //}
        //else
           //alert("想要買這個餐點?哼哼哼，在沒有登入之前我是不會讓你通過這裡的",this.$emit("foodmethod",'direct-to-show','profile'))
      }
     /*if(this.tot>0){
        if(this.token!=''){
          const self=this;
          this.$emit("foodmethod",'show-loading',true);
          this.$axios(
            {
              method: "post",
              url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/pay',
              //url: '/api/post/pay',
              data:{
              productName: "SunBurger的餐點",
              amount: self.tot,
              confirmUrl: "localhost:8080/#/",
            }
          }
        ).then(response=>{
          window.open(response.data["url"], "_blank")
          this.$emit("foodmethod",'show-loading',false);
          self.notPay=false;
          self.transactionId=response.data.transactionId;
          })
        }
        else{
          alert("想要買這個餐點?哼哼哼，在沒有登入之前我是不會讓你通過這裡的",this.$emit("foodmethod",'direct-to-show','profile'))
        }
      }*/
    },
    linePayConfirm: function(){
      this.$emit("foodmethod",'show-loading',true);
      const self=this;
      this.$axios(
        {
          method: "post",
          url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/pay/confirm',
          //url: '/api/post/pay/confirm',
          data:{
            transactionId:self.transactionId,
            amount:this.tot,
            product:this.product,
            id:0,
           
          }
        }
      ).then(response=>{
        if(response.data==='Success.'){
          this.$emit("foodmethod",'show-loading',false);
          self.notPay=true;
          this.$emit("foodmethod",'send-bill',{
            name:"吳銘世",
            amount: this.tot,
            guest_id: 0,
            time: Date.now()+1000*60*20
          })
          this.$emit("foodmethod",'direct-to-show','total');
          
        }
      })
    }   
 },
 watch:{
   data:function(){
     this.lists=this.data;
   }
 },
 mounted:function(){
     this.lists=this.data;
   }
 }
</script>

<style scoped>
button
{
  outline: none;
}
.l
{
width:100%;
float: left;
}
.r
{
  position: absolute;
  width:100%;
  left:65%;
  float: right;
}
.container{
  padding: 0 0;
  flex-wrap: wrap;
  overflow-y: auto;
  background-color: transparent;
}
.cartdata
{
  width: 100%;
  min-width: 100%;
  height: 8vh;
  border-bottom: 1px solid rgb(200, 200, 200);
  color: rgb(45, 45, 45);
}
.crossline{  height:5%;  }
.cart ,.order{  
  display: flex;  
  flex-wrap: wrap;
  align-items: flex-start;
}
.cart
{
  padding-top: 2vh;
  background-color: rgba(219,218,218,0.45);
  flex-grow:1;
  -webkit-flex-grow:1;
}
.order button
{
  margin-top:2%;
  cursor:pointer;
}
.can
{
  height:45%;
  width: 100%;
  background-image: url('./assets/icon/can.png');
  background-position:50% 50%;
  background-repeat: no-repeat;
  background-size:  25% auto;
  padding-left: 1%;
  padding-right: 1%; 
  background-color: rgba(100, 100, 100, 0.1);
  border: none;
}
.title
{
  position: absolute;
  top:13vh;
  left:38%;
  font-size: 5.5rem;
  color:rgb(245, 245, 245);
  text-decoration: underline;
}
.order
{
height: 25vh;
width: 100%;
overflow-y: scroll;
padding-top: 4% ;

}
.order h1{
  line-height: 160%;  
  font-size: 3.5rem;  
  color: rgb(45, 45, 45);
}

.cartdata .col{
  height: 100%;
  padding:  0 0;
}

.order{
  position: relative;
}

.image{
  width: 20%;
  display: flex;
  align-items: center;
}

.foodimg
{
  display: flex;
  vertical-align: middle;
  width:auto;
  height: 80%;
  align-items: center;
}

.order .foodname
{
  width: 40%;
  vertical-align:middle;
  text-align: left;
  font-size: 3.5rem;
  padding: 1.5% 0;
}

.order .num{  
  width:40%;  
  display: flex;
  align-items: center;
  justify-content: space-around;
  }
.order .del
{
   width:18vw;
   vertical-align: -webkit-baseline-middle;
   display: flex;
   align-items: center;
}
.total
{
width:84%;
border-bottom: 1.5px solid rgb(184, 184, 184);
padding-bottom: 3%;
padding-left: 4%;
padding-right: 7%;
color:rgb(45,45,45);
}
.total span
{
  font-size: 5rem;
  text-align: left;
  width: 50%;
  font-size: 6rem;
}
.total .r
{
  text-align: right;
}
.send
{
  margin-bottom: 0vh;
  margin-left:24%;
  width: 52%;
}
.send button
{
  margin-top:3%;
  height: 40%;
  width: 100%;
  font-size: 2vh;
  border-radius: 15px;
  padding:0.5vh 0vw;
  background-image: linear-gradient(270deg, rgb(155,51,84) 0%, rgb(58,44,105) 80%);
  border: 1px solid rgb(189, 189, 189);
  color: white;
  cursor:pointer;
}
.num button
{ 
    padding:0 0.5vh 0rem 0rem;
    border-radius: 100%;
    width: 5vh;
    height: 5vh;
    color: rgb(45, 45, 45);
    background-color: transparent;
    font-size: 4.5vh;
    font-weight: 600;
    line-height: 0%;
    border: 0.1rem solid gray;
    text-align: center;
    vertical-align: middle;
  }

.num h3
{ 
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    font-size: 5rem;
    vertical-align: -webkit-baseline-middle;
    text-align: center;
    color: rgb(45, 45, 45);
}

.none-message{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 100%;
  font-size: 4vh;
  text-align: center;
  padding: 10% 10%;
  font-family: 'Microsoft JhengHei';
}
</style>