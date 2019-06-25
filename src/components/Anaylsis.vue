<template>
    <div class="anaylsis">
        <div class="product">
            <b-form-group label="比較商品">
                <b-form-checkbox-group v-model="selected" :options="options" name="flavour-2a" stacked>
                </b-form-checkbox-group>
            </b-form-group>
        </div>
        <div class="items">
            <b-form-group label="比較項目">
                <b-form-checkbox-group v-model="selectedItems" :options="items" name="flavour-2" stacked>
                </b-form-checkbox-group>
            </b-form-group>
        </div>
        <div class="chart-container">
            <div class="chart">
                <ve-bar :data="chartData"></ve-bar>
            </div>
            <!--div class="chart" style="visibility:hidden">
                <ve-line :data="chartData2" :settings="chartSettings" :data-zoom="dataZoom"></ve-line>
            </div-->
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { Slide } from 'vue-burger-menu'
Vue.prototype.$axios = axios
export default {
  name: 'Anaylsis',
  components: {Slide},
  data(){
      this.chartSettings = {
        xAxisType: 'time'
      }
      this.dataZoom = [
        {
          type: 'slider',
          start: 0,
          end: 100
        }
      ]
      return {
        getData:0,
        menu:[],
        order:[],
        chartData: {
          columns: ['餐點', '銷售量','銷售額'],
          rows: [
            { '餐點': '請選擇左側餐點及比較項目', '銷售量': 0,'銷售額': 0},

          ]
        },
        chartData2: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '2018-01-01', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '2018-01-02', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '2018-01-03', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '2018-01-05', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '2018-01-10', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '2018-01-20', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        selected: [], // Must be an array reference!
        options: [
          { text: 'Orange', value: 'orange' },
          { text: 'Apple', value: 'apple' },
          { text: 'Pineapple', value: 'pineapple' },
          { text: 'Grape', value: 'grape' }
        ],
        selectedItems: [], // Must be an array reference!
        items: [
          { text: '銷售量', value: '銷售量' },
          { text: '銷售額', value: '銷售額' },
        ]
      }
  },
  watch:{
      selectedItems:function(){
          this.chartData.columns=["餐點"]
          this.selectedItems.forEach(Element=>[
              this.chartData.columns.push(Element)
          ])
      },
    selected:function(){
        this.chartData.rows=[];
          this.selected.forEach(Element=>{
              this.chartData.rows.push(Element)
          })
      },
      getData:function(){
          if(this.getData==2){
              //console.log(this.menu)
              //console.log(this.order)
            this.options=this.menu.map(Element=>{
              var amount=0;
              this.order.forEach(items=>{
                items.productName.forEach(child=>{
                  //console.log("compare "+Element.name+" with "+child.name)
                  if(child.name===Element.name){
                    amount+=child.amount
                  }
                })
              })
              return {
                text:Element.name,
                value:{'餐點': Element.name,'銷售量': amount,'銷售額': amount*Element.price}};
            })
            /*this.options=this.options.map(Element=>{
            var amout=0;
            var price= 100;
            Element.history.forEach(Item => {
                amout+=Item.amout;
            })
            return{
                text: Element.name,
                value: {'餐點': Element.name,'銷售量': amout,'銷售額': amout*price}
              }
            })*/ 
          }
      }
  },
  created:function(){
       var self=this;
    this.$axios({
      methods: 'get',
      url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/menu',
      //url: '/api/get/menu',
      })
      .then((res) => {
        self.menu = res.data;
        this.getData++;

    });
        
        this.$axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            url: 'http://luffy.ee.ncku.edu.tw:10152/api/get/user/history',
            //url: '/api/post/login',
            data: {
                id: 0
            },
        })//等到get後才執行接下來的code
        .then((res)=>{
            var size=0;
            res.data.data.forEach(Element=>{
              size++;
            })
            this.order=res.data.data;
            this.getData++;


                /*this.order=this.order.map((items,id)=>{ 
                    return {
                        name:this.menu[items.id].name,
                        price:this.menu[items.id].price,
                        amout: items.amount
                    }
                })*/

        })
  },
  mounted:function(){




      /*const fakeHistory=[
            { year: '2019', month: '5', day: '20', amout: 1 },
            { year: '2019', month: '5', day: '21', amout: 4 },
            { year: '2019', month: '5', day: '22', amout: 2 },
            { year: '2019', month: '5', day: '23', amout: 3 },
          ]
      const fakeData={
          data:[
              {
                name:"黑膠牛肉起士堡",
                history:fakeHistory
            },
            {
                name:"黑膠什麼堡",
                history:fakeHistory
            }
          ]
      }*/


  }
}
</script>
<style scoped>
.anaylsis{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}
.product{
    flex-grow: 1;
    height: 80%;
    padding: 5% 5%;
    margin-left: 2%;
    border: 0.4vw solid rgb(22, 217, 173);
    border-radius: 50px;
    font-family: 'Microsoft JhengHei';
}
.items{
    flex-grow: 1;
    height: 80%;
    padding: 5% 5%;
    margin-left: 2%;
    border: 0.4vw solid rgb(22, 217, 173);
    border-radius: 50px;
}
.chart-container{
    flex-grow: 3;
    height: 80%;
    display: flex;
    flex-direction:column;
    padding: 5% 0%;
    
}
.chart{
    
    width: 100%;
}
</style>

