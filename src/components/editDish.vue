<template>
    <div class="edit-dish">
        <b-container class="con">
            <b-form-group id="fieldset-1"  label="餐點名稱" label-cols="3" label-cols-lg="3" label-size="lg"  label-align-sm="right" label-for="input-1" >
                <b-form-input id="input-1" v-model="name" trim></b-form-input>
            </b-form-group>
            <b-form-group id="fieldset-2"  label="餐點價格" label-cols="3" label-cols-lg="3" label-size="lg" label-align-sm="right" label-for="input-2" >
                <b-form-input id="input2" type="number" v-model="price" trim></b-form-input>
            </b-form-group>
            <b-form-group id="fieldset-3"  label="餐點介紹" label-cols="3" label-cols-lg="3" label-size="lg"  label-align-sm="right" label-for="input-3" >
                <b-form-textarea id="input-3" v-model="detail" rows="8"></b-form-textarea>
            </b-form-group>
            <b-form-group id="fieldset-4"  label="餐點類別" label-cols="3" label-cols-lg="3" label-size="lg"  label-align-sm="right" >
                <b-form-select v-model="type" :options="options"></b-form-select>
            </b-form-group>
        </b-container>
        <div class="right">
         <div id="container" :style="style">
             <b-form-group id="fieldset-3"  label="">
                <div  class="picture">
                  <img :src="image" class="dish-pic">
                </div>
                <div  class="pic-selector">
                  <input type="file" name="avatar" id="uppic" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)" ref="avatarInput" class="uppic">
                  <button v-on:click="clearImage">清除圖片</button>
                </div>
            </b-form-group>
          </div>
          <div class="interact"></div>
          <div class="btn-con">
            <button v-on:click="deleteDish">取消</button>
            <button v-on:click="sendImage">送出</button>
          </div>
        
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
Vue.prototype.$axios = axios
export default {
  name: 'editDish',
  props: ["data","key"],
  data(){
      return{
          id:0,
          title:'',
          name:'',
          price: 0,
          detail:'',
          type:'',
          image: require('../assets/noPic.png'),
          isImage: false,
          style: {display: "block"},
          new: false,
          options: ["漢堡","飲料","沙拉","炸物"],
          comments: {}
      }
    },
  computed: {
      state() {
        return true;
      },
      invalidFeedback() {
        if (this.name.length > 4) {
          return true;
        } else if (this.name.length > 0) {
          return true;
        } else {
          return true;
        }
      },
      validFeedback() {
        return this.state === true ? true : true;
      }
    },
    methods: {
      getComment(){
          this.$axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/feedback',
            data: {
                id: 2
            },
        })//等到get後才執行接下來的code
        .then((res)=>{
            var size=0;
            res.data.data.forEach(Element=>{
              size++;
            })
            const test=res.data.data[size-1]
            var nameArray=[]
            test.productName.forEach(items=>{
                nameArray.push(items.name)
            });
            console.log(Array.isArray(nameArray))
            const getData=new Promise(resolve=>{
                this.$emit("get-food",nameArray)
                resolve()
                //console.log(nameArray)
            })
            getData.then(resolve=>{
                this.order=test.productName.map((items,id)=>{ 
                    return {
                        src:this.find[0][id].image,
                        name:this.find[0][id].name,
                        price:this.find[0][id].price,
                        amout: items.amount
                    }
                })
            })
            console.log("find is "+this.find)

        })
      },
      handleOpenClose: function(){
        if(this.style.display==="none")
          this.style.display="block";
        else
          this.style.display="none";
      },
      sendImage: function(){
        this.title=this.name;
        var self=this;
        const method=(this.new===true)?"post":"put";
        const route=(this.new===true)?"add":"edit";
        const compareImg=require('../assets/noPic.png');
        this.$axios({
        method: method,
        url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/'+route,
        //url: '/api/post/'+route,
        data:{
            id:self.id,
            name: self.name,
            price: self.price,
            detail: self.detail,
            image: (self.isImage==false)?null:self.image,
            type: self.type
        }
      })
      .then((res) => {
            
        });
      },
      changeImage:function(e) {
        var file = e.target.files[0]
        var reader = new FileReader()
        var self = this
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          self.image = this.result
          self.isImage=true;
        }
      },
      clearImage:function(){
        this.isImage=false;
        this.image=require('../assets/noPic.png');
      },
      deleteDish: function(){
        var self=this;
        var check = confirm("確定要刪除?");
        if(check==true){
          this.$axios({
          method: "delete",
          url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/menu',
          //url: '/api/post/menu',
          data:{
              id:self.id,
          }
        })
        .then((res) => {
           
          });
        this.$emit('delete-dish',self.id);
        }
      },
  },
  watch:{
    data:function(){
        this.id=this.data.id;
      this.title=this.data.name;
      this.name=(this.data.name==="點擊編輯新餐點")?'':this.data.name;
      this.image=(this.data.image==null)?require('../assets/noPic.png'):this.data.image;
      this.price=this.data.price;
      this.detail=this.data.detail;
      this.isImage=(this.data.image==null)?false:true;
      this.new=(this.data.name==="點擊編輯新餐點")?true:false;
    }
  },
  mounted:function(){
      console.log(this.data)
      this.id=this.data.id;
      this.title=this.data.name;
      this.name=(this.data.name==="點擊編輯新餐點")?'':this.data.name;
      this.image=(this.data.image==null)?require('../assets/noPic.png'):this.data.image;
      this.price=this.data.price;
      this.detail=this.data.detail;
      this.isImage=(this.data.image==null)?false:true;
      this.new=(this.data.name==="點擊編輯新餐點")?true:false;
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC');
    .edit-dish{
        width: 100%;
        display: flex;
        justify-content: center;
        -webkit-justify-content:center; 
        align-items: center;
        -webkit-align-items: center;   
    }
    .con{
      flex-grow: 1;
      border: 0.2vw solid rgb(22, 217, 173);
      height: 95vh;
      display: flex;
      margin:2vh 1vw 3vh 1vw;
      flex-direction: column;
        justify-content: space-around;
        -webkit-justify-content:space-around; 
        align-items: flex-start;
        -webkit-align-items: flex-start;
    }
    .form-control{
      border: 0.2vw solid rgb(84,177,244);
      border-radius: 2vh;
    }
    .custom-select{
      border: 0.2vw solid rgb(84,177,244);
      border-radius: 3vh;
    }
    label{
      font-family: 'Microsoft JhengHei';
    }

    .content input{
      border: 0.2vw solid rgb(84,177,244);
      border-radius:3vh; 
    }
    .picture{
      flex-grow: 1;
      border: 0.2vw solid rgb(22, 217, 173);
      border-radius: 3vh;
      width:25vw;
      height:25vw;
      margin:2vh 1vw 1vh 0vw;
      padding:4vw;
    }
    .title{
        width: 100%;
        border-radius: 0;
        border: 0.5px solid white;
        height: 15vh;
        font-size: 5rem;
        font-family: 'Noto Sans TC';
    }
    .dish-pic{
      width: 100%;
    }
    .form-group{
      width: 100%;
      font-family: 'Microsoft JhengHei';
    }
    .form-row legend{
      font-family: 'Microsoft JhengHei';
    }

    .right{
      height: 100vh;
      flex-grow: 1;
      display: flex;
      border:transparent;
      flex-direction: column;
        justify-content: space-around;
        -webkit-justify-content:space-around; 
        align-items: flex-start;
        -webkit-align-items: flex-start;

    }
    .pic-selector{
      flex-grow: 1;
      width: 100%; 
      display: flex;
      justify-content: center;
      -webkit-justify-content:center; 
      align-items: flex-end;
      -webkit-align-items: flex-end;
      color: rgb(84,177,244);
    }
    .pic-selector button,.uppic{
      border:0;
      background-color: rgb(84,177,244);
      color: white;
      font-family: 'Microsoft JhengHei';
      width: 10vw;
      border-radius:3vh;
      height:5vh;
      margin:0 0.7vw 0 0.7vw; 
    }
    .interact{
      width:25vw;
      height:50vh;
      border: 0.2vw solid rgb(22, 217, 173);
      margin:1vh 1vw 1vh 0;
      border-radius: 3vh;
    }
    .btn-con{
        flex-grow: 1;
        width: 100%; 
        display: flex;
        justify-content: center;
        -webkit-justify-content:center; 
        align-items: flex-end;
        -webkit-align-items: flex-end;
        margin: 1vh 0 3vh 0;
    }   
    .btn-con button{
      border:0;
      background-color:rgb(22, 217, 173);
      color: white;
      font-family: 'Microsoft JhengHei';
      width: 10vw;
      border-radius:3vh;
      height:5vh;
      margin:0 0.7vw 0 0.7vw; 
    }

    

</style>

