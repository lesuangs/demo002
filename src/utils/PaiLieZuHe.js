/**
 *  把选的号码 ， 排成 二维数组     五星直选  组选60
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @param  {[type]} arr    [description]
 * @return {[type]}        [description]
 */

var R_Array = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

export function get_lx_Collection(state, action, arr) {
  const {PickerNumbers} = state;
  var keys = Object.keys(PickerNumbers);
  var collection = [];
  var length = parseInt(arr[4]);
  collection.length = length;
  for (var i = 0; i < length; i++) {
    collection[i] = [];
  }
  ;
  keys.forEach((key, _idx) => {
    var key_arr = key.split('_');
    var index = parseInt(key_arr[0]);
    collection[index].push(key_arr[1]);
    collection[index].sort();
  });
  return collection;
}

// 执行组合排列的函数 求长度
export function doExchange(arr) {
  console.log(arr,'arrarr');
  var len = arr.length;
  // 当数组大于等于2个的时候
  if (len >= 2) {
    // 第一个数组的长度
    var len1 = arr[0].length;
    // 第二个数组的长度
    var len2 = arr[1].length;
    // 2个数组产生的组合数
    var lenBoth = len1 * len2;
    //  申明一个新数组,做数据暂存
    var items = new Array(lenBoth);
    // 申明新数组的索引
    var index = 0;
    // 2层嵌套循环,将组合放到新数组中
    for (var i = 0; i < len1; i++) {
      for (var j = 0; j < len2; j++) {
        items[index] = arr[0][i] + arr[1][j];
        index++;
      }
    }
    console.log(items,'items');
    // 将新组合的数组并到原数组中
    var newArr = new Array(len - 1);
    for (var i = 2; i < arr.length; i++) {
      newArr[i - 1] = arr[i];
    }
    console.log(newArr,'newArr1');
    newArr[0] = items;
    // 执行回调
    console.log(newArr,'newArr2');
    return doExchange(newArr);
  } else {
    return arr[0];
  }
}

// //执行
// var arr = [['a', 'b', 'c'], [1, 2, 3], ['x', 'y', 'z']];
// var arr1 = [['a','b','c']];
// //doExchange(arr);


/**
 * 一维数组里的元素 进行排列组合
 * @param  {[type]} arr  [description]
 * @param  {[type]} size [description]
 * @return {[type]}      [description]
 */
export function groupSplit(arr, size) {
  var r = []; //result

  function _(t, a, n) { //tempArr, arr, num
    if (n === 0) {
      r[r.length] = t;
      return;
    }
    for (var i = 0, l = a.length - n; i <= l; i++) {
      var b = t.slice();
      b.push(a[i]);
      _(b, a.slice(i + 1), n - 1);
    }
  }

  _([], arr, size);
  var __r = [];
  r.forEach((_r) => {
    __r.push(_r.join(''))
  });
  return __r;
}

/**
 * 一维数组里的元素 进行排列组合
 * @param  {[type]} arr  [description]
 * @param  {[type]} size [description]
 * @return {[type]}      [description]
 */
export function weiGroupSplit(arr, size) {
  var r = []; //result

  function _(t, a, n) { //tempArr, arr, num
    if (n === 0) {
      r[r.length] = t;
      return;
    }
    for (var i = 0, l = a.length - n; i <= l; i++) {
      var b = t.slice();
      b.push(a[i]);
      _(b, a.slice(i + 1), n - 1);
    }
  }

  _([], arr, size);
  var __r = [];
  r.forEach((_r) => {
    __r.push(_r)
  });
  return __r;
}


/**
 *  单号 跟二重号 组合, 五星组选60，
 * e  二重号 数组
 * dh  单号 数组
 */
export function zx_Sum_60(dh, e, index) {
  var r = [];
  e.forEach((_e) => {
    dh.forEach((_dh) => {
      // 单号中 不存在 二重号码的才做 组合
      if (_dh.indexOf(_e) < 0) r.push(_dh + _e + _e);
    })
  });


  return r;
}

/**
 *  单号 跟二重号 组合, 五星组选30，
 * e  二重号 数组
 * dh  单号 数组
 */
export function zx_Sum_30(dh, e, index) {
  var r = groupSplit(e, 2);
  // console.log()
  // e.forEach((_e) => {
  //   e.forEach((__e) => {
  //     // 两个二重号码 匹配的时候  相同的 去掉，  只匹配不相同的
  //     if (_e !== __e) r.push(_e + _e + __e + __e);
  //   })
  // });

  // console.log(r, 'r')
  // r = r.map((x) => x.split('').sort().join('')); // 把数组的元素 的号码 排序， 排序之后 又会产生一些相同的号码组合
  var _r = [];
  dh.forEach((_dh) => {
    // 再次  去重
    r.forEach((r_) => {
      if (r_.indexOf(_dh) < 0) {
        _r.push(_dh + r_);
      }

    })
  });
  return _r;

}


/**
 * 找出一组号码中  固定两个位置 相同的数组 删除
 * @param  {[type]} r      [description]
 * @param  {[type]} fIndex [description]
 * @param  {[type]} sIndex [description]
 * @return {[type]}        [description]
 */
function del_zx(r, fIndex, sIndex) {
  for (var i = r.length - 1; i >= 0; i--) {
    var first = r[i].slice(fIndex, fIndex + 1);
    var second = r[i].slice(sIndex, sIndex + 1);
    if (first === second) r.splice(i, 1);
  }
  return r;
}


/**
 *  单号 跟三重号 组合, 五星组选20，
 * dh  单号 数组
 * s  三重号 数组
 */
export function zx_Sum_20(dh, s, index) {
  var r = [];
  dh.forEach((_dh) => {
    s.forEach((_s) => {
      if (_dh.indexOf(_s) < 0) r.push(_dh + _s + _s + _s);
    })
  })
  return r;
}

/**
 *  单号 跟三重号 组合, 五星组选10，  五星组选5.
 * s  三重号 数组
 * e  二重号 数组
 */
export function zx_Sum_10(s, e, index) {
  var r = [];
  s.forEach((_s) => {
    e.forEach((_e) => {
      if (_s !== _e) r.push(_e + _e + _s + _s + _s);
    })
  })
  return r;
}


/**
 *  五星特殊号， 一帆风顺， 好事成双， 三星报喜， 四季发财
 */
export function sx_1_2_3_4(rrr) {
  var r = [];
  rrr.forEach((_col) => {
    r.push(_col + _col + _col + _col + _col)
  })
  return r;
}


/**
 *  单号 跟二重号 组合, 四星组选12
 * d  单号 数组
 * e  二重号 数组
 */
export function zx_Sum_12(d, e) {
  var r = [];
  d.forEach((_d) => {
    e.forEach((_e) => {
      if (_d.indexOf(_e) < 0) r.push(_d + _e + _e);
    })
  })
  return r;
}


/**
 *  单号 跟二重号 组合, 四星组选6
 * e  二重号 数组
 */
export function zx_Sum_6(e) {
  var r = [];
  e.forEach((_e) => {
    var __e = _e.split('');
    r.push(__e[0] + __e[0] + __e[1] + __e[1]);
  })
  return r;
}


/**
 *  单号 跟二重号 组合, 四星组选4
 * d  单号数组
 * s  三重号 数组
 */
export function zx_Sum_4(d, s) {
  var r = [];
  d.forEach((_d) => {
    s.forEach((_s) => {
      if (_d !== _s) {
        r.push(_d + _s + _s + _s);
      }
    })
  })
  return r;
}


/**
 * 数组去重
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function removeArraySame(arr) {
  var obj = {},
    i = 0,
    len = 0;
  if (Array.isArray(arr) && arr.length > 0) {
    len = arr.length;
    for (i = 0; i < len; i += 1) {
      obj[arr[i]] = arr[i];
    }
    return Object.keys(obj);
  }
  return [];
}

/**
 * 三星 直选 和值  的算法
 */

export function lx_HeZhi_3(r) {
  var res = []
  r.forEach((_r) => {
    var __r = [];
    for (var i = 0; i <= _r; i++) {
      __r.push(i);
    }
    __r.forEach((r_1) => {
      __r.forEach((r_2) => {
        __r.forEach((r_3) => {
          var total = r_1 + r_2 + r_3;
          var _res = '' + r_1 + r_2 + r_3;
          if (total === _r && _res.length === 3) res.push(_res);
        })
      })
    })
  })
  return res;
}

/**
 * 3* 直选跨度 最大的组合
 */
export function kd_box_3() {
  var r = [];

  return removeArraySame(r);
}

/**
 * 三星 直选 跨度
 * r, 所选号码  Array
 */
export function lx_kd_3(s) {
  var res = [];

  R_Array.forEach((r_1) => {
    R_Array.forEach((r_2) => {
      R_Array.forEach((r_3) => {
        var _h = '' + r_1 + r_2 + r_3;
        var _a = [r_1, r_2, r_3].sort((a, b) => a - b);
        s.forEach((_s) => {
          if (_a[2] - _a[0] === parseInt(_s)) res.push(_h);
        })
      })
    })
  });
  return res;
}

/**
 * 3* 组三复式 算法
 */

export function zx_3fs_3(r) {
  var res = [];
  r.forEach((r_1) => {
    r.forEach((r_2) => {
      if (r_1 !== r_2) res.push(r_1 + r_2 + r_2);
    })
  })
  return res;
}

/**
 * 3* 组六复式 算法
 */

export function zx_6fs_3(r) {
  var res = [];
  for (var i = 0; i < r.length; i++) {
    for (var j = i + 1; j < r.length; j++) {
      for (var x = j + 1; x < r.length; x++) {
        res.push(r[i] + r[j] + r[x]);
      }
    }
  }
  return res;
}


/*
三星  组选 和值
 */

export function zx_HeZhi_3(r) {
  var res = [];
  for (var i = 0; i < R_Array.length; i++) {
    for (var j = 0; j < R_Array.length; j++) {
      for (var x = 0; x < R_Array.length; x++) {
        if (R_Array[i] === R_Array[j] && R_Array[j] === R_Array[x]) break;
        var total = R_Array[i] + R_Array[j] + R_Array[x];
        r.forEach((_r) => {
          if (total === parseInt(_r)) res.push('' + R_Array[i] + R_Array[j] + R_Array[x]);
        })
      }
    }
  }
  res = res.map((_r) => _r.split('').map((__r) => parseInt(__r)).sort((a, b) => a - b).join(''));
  return removeArraySame(res);
}


/*
三星 组选 包胆
  r String
 */
export function zx_BaoDan_3(r) {
  var res = [];
  R_Array.forEach((r_1) => {
    R_Array.forEach((r_2) => {
      R_Array.forEach((r_3) => {
        if (r_1 !== r_2 || r_1 !== r_3) {
          var h = '' + r_1 + r_2 + r_3;
          if (h.indexOf(r) > -1) res.push(h)
        }
      })
    })
  })
  res = res.map((_r) => _r.split('').map((__r) => parseInt(__r)).sort((a, b) => a - b).join(''));
  return removeArraySame(res);
}


/**
 * 两星  直选 和值
 */

export function lx_HeZhi_2(r) {
  var res = [];
  R_Array.forEach((r_1) => {
    R_Array.forEach((r_2) => {
      var total = r_1 + r_2;
      r.forEach((_r) => {
        if (total === parseInt(_r)) res.push('' + r_1 + r_2);
      })
    })
  })
  return res;
}


/**
 * 两星 直选 跨度
 */

export function lx_KuaDu_2(r) {
  var res = [];
  R_Array.forEach((r_1) => {
    R_Array.forEach((r_2) => {
      r.forEach((_r) => {
        if (parseInt(_r) === Math.abs(r_1 - r_2)) res.push('' + r_1 + r_2);
      })
    })
  });
  return res;
}

/**
 * 两星 组选和值
 */

export function zx_HeZhi_2(r) {
  var res = [];
  R_Array.forEach((r_1, i) => {
    for (var j = i + 1; j < R_Array.length; j++) {
      r.forEach((_r) => {
        if ((r_1 + R_Array[j]) === parseInt(_r)) res.push('' + r_1 + R_Array[j])
      })
    }
  })
  return res;
}


/**
 * 两星组选包胆
 * r String
 */
export function zx_baodan_2(r) {
  var res = [];
  R_Array.forEach((r_1, i) => {
    for (var j = i + 1; j < R_Array.length; j++) {
      var total = '' + r_1 + R_Array[j];
      if (total.indexOf(r) > -1) res.push(total);
    }
  })
  return res;
}


/**
 * 任选二  直选复式
 */
export function rx_zxfs_2(r) {
  var res = []
  for (var i = 0; i < r.length; i++) {
    var _i = i + 1;
    for (var j = _i; j < r.length; j++) {
      for (var m = 0; m < r[i].length; m++) {
        for (var n = 0; n < r[j].length; n++) {
          res.push({
            num: [r[i][m], r[j][n]],
            index: [i, j]
          })
        }
      }
    }
  }
  return res;
}

/**
 * 任选 万 千 百 十 个  组合 方案 个数
 */

export function rx_ZuHeFangAn(selected, idx) {
  var y_selected = [];
  selected.forEach((_se) => {
    if (_se) y_selected.push(_se)
  });
  return groupSplit(y_selected, idx).length;
}

/**
 * 任选直选和值 万 千 百 十 个  组合 方案 个数
 */
export function zx_rx_Hezhi(arr, selected, idx) {
  let hezhiweiZiList = groupSplit(selected, idx)
  let hezhiList = lx_HeZhi_2(arr)
  return hezhiList;
}

/**
 *  任选三   直选复式
 */

export function rx_zxfs_3(r) {
  var res = [];
  for (var i = 0; i < r.length; i++) {
    var _i = i + 1;
    for (var j = _i; j < r.length; j++) {
      var _j = j + 1;
      for (var l = _j; l < r.length; l++) {
        for (var m = 0; m < r[i].length; m++) {
          for (var n = 0; n < r[j].length; n++) {
            for (var x = 0; x < r[l].length; x++) {
              res.push({
                num: [r[i][m], r[j][n], r[l][x]],
                index: [i, j, l]
              })
            }
          }
        }
      }
    }
  }
  return res;
}

/**
 *   任选四 直选复式
 */

export function rx_zxfs_4(r) {
  var res = [];
  for (var i = 0; i < r.length; i++) {
    var _i = i + 1;
    for (var j = _i; j < r.length; j++) {
      var _j = j + 1;
      for (var l = _j; l < r.length; l++) {
        var _l = l + 1;
        for (var o = _l; o < r.length; o++) {
          for (var m = 0; m < r[i].length; m++) {
            for (var n = 0; n < r[j].length; n++) {
              for (var x = 0; x < r[l].length; x++) {
                for (var y = 0; y < r[o].length; y++) {
                  res.push({
                    num: [r[i][m], r[j][n], r[l][x], r[o][y]],
                    index: [i, j, l, o]
                  })
                  // res.push('' + r[i][m] + r[j][n] + r[l][x] + r[o][y]);
                }
              }
            }
          }
        }
      }
    }
  }
  return res;
}


/**
 * 11选5 三码 直选复式
 * @return {[type]} [description]
 */
export function yyw_lx_fs_3(r) {
  var res = [];

  r[0].forEach((r_0) => {
    r[1].forEach((r_1) => {
      r[2].forEach((r_2) => {
        if (r_0 !== r_1 && r_0 !== r_2 && r_1 !== r_2) res.push('' + r_0 + r_1 + r_2);
      })
    })
  })

  return res;
}

/**
 *  11选5  二码  直选复式    猜冠亚军
 * @param  {[type]} r [description]
 * @return {[type]}   [description]
 */
export function yyw_lx_fs_2(r) {
  var res = [];
  r[0].forEach((r_0) => {
    r[1].forEach((r_1) => {
      if (r_0 !== r_1) res.push('' + r_0 + r_1);
    })
  })
  return res;
}


/**
 * 11选5  任选胆拖的 注数  算法
 */


export function yyw_RenXuan_dt_length(collection, idx) {
  var res = [];
  var cha = idx - collection[0].length;
  if (cha === 1) {
    res.length = collection[1].length
  } else {
    res = groupSplit(collection[1], cha)
  }
  return res;
}


/**
 * 低频彩 三星直选  和值
 * @param  {[type]} r [description]
 * @return {[type]}   [description]
 */

export function dpc_lx_HeZhi_3(r) {
  var res = [];
  r.forEach((_r) => {
    R_Array.forEach((r_1) => {
      R_Array.forEach((r_2) => {
        R_Array.forEach((r_3) => {
          var total = r_1 + r_2 + r_3;
          if (total === parseInt(_r)) res.push('' + r_1 + r_2 + r_3)
        })
      })
    })
  })
  return res;
}

/**
 * 低频彩  三星组选复式
 * @param  {[type]} r [description]
 * @return {[type]}   [description]
 */
export function dpc_zx_fs_3(r) {
  var res = [];
  var arr = groupSplit(r, 2);
  arr.forEach((_arr) => {
    var __r = _arr.split('');
    res.push(__r[0] + __r[1] + __r[0])
    res.push(__r[1] + __r[0] + __r[1])
  })
  return res;
}


/**
 * pk10  猜  前四
 */

export function pk10_caiQ4(r) {
  var res = [];
  r[0].forEach((r_0) => {
    r[1].forEach((r_1) => {
      r[2].forEach((r_2) => {
        r[3].forEach((r_3) => {
          if (r_0 !== r_1 && r_0 !== r_2 && r_0 !== r_3 && r_1 !== r_2 && r_1 !== r_3 && r_2 !== r_3) {
            res.push('' + r_0 + r_1 + r_2 + r_3);
          }
        })
      })
    })
  })
  return res;
}

/**
 * pk10  猜  前五
 */

export function pk10_caiQ5(r) {
  var res = [];
  r[0].forEach((r_0) => {
    r[1].forEach((r_1) => {
      r[2].forEach((r_2) => {
        r[3].forEach((r_3) => {
          r[4].forEach((r_4) => {
            if (r_0 !== r_1 && r_0 !== r_2 && r_0 !== r_3 && r_0 !== r_4
              && r_1 !== r_2 && r_1 !== r_3 && r_1 !== r_4
              && r_2 !== r_3 && r_2 !== r_4
              && r_3 !== r_4) {
              res.push('' + r_0 + r_1 + r_2 + r_3 + r_4);
            }
          })
        })
      })
    })
  })
  return res;
}

/**
 * pk10  猜  前六
 */

export function pk10_caiQ6(r) {
  var res = [];
  r[0].forEach((r_0) => {
    r[1].forEach((r_1) => {
      r[2].forEach((r_2) => {
        r[3].forEach((r_3) => {
          r[4].forEach((r_4) => {
            r[5].forEach((r_5) => {
              if (r_0 !== r_1 && r_0 !== r_2 && r_0 !== r_3 && r_0 !== r_4 && r_0 !== r_5
                && r_1 !== r_2 && r_1 !== r_3 && r_1 !== r_4 && r_1 !== r_5
                && r_2 !== r_3 && r_2 !== r_4 && r_2 !== r_5
                && r_3 !== r_4 && r_3 !== r_5
                && r_4 !== r_5) {
                res.push('' + r_0 + r_1 + r_2 + r_3 + r_4 + r_5);
              }
            })
          })
        })
      })
    })
  })
  return res;
}

// 快三 三不同号 和值选号
//
export function k3_sbth_hzxh(arr) {
  var a = []
  for (var i = 1; i <= 6; i++) {
    for (var j = i + 1; j <= 6; j++) {
      for (var k = j + 1; k <= 6; k++) {
        arr.forEach((_r) => {
          var total = i + j + k;
          if (total == parseInt(_r)) {
            a.push(`${i}|${j}|${k}`)
          }
        })
      }
    }
  }
  return a;
}

export function get_check_group(arr) {
  var a = [false, false, false, false, false]
  arr.forEach((item, index) => {
    a[item] = true
  })
  return a;
}

// // pk10 两个 和值

// export function pk10_2_hezhi(arr) {
//   var a = [];
//   arr.forEach((_a) => {
//     for (var i = 1; i <=10; i ++) {
//       for (var j = i + 1; j <=10; j ++) {
//         if ((i + j) == parseInt(_a)) {
//           a.push(`${i}_${j}`)
//         }
//       }
//     }
//   })
//   return a;
// }

// // pk10 三个 和值

// export function pk10_3_hezhi(arr) {
//   var a = [];
//   arr.forEach((_a) => {
//     for (var i = 1; i <=10; i ++) {
//       for (var j = i + 1; j <=10; j ++) {
//         for (var k = j + 1; k <= 10; k ++) {
//           if ((i + j + k) == parseInt(_a)) {
//             a.push(`${i}_${j}`)
//           }
//         }
//       }
//     }
//   })
//   return a;
// }
