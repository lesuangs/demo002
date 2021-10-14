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
    lx_HeZhi_2,
    lx_HeZhi_3,
    rx_ZuHeFangAn,
    rx_zxfs_2,
    rx_zxfs_3,
    rx_zxfs_4,
    zx_3fs_3,
    zx_6fs_3,
    zx_HeZhi_2,
    zx_HeZhi_3,
    zx_Sum_10,
    zx_Sum_12,
    zx_Sum_20,
    zx_Sum_30,
    zx_Sum_4,
    zx_Sum_6,
    zx_Sum_60
} from "./PaiLieZuHe";

export function get_ssc_bet(name, arr, checkGroup) {
    let list
    switch (name) {
        //5星玩法
        case "五星组合":
        case "五星复式":
        case "前四复式":
        case "前四组合":
        case "后四复式":
        case "后四组合":
        case "后三直选复式":
        case "前三直选复式":
        case "中三直选复式":
        case "后二直选(复式)":
        case "前二直选(复式)":
            list = doExchange(arr);
            break;
        /**后面改 */
        case "五星单式":
        case "前四单式":
        case "中三直选单式":
        case "后四单式":
        case "后三直选单式":
        case "前三直选单式":
        case "中三直选单式":
        case "后二直选(单式)":
        case "前二直选(单式)":
        case "后二组选(单式)":
        case "前二组选(单式)":
        case "任二直选单式":
        case "任二组选单式":
        case "任三直选单式":
        case "任四直选单式":
            list = [];
            break;
        case "组选120":
            list = groupSplit(arr[0], 5);
            break;
        case "组选60":
            let _arr60 = groupSplit(arr[1], 3);
            list = zx_Sum_60(_arr60, arr[0], 3)
            break;
        case "组选30":
            list = zx_Sum_30(arr[1], arr[0], 1)
            break;
        case "组选20":
            let _arr2 = groupSplit(arr[1], 2);
            list = zx_Sum_20(_arr2, arr[0], 0)
            break;
        case "组选10":
        case "组选5":
            list = zx_Sum_10(arr[0], arr[1], 0)
            break;
        case "前四组选24":
        case "后四组选24":
            list = groupSplit(arr[0], 4)
            break;
        case "前四组选12"://前四玩法
        case "后四组选12"://后四玩法
            let _arr12 = groupSplit(arr[1], 2);
            list = zx_Sum_12(_arr12, arr[0])
            break;
        case "前四组选6":
        case "后四组选6":
            let _arr6 = groupSplit(arr[0], 2);
            list = zx_Sum_6(_arr6)
            break;
        case "前四组选4"://前四玩法
        case "后四组选4"://后四玩法
            list = zx_Sum_4(groupSplit(arr[1], 1), groupSplit(arr[0], 1));
            break;
        //后三码玩法
        case "后三直选和值":
        case "前三直选和值":
        case "中三直选和值":
            let _arrH = arr[0].sort((a, b) => a - b);
            list = lx_HeZhi_3(_arrH)
            break;
        case "后三特殊号":
        case "前三特殊号":
        case "中三特殊号":
            list = arr[0]
            break;
        case "后三组三":
        case "前三组三":
        case "中三组三":
            list = zx_3fs_3(arr[0])
            break;
        case "后三组六":
        case "前三组六":
        case "中三组六":
            list = zx_6fs_3(arr[0])
            break;
        case "后三组选和值":
        case "前三组选和值":
        case "中三组选和值":
            list = zx_HeZhi_3(arr[0])
            break;
        //二码
        case "后二直选和值":
        case "前二直选和值":
            list = lx_HeZhi_2(arr[0])
            break;
        case "后二组选(复式)":
        case "前二组选(复式)":
            list = groupSplit(arr[0], 2)
            break;
        case "后二组选和值":
        case "前二组选和值":
            list = zx_HeZhi_2(arr[0])
            break;
        case "定位胆": //定位胆玩法
            let dinwei = [];
            arr.forEach((_c) => {
                _c.forEach((_a) => {
                    dinwei.push(_a)
                })
            });
            list = dinwei
            break;
        //不定胆
        case "后三一码不定胆":
        case "前三一码不定胆":
            list = arr[0]
            break;
        case "前三二码不定胆":
        case "后三二码不定胆":
            list = groupSplit(arr[0], 2)
            break;
        //任选二
        case "任二直选复式":
            list = rx_zxfs_2(arr)
            break;
        case "任二直选和值":
          console.log(checkGroup,'checkGroupcheckGroup');
          let hezhiweiZiList = groupSplit(checkGroup, 2);
          console.log(hezhiweiZiList,'hezhiweiZiList');
          list = lx_HeZhi_2(arr[0])
            list.length = list.length * hezhiweiZiList.length
            break;
        case "任二组选复式":
            let fs_count = rx_ZuHeFangAn(get_check_group(checkGroup), 2)
            list = groupSplit(arr[0], 2)
            list.length = list.length * fs_count
            break;
        case "任二组选和值":
          console.log(get_check_group(checkGroup),checkGroup,'get_check_group(checkGroup)');
          let fshz_count = rx_ZuHeFangAn(get_check_group(checkGroup), 2)
            list = zx_HeZhi_2(arr[0])
            list.length = list.length * fshz_count
            break;
        //任选三
        case "任三直选和值":
            let fshz_count3 = rx_ZuHeFangAn(get_check_group(checkGroup), 3)
            list = lx_HeZhi_3(arr[0])
            list.length = list.length * fshz_count3
            break;
        case "任三直选复式":
            list = rx_zxfs_3(arr)
            break;
        case "任三组三":
            let r3_z3 = rx_ZuHeFangAn(get_check_group(checkGroup), 3)
            list = zx_3fs_3(arr[0])
            list.length = list.length * r3_z3
            break;
        case "任三组六":
            let l3_z6 = rx_ZuHeFangAn(get_check_group(checkGroup), 3)
            list = zx_6fs_3(arr[0])
            list.length = list.length * l3_z6
            break;
        case "任三组选和值":
            let l3_zx_hz = rx_ZuHeFangAn(get_check_group(checkGroup), 3)
            list = zx_HeZhi_3(arr[0])
            list.length = list.length * l3_zx_hz
            break;
        //任选四
        case "任四直选复式"://任选四玩法
            list = rx_zxfs_4(arr)
            break;
        case "组选24":
            let zhuxuan24 = rx_ZuHeFangAn(get_check_group(checkGroup), 4);
            list = groupSplit(arr[0], 4);
            list.length = list.length * zhuxuan24;
            break;
        case "组选12":
            let zhuxuan12 = rx_ZuHeFangAn(get_check_group(checkGroup), 4);
            list = zx_Sum_12(groupSplit(arr[1], 2), arr[0]);
            list.length = list.length * zhuxuan12;
            break;
        case "组选6":
            let zhuxuan6 = rx_ZuHeFangAn(get_check_group(checkGroup), 4);
            list = zx_Sum_6(groupSplit(arr[0], 2));
            list.length = list.length * zhuxuan6;
            break;
        case "组选4":
            let zhuxuan4 = rx_ZuHeFangAn(get_check_group(checkGroup), 4);
            list = zx_Sum_4(groupSplit(arr[1], 1), groupSplit(arr[0], 1));
            list.length = list.length * zhuxuan4;
            break;
        default:
            break;
    }
    return list
}
