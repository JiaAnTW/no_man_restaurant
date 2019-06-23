<template>
    <div class="Member">
      <div id="first">  
        <div id="userpic">
          <div id="inner"></div>
            <br><br>
              <div  style="width:100%;text-align:center">
              <h1 style="color:white;font-size:3.5vh" v-if="!onPay" >S | B</h1>
          </div>
        </div>
      </div>

      <div id="second">
          <form>
          <input type="text" v-model="email" placeholder="Email address"/>
          <br><br>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" style="backgroundColor:rgb(75,75,75);color:white;" class="login-area">
          <br><br><br><br>
          </form>
          <button id="log" @click="login" :style="color">Log in</button> 
      </div>

      <div id="third">
        <span :style="color"> New to Sun Burger? 
          <button :style="color" @click="signUp">Sign up</button>
     </span>
   <button id="forget_pass" :style="color">I forgot my password</button>
</div>
    </div>
</template>
<<script>
export default {
  props:["onPay"],
  data(){
    return{
    email:'',
    password:'',
    phone:'',
    token:'',
    name:'',
  }
  },
  computed: {
    color:function(){
      return (this.onPay)?{color:"rgb(48, 48, 48)"}:{color:"rgb(255, 255, 255)"};
    },
    backgroundColor:function(){
      return (this.onPay)?{backgroundColor:"white"}:{backgroundColor:"rgb(48, 48, 48)"};
    }
  },
  methods: {
    login:function(){
    var self=this;
    this.$axios({
      method: 'post',
      url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/login',
      //url: '/api/post/login',
      data: {
        username:self.email,
        password:self.password,
      },
    }).then((res) => {
        this.token=res.data["token"];
        this.$emit('get-token',self.token);/*傳送代碼*/ 
        if(this.onPay)
          this.$emit('change-page',50);

      });
  },
    signUp:function () {
        this.$emit('change-now-at',"signUp");
      }
    }
}
</script>>
<style scoped>

.Member{
  display:flex;
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
    align-items: center;
    -webkit-align-items: center;
    flex-direction:column;
    -webkit-flex-direction:column; 
    font-size:2.2vh; 
}

#userpic{
    display: inline-block;
    width: 10.5em;
    height:10.5em;
    border-radius: 50%;
    
}

#inner {
    background-image:url("./assets/icon/icon.png");
    background-size:cover;
    background-position:center center;
    height: 100%;
    border-radius:50%;
}

form{
  width: 64%;
}

#second input{
    padding-left: 6%; 
    background-color:white;
    border-radius: 10px;
    height: 3.4vh; 
    width: 100%;
    box-shadow: none;
    border: none;
}

#log {
  display: flex;
  justify-content: center;
  background-color:rgba(0, 0, 0, 0);
  font-size: 2.2vh;
  border: 0px;
  margin: 0px;
  padding:0px;
  color:white;
}

.login-area::placeholder{
  color: white;
}

span button{
  border: none;
  background-color: transparent;
  font-size:2.2vh;
}

#forget_pass{
  border: 0px;
  margin-top: 0.65vh;
  margin-bottom: 1.3vh;
  padding:0px;
  background-color: rgba(0, 0, 0, 0);
  font-size:1.2vh;
}
</style>