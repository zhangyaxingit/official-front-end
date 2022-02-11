import dayjs from 'dayjs'

import operationData from './../data/operation.json'
import storeData from './../data/store.json'
import labelData from './../data/label.json'

let invokeData = operationData.map(item => item.invoke)
let errorData = operationData.map(item => item.error)
let waitData = operationData.map(item => item.wait)

let originTime = Date.now() - 10 * 60 * 1000
let timeArr = []

export function getAxisData() {
  timeArr = []
  for (let i = 0; i < 10* 20; i++) {
    timeArr.push(originTime + i *3* 1000) // 每隔五秒
  }
  const x = formatTimes(timeArr)
  return {
    chart1Option: {
      animation: false,
      xAxis: {
          type: 'category',
          data: x
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: invokeData,
          type: 'line',
      }]
    },
    chart2Option: {
      xAxis: {
          type: 'category',
          data: x
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: errorData,
          type: 'line'
      }]
    },
    chart3Option: {
      xAxis: {
          type: 'category',
          data: x
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: waitData,
          type: 'line'
      }]
    }
  }
}

export function updateAxisData() {
  const [first, ...restTime] = timeArr
  const last = timeArr[timeArr.length - 1]
  const [firstInvoke, ...restInvoke] = invokeData
  const [firstError, ...restError] = errorData
  const [firstWait, ...restWait] = waitData
  timeArr = [...restTime, last + 5 * 1000]
  invokeData = [...restInvoke, firstInvoke]
  errorData = [...restError, firstError]
  waitData = [...restWait, firstWait]
  const x = formatTimes(timeArr)
  return {
    chart1Option: {
      animation: false,
      xAxis: {
          type: 'category',
          data: x
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: invokeData,
          type: 'line',
      }]
    },
    chart2Option: {
      xAxis: {
          type: 'category',
          data: x
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: errorData,
          type: 'line'
      }]
    },
    chart3Option: {
      xAxis: {
          type: 'category',
          data: x
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: waitData,
          type: 'line'
      }]
    }
  }
}

function formatTimes(arr) {
  return arr.map(item => dayjs(item).format('hh:mm:ss'))
}

var base = +new Date(1988, 9, 3);
 var oneDay = 24 * 3600 * 1000;

 var data = [[base, Math.random() * 300]];

 for (var i = 1; i < 20000; i++) {
     var now = new Date(base += oneDay);
     data.push([
         [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
         Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])
     ]);
}

 function getThirtyDays() {
    //获取当前日期
    var myDate = new Date();
    var nowY = myDate.getFullYear();
    var nowM = myDate.getMonth()+1;
    var nowD = myDate.getDate();
    var enddateStr = nowY+"-"+(nowM<10 ? "0" + nowM : nowM)+"-"+(nowD<10 ? "0"+ nowD : nowD);//当前日期
    var enddate = new Date(enddateStr);


    //获取三十天前日期
    var lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30);//最后一个数字30可改，30天的意思
    var lastY = lw.getFullYear();
    var lastM = lw.getMonth()+1;
    var lastD = lw.getDate();
    var startdateStr =lastY+"-"+(lastM<10 ? "0" + lastM : lastM)+"-"+(lastD<10 ? "0"+ lastD : lastD);//三十天之前日期
    var startDate = new Date(startdateStr);

    const dateList = []
    while(true) {
      startDate.setDate(startDate.getDate() + 1)
      if (startDate.getTime() <= enddate.getTime()) {
        if (startDate.getDate() < 10) {
          // startDate.getFullYear() 获取年，此处没加上年份
          dateList.push((startDate.getMonth()+1) + '.0' + startDate.getDate())
        } else {
          dateList.push((startDate.getMonth()+1) + '.' + startDate.getDate())
        }
      } else {
        break
      }
    }
    return dateList;
}

function getAllMinutes() {
  //获取当前日期

  let hour = 0
  let minute = 0
  let dateList = []

  while(hour<24) {
    const curStr = `${hour < 10 ? '0' + hour : hour} : ${ minute < 10 ? '0' + minute : minute}`
    dateList.push(curStr)
    minute += 10
    if (minute === 60) {
      hour +=1
      minute = 0
    }
  }
  return dateList;
}

function produceNum(minNum,maxNum, num){
  const numList= []
  for (var i = 0; i < num; i++) {
    numList.push(parseInt(Math.random()*(maxNum-minNum+1)+minNum,10));
  }
  return numList
}

function produceTrendNum(start, delta,  num){
  const numList= []
  let temp = start
  for (var i = 0; i < num; i++) {
    temp = temp + parseInt(Math.random()*(delta + 1) +1,10)
    numList.push(temp);
  }
  return numList
}

const dateList = getThirtyDays()
const minutesList = getAllMinutes()
const chart1List = produceTrendNum(316, 5, 30)
const chart2List = produceTrendNum(161, 10, 30)
const chart4List = produceTrendNum(5120, 30, 30)
const chart5List = produceTrendNum(700, 120, 30)
const chart6List = [
  ...produceNum(50, 90, 50),
  ...produceNum(90, 120, 5),
  ...produceNum(120, 180, 8),
  ...produceNum(90, 120, 5),
  ...produceNum(50, 90, 35),
  ...produceNum(90, 120, 5),
  ...produceNum(120, 180, 8),
  ...produceNum(90, 120, 5),
  ...produceNum(50, 60, 25),
]
const chart61List = produceNum(250, 300, 144)
const chart31List = produceNum(250, 350, 30)
const chart32List = produceNum(180, 220, 30)
const chart33List = produceNum(180, 220, 30)
const chart34List = produceNum(180, 220, 30)
const chart35List = produceNum(80, 150, 30)

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


export const chart4Option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    top: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['丽水城市地灾风险预警系统', '临安地灾风险管控系统', '数字孪生', '地灾数据一体化管理平台', '衢州地灾预报预警系统', '物联网设备管控平台',]
  },
  series: [
    {
      // name: 'Direct',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: 'rgb(238, 102, 102)'
      },
      data: [21, 16, 47, 14, 25, 76]
    },
    {
      // name: 'Mail Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: 'rgb(250, 200, 88)'
      },
      data: [46, 23, 84, 42, 59, 23]
    },
    {
      // name: 'Affiliate Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: 'rgb(145, 204, 117)'
      },
      data: [283, 269, 143, 186, 131, 108
        ]
    },
  ]
};

function getLevelOption() {
  return [
    {
      itemStyle: {
        borderWidth: 0,
        gapWidth: 5
      }
    },
    {
      itemStyle: {
        gapWidth: 1
      }
    },
    {
      colorSaturation: [0.35, 0.5],
      itemStyle: {
        gapWidth: 1,
        borderColorSaturation: 0.6
      }
    }
  ];
}


export const chart5Option = {
  tooltip: {
    formatter: function (info) {
      // var value = info.value;
      // var treePathInfo = info.treePathInfo;
      // var treePath = [];
      // for (var i = 1; i < treePathInfo.length; i++) {
      //   treePath.push(treePathInfo[i].name);
      // }
      // return [
      //   '<div class="tooltip-title">' +
      //     formatUtil.encodeHTML(treePath.join('/')) +
      //     '</div>',
      //   'Disk Usage: ' + formatUtil.addCommas(value) + ' KB'
      // ].join('');
    }
  },
  series: [
    {
      name: '数据项存储分布',
      type: 'treemap',
      label: {
        show: true,
        formatter: '{b}'
      },
      itemStyle: {
        borderColor: '#fff'
      },
      levels: getLevelOption(),
      data: storeData
    }
  ]
}

export const chart6Option = {

  tooltip: {
    formatter: function (info) {
      // var value = info.value;
      // var treePathInfo = info.treePathInfo;
      // var treePath = [];
      // for (var i = 1; i < treePathInfo.length; i++) {
      //   treePath.push(treePathInfo[i].name);
      // }
      // return [
      //   '<div class="tooltip-title">' +
      //     formatUtil.encodeHTML(treePath.join('/')) +
      //     '</div>',
      //   'Disk Usage: ' + formatUtil.addCommas(value) + ' KB'
      // ].join('');
    }
  },
  series: [
    {
      name: '数据父层级标签',
      type: 'treemap',
      // visibleMin: 300,
      label: {
        show: true,
        formatter: '{b}'
      },
      itemStyle: {
        borderColor: '#fff'
      },
      levels: getLevelOption(),
      data: labelData
    }
  ]
}



 export default {
    defaultPieOption
 }
