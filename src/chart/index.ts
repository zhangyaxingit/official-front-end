/**
 * 各种画echarts图表的方法都封装在这里
 * 注意：这里echarts没有采用按需引入的方式，只是为了方便学习
 */

import * as echarts from 'echarts';//引入echarts
const install = function(Vue) {
     Object.defineProperties(Vue.prototype, {
         $chart: {
             get() {
                 return {
                     //画一条简单的线
                    render: function (id, optionData) {
                    this.chart = echarts.getInstanceById(id) ? echarts.getInstanceById(id) : echarts.init(document.getElementById(id))
                    if (this.chart && optionData)
                        this.chart.clear();

                        this.chart.setOption(optionData);


                    },
                 }
             }
         }
     })
}


 export default {
    install,
 }
