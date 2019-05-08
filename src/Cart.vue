<template>
    <div class="cart">
      <div class = "title">Your Cart</div>
      <div class = "order">
      <table>
      <tbody>
      <tr class=cartdata v-for = "cartdatas in lists"  :key="cartdatas">
      <td class="image">
      <img class="foodimg" src="./assets/beef.png" style="display:block; margin:auto;" alt="cartdatas.name" />
      </td>
      <td class="foodname">
       <h1>{{cartdatas.name}}</h1>
       <h1>${{cartdatas.price}}</h1>
      </td>

      <td class="num">
        <button  value="minus" v-on:click="handleNumberChange">-</button>
        <span>{{ cartdatas.num }}</span>
        <button  value="plus" v-on:click="handleNumberChange">+</button>
      </td>

      <td class="del">
      <button class="can" value="zero" v-on:click="handleNumberChange"></button>
      </td>
      </tr>
        </tbody>
      </table>
      </div>

      <div class = "total" v-for = "total in lists"  :key="total">
        <span class="l">Total:</span> 
        <span class="r">  $  {{tot}} </span>
      </div>
      <div class = "send">
        <button>Place your order</button>
      </div>
      <div class="ground"></div>
      
    </div>

    
</template>

<script>
export default {
  name: 'Cart',
  data () {
  return{
    lists:[
      {
      pos:0,
      checked:false,
			src: './assets/8.png',
			name:'墨西雙椒1',
			price:100,
			num: 0,
			saveandremove:true,
      type:'商品',
      },
      {
      pos:1,
      checked:false,
			src: './assets/8.png',
			name:'墨西雙椒2',
			price:120,
			num: 0,
			saveandremove:true,
      type:'商品',
      },
    ],
    cont:0,
    tot:0,
  }
},

 methods:{
    handleNumberChange: function(e){
      if(e.target.value==="plus" && this.lists[this.cont].num<9 )
        this.lists[this.cont].num++;
      else if(e.target.value==="minus" && this.lists[this.cont].num>0)
        this.lists[this.cont].num--;
      else if(e.target.value==="zero" && this.lists[this.cont].num>0)
        this.lists[this.cont].num=0;
      this.tot=lists[this.cont].num*lists[this.cont].price;
    },

    sum:function(e){
      this.tot=lists[this.cont].num*lists[this.cont].price;
    },

    counter:function(e){
      if(e.target.value==="add")
      this.cont++;
    },
    
 },


}
</script>
<style scope>

 button
{
  outline: none;
  z-index:3;
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

.cartdata{  z-index:10;  }

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

.cart ,.order{  display: flex;  }

.cart
{
font-family:'Trebuchet MS';
display: flex;
flex-direction:column;
-webkit-flex-direction:column;
}

.order button
{
  margin-top:3%;
  cursor:pointer;
}

.can
{
  position: absolute;
  height:10%;
  width: 16.5%;
  background-image: url('./assets/icon/can.png');
  background-position:50% 50%;
  background-repeat: no-repeat;
  background-size:  43% 90%;
  padding-left: 1%;
  padding-right: 1%; 
  z-index: 6;
}

.title
{
  position: absolute;
  top:15vh;
  left:34%;
  font-size: 6.5rem;
  font-family: 'Rye', 'cursive','Trebuchet MS';
  color:rgb(245, 245, 245);
  z-index:3;
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
z-index:3;
}

.order h1{  font-size: 3.5rem;  }

.order .foodname{  width:30vw;  }

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
  font-family: 'Trebuchet MS','細明體';
}

.order .num{  width:25vw;  }

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
font-family:'Trebuchet MS','標楷體';
color:rgb(245, 245, 245);
z-index:3;
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
z-index:3;
}

.send button
{
  margin-top:3%;
  height: 40%;
  width: 100%;
  font-size: 5.5rem;
  font-family:Trebuchet MS;
  border-radius: 15px;
  padding:1.6vw 21.5vw;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(189, 189, 189);
  cursor:pointer;
}

.send button:hover
{
  background-color:rgb(0, 0, 0);
  border-color: rgb(170, 170, 170);
  border-width: 1.5px;
  color:white;
}

.ground
{
  position: absolute;
  height:100%;
  width:100%;
  background-color: rgb(0, 0, 0);
  z-index:1;
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

.num span
{ 
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    width: 15rem;
    font-size: 6rem;
    vertical-align: -webkit-baseline-middle;
    text-align: center;
    color: rgb(0, 0, 0);
    font-family: 'Times New Roman';
}

</style>