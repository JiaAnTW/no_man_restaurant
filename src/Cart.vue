<template>
    <div class="cart">
      <div class = "title">Your Cart</div>
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
            <td class="num">
              <button class="minus_"  value="minus" v-on:click="handleNumberChange(-1,index)">-</button>
              <h3>{{ cartdatas.num }}</h3>
              <button class="plus_"  value="plus" v-on:click="handleNumberChange(1,index)">+</button>
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
    deleteDish:function(index){
      this.$emit('delete-cart',index)
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

.order tr
{
  position: relative;
  width: 100%;
}

.order td
{
  height: 11vh;
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
position: absolute;
top: 20.7vh;
left:6.1%;
height: 40vh;
width: 88%;
border: 1px solid gray;
border-radius: 15px;
background-color: rgb(255, 255, 255);
overflow-y: scroll;
padding: 7% 1%;
}

.order h1{
  line-height: 160%;  
  font-size: 3.5rem;  
  color: rgb(45, 45, 45);
}

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
  width:22vw;  
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
  width: 50%;
  font-size: 6rem;
}

.total .r
{
  text-align: right;
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
    padding:0 0 0.2rem 0.4rem;
    border-radius: 1.8rem;
    width: 1.8rem;
    height: 1.8rem;
    color: rgb(0, 0, 0);
    font-size: 3.5rem;
    font-weight: 600;
    line-height: 0%;
    background-color: rgb(255, 255, 255);
    border: 0.1rem solid gray;
    text-align: center;
    vertical-align: middle;
  }

.num button:hover{   background-color: rgb(240, 240, 240);  }

.num h3
{ 
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    font-size: 5rem;
    vertical-align: -webkit-baseline-middle;
    text-align: center;
    color: rgb(45, 45, 45);
}
</style>