<template>
<div class="total">
    <div id="header">
        <h1 style="color:white">Your Order</h1>
    </div>

    <div id="member_info">
      <div class="adj"></div>
       <div id="name"> 
           <h1> Name: {{name}}</h1>
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
               <div class="mid">
                <h1 style="color:white"> Total: ${{money}} NTD</h1> 
               </div> 
                <div class="adj"></div>
                <div class="adj"></div>
        </div>
          
        <div class="data">
            <div class="adj"></div>  
               <div class="mid"> 
                <h1 style="color:white"> Guest Number: {{guest_number}}</h1>
               </div>
             <div class="adj"></div>
             <div class="adj"></div>
        </div>
    </div>

    <div id="arrive_time">
            <div class="adj"></div>
            <div id="order_msg">
                <h1 style="color:white "> Order can be picked in:
                </h1> 
            </div>
            <span id="order_time">{{time}} <span style="font-size:30px">min</span></span> 
    </div>
</div>
</template>


<script>
export default {
  name: 'Total',
  data () {
    return {
      time: 20,
      name: 'Default_Name',
      money: 220,
      guest_number:24066250,
    }
  },
  methods:{
    
  }
}
</script>

<style scoped>
.total{
    display: flex;
    flex-grow: 1;
    -webkit-flex-grow:1;
    flex-direction:column;
    -webkit-flex-direction:column;
    background-color: black; 
}

.data{
    display: flex;
    align-items: center;
    flex-grow: 1;
}

.adj{
   width: 20px;
}

.mid{
    font-size: 8px;
    text-decoration: none;
    border-bottom: 0.1px solid white;
    justify-content: flex-start;
    flex-grow:1; 
}
      
#name{
    display: flex;
    flex-grow: 4;
    align-items: center;
    font-size: 10px;
}

#header{
    display: flex;
    align-items: center;
    -webkit-align-item:center;
    justify-content: space-around;
    -webkit-justify-item:space-around; 
    flex-grow: 0.2;
    font-size: 8px;
}

#member_info{
    display: flex;
    flex-grow: 0;
    background-color:#eee;
}

#adj_pos{
    justify-content: center;
    flex-grow: 2;
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
    background-image: url("./assets/logo.png");
    border-radius:50%;
    background-position: center center;
    background-size: cover;
    height: 100%;
}

#item{
    display: flex;
    flex-grow: 1;
    flex-direction:column;
    -webkit-flex-direction:column;
}

#arrive_time{
    display: flex;
    justify-content: flex-start;
    flex-grow: 2;
    align-items: center;
}

#order_msg{
    font-size: 6px;
    text-decoration: none;
    border-bottom: 0.1px solid white;
}

#order_time{
    font-size: 55px;
    color: white;
    position: absolute;
    right:15%;
}
</style>