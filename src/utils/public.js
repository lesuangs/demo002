/**
 * 购彩大厅彩种转化
 * @param list 全部彩种
 * @returns {(*|*[])[]}
 * @private
 */
export function _dealGames (list) {
  const listData = [list, [], [], [], [], [], [], [], [],[]]
  list.forEach(item => {
    switch (item.cate) {
      case 0: // lhc
        listData[1].push(item)
        break
      case 1: // fc3d【低频彩】
        listData[2].push(item)
        break
      case 2: // ssc
        listData[3].push(item)
        break
      case 3: // pk10
        listData[4].push(item)
        break
      case 4: // 11x5
        listData[5].push(item)
        break
      case 5: // kl8
        listData[6].push(item)
        break
      case 6: // k3
        listData[7].push(item)
        break
      case 7: // pcdd
        listData[8].push(item)
        break
      case 9:
        listData[9].push(item)
        break
      default:
        break
    }
  })
  return listData
}

/**
 * 自定义号码 [六合彩]
 * @returns {*[]}
 */
export function listCode() {
  const [arr, arrCode] = [Array.from({length: 49}), []]
  arr.map((val, key) => {
    let num
    key < 9 ? num = '0' + (key + 1) : num = key + 1 + ''
    arrCode.push({
      name: num,
      value: num,
      alias: num,
      selected: false
    })
  })
  return arrCode
}

/**
 * 时时彩数据解析处理
 * @param start
 * @returns {number}
 */
export function generatePickerStructure([start = -1, end = -1], items) {
  var markRefactor = [];
  var shouldDisable = true;
  items.forEach((m, i) => {
    if (i === start) shouldDisable = false;
    if (!shouldDisable) {
      markRefactor.push({
        text: m
      });
    }
    if (i === end) shouldDisable = true;
  });
  return markRefactor.reverse();
}

/**
 * 自定义号码 [pk10]
 * @returns {*[]}
 */
export function pksCode(num = 10) {
  const [arr, arrCode, newCode] = [Array.from({length: 10}), [], []]
  const menu = ['第一名', '第二名', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名']
  for (let i = 0; i < num; i++) {
    let num = ''
    i < 9 ? num = '0' + (i + 1) : num = i + 1 + ''
    arrCode.push({
      value: num,
      alias: num,
      isGf: true,
      selected: false,
      isAddAttr: true // 自定义增加属性
    })
  }
  arr.map((val, key) => {
    arrCode.map(item => {
      item.poschooseName = menu[key].substr(0, 2),
          item.name = menu[key]
    })
    newCode.push({
      name: menu[key],
      detail: JSON.parse(JSON.stringify(arrCode))
    })
  })
  return newCode
}

/**
 * 自定义号码 [pk10 - 定位胆]
 * @returns {*[]}
 */
export function pksDw(num = 10) {
  const [arr, arrCode, newCode] = [Array.from({length: 10}), [], []]
  const menu = ['第一名', '第二名', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名']
  // const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (let i = 0; i < num; i++) {
    let num = ''
    i < 9 ? num = '0' + (i + 1) : num = i + 1 + ''
    arrCode.push({
      value: num,
      alias: num,
      isGf: true,
      selected: false,
      isAddAttr: true, // 需要增加属性
      isMore: true
    })
  }
  arr.map((val, key) => {
    arrCode.map(item => {
      item.poschooseName = menu[key].substr(0, 2),
          item.name = menu[key],
          // item.c = keys[key],
          item.showContent = `${item.alias}(${menu[key].substr(0, 2)})`
    })
    newCode.push({
      name: menu[key],
      detail: JSON.parse(JSON.stringify(arrCode))
    })
  })
  return newCode
}

/**
 *
 * @param {*} menu 标题数组
 * @param {*} len 生成数的个数 默认9
 * @param {*} start 生成数的开始数 默认-1开始
 */
export function sscCode(menu,len=9,start=-1) {
  const [arr, arrCode, newCode] = [Array.from({length: menu.length}), [], []]
  for (let i = start; i < len; i++) {
    let num = i+1
    // i < 9 ? num = '0' + (i + 1) :
    arrCode.push({
      alias: num,
      isGf: true,
      selected: false
    })
  }
  arr.map((val, key) => {
    newCode.push({
      name: menu[key],
      detail: JSON.parse(JSON.stringify(arrCode))
    })
  })
  return newCode
}
/**
 * @param {*} start 生成数的开始数 默认-1开始
 *  福彩3d大小单双生成
 */
export function fu3dCode(menu) {
  const [arr, arrCode, newCode] = [Array.from({length: menu.length}), [], []]
  let codeList = ['大','小','单','双']
  codeList.forEach(num => {
    arrCode.push({
      alias: num,
      isGf: true,
      selected: false
    })
  });
  arr.map((val, key) => {
    newCode.push({
      name: menu[key],
      detail: JSON.parse(JSON.stringify(arrCode))
    })
  })
  return newCode
}

/**
 * 排列组合
 * @param arr
 * @param size - 队列组数
 * @returns {number}
 */
export function sortArray(arr, size = 1) {
  let r = []; //result
  function _(t, a, n) { //tempArr, arr, num
    if (n === 0) {
      r[r.length] = t;
      return;
    }
    for (let i = 0, l = a.length - n; i <= l; i++) {
      let b = t.slice();
      b.push(a[i]);
      _(b, a.slice(i + 1), n - 1);
    }
  }
  _([], arr, size);
  return r;
}

/**
 * 组合
 * @param a
 * @returns {number}
 */
export function sortArrayList(a) {
  let result = []
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i].length; j++) {
      for (let k = i + 1; k < a.length; k++) {
        for (let l = 0; l < a[k].length; l++) {
          result.push(a[i][j]+','+a[k][l])
        }
      }
    }
  }
  return result;
}

/**
 * 排列组合 - 多维数组
 * @param arr
 * @returns {number}
 */
export function towArray(arr = []) {
  let sarr = [[]];
  for (let i = 0; i < arr.length; i++) {
    let tarr = [];
    for (let j = 0; j < sarr.length; j++)
      for (let k = 0; k < arr[i].length; k++)
        tarr.push(sarr[j].concat(arr[i][k]));
    sarr = tarr;
  }
  return sarr
}

/**
 * 排列组合 - 多维数组逗号拼接
 * @param arr
 * @returns {number}
 */
export function towArrayStr(arr = []) {
  let sarr = [[]];
  for (let i = 0; i < arr.length; i++) {
    let tarr = [];
    for (let j = 0; j < sarr.length; j++)
      for (let k = 0; k < arr[i].length; k++)
        tarr.push(sarr[j].concat(arr[i][k]));
    sarr = tarr;
  }
  let list = sarr.map((res)=>{return res.join(',')})
  return list
}


/**
 * 二同号单选去重
 * @returns {*[]}
 */
export function arrRemoval (arr = []) {
  if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') return arr
  let newArr = []
  let nums = ''
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].toString().length > 1) {
      if(!newArr.includes(Number(arr[i].toString()[0]))) {
        newArr.push(arr[i])
      } else {
        newArr.map((val, key) => {
          if (val === Number(arr[i].toString()[0])) {
            nums = newArr[key]
            newArr.splice(key, 1)
            newArr.push(arr[i])
          }
        })
      }
    } else {
      let num = arr[i] + '' + arr[i]
      if(!newArr.includes(Number(num))) {
        newArr.push(arr[i])
      } else {
        newArr.map((val, key) => {
          if (val === Number(num)) {
            nums = newArr[key]
            newArr.splice(key, 1)
            newArr.push(arr[i])
          }
        })
      }
    }
  }
  return {
    arr: newArr,
    num: nums
  }
}


/**
 * 解析URL参数
 * @returns {{}}
 */
export function urlParse () {
  let url = window.location.search
  let obj = {}
  // 1，/g 表示该表达式将用来在输入字符串中查找所有可能的匹配，返回的结果可以是多个。如果不加/g最多只会匹配一个
  // 2，/i  表示匹配的时候不区分大小写
  // 3，/m 表示多行匹配，什么是多行匹配呢？就是匹配换行符两端的潜在匹配。影响正则中的^$符号
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}


/**
 * 赔率计算小数
 * @return odds
 */
Number.prototype.oddFixed = function (len) {
  var strValue = this + ''
  var start = strValue.indexOf('.')
  if (start > 0 && strValue.length > start + len + 1) {
    var endValue = parseInt(strValue.substr(start + len + 1, 1))
    if (endValue >= 5) {
      var temp = Math.pow(10, len + 1);
      strValue = (this + 1 / temp).toFixed(len);
    } else {
      strValue = strValue.substr(0, start + len + 1)
    }
    if (strValue && strValue.indexOf('.') === strValue.length - 1) {
      strValue = strValue.substr(0, strValue.length - 1)
    }
  }
  strValue = parseFloat(strValue) + '';
  return strValue
}

