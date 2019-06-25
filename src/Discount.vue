<template>
    <div class="discount">
        <div class="list">
            <h1>當前折扣</h1>
            <b-list-group>
              <b-list-group-item button href="#" class="flex-column align-items-start" v-for="(element,index) in discount" :key="index" @click="viewSingleDicount(index)">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{element.reason}}</h5>
                </div>
                <p class="mb-1">
                  折扣條件 : {{discountName[index][0]}}
                </p>
                <p class="mb-12">
                  折扣內容 : {{discountName[index][1]}}
                </p>
                <small>優惠編號 {{element.id}} </small><br/>
                <small>點擊以編輯/查看詳細</small>
              </b-list-group-item>
            </b-list-group>
            <button class="add" v-if="viewTarget!=discount.length" @click="reFlashDish">新增折扣</button>
            <button class="add" v-else style="height:4vw;width:17vw">更改右方內容並送出 即可新增折扣<br/>點選上方折扣即可返回編輯</button>
        </div>
        <div class="edit">
          <div class="type">
            <h1>Step1: 選擇折扣類型</h1>
            <div class="choose-type">
              <div class="condition">
                <b-form-select v-model="condition" :options="optionA" name="hi">
                  <template slot="first">
                    <option :value="null" selected disabled>-- 選擇折扣條件--</option>
                  </template>
                  </b-form-select> 
              </div>
              <b-form-input class="x-y" v-model="x" placeholder="輸入x的值" v-if="condition!=3"></b-form-input>
              <div class="policy">
                <b-form-select v-model="policy" :options="optionB" name="hi">
                  <template slot="first">
                    <option :value="null" selected disabled>-- 選擇折扣方案--</option>
                  </template>
                  </b-form-select> 
              </div>
              <b-form-input class="x-y" v-model="y" placeholder="輸入y的值"></b-form-input>
              </div>
          </div>
          <div class="target">
            <div class="choose-A">
              <h1>Step2: 選擇A</h1>
              <b-container class="list-A-B">
                    <b-form-group>
                      <b-form-checkbox-group v-model="fliterA" :options="listFliter" name="flavour-1a "></b-form-checkbox-group>
                    </b-form-group>
                    <b-container class="option-container">
                    <b-form-group class="list-A">
                      <b-form-checkbox-group v-model="selectA" :options="menu" name="flavour-1a " stacked></b-form-checkbox-group>
                    </b-form-group>
                    </b-container>
              </b-container>
            </div>
            <div class="choose-B">
              <h1>Step3: 選擇B</h1>
                <b-container class="list-A-B">
                    <b-form-group>
                      <b-form-checkbox-group v-model="fliterB" :options="listFliter" name="flavour-1b "></b-form-checkbox-group>
                    </b-form-group>
                    <b-container class="option-container">
                    <b-form-group class="list-B">
                      <b-form-checkbox-group v-model="selectB" :options="menu" name="flavour-1b " stacked></b-form-checkbox-group>
                    </b-form-group>
                    </b-container>
                </b-container>
            </div>
            
          </div>
          <div class="result">
            <h1>Step4: 填寫理由並送出</h1>
            <div class="choose-type step4">
              折扣理由:<b-form-input class="topic" v-model="reason" placeholder="折扣的理由"></b-form-input>
              <button @click="editDiscount">送出</button><button @click="deleteDish">刪除</button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Food from "./Food"
import Vue from "vue";
import editDish from "./components/editDish";
Vue.prototype.$axios = axios
export default {
  name: 'Discount',
  components: {editDish,Food},
  data(){
      return{
          discount:[
            {reason: "老闆不在家",id:0,policy: 2,condition: 2,x: 2,y: 1,selectA:[0,1,2],selectB:[3,5]},
            {reason: "老闆回家了",id:1,policy: 2,condition: 2,x: 2,y: 1,selectA:[0,1,4],selectB:[3,5,7]}
          ],
          menu: [],
          searchfood: "",
          viewTarget: 0,
          listFliter:[
            {text:"全選",value:"all"}
          ],
          x:0,
          y:0,
          reason:"",
          fliterA:[],
          fliterB:[],
          selectA:[],
          selectB:[],
          condition:null,
          policy: null,
          optionA:[
            {text:"消費滿 x 元",value:0},
            {text:"買 x 個A(任選)",value:1},
            {text:"買 x 個A(指定A為單一品項)",value:2},
            {text:"買 x 組A(指定A組合)",value:3},
            {text:"給予前次消費評價",value:4},
          ],
          optionB:[
            {text:"B打 y 折",value:0},
            {text:"送 y 個B(指定B為單一品項)",value:1},
            {text:"送 y 組B(指定B組合)",value:2},
          ]
      }
  },
  watch:{
    fliterA:function(){
      this.selectA=[];
      this.menu.forEach(Element=>{
        this.fliterA.forEach(item=>{
          if(Element.type===item)
            this.selectA.push(Element.value)
        })
      })
      this.fliterA.forEach(item=>{
      if(item==="all"){
          this.selectA=[];
          this.menu.forEach(Element=>{
            this.selectA.push(Element.value)
          })
        }
      })
    },
    fliterB:function(){
      this.selectB=[];
      this.menu.forEach(Element=>{
        this.fliterB.forEach(item=>{
          if(Element.type===item)
            this.selectB.push(Element.value)
        })
      })
      this.fliterB.forEach(item=>{
      if(item==="all"){
          this.selectB=[];
          this.menu.forEach(Element=>{
            this.selectB.push(Element.value)
          })
        }
      })
    }
  },
  computed:{
    discountName:function(){
      return this.discount.map(Element=>{
        return[
          this.optionA[Element.condition].text.replace("x", Element.x),
          this.optionB[Element.policy].text.replace("y", Element.y)
          ]
      })
    }
  },
  methods:{
      reFlashDish:function(){
        this.condition=0;
        this.policy=0;
        this.x=0;
        this.y=0;
        this.selectA=[];
        this.selectB=[];
        this.viewTarget=this.discount.length;
        this.reason="";        
      },
      editDiscount:function(){
        var self=this;
        const method=(this.viewTarget===this.discount.length)?"post":"put";
        const route="discount";
        var selectA='';
        this.selectA.forEach((Element,index)=>{
          selectA+=Element;
          selectA+=",";
        })
        var selectB='';
        this.selectB.forEach((Element,index)=>{
          selectB+=Element;
          selectB+=",";
        })
        this.$axios({
        method: method,
        url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/'+route,
        //url: '/api/post/'+route,
        data:{
            reason: this.reason,
            id:this.viewTarget,
            policy: this.policy,
            condition: this.condition,
            x: this.x ,y: this.y,
            selectA:selectA,selectB:selectB
        }
        })
          if(this.viewTarget===this.discount.length){
            this.discount.push(
              {
                reason: this.reason,
                id:this.viewTarget,
                policy: this.policy,
                condition: this.condition,
                x: this.x ,y: this.y,
                selectA:this.selectA,selectB:this.selectB
              }
              
            )
          }
          else{
            this.discount[this.viewTarget]={
                reason: this.reason,
                id:this.viewTarget,
                policy: this.policy,
                condition: this.condition,
                x: this.x ,y: this.y,
                selectA:this.selectA,selectB:this.selectB
              }
          }      
      },
      deleteDish:function(id){
        var self=this;
        this.$axios({
        method: "delete",
        url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/discount',
        //url: '/api/post/'+route,
        data:{
            id:this.viewTarget,
        }
        })
      },
      viewSingleDicount: function(id){//當點擊Food.vue的其中一個block後，用這個function把選擇的餐點傳入order.vue
        this.condition=this.discount[id].condition;
        this.policy=this.discount[id].policy;
        this.x=this.discount[id].x;
        this.y=this.discount[id].y;
        this.selectA=this.discount[id].selectA;
        this.selectB=this.discount[id].selectB;
        this.viewTarget=this.discount[id].id;
        this.reason=this.discount[id].reason;
      },
  },
  mounted: function(){
    var self=this;
    this.$axios({
      methods: 'get',
      url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/menu',
      //url: '/api/get/menu',
      })
      .then((res) => {
        self.menu =res.data.map(Element=>{
          if(this.listFliter.length==1)
            this.listFliter.push({text:Element.type,value:Element.type})
          else{
            var isFind=false;
            for(let i=0;i<this.listFliter.length;++i){
              if(this.listFliter[i].value==Element.type ){
                isFind=true
                break;
              }
            }
            if(!isFind &&  Element.type !="")
              this.listFliter.push({text:Element.type,value:Element.type});
          }
          return{
            value:Element.id,
            text:Element.name,
            price:Element.price,
            type:Element.type,
          } ;
        })
    });
    /* finish get menu*/

    this.$axios({
      methods: 'get',
      url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/discount',
      //url: '/api/get/discount',
      })
      .then((res) => {
        this.discount =res.data.map(Element=>{
          var selectA=Element.selectA.split(",")
          selectA=selectA.map(item=>{
            return Number(item)
          })
          var selectB=Element.selectB.split(",")
          selectB=selectB.map(item=>{
            return Number(item)
          })
          return{
            reason: Element.reason,
            id:Element.id,
            policy: Element.policy,
            condition: Element.con,
            x: Element.x,y: Element.y,
            selectA:selectA,selectB:selectB
          } ;
        })
        this.viewSingleDicount(0)
    }); 
  },
}
</script>

<style scoped>
.discount,.target,.type,.choose-type,.result{
  display: flex;
}
.edit{
  flex-grow: 3;
  flex-direction: column;
  border: 0.4vw solid rgb(22, 217, 173);
  border-radius: 20px;
}



.list,.choose-A,.type,.choose-B{
  flex-grow: 1;
  height: 100vh;
  padding: 2% 2%;
}

.list{
  border: 0.4vw solid rgb(84,177,244);
  border-radius: 20px;
  width: 20vw;
  overflow-y: scroll;
}

.list::-webkit-scrollbar,.list-A::-webkit-scrollbar,.list-B::-webkit-scrollbar
{
  width: 3px;
  background-color: transparent;
  border: none;
}

.list::-webkit-scrollbar-thumb,.list-A::-webkit-scrollbar-thumb,.list-B::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  background-color: rgba(45, 45, 45,0.2);
  opacity: 0.5;
}

.list::-webkit-scrollbar-track,.list-A::-webkit-scrollbar-track,.list-B::-webkit-scrollbar-track
{
background-color: transparent;
border: 0px solid;
}

.list::-webkit-scrollbar-track-piece,.list-A::-webkit-scrollbar-track-piece,.list-B::-webkit-scrollbar-track-piece{
 /* 4 */ 
 border: none;
}

.choose-A{
  
}

.choose-A,.choose-B{
  height: 60vh;
  max-width: 35vw;
}

.type{
  border-bottom: 0.1vw solid rgba(22, 217, 173,0.8);
  height: 18vh;
}
.choose-B{
  border-left: 0.1vw solid rgba(22, 217, 173,0.8);
  
}


.type,.result{
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}

.choose-type{
  justify-content: center;
  width: 100%;
}

.condition,.policy{
  width: 30%;
}

.x-y{
  width: 10%
}

.list-A-B{
  height:40vh;
  max-width: 30vw;

  flex-direction: column;
}

.list-A,.list-B{
  overflow-y: scroll;
  height:40vh;
  width: 100%;
}


.result{
  height: 20vh;
  border-top: 0.1vw solid rgba(22, 217, 173,0.8);
  padding: 2% 2%;
}

.step4{
  width: 80%;
}

.add{
  width: 100%s;
}

h1{
  font-family: 'Microsoft JhengHei';
  margin-bottom: 1vw;
  font-size: 1.5vw;
  color: rgb(45, 45, 45);
}

.list-group{

}

.list-group p,.list-group div{
  font-family: 'Microsoft JhengHei';
}

.list-group h5{
  font-weight: 600;
}

.result input{
  font-family: 'Microsoft JhengHei';
}

.step4{
  justify-content: space-evenly;
  width: 100%;
}

.result button{

    border:0;
      background-color:rgb(22, 217, 173);
      color: white;
      font-family: 'Microsoft JhengHei';
      width: 10vw;
      border-radius:3vh;
      height:5vh;
      margin:0 0.7vw 0 0.7vw; 
}

.add{
      border:0;
      background-color: rgb(84,177,244);
      color: white;
      font-family: 'Microsoft JhengHei';
      width: 10vw;
      border-radius:3vh;
      height:5vh;
      margin:0.7vw 0.7vw 0 0.7vw; 
}

span{
  font-family: 'Microsoft JhengHei';
}

.option-container{
  border: 0.2vw solid rgba(22, 217, 173,0.8);
}
</style>

