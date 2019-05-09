<template>
    <div class="cart">
      <div class = "title">Your Cart</div>
      <div class = "order">
      <table>
        <tbody>
          <tr class=cartdata v-for = "(cartdatas,index) in data"  :key="index">
            <td class="image">
              <img class="foodimg" src="./assets/beef.png" style="display:block; margin:auto;" alt="cartdatas.name" />
            </td>
            <td class="foodname">
            <h1>{{cartdatas.name}}</h1>
            <h1>${{cartdatas.price}}</h1>
            </td>
            <td class="num">
              <button  value="minus" v-on:click="handleNumberChange(-1,index)">-</button>
              <h3>{{ cartdatas.num }}</h3>
              <button  value="plus" v-on:click="handleNumberChange(1,index)">+</button>
           </td>
            <td class="del">
              <button class="can" value="zero" v-on:click="deleteDish(index)"></button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>

      <div class = "total">
        <span class="l">Total:</span> 
        <span class="r">  $  {{tot}} </span>
      </div>
      <div class = "send">
        <button v-if="notPay" v-on:click="linePay">Place your order</button>
        <button v-else v-on:click="linePayConfirm">Check your pay</button>
      </div>
    </div>

    
</template>

<script>
export default {
  name: 'Cart',
  props: ['data'],
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
    deleteDish:function(index){
      this.$emit('delete-cart',index)
    },
    linePay: function(){
      const self=this;
      this.$emit('show-loading',true);
      this.$axios(
        {
          method: "post",
          url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/pay',
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
    },
    linePayConfirm: function(){
      this.$emit('show-loading',true);
      const self=this;
      this.$axios(
        {
          method: "post",
          url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/pay/confirm',
          data:{
            transactionId:self.transactionId,
            amount:this.tot,
            id:0,
            time: Date.now()+1000*60*20
          }
        }
      ).then(response=>{
        if(response.data==='Success.'){
          this.$emit('show-loading',false);
          self.notPay=true;
          this.$emit('send-bill',{
            name:"吳銘世",
            amout: this.tot,
            guest_id: 0
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

.number button{
    border-radius: 50px;
    width: 3rem;
    height: 3rem;
    color: rgb(45, 45, 45);
    font-size: 6rem;
    font-weight: 600;
    line-height: 0rem;
    background-color: rgba(243,243,243,1);
    border: 0px solid gray;
  }

.cartdata{    }

.l
{
width:100%;
float: left;
}

.r
{
  width:100%;
  float: right;
}

.order tr
{
  position: relative;
  width: 100%;
}

.order td
{
  height: 6rem;
 border-bottom: 1.5px solid rgb(184, 184, 184);
}

.crossline{  height:5%;  }

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
  margin-top:3%;
  cursor:pointer;
}

.can
{
  height:100%;
  width: 100%;
  background-image: url('./assets/icon/can.png');
  background-position:50% 50%;
  background-repeat: no-repeat;
  background-size:  35% auto;
  padding-left: 1%;
  padding-right: 1%; 
 
}

.title
{
  position: absolute;
  top:15vh;
  left:34%;
  font-size: 6.5rem;
  color:rgb(245, 245, 245);
 
}

.order
{
position: absolute;
top: 20.7vh;
left:6.1%;
height: 40vh;
width: 88%;
border: 1px solid gray;
border-radius: 15px;
background-color: rgb(255, 255, 255);
overflow-y: scroll;
padding-top: 7%;

}

.order h1{  font-size: 3.5rem;  }

.order .foodname{  width:25vw;  }

.image{  width:20vw;  }

.foodimg
{
vertical-align: middle;
width:auto;
height: 80%;
}

.foodname
{
  vertical-align:middle;
  text-align: left;
  font-size: 3.5rem;
  display: flex;
  align-items: center;
}

.order .num{  
  width:25vw;  
  display: flex;
  align-items: center;
  justify-content: space-around;
  }

.order .del
{
   width:15vw;
   vertical-align: -webkit-baseline-middle;
}

.total
{
top:67.92vh;
left:8%;
width:84%;
position: absolute;
border-bottom: 1.5px solid rgb(184, 184, 184);
padding-bottom: 3%;
padding-left: 4%;
padding-right: 7%;
color:rgb(245, 245, 245);

}

.total span
{
  font-size: 5rem;
  text-align: left;
  width: 35%;
  font-size: 6rem;
}

.send
{
top:80.76vh;
left:8%;
position: absolute;
}

.send button
{
  margin-top:3%;
  height: 40%;
  width: 100%;
  font-size: 5.5rem;
  border-radius: 15px;
  padding:1.6vw 21.5vw;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(189, 189, 189);
  cursor:pointer;
}



.num button
{
    border-radius: 2rem;
    width: 2.5rem;
    height: 2.5rem;
    color: rgb(0, 0, 0);
    font-size: 5rem;
    font-weight: 600;
    line-height: 0%;
    background-color: rgb(255, 255, 255);
    border: 0.1rem solid gray;
    vertical-align: middle;
  }

.num button:hover{   background-color: rgb(240, 240, 240);  }

.num h3
{ 
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    font-size: 6rem;
    vertical-align: -webkit-baseline-middle;
    text-align: center;
    color: rgb(0, 0, 0);
}

.can{
  background-color: rgba(243,243,243,0);
  border: none;
}

</style>