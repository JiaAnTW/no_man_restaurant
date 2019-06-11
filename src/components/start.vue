<template>
    <div class="start" :style="showLoading">
        <div class="content">
            <img class="icon" src="../assets/icon/icon.png"/>
            <h2>We know all the secrets of delicious food</h2>
            <div class="body-container">
                <div class="circle-border">
                    <div class="circle">
                        <img class="burger" src="../assets/beef.png" alt="burger"/>
                    </div>
                </div>
            </div>
            <div class="foo-container">
                Sun Burger
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Start',
  props: ['show'],
  data () {
  return{
      backgroundColor:[
        "linear-gradient(270deg, #f11ca0 0%, #2013f6 100%)",
        "linear-gradient(270deg, #f19b3d 0%, #2013f6 100%)",
        "linear-gradient(270deg, #f0a133 0%, #f42033 100%)",
        "linear-gradient(270deg, #f42033 0%, #270540 100%)",
        "linear-gradient(270deg, #6ce1b9 0%, #673ceb 100%)",
        ],
        showLoading:{display:"block",opacity:"1"}
  }
},
 methods:{

 },
 watch:{
     show:function(){
         this.showLoading={display:"block",opacity:"0"};
         setTimeout(()=>{this.showLoading={display:"none",opacity:"0"}},1000)
     }
 },
 mounted(){

 }
}
</script>

<style scoped>
    .start,.content,.header-container,.body-container,.foo-container{
        width: 100vw;
    }

    .start{
        position: absolute;
        top:0;
        left: 0;
        height: 100vh;
        background-image: linear-gradient(225deg, rgb(155,51,84) 0%, rgb(58,44,105) 80%);
        padding-top: 10vh;
        -webkit-transition: opacity 1s ease-in-out;
        -moz-transition: opacity  1s ease-in-out;
        -o-transition: opacity  1s ease-in-out;
        transition: opacity  1s ease-in-out; 
    }
    .content{
        width: 100vw;
        height: 80vh;
    }
    .content,.header-container,.circle,.circle-border,.foo-container,.body-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .header-container{
        flex-grow: 2;
        justify-items: flex-end;
    }
    .body-container{
        flex-grow: 7;
    }
    .foo-container{
        flex-grow: 1;
        color: white;
        font-size: 4vh;
        justify-content: flex-start;
    }
    h2{
        color: white;
        font-size: 1.7vh;
        height: 4vh;
        line-height: 4vh;
    }
    .icon{
        width: 10vh;
        height: 10vh;
        border-radius: 50%;
    }
    .circle-border{
        border-radius: 50%;
        width: 55vh;
        height: 33.5vh;
        vertical-align: middle;
        border: 1px solid rgba(243,243,243,0.3);
        flex-grow: 1;
    }
    .burger{
        width: 60%;
    }
    .circle{
        width: 75%;
        height: 75%;
        background-color: rgba(243,243,243,0.105);
        border-radius: 50%;
    }

</style>