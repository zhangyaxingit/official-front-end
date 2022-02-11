
const rainfall = require('./rainfall.json')




function computeRain (arr, keyStr, num) {
  let ary = {};
  for(let i=0;i<arr.length;i++){
        if(arr[i][keyStr] in ary){
          ary[arr[i][keyStr]].num=ary[arr[i][keyStr]].num+1;
          ary[arr[i][keyStr]].sum=ary[arr[i][keyStr]].sum + arr[i][num];
        }else{
            ary[arr[i][keyStr]] = {
              num: 1,
              sum: arr[i][num]
            }
        }
  }
  const array = Object.keys(ary).map(item => {
    return {
      date: item,
      times: ary[item].num,
      sum: ary[item].sum,
      aver: ary[item].sum/ ary[item].num,
    }
  })
  array.sort((a, b) => parseInt(new Date(a.date).getTime()) - parseInt(new Date(b.date).getTime()));
  return array
}

const jishu = computeRain(rainfall.data, 'date', 'value')
const Xdata = jishu.map(item => item.date)
const ydata1 = jishu.map(item => item.times)
const ydata2 = jishu.map(item => item.aver)



export const chart3Option  = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  toolbox: {
    feature: {
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: ['地质灾害报警次数', '降雨量日均值']
  },
  xAxis: [
    {
      type: 'category',
      data: Xdata,
      axisPointer: {
        type: 'shadow'
      },
      axisLabel: {
        rotate:90,
     }
    }
  ],
  grid: {
    y2: 100
  },
  yAxis: [
    {
      type: 'value',
      name: '地质灾害报警次数',
      axisLabel: {
        formatter: '{value} 次'
      }
    },
    {
      type: 'value',
      name: '降雨量日均值',
      axisLabel: {
        formatter: '{value} 毫米'
      }
    }
  ],
  series: [
    {
      name: '地质灾害报警次数',
      type: 'bar',
      data: ydata1
    },
    {
      name: '降雨量日均值',
      type: 'line',
      yAxisIndex: 1,
      data: ydata2
    }
  ]
};


const defaultPieOption = {
  tooltip: {
      trigger: 'item'
  },
  title: {
      text: '',
      top: 'center',
      left: 'center'
  },

  series: [
      {
        type: 'pie',
        radius: ['60%', '68%'],
        itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
        },
        color: ['#5470c6', '#ee6666'],
        label: {
          show: false
        },
        data: []
      }
  ]
}


export default {
  defaultPieOption
}
