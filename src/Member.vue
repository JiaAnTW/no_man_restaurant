<template>
    <div class="Member">
    <div id="first">  
      <div id="userpic">
        <div id="inner"></div>
        <br><br>
            <div  style="width:100%;text-align:center">
            <h1 style="color:white;font-size:22px" >S | B</h1>
        </div>
    </div>
    </div>

<div id="second">
        <form>
        <input type="text" v-model="email" placeholder="Email address" style="text-align: center" class="login-area">
        <br><br>
        <input type="password" v-model="password" placeholder="Password" style="text-align: center" class="login-area">
        <br><br><br><br>
        </form>
        <button id="log" @click="login">Log in</button> 
</div>

<div id="third">
    <span style="color:white"> New to Sun Burger? 
        <a href="https://www.facebook.com/Scratchburgertw/" style="color:white;font-size:15px">Sign up</a>
     </span>
   <button id="forget_pass">I forgot my password</button>
</div>
    </div>
</template>
<<script>
export default {
  data(){
    return{
    email:'',
    password:'',
    token:'',
    name:'',
  }
  },
  methods: {
    login:function(){
    var self=this;
    this.$axios({
      method: 'post',
      url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/login',
      data: {
        username:self.email,
        password:self.password,
      },
    }).then((res) => {
        this.token=res.data["token"];
        this.$emit('get-token',self.token);/*傳送代碼*/ 

      });
  },
    }
}
</script>>
<style scoped>

.Member{
  display:flex;
  background-color: rgb(48, 48, 48);
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
    /*border:solid 1px red;*/
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
  background-color:rgb(48, 48, 48);
  font-size: 15px;
  border: 0px;
  margin: 0px;
  padding:0px;
  color:white;
}

#forget_pass{
  background-color:rgb(48, 48, 48);
  border: 0px;
  margin-top: 5px;
  margin-bottom: 10px;
  padding:0px;
  color:white;
  font-size:10px;
}
</style>