<template>
    <modal width="80vw" height="40%">
        <div class="alert-container">
            <div class="message-container">
                <div class="message">{{content}}</div>
            </div>
            <div class="btn-area">
                <button>取消</button>
                <button>確認</button>
            </div>
        </div>
    </modal>
</template>

<script>
import Modal from "./Modal"
export default {
  props:["content","display"],
  components:{Modal},
  name: 'Alert',
  data(){
      return{
          show:{display:(this.display)?"block":"none"}
      }
  }
}
</script>
<style scope>
    .message-container{
        flex-grow: 1;
        width: 100%;     
        padding: 8vw 8vw;
    }
    .message{
        background-color: white;
        border-radius: 12px;
        height: 100%;
        display:flex;
        justify-content: center;
        align-items: center;
        font-size: 5vh;
        font-family: "Microsoft JhengHei";
    }
    .alert-container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .btn-area{
        width: 100%;
        height: 10vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .btn-area button{
        width: 30%;
        height: 50%;
        border-radius: 10px;
        border: none;
        background-color: rgb(45,45,45);
        color: white;
        font-family: "Microsoft JhengHei";
        font-size: 2vh;
    }
</style>
