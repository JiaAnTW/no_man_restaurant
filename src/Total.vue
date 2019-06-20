<template>
<div class="cart">
      <div class = "title">Your order</div>
      <div class="order-container">
        <div class = "order">
        <b-container >
          <b-row class=cartdata v-for = "(cartdatas,index) in order"  :key="index">
            <b-col class="image">
              <img class="foodimg" :src="cartdatas.src" style="display:block; margin:auto;" alt="cartdatas.name" />
            </b-col>
            <b-col class="foodname">
              <h1>{{cartdatas.name}}<br/>${{cartdatas.price}}</h1>
            </b-col>
            <b-col class="num">

           </b-col>
          </b-row>
        </b-container>
        </div>
      </div>
      <div class = "send">
        <button>Guest number: 9487945</button>
      </div>
        <div class = "total">
            <div class="total-start">Order can be pick in</div><div class="total-end">{{timeshow}}</div>
      </div>
    </div>

    
</template>

<script>
import { error } from 'util';
export default {
  name: 'Total',
  props: ['data','token','find'],
  data () {
  return{
    time: null,
    order: []
  }
},
computed:{
    timeshow:function(){
        if(this.time>0)
            return this.time+" min";
        else if( this.time===0)
            return "餐點已完成";
        else
            return "-1min";
    }
},
 methods:{
    handleNumberChange: function(value,index){
      this.$emit('handle-number-change',value,index)
    },
    deleteDish:function(index){
      this.$emit('delete-cart',index)
    },
    esttime:function(){
    if(this.time>0)
      this.time=Math.floor((this.billData.time-Date.now())/(1000*60));
    else if(this.time==null)
        this.time=this.time; 
    else
        this.time=0; 
    }  
 },
 watch:{
   data:function(){
     
   }
 },
    mounted:function(){
        this.$axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/user/history',
            //url: '/api/post/login',
            data: {
                id: 0
            },
        })//等到get後才執行接下來的code
        .then((res)=>{
            const test=res.data.data[1]
            console.log(test.productName[0].name)
            var nameArray=[]
            test.productName.forEach(items=>{
                nameArray.push(items.name)
            });
            this.$emit("get-food",nameArray)
            this.order=test.productName.map((items,id)=>{ 
                    return {
                        src:this.find[0][id].image,
                        name:this.find[0][id].name,
                        price:this.find[0][id].price,
                        amout: items.amount
                    }
                })
        })
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
.order-container{
    width: 100vw;
    height: 45vh;
    justify-content: center;
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

.cart, .order-container{
    display: flex;
  flex-direction:column;
  -webkit-flex-direction:column;
  align-items: center;
  
}

.cart
{
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
  flex-grow: 0.5;
  font-size: 5.5rem;
  color:rgb(245, 245, 245);
  text-decoration: underline;
  display: flex;
  align-items: center;
}
.order
{
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
display: flex;
flex-grow: 1;
width:84%;
padding-bottom: 3%;
padding-left: 3%;
padding-right: 3%;
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
    display: flex;
    flex-grow: 1;
    width: 80%;
    align-items: center;
}
.send button
{
  margin-top:3%;
  height: 50%;
  width: 100%;
  font-size: 3vh;
  border-radius: 15px;
  text-align: center;
  color: white;
  background-image: linear-gradient(270deg, rgb(155,51,84) 0%, rgb(58,44,105) 80%);
  border: none;
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
.total-end{
    flex-grow: 1;
    font-size: 7vh;
}

.total-start{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 2;
    font-size: 2.5vh;
}
.container{
  flex-wrap: wrap;
}

.cartdata .col{
  height: 100%;
  padding:  0 0;
}

.row{
  height: 8vh;

}

.image{
  width: 15%;
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
</style>