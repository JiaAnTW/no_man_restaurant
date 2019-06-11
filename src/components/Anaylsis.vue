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
            <div class="chart">
                <ve-line :data="chartData2" :settings="chartSettings" :data-zoom="dataZoom"></ve-line>
            </div>
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
        chartData: {
          columns: ['餐點', '銷售量','銷售額'],
          rows: [
            { '餐點': 'hi', '銷售量': 1393,'銷售額': 1393},
            { '餐點': '漢堡', '銷售量': 3530,'銷售額': 1393},
            { '餐點': '漢堡', '銷售量': 2923,'銷售額': 1393},
            { '餐點': '漢堡', '銷售量': 1723,'銷售額': 1393},
            { '餐點': '漢堡', '銷售量': 3792,'銷售額': 1393},
            { '餐點': '漢堡', '銷售量': 4593,'銷售額': 1393}
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
  },
  mounted:function(){
      const fakeHistory=[
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
      }
      this.options=fakeData.data.map(Element=>{
        var amout=0;
        var price= 100;
        Element.history.forEach(Item => {
            amout+=Item.amout;
        })
          return{
            text: Element.name,
            value: {'餐點': Element.name,'銷售量': amout,'銷售額': amout*price}
          }
        })

  }
}
</script>
<style scoped>
.anaylsis{
    width: 100%;
    height: 100%;
    display: flex;
}
.product{
    flex-grow: 1;
    height: 100%;
}
.items{
    flex-grow: 1;
    height: 100%;
}
.chart-container{
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction:column;
}
.chart{
    
    width: 100%;
}
</style>

