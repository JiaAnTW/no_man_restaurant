<template>
<div class="total">
    <div id="header">
        <h1 style="color:white;font-size:5.5rem">Your Order</h1>
    </div>

    <div id="member_info">
      <div class="adj"></div>
       <div class="adj"></div>
       <div id="name"> 
           <h1 style="font-size:5.5rem"> Name: {{name}}</h1>
       </div>

        <div id="adj_pos">
            <div id="userpic">
                <div id="inner"></div>
            </div>
        </div>
       
    </div>

    <div id="item">
        <div class="data">
            <div class="adj"></div>
            <div class="adj"></div>
               <div id="money">
                    <h1 style="color:white;font-size:5.5rem;"> Total: ${{money}} NTD</h1> 
               </div> 
                <div class="adj"></div>
                <div class="adj"></div>
        </div>
          
        <div class="data">
            <div class="adj"></div>  
            <div class="adj"></div>
               <div id="number"> 
                <h1 style="color:white;font-size:5.5rem"> Guest Number: {{guest_number}}</h1>
               </div>
             <div class="adj"></div>
             <div class="adj"></div>
        </div>
    </div>

    <div id="arrive_time">
        <div class="adj"></div>
            <div class="adj"></div>
            <div class="msg-container">
                <div id="order_msg">
                    <h1 style="color:white;font-size:4.5rem"> Order can be picked in:
                    </h1> 
                </div>
                <span id="order_time">{{timeshow}}</span> 
            </div>
    </div>
</div>
</template>


<script>
export default {
  name: 'Total',
  props:['bill-data'],
  data () {
    return {
      time: null,
      name:this.billData.name,
      money:this.billData.amount,
      guest_number:this.billData.guest_id
    }
  },
  methods:{
    esttime:function(){
    if(this.time>0)
      this.time=Math.floor((this.billData.time-Date.now())/(1000*60));
    else if(this.time==null)
        this.time=this.time; 
    else
        this.time=0; 
    }
  },

  computed: {
      timeshow:function(){
        if(this.time>0)
            return this.time+" min";
        else if( this.time===0)
            return "餐點已完成";
        else
            return "餐點已完成";
      }
  },

   mounted() {
       this.time=this.billData.time;
    this.esttime();
    setInterval(this.esttime.bind(this) , 1000)    
    },
}
</script>

<style scoped>
.total{
    display: flex;
    flex-grow: 1;
    -webkit-flex-grow:1;
    flex-direction:column;
    -webkit-flex-direction:column;
    background-color:rgb(48, 48, 48); 
}

.data{
    display: flex;
    align-items: center;
    flex-grow: 1;
    
}

.adj{
   width: 18px;
   /*border: solid 1px red;*/
}

#money{
    font-size: 8px;
    text-decoration: none;
    border-bottom: 0.1px solid white;
    justify-content: flex-start;
    align-self: center;
    flex-grow:1;
}

#number{
    font-size: 8px;
    text-decoration: none;
    border-bottom: 0.1px solid white;
    justify-content: flex-start;
     align-self: flex-start;
    flex-grow:1;
}   

#name{
    font-family: 'Microsoft JhengHei';
    color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-grow: 4;
    align-items: center;
    font-size: 10px;
}

#name h1{
    font-family: 'Microsoft JhengHei';
}

#header{
    display: flex;
    align-items: center;
    -webkit-align-item:center;
    justify-content: space-around;
    -webkit-justify-item:space-around; 
    flex-grow: 0.5;
}

#member_info{
    display: flex;
    flex-grow: 0.1;
    background-color:#eee;
    /*border: solid 1px red;*/
}

#adj_pos{
    justify-content: center;
    -webkit-justify-item:center;
    align-items: center;
    -webkit-align-item:center;
    flex-grow: 1;
}

#userpic{
    display: inline-block;
    width: 100px;
    height:100px;
    border-radius: 50%;
    padding: 5px;
    background-color:white;
}

#inner{
    background-image: url("./assets/icon/no_user.png");
    border-radius:50%;
    background-position: center center;
    background-size: cover;
    height: 100%;
}

#item{
    display: flex;
    flex-grow: 2;
    flex-direction:column;
    -webkit-flex-direction:column;
    /*border: solid 1px red;*/
}

#arrive_time{
    display: flex;
    justify-content: flex-start;
    flex-grow: 2;
    align-items: center;
   /* border: solid 1px red;*/
}

.msg_container{
    width: 100%;
}

#order_msg{
    text-decoration: none;
    border-bottom: 0.1px solid white;
}

#order_time{
    font-size:7rem;
    color: white;
    position: absolute;
    right:7%;
    bottom: 18vh;
}
</style>