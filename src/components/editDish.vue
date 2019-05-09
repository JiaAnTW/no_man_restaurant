<template>
    <div class="editDdish">
        <b-button variant="dark" class="title" v-on:click="handleOpenClose">{{title}}</b-button>
         <div id="container" class="mt-2" :style="style">
             <b-form-group id="fieldset-3" description="Let us know your name." label="">
            <b-form-group id="fieldset-0" description="Let us know your name." label="餐點照片" >
                <div>
                    <img :src="image" class="dish-pic">
                    <input type="file" name="avatar" id="uppic" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)" ref="avatarInput" class="uppic">
                    <button v-on:click="clearImage">清除圖片</button>
                </div>
            </b-form-group>
            <b-form-group id="fieldset-1" description="Let us know your name." label="餐點名稱" label-cols="3" label-cols-lg="2" label-size="lg"  label-align-sm="right" label-for="input-1" :invalid-feedback="invalidFeedback" :valid-feedback="validFeedback" :state="state">
                <b-form-input id="input-1" v-model="name" :state="state" trim></b-form-input>
            </b-form-group>
            <b-form-group id="fieldset-2" description="Let us know your name." label="餐點價格" label-cols="3" label-cols-lg="1" label-size="lg" label-align-sm="right" label-for="input-2" :invalid-feedback="invalidFeedback" :valid-feedback="validFeedback" :state="state">
                <b-form-input id="input2" type="number" v-model="price" :state="state" trim></b-form-input>
            </b-form-group>
            <b-form-group id="fieldset-3" description="Let us know your name." label="餐點介紹" label-cols="3" label-cols-lg="1" label-size="lg"  label-align-sm="right" label-for="input-3" :invalid-feedback="invalidFeedback" :valid-feedback="validFeedback" :state="state">
                <b-form-input id="input-3" v-model="detail" :state="state" trim></b-form-input>
            </b-form-group>
            <b-form-group id="fieldset-4" description="Let us know your name." label="餐點介紹" label-cols="3" label-cols-lg="1" label-size="lg"  label-align-sm="right"  :invalid-feedback="invalidFeedback" :valid-feedback="validFeedback" :state="state">
                <b-form-radio v-model="type" name="radios" value="burger">漢堡</b-form-radio>
                <b-form-radio v-model="type" name="radios" value="drinks">飲料</b-form-radio>
                <b-form-radio v-model="type" name="radios" value="salad">沙拉</b-form-radio>
                <b-form-radio v-model="type" name="radios" value="fried">炸物</b-form-radio>
            </b-form-group>
            <button v-on:click="sendImage">送出</button>
            <button v-on:click="deleteDish">刪除</button>
            </b-form-group>
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
          style: {display: "none"},
          new: false
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
          url: '/api/post/menu',
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
    .editDish{
        width: 100rem;
        display: flex;
        flex-direction:column;
        -webkit-flex-direction:column;
        justify-content: center;
        -webkit-justify-content:center; 
        align-items: center;
        -webkit-align-items: center;   
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
</style>

