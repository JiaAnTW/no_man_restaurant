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
              <b-col @click="Visa" class="visa">
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
  props: ['bill',"index"],
  data () {
  return{
      waitPay: false,
      waitCheck: false,
      transactionId: 0,
      discount:[],
      gift:[]
  }
},
 methods:{
   getDiscount:function(){
      this.$axios({
      methods: 'get',
      //url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/discount',
      url: '/api/get/discount',
      })
      .then((res) => {
        this.discount =res.data.map(Element=>{
          var selectA=Element.selectA.split(",")
          selectA.pop();
          selectA=selectA.map(item=>{
            return Number(item)
          })
          var selectB=Element.selectB.split(",")
          selectB.pop();
          selectB=selectB.map(item=>{
            return Number(item)
          })
          return{
            reason: Element.reason,
            id:Element.id,
            policy: Element.policy,
            condition: Element.con,
            x: Element.x,y: Element.y,
            selectA:selectA,selectB:selectB
          } ;
        })})
   },
   linePay:function(){
          const self=this;
          self.waitPay=true;
          this.$axios(
            {
              method: "post",
              //url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/pay',
              url: '/api/post/pay',
              data:{
              productName: "SunBurger的餐點",
              amount: this.discountCheck(),
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
          //url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/pay/confirm',
          url: '/api/post/pay/confirm',
          data:{
            transactionId:self.transactionId,
            amount:this.discountCheck(),
            product:this.product,
            id:0,
           
          }
        }
      ).then(response=>{
        if(response.data==='Success.'){
          this.$emit("finish");
        }
      }).catch(error=>{
        this.waitPay=false;
        this.waitCheck=true;      
      })    
    },
    createPaymentRequest () {
      var methodData = [{
        supportedMethods: ['basic-card'],
        data: {
          supportedNetworks: ['jcb', 'mastercard','visa'], 
          supportedTypes: ['debit', 'credit', 'prepaid']
        },
      }];
      var details = {
        displayItems: [
          {
            label: "sun burger的餐點",
            amount: { currency: "TWD", value : this.discountCheck() }
          },
        ],
        total:  {
          label: "Total",
          amount: { currency: "TWD", value : this.discountCheck() }
        }
      };
      return new PaymentRequest(methodData, details);
    },
    Visa() {
      var request = this.createPaymentRequest();
      request.show().then().catch(function(err) {

      });
    },
    discountCheck(){
    var sum=0;
    this.bill.forEach(Element=>{
      sum+=Element.num*Element.price;
    })

    const searchDish=(id)=>{
      for(let i=0;i<this.bill.length;++i){
        if(this.bill[i].id==id)
          return this.bill[i].num;
      }
      return 0;
    }

    const searchB=(id,target)=>{
      for(let i=0;i<target.length;++i){
        console.log("compare "+id+" with "+target[i])
        if(target[i]==id)
          return 1;
      }
      return 0;
    }

    const isReachA=(target)=>{
      switch (target.condition){
        case 0:
          if(sum>=target.x){
              return 1;
          }
          return 0;
          break;
        case 1:
          var counter=0;
          for(let i=0;i<target.selectA.length;++i){
            counter+=searchDish(target.selectA[i])
          }
        return (counter<target.x)?0:1;
        break;
        case 2:
          for(let i=0;i<target.selectA.length;++i){
            if(searchDish(target.selectA[i])>target.x)
              return 1;
          }
          return 0;
          break;
        case 3:
          var counter=0;
          counter=searchDish(target.selectA[0]);
          for(let i=i;i<target.selectA.length;++i){
            counter=Math.min(counter,searchDish(target.selectA[i]))
          }
          return counter>=target.y;
          break;
        case 4:
          return 1;
          break;
      }
    }
    const fullfillB=(target)=>{
      var output=0;
      switch (target.policy){
        case 0:
          this.bill.forEach(Element=>{
            console.log("search B is "+searchB(Element.id,target.selectB))
              if(searchB(Element.id,target.selectB)>0)
                output+=Element.num*Element.price*target.y*0.1;
              else
                output+=Element.num*Element.price;
          })
          return output;
          break;
        case 1:
          let counter=target.y;
          this.bill.forEach(Element=>{
              if(searchB(Element.id,target.selectB)&&Element.num>target.y&& counter!=0){
                output+=(Element.num-target.y)*Element.price;
                counter=0;
              }
              else if(searchB(Element.id,target.selectB)>0 && counter!=0){
                output+=0;
                counter-=Element.num;
              }
              else
                output+=Element.num*Element.price;
          })
          if(counter>0)
            this.gift.push({amout: counter,name:this.index[target.selectB[1]-1]})
          return output;
          break;
        case 2:

          var count=0;
          count=searchDish(target.selectB[0]);
          for(let i=i;i<target.selectB.length;++i){
            count=Math.min(count,searchDish(target.selectB[i]))
          }

          count=(count>target.y)?target.y:count;
          this.bill.forEach(Element=>{
              if(searchB(Element.id,target.selectB)&&Element.num>target.y){
                output+=(Element.num-target.y)*Element.price;
              }
              else if(searchB(Element.id,target.selectB)>0){
                output+=0;
              }
              else
                output+=Element.num*Element.price;
          })
          if(count>target.y)
            this.gift=this.traget.selectB.map(Element=>{
              if(Element!=0)
                return {amout: count-target.y,name:this.index[target.Element-1]}
            })
          return output;
          break;

      }
    }
    
    for(let k=0;k<this.discount.length;++k){
      console.log("test discount "+k)
      if(isReachA(this.discount[k])){
        console.log("A Reach!")
        console.log(fullfillB(this.discount[k]))
        return fullfillB(this.discount[k])
      }
      
    }
    return this.tot;
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
   this.getDiscount();
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