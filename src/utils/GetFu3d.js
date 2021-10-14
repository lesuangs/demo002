/**
 *
 * @param {[type]} name [description] 玩法名称
 * @param {[type]} arr    [description] 选中数组
 * @param {[type]} checkGroup  任选类中的位数组合
 */
// 定位胆需要才分数组
import {
  doExchange,
  get_check_group,
  groupSplit,
  lx_HeZhi_3,
  rx_ZuHeFangAn,
  rx_zxfs_3,
  zx_3fs_3,
  zx_6fs_3,
  zx_HeZhi_3
} from "./PaiLieZuHe";

export function get_fu3d_bet(name,arr,checkGroup=['0','1','2']){
  let list
  switch (name) {
    case "定位胆": //定位胆玩法
      let dinwei = [];
      arr.forEach((_c)=>{
        _c.forEach((_a)=>{
          dinwei.push(_a)
        })
      });
      list=dinwei
      break;
    case "复式": //复式玩法
      list=rx_zxfs_3(arr)
      break;
    case "直选和值":
      let fshz_count3 = rx_ZuHeFangAn(get_check_group(checkGroup), 3)
      list=lx_HeZhi_3(arr[0])
      list.length=list.length*fshz_count3
      break;
    case "单式":
    case "前二直选单式":
    case "后二直选单式":
    case "前二组选单式":
    case "后二组选单式":
      list = [];
      break;
    case "组三":
      let r3_z3 = rx_ZuHeFangAn(get_check_group(checkGroup), 3)
      list = zx_3fs_3(arr[0])
      list.length = list.length*r3_z3
      break;
    case "组六":
      let l3_z6 = rx_ZuHeFangAn(get_check_group(checkGroup), 3)
      list = zx_6fs_3(arr[0])
      list.length= list.length * l3_z6
      break;
    case "组选和值":
      let l3_zx_hz = rx_ZuHeFangAn(get_check_group(checkGroup), 3)
      list = zx_HeZhi_3(arr[0])
      list.length = list.length * l3_zx_hz
      break;
    //不定胆
    case "一码不定胆":
      list=arr[0]
      break;
    //二码
    case "前二大小单双":
    case "后二大小单双":
    case "前二直选复式":
    case "后二直选复式":
      list =  doExchange(arr);
      break;
    case "前二组选复式":
    case "后二组选复式":
    case "二码不定胆":
      list = groupSplit(arr[0],2)
      break;
  }
  return list
}
