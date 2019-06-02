<template>
    <div class="Pay">
        <b-container>
            <b-row class="title">
                <b-col class="head">
                    <img class="memberhead" src= "../assets/burger.jpg" />
                                    <h1>Payment</h1>
                </b-col>

            </b-row>
            <!--vvv 按鈕 vvv-->
            <b-row>
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
                <button></button>
              </b-col>
              <b-col></b-col>
            </b-row>
            <!--^^^ 按鈕 ^^^-->
  
        </b-container>
        
    </div>
</template>

<script>
export default {
  name: 'Pay',
  data () {
  return{
      
  }
},
 methods:{

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

}

.title{
  width:100%;
  height: 18vh;
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
height: 8vh;
width: 8vh;
border-radius: 100%;
box-shadow: 0px 4px 6px 0px #b3b3b3;
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
</style>