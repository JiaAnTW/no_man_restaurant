<template>
    <div class="cart">
      <div class = "order">
      <table>
        <tbody>
          <tr class=cartdata v-for = "(cartdatas,index) in data"  :key="index">
            <td class="image">
              <img class="foodimg" :src="cartdatas.src" style="display:block; margin:auto;" alt="cartdatas.name" />
            </td>
            <td class="foodname">
              <h1>{{cartdatas.name}}<br/>${{cartdatas.price}}</h1>
            </td>
            <td class="num" :style="deleteDish(cartdatas.num,index)">
              <button class="minus_"  value="minus" v-on:click="handleNumberChange(-1,index)">-</button>
              <h3>{{ cartdatas.num }}</h3>
              <button class="plus_"  value="plus" v-on:click="handleNumberChange(1,index)">+</button>
           </td>
          </tr>
        </tbody>
      </table>
      </div>

      <div class = "total">
        <span class="r">Total:  $  {{tot}} </span>
      </div>
      <div class = "send">
        <button class = "place" v-if="notPay" v-on:click="linePay">Place your order</button>
        <button class = "check" v-else v-on:click="linePayConfirm">Check your pay</button>
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
    transactionId:0
  }
},
computed:{
  tot:function(){
    var sum=0;
    this.data.forEach(Element=>{
      sum+=Element.num*Element.price;
    })
    return sum;
  }
},
 methods:{
    handleNumberChange: function(value,index){
      this.$emit('handle-number-change',value,index)
    },
    deleteDish:function(value,index){
      if (value === 0)
      {      this.$emit('delete-cart',index)      }
    },
    loginConfirm:function(){
      this.$axios(
          {
            method: "post",
            url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/index',
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
      if(this.tot>0){
        if(this.token!=''){
          const self=this;
          this.$emit('show-loading',true);
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
          this.$emit('show-loading',false);
          self.notPay=false;
          self.transactionId=response.data.transactionId;
          })
        }
        else{
          alert("想要買這個餐點?哼哼哼，在沒有登入之前我是不會讓你通過這裡的",this.$emit('direct-to-show','profile'))
        }
      }
    },
    linePayConfirm: function(){
      this.$emit('show-loading',true);
      const self=this;
      this.$axios(
        {
          method: "post",
          url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/pay/confirm',
          //url: '/api/post/pay/confirm',
          data:{
            transactionId:self.transactionId,
            amount:this.tot,
            id:0,
           
          }
        }
      ).then(response=>{
        if(response.data==='Success.'){
          this.$emit('show-loading',false);
          self.notPay=true;
          this.$emit('send-bill',{
            name:"吳銘世",
            amount: this.tot,
            guest_id: 0,
            time: Date.now()+1000*60*20
          })
          this.$emit('direct-to-show','total');
          
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

.r
{
  position: absolute;
  width:100%;
  left:65%;
  float: right;
}

.order tr
{
  position: relative;
  width: 100%;
}

.order td
{
  height: 11vh;
  border-bottom: 0.1vh solid rgb(200, 200, 200);
  color: rgb(45, 45, 45);
}

.cart ,.order{  
  display: flex;  
  flex-wrap: wrap;
  align-items: flex-start;
}

.cart
{
  display: flex;
  flex-direction:column;
  -webkit-flex-direction:column;
  flex-grow:1;
  -webkit-flex-grow:1;
}

.order button
{
  margin-top:2%;
  cursor:pointer;
}

.order
{
position: absolute;
top: 10.7vh;
left:6.1vw;
height: 65vh;
width: 88vw;
border: 0vh solid gray;
border-radius: 2vh;
background-color: rgb(48,48,48);
overflow-y: scroll;
padding: 7vw 1vw;
}

.order h1{
  line-height: 160%;  
  font-size: 3.5vw;  
  color:rgb(245, 245, 245);
}


.order .image{  width:20vw;  }

.order .foodimg
{
vertical-align: middle;
width: auto;
height: 90%;
}

.order .foodname
{
  width:20vw;
  vertical-align:middle;
  text-align: left;
  font-size: 3.5vw;
  display: flex;
  align-items: center;
  background-color: rgb(48,48,48)
}

.order .num{  
  width:45vw;  
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
top:78vh;
left:0vw;
width:84vw;
position: absolute;
padding-bottom: 3vw;
padding-left: 4vw;
padding-right: 7vw;
color:rgb(245, 245, 245);

}

.total span
{
  width: 60%;
  font-size: 7vw;
}

.total .r
{  text-align: right;  }

.send
{
top:85vh;
left:8vw;
position: absolute;
}

.send button
{
  margin-top:3vw;
  height: 10vw;
  width: 84vw;
  font-size: 5.5vw;
  border-radius:5vw;
  background-color: rgb(255, 255, 255);
  border: 0.1vw solid rgb(189, 189, 189);
  cursor:pointer;
}

.send .place
{  padding:0 21.5vw;  }

.send .check
{  padding:0 22.5vw;  }

.num button
{ 
    padding:1vh 1vh 2vh 1.1vh;
    border-radius: 5vh;
    width: 6vh;
    height: 6vh;
    color: rgb(240,240,240);
    font-size: 6vh;
    font-weight: 300;
    line-height: 0%;
    background-color: rgb(48,48,48);
    border: 2px solid gray;
  }

.num button:hover{   background-color: rgb(240, 240, 240);  }

.num h3
{ 
    padding-left: 0.8vw;
    padding-right: 0.8vw;
    font-size: 5vh;
    font-weight: 400;
    vertical-align: -webkit-baseline-middle;
    text-align: center;
    color:rgb(245, 245, 245);
}
</style>