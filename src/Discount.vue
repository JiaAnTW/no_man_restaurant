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
                <small>優惠編號 {{element.id}} </small>
                <small>點擊以編輯/查看詳細</small>
              </b-list-group-item>
            </b-list-group>
            <button class="add" @click="reFlashDish">新增折扣</button>
        </div>
        <div class="edit">
          <div class="type">
            <h1>step1: 選擇折扣類型</h1>
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
              <h1>step2: 選擇A</h1>
              <b-container class="list-A-B">
                    <b-form-group>
                      <b-form-checkbox-group v-model="fliterA" :options="listFliter" name="flavour-1a "></b-form-checkbox-group>
                    </b-form-group>
                    <b-container>
                    <b-form-group class="list-A">
                      <b-form-checkbox-group v-model="selectA" :options="menu" name="flavour-1a " stacked></b-form-checkbox-group>
                    </b-form-group>
                    </b-container>
              </b-container>
            </div>
            <div class="choose-B">
              <h1>step3: 選擇B</h1>
                <b-container class="list-A-B">
                    <b-form-group>
                      <b-form-checkbox-group v-model="fliterB" :options="listFliter" name="flavour-1b "></b-form-checkbox-group>
                    </b-form-group>
                    <b-container>
                    <b-form-group class="list-B">
                      <b-form-checkbox-group v-model="selectB" :options="menu" name="flavour-1b " stacked></b-form-checkbox-group>
                    </b-form-group>
                    </b-container>
                </b-container>
            </div>
            
          </div>
          <div class="result">
            <h1>step4: 送出</h1>
            <div class="choose-type step4">
              <b-form-input class="topic" v-model="reason" placeholder="折扣的理由"></b-form-input>
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
        //url: 'http://luffy.ee.ncku.edu.tw:10152/api/post/'+route,
        url: '/api/post/'+route,
        data:{
            reason: this.reason,
            id:this.viewTarget,
            policy: this.policy,
            condition: this.condition,
            x: this.x ,y: this.y,
            selectA:selectA,selectB:selectB
        }
        })      
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
          var selectB=Element.selectA.split(",")
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
}

.target{

}

.list,.choose-A,.type,.choose-B{
  flex-grow: 1;
  height: 100vh;
}

.list{
  border: 1px solid red;
  width: 20vw;
  overflow-y: scroll;
}

.choose-A{
  border: 1px solid blue;
}

.choose-A,.choose-B{
  height: 60vh;
  max-width: 35vw;
}

.type{
  border: 1px solid yellow;
  height: 20vh;
}
.choose-B{
  border: 1px solid green;
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
  height: 15vh;
}

.step4{
  width: 80%;
}

.add{
  width: 100%s;
}
</style>

