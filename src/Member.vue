<template>
    <div class="Member">
    <div id="first">  
      <div id="userpic">
        <div id="inner"></div>
        <br><br>
            <div id="username" style="width:215px">
            <h1 style="color:white">SB: Test_Name</h1>
        </div>
    </div>
    </div>

<div id="second">
        <form>
        <input type="text" placeholder="Email address" style="text-align: center" class="login-area">
        <br><br>
        <input type="password" placeholder="Password" style="text-align: center" class="login-area">
        <br><br><br><br>
        </form>
        <button id="log">Log in</button> 
</div>

<div id="third">
    <span style="color:white"> New to Sun Burger? 
        <a href="https://www.facebook.com/Scratchburgertw/" style="color:white">Sign up</a>
     </span>
   <button id="forget_pass">I forgot my password</button>
</div>
    </div>
</template>

<style scoped>

.Member{
  display:flex;
  background-color: black;
  flex-grow:1;
  -webkit-flex-grow:1;
  justify-content: center;/*置中*/
  flex-direction:column;/*垂直排法*/
  -webkit-flex-direction:column;   
}

#first{
    display: flex;
    flex-grow:3;
    -webkit-flex-grow:3;
    justify-content: center;
     align-items: center;
    -webkit-align-items: center;
    /*border: 1px solid red;*/
}

#second{
    display: flex;
    flex-grow:2;
    -webkit-flex-grow:2;
    justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    flex-direction:column;
    -webkit-flex-direction:column;
    /*border: 1px solid yellow;   */
}

#third{
    display: flex;
    flex-grow:1;
    -webkit-flex-grow:1;
    justify-content: center;
    align-items: flex-start;
    -webkit-align-items: center;
    flex-direction:column;
    -webkit-flex-direction:column; 
    font-size:15px; 
   /* border: 1px solid green; */
}

#userpic{
    display: inline-block;
    width: 100px;
    height:100px;
    border-radius: 50%;
    padding: 5px;
    background:#fff;
}

#inner {
    background-image:url("./assets/icon/no_user.png");
    background-size:cover;
    background-position:center center;
    height: 100%;
    border-radius:50%;
}

.login-area{
    background-color:white;
    border-radius: 5px;
    height: 25px; 
    width: 240px;
}

#log {
  display: flex;
  justify-content: center;
  background-color:black;
  border: 0px;
  margin: 0px;
  padding:0px;
  color:white;
}

#forget_pass{
  background-color:black;
  border: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding:0px;
  color:white;
  font-size:15px;
}
</style>