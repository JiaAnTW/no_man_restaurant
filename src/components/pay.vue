<template>
    <div class="Pay">
        <b-container>
            <b-row class="title">
                <b-col class="head">
                    <img class="memberhead" src= "../assets/icon/icon.png" />
                                    <h1>Payment</h1>
                </b-col>

            </b-row>
            <!--vvv 按鈕 vvv-->
            <b-row v-if="!waitCheck&&!waitPay">
              <b-col class="a-pay">
                <button></button>
              </b-col>
              <b-col class="g-pay">
                <button></button>
              </b-col>
              <b-col class="master">
                <button></button>
              </b-col>
              <b-col class="visa">
                <button></button>
              </b-col>
              <b-col class="l-pay">
                <button @click="linePay"></button>
              </b-col>
              <b-col></b-col>
            </b-row>
            <!--^^^ 按鈕 ^^^-->
            <b-row v-if="waitPay" class="message">
              處理中，請稍後
            </b-row>
            <b-row class="message" v-if="waitCheck" >
              請完成您的付款<br/><br/>
              付款完成，請按下「確認」<br/>
              付款失敗，請按下「重新發送」
            </b-row>
            <b-row v-if="waitCheck">
              <b-col>
                <button @click="linePay" style="color:white;font-family: 'Microsoft JhengHei';font-size:2vh;background-image: linear-gradient(270deg, rgb(155,51,84) 0%, rgb(58,44,105) 80%);"> 重新發送 </button>
              </b-col>
              <b-col>
                <button @click="linePayConfirm" style="color:white;font-family: 'Microsoft JhengHei';font-size:2vh;background-image: linear-gradient(270deg, rgb(155,51,84) 0%, rgb(58,44,105) 80%);"> 確認 </button>
              </b-col>
            </b-row>
        </b-container>
        
    </div>
</template>

<script>
export default {
  name: 'Pay',
  props: ['bill'],
  data () {
  return{
      waitPay: false,
      waitCheck: false,
      transactionId: 0,
  }
},
 methods:{
   linePay:function(){
          const self=this;
          self.waitPay=true;
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
          self.waitPay=false;
          self.waitCheck=true;
          self.transactionId=response.data.transactionId;
          })     
   },
    linePayConfirm: function(){
      this.waitPay=true;
      this.waitCheck=false;
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
          this.$emit("finish");
        }
      })
    }
 },
computed:{
  tot:function(){
    var sum=0;
    this.bill.forEach(Element=>{
      sum+=Element.num*Element.price;
    })
    return sum;
  },
  product:function(){
    return this.bill.map(Element=>{
      return {name:Element.name,amount:Element.num}
    })
  }
},
 mounted(){
 
 }
}
</script>

<style scoped>

 .container
{
    flex-direction: row;
    flex-wrap: wrap;
    background-color: transparent;

}

.title{
  width:100%;
  height: 18vh;
}

h1{
  color: #2c2c2c;
}

.head
{
  height:70%;
  width:30%;
  display: flex;
  align-items: center;
  justify-content: left; 
}

.memberhead
{
height: 10vh;
width: 10vh;
}

.title h1
{   
    font-weight: bold;
    font-size: 3vh;
    padding-top: 10%;
    padding-left: 2%;
}

 .Pay button
 { 
    height:5.2vh;
    width:18.5vh;
	box-shadow: 0px 4px 6px 0px #c4c4c4;
	background-color:rgb(255,255,255);
	border-radius:6vh;
	cursor:pointer;
	color:#2c2c2c;
	font-size:20px;
    border: 1px solid rgb(255,255,255);
 }

.container b-col{
    display: flex;
}

.a-pay{
  width:50%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.a-pay button{
      background-image: url('../assets/apay.png');
      background-size: auto 65%;
      background-position:center center;
      background-repeat:no-repeat;
}

.g-pay{
  width:50%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.g-pay button{
      background-image: url('../assets/gpay.png');
      background-size: auto 65%;
      background-position:center center;
      background-repeat:no-repeat;
}

.master{
  width:50%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.master button{
      background-image: url('../assets/Mastercard.png');
      background-size: auto 80%;
      background-position:center center;
      background-repeat:no-repeat;
}

.visa{
  width:50%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visa button{
      background-image: url('../assets/visa.png');
      background-size: auto 50%;
      background-position:center center;
      background-repeat:no-repeat;
}

.l-pay{
  width:50%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.l-pay button{
      background-image: url('../assets/linepay.png');
      background-size: auto 60%;
      background-position:center center;
      background-repeat:no-repeat;
}

.message{
  text-align: center;
  justify-content:center;
  align-items:center;
  width:100%;
  height:25vh;
  margin-right: 0;
  margin-left: 0;
  font-family: 'Microsoft JhengHei';
  font-size: 2.3vh;
}
</style>