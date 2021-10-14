import {fu3dCode, listCode, pksCode, pksDw, sscCode} from "../utils/public";
import utils from "../utils/utils";

export default class GamesUtils {
  /**
   * "ssc" lotteryNew data customization
   * @param data
   * @param data1
   * @returns {*[]}
   */
  static setSSCMethodInit(creditData, officialData, lotteryId, userRebate, inputRebate) {
    // let [playCateMap,
    //   playByIdMap,
    //   playCateMap1,
    //   playByIdMap1
    // ] = [
    //   creditData.playCateMap,
    //   creditData.playByIdMap,
    //   officialData.playCateMap,
    //   officialData.playByIdMap,
    // ];
    let playCateMap = JSON.parse(JSON.stringify(creditData.playCateMap));
    let playByIdMap = JSON.parse(JSON.stringify(creditData.playByIdMap));
    let playCateMap1 = JSON.parse(JSON.stringify(officialData.playCateMap));
    let playByIdMap1 = JSON.parse(JSON.stringify(officialData.playByIdMap))
    // let [creditList, officialList] = [
    //   playCateMap[lotteryId],
    //   playCateMap1[lotteryId],
    // ];
    let creditList = JSON.parse(JSON.stringify(playCateMap[lotteryId]));
    let officialList = JSON.parse(JSON.stringify(playCateMap1[lotteryId]));
    // let navList = JSON.parse(JSON.stringify(data.playCateMap[lotteryId]))
    // let playByIdMap = JSON.parse(JSON.stringify(data.playByIdMap))
    // let navList1 = JSON.parse(JSON.stringify(data1.plyCateByCodeMap))
    // let playByIdMap1 = JSON.parse(JSON.stringify(data1.playByIdMap))
    console.log(creditList,'creditList');
    console.log(officialList,'officialList');
    let ziheList = [];
    // 信用玩法数据处理
    creditList.map((item) => {
      console.log(item,'creditListcreditList');
      //第1级
      item.children = [
        {
          name: item.name,
          //第2级
          children: [
            {
              name: item.name,
              isOfficial: false,
              //第3级
              children: [],
            },
          ],
        },
      ];
      //第4级
      Object.keys(playCateMap).forEach((keys) => {
        console.log(playCateMap,keys);
        if (item.code === keys) {
          item.children[0].children[0].children = playCateMap[keys];
        }
      });
      //第5级
      if (item.children[0].children[0].children) {
        item.children[0].children[0].children.map((ids) => {
          ids.detail = [];
          Object.keys(playByIdMap).map((key) => {
            let plays = playByIdMap[key];
            // 赔率计算
            plays.addOdds = parseFloat(
              (
                plays.minOdds +
                (((plays.maxOdds - plays.minOdds) / plays.rebate) *
                  (userRebate - inputRebate)) /
                100
              ).toFixed(4)
            );
            playByIdMap[key].selected = false;
            if (ids.code === playByIdMap[key].code) {
              ids.detail.push(playByIdMap[key]);
            }
          });
          ids.detail.sort((a, b) => {
            return a.sort - b.sort;
          });
        });
      }
      //质合玩法
      if (
        item.name === "万位" ||
        item.name === "千位" ||
        item.name === "百位" ||
        item.name === "十位" ||
        item.name === "个位"
      ) {
        let ziHe = item.children[0].children[0].children;
        ziheList.push(ziHe.slice(ziHe.length - 1, ziHe.length)[0]);
        item.children[0].children[0].children.pop();
      }
    });
    //官方玩法数据处理
    officialList.map((item) => {
      //第一级
      item.children = [];
      Object.keys(playCateMap1).forEach((keys) => {
        if (item.code === keys) {
          item.children = playCateMap1[keys];
        }
      });
      item.children.forEach((ids) => {
        //第二级
        ids.children = [];
        Object.keys(playCateMap1).forEach((keys) => {
          if (ids.code === keys) {
            ids.children = playCateMap1[keys];
          }
        });
        //第3级
        ids.children.forEach((res) => {
          //暂存投注需要用的信息
          res.isOfficial = true;
          if (
            res.name === "后三特殊号" ||
            res.name === "前三特殊号" ||
            res.name === "中三特殊号"
          ) {
            res.children = [
              {
                name: "特殊号",
                detail: [],
              },
            ];
          }
          //组合类的数据
          let zh_odds = [];
          Object.keys(playByIdMap1).forEach((key) => {
            let plays = playByIdMap1[key];
            plays.addOdds = parseFloat(
              (
                plays.minOdds +
                (((plays.maxOdds - plays.minOdds) / plays.rebate) *
                  (userRebate - inputRebate)) /
                100
              ).toFixed(4)
            );
            if (res.code === playByIdMap1[key].code) {
              if (
                playByIdMap1[key].name === "前三组选和值" ||
                playByIdMap1[key].name === "中三组选和值" ||
                playByIdMap1[key].name === "后三组选和值" ||
                playByIdMap1[key].name === "五星组合" ||
                playByIdMap1[key].name === "任三组选和值" ||
                playByIdMap1[key].name === "后四组合" ||
                playByIdMap1[key].name === "前四组合"
              ) {
                zh_odds.push([plays.minOdds, plays.maxOdds, plays.addOdds]);
              }
              plays.zh_odds = zh_odds;
              if (
                res.name === "后三特殊号" ||
                res.name === "前三特殊号" ||
                res.name === "中三特殊号"
              ) {
                plays.selected = false;
                res.children[0].detail.push(plays);
                res.list = [[]];
                res.del = {};
              } else {
                res.del = plays;
              }
            }
          });
          //第4，5级
          //所有的单式后面弄
          switch (res.name) {
            //5星玩法
            case "五星复式":
            case "五星组合":
            case "定位胆": //定位胆玩法
            case "任二直选复式": //任选二
            case "任三直选复式": //任选三玩法
            case "任四直选复式": //任选四玩法
              res.list = [[], [], [], [], []];
              res.tool = 'full';
              res.children = sscCode([
                "万位",
                "千位",
                "百位",
                "十位",
                "个位",
              ]);
              break;
            /**后面改 */
            case "五星单式":
            case "前四单式":
            case "中三直选单式":
            case "后四单式":
            case "后三直选单式":
            case "前三直选单式":
            case "后二直选(单式)":
            case "前二直选(单式)":
            case "后二组选(单式)":
            case "前二组选(单式)":
            case "任二直选单式":
            case "任二组选单式":
            case "任三直选单式":
            case "任四直选单式":
              res.children = [];
              res.list = [[]];
              break;
            case "组选120":
              res.children = sscCode(["组选120"]);
              res.list = [[]];
              break;
            case "组选60":
            case "组选30":
            case "前四组选12": //前四玩法
            case "后四组选12": //后四玩法
              res.children = sscCode(["二重号", "单号"]);
              res.list = [[], []];
              break;
            case "组选20":
            case "前四组选4": //前四玩法
            case "后四组选4": //后四玩法
              res.children = sscCode(["三重号", "单号"]);
              res.list = [[], []];
              break;
            case "组选10":
              res.children = sscCode(["三重号", "二重号"]);
              res.list = [[], []];
              break;
            case "组选5":
              res.children = sscCode(["四重号", "单号"]);
              res.list = [[], []];
              break;
            //前四玩法
            case "前四复式":
            case "前四组合":
              res.children = sscCode(["万位", "千位", "百位", "十位"]);
              res.list = [[], [], [], []];
              break;
            case "前四组选24":
            case "后四组选24":
              (res.children = sscCode(["组选24"])), (res.list = [[]]);
              break;
            case "前四组选6":
            case "后四组选6":
              res.children = sscCode(["二重号"]);
              res.list = [[]];
              break;
            //后四玩法
            case "后四复式":
            case "后四组合":
              res.children = sscCode(["千位", "百位", "十位", "个位"]);
              res.list = [[], [], [], []];
              break;

            //后三码玩法
            case "后三直选复式":
              res.children = sscCode(["百位", "十位", "个位"]);
              res.list = [[], [], []];
              break;

            case "后三直选和值":
            case "前三直选和值":
            case "中三直选和值":
              res.children = sscCode(["直选和值"], 27);
              res.list = [[]];
              break;
            case "后三组三":
            case "前三组三":
            case "中三组三":
              res.children = sscCode(["组三"]);
              res.list = [[]];
              break;
            case "后三组六":
            case "前三组六":
            case "中三组六":
              res.children = sscCode(["组六"]);
              res.list = [[]];
              break;
            case "后三组选和值":
            case "前三组选和值":
            case "中三组选和值":
              res.children = sscCode(["组选和值"], 26, 0);
              res.list = [[]];
              break;
            //前三码
            case "前三直选复式":
              res.children = sscCode(["万位", "千位", "百位"]);
              res.list = [[], [], []];
              break;

            //中三码
            case "中三直选复式":
              res.children = sscCode(["千位", "百位", "十位"]);
              res.list = [[], [], []];
              break;

            //二码
            case "后二直选(复式)":
              res.children = sscCode(["十位", "个位"]);
              res.tool = 'full';
              res.list = [[], []];
              break;
            case "前二直选(复式)":
              res.children = sscCode(["万位", "千位"]);
              res.tool = 'full';
              res.list = [[], []];
              break;
            case "后二直选和值":
            case "前二直选和值":
              res.children = sscCode(["和值"], 18);
              res.tool = false;
              res.list = [[]];
              break;
            case "后二组选(复式)":
            case "前二组选(复式)":
              res.children = sscCode(["组选"]);
              res.tool = 'full';
              res.list = [[]];
              break;
            case "后二组选和值":
            case "前二组选和值":
              res.children = sscCode(["和值"], 17, 0);
              res.tool = false;
              res.list = [[]];
              break;
            //不定胆
            case "后三一码不定胆":
            case "后三二码不定胆":
            case "前三一码不定胆":
            case "前三二码不定胆":
              res.children = sscCode(["不定胆"]);
              res.tool = 'full';
              res.list = [[]];
              break;
            //任选二
            case "任二直选和值":
              res.children = sscCode(["直选和值"], 18);
              res.tool = false;
              res.list = [[]];
              break;
            case "任二组选复式":
              res.children = sscCode(["组选"]);
              res.tool = 'full';
              res.list = [[]];
              break;
            case "任二组选和值":
              res.children = sscCode(["组选"], 17, 0);
              res.tool = false;
              res.list = [[]];
              break;
            //任选三
            case "任三直选和值":
              res.children = sscCode(["直选和值"], 27);
              res.tool = false;
              res.list = [[]];
              break;
            case "任三组三":
              res.children = sscCode(["组三"]);
              res.list = [[]];
              break;
            case "任三组六":
              res.children = sscCode(["组六"]);
              res.list = [[]];
              break;
            case "任三组选和值":
              res.children = sscCode(["组选和值"], 26, 0);
              res.list = [[]];
              break;
            //任选四
            case "组选24":
              res.children = sscCode(["单号"]);
              res.list = [[]];
              break;
            case "组选12":
              res.children = sscCode(["二重号", "单号"]);
              res.list = [[], []];
              break;
            case "组选6":
              res.children = sscCode(["二重号"]);
              res.list = [[]];
              break;
            case "组选4":
              res.children = sscCode(["三重号", "单号"]);
              res.list = [[], []];
              break;
            default:
              break;
          }
        });
      });
    });

    let xyMenu = [
      creditList[0],
      {
        name: "大小单双",
        isOfficial: false,
        children: [
          {
            name: "大小单双",
            children: [
              creditList[1].children[0].children[0],
              creditList[2].children[0].children[0],
              creditList[3].children[0].children[0],
              creditList[4].children[0].children[0],
              creditList[5].children[0].children[0],
            ],
          },
        ],
      },
      ...creditList.slice(6, creditList.length),
    ];
    //质合玩法
    let ziheMenu = [
      {
        name: "质合",
        isOfficial: false,
        //第2级
        children: [
          {
            name: "质合",
            isOfficial: false,
            //第3级
            children: [
              {
                name: "质合",
                children: ziheList,
              },
            ],
          },
        ],
      },
    ];
    // 玩法整合
    let betListFirst = [...xyMenu, ...ziheMenu, ...officialList];
    let dingweiIndex = betListFirst.findIndex(
      (item) => item.name === "定位胆"
    );
    let newVar = [
      ...betListFirst.slice(dingweiIndex, dingweiIndex + 1),
      ...betListFirst.slice(0, dingweiIndex),
      ...betListFirst.slice(dingweiIndex + 1, betListFirst.length),
    ];
    return newVar;
  }

  static backUpsetSSCMethodInit(data, data1, lotteryId, userRebate, inputRebate) {
    let [playCateMap, playByIdMap, playCateMap1, playByIdMap1] = [
      data.playCateMap,
      data.playByIdMap,
      data1.playCateMap,
      data1.playByIdMap,
    ];

    let [navList, navList1] = [
      playCateMap[lotteryId],
      playCateMap1[lotteryId],
    ];

    let ziheList = [];
    // 信用玩法数据处理
    navList.map((item) => {
      //第1级
      item.children = [
        {
          name: item.name,
          //第2级
          children: [
            {
              name: item.name,
              isOfficial: false,
              //第3级
              children: [],
            },
          ],
        },
      ];
      //第4级
      Object.keys(playCateMap).forEach((keys) => {
        if (item.code === keys) {
          item.children[0].children[0].children = playCateMap[keys];
        }
      });
      //第5级
      if (item.children[0].children[0].children) {
        item.children[0].children[0].children.map((ids) => {
          ids.detail = [];
          Object.keys(playByIdMap).map((key) => {
            let plays = playByIdMap[key];
            // 赔率计算
            plays.addOdds = parseFloat(
              (
                plays.minOdds +
                (((plays.maxOdds - plays.minOdds) / plays.rebate) *
                  (userRebate - inputRebate)) /
                100
              ).toFixed(4)
            );
            playByIdMap[key].selected = false;
            if (ids.code === playByIdMap[key].code) {
              ids.detail.push(playByIdMap[key]);
            }
          });
          ids.detail.sort((a, b) => {
            return a.sort - b.sort;
          });
        });
      }
      //质合玩法
      if (
        item.name === "万位" ||
        item.name === "千位" ||
        item.name === "百位" ||
        item.name === "十位" ||
        item.name === "个位"
      ) {
        let ziHe = item.children[0].children[0].children;
        ziheList.push(ziHe.slice(ziHe.length - 1, ziHe.length)[0]);
        item.children[0].children[0].children.pop();
      }
    });
    //官方玩法数据处理
    navList1.map((item) => {
      //第一级
      item.children = [];
      Object.keys(playCateMap1).forEach((keys) => {
        if (item.code === keys) {
          item.children = playCateMap1[keys];
        }
      });
      item.children.forEach((ids) => {
        //第二级
        ids.children = [];
        Object.keys(playCateMap1).forEach((keys) => {
          if (ids.code === keys) {
            ids.children = playCateMap1[keys];
          }
        });
        //第3级
        ids.children.forEach((res) => {
          //暂存投注需要用的信息
          res.isOfficial = true;
          if (
            res.name === "后三特殊号" ||
            res.name === "前三特殊号" ||
            res.name === "中三特殊号"
          ) {
            res.children = [
              {
                name: "特殊号",
                detail: [],
              },
            ];
          }
          //组合类的数据
          let zh_odds = [];
          Object.keys(playByIdMap1).forEach((key) => {
            let plays = playByIdMap1[key];
            plays.addOdds = parseFloat(
              (
                plays.minOdds +
                (((plays.maxOdds - plays.minOdds) / plays.rebate) *
                  (userRebate - inputRebate)) /
                100
              ).toFixed(4)
            );
            if (res.code === playByIdMap1[key].code) {
              if (
                playByIdMap1[key].name === "前三组选和值" ||
                playByIdMap1[key].name === "中三组选和值" ||
                playByIdMap1[key].name === "后三组选和值" ||
                playByIdMap1[key].name === "五星组合" ||
                playByIdMap1[key].name === "任三组选和值" ||
                playByIdMap1[key].name === "后四组合" ||
                playByIdMap1[key].name === "前四组合"
              ) {
                zh_odds.push([plays.minOdds, plays.maxOdds, plays.addOdds]);
              }
              plays.zh_odds = zh_odds;
              if (
                res.name === "后三特殊号" ||
                res.name === "前三特殊号" ||
                res.name === "中三特殊号"
              ) {
                plays.selected = false;
                res.children[0].detail.push(plays);
                res.list = [[]];
                res.del = {};
              } else {
                res.del = plays;
              }
            }
          });
          //第4，5级
          //所有的单式后面弄
          switch (res.name) {
            //5星玩法
            case "五星复式":
            case "五星组合":
            case "定位胆": //定位胆玩法
            case "任二直选复式": //任选二
            case "任三直选复式": //任选三玩法
            case "任四直选复式": //任选四玩法
              res.list = [[], [], [], [], []];
              res.children = sscCode([
                "万位",
                "千位",
                "百位",
                "十位",
                "个位",
              ]);
              break;
            /**后面改 */
            case "五星单式":
            case "前四单式":
            case "中三直选单式":
            case "后四单式":
            case "后三直选单式":
            case "前三直选单式":
            case "后二直选(单式)":
            case "前二直选(单式)":
            case "后二组选(单式)":
            case "前二组选(单式)":
            case "任二直选单式":
            case "任二组选单式":
            case "任三直选单式":
            case "任四直选单式":
              res.children = [];
              res.list = [[]];
              break;
            case "组选120":
              res.children = sscCode(["组选120"]);
              res.list = [[]];
              break;
            case "组选60":
            case "组选30":
            case "前四组选12": //前四玩法
            case "后四组选12": //后四玩法
              res.children = sscCode(["二重号", "单号"]);
              res.list = [[], []];
              break;
            case "组选20":
            case "前四组选4": //前四玩法
            case "后四组选4": //后四玩法
              res.children = sscCode(["三重号", "单号"]);
              res.list = [[], []];
              break;
            case "组选10":
              res.children = sscCode(["三重号", "二重号"]);
              res.list = [[], []];
              break;
            case "组选5":
              res.children = sscCode(["四重号", "单号"]);
              res.list = [[], []];
              break;
            //前四玩法
            case "前四复式":
            case "前四组合":
              res.children = sscCode(["万位", "千位", "百位", "十位"]);
              res.list = [[], [], [], []];
              break;
            case "前四组选24":
            case "后四组选24":
              (res.children = sscCode(["组选24"])), (res.list = [[]]);
              break;
            case "前四组选6":
            case "后四组选6":
              res.children = sscCode(["二重号"]);
              res.list = [[]];
              break;
            //后四玩法
            case "后四复式":
            case "后四组合":
              res.children = sscCode(["千位", "百位", "十位", "个位"]);
              res.list = [[], [], [], []];
              break;

            //后三码玩法
            case "后三直选复式":
              res.children = sscCode(["百位", "十位", "个位"]);
              res.list = [[], [], []];
              break;

            case "后三直选和值":
            case "前三直选和值":
            case "中三直选和值":
              res.children = sscCode(["直选和值"], 27);
              res.list = [[]];
              break;
            case "后三组三":
            case "前三组三":
            case "中三组三":
              res.children = sscCode(["组三"]);
              res.list = [[]];
              break;
            case "后三组六":
            case "前三组六":
            case "中三组六":
              res.children = sscCode(["组六"]);
              res.list = [[]];
              break;
            case "后三组选和值":
            case "前三组选和值":
            case "中三组选和值":
              res.children = sscCode(["组选和值"], 26, 0);
              res.list = [[]];
              break;
            //前三码
            case "前三直选复式":
              res.children = sscCode(["万位", "千位", "百位"]);
              res.list = [[], [], []];
              break;

            //中三码
            case "中三直选复式":
              res.children = sscCode(["千位", "百位", "十位"]);
              res.list = [[], [], []];
              break;

            //二码
            case "后二直选(复式)":
              res.children = sscCode(["十位", "个位"]);
              res.list = [[], []];
              break;
            case "前二直选(复式)":
              res.children = sscCode(["万位", "千位"]);
              res.list = [[], []];
              break;
            case "后二直选和值":
            case "前二直选和值":
              res.children = sscCode(["和值"], 18);
              res.list = [[]];
              break;
            case "后二组选(复式)":
            case "前二组选(复式)":
              res.children = sscCode(["组选"]);
              res.list = [[]];
              break;
            case "后二组选和值":
            case "前二组选和值":
              res.children = sscCode(["和值"], 17, 0);
              res.list = [[]];
              break;
            //不定胆
            case "后三一码不定胆":
            case "后三二码不定胆":
            case "前三一码不定胆":
            case "前三二码不定胆":
              res.children = sscCode(["不定胆"]);
              res.list = [[]];
              break;
            //任选二
            case "任二直选和值":
              res.children = sscCode(["直选和值"], 18);
              res.list = [[]];
              break;
            case "任二组选复式":
              res.children = sscCode(["组选"]);
              res.list = [[]];
              break;
            case "任二组选和值":
              res.children = sscCode(["组选"], 17, 0);
              res.list = [[]];
              break;
            //任选三
            case "任三直选和值":
              res.children = sscCode(["直选和值"], 27);
              res.list = [[]];
              break;
            case "任三组三":
              res.children = sscCode(["组三"]);
              res.list = [[]];
              break;
            case "任三组六":
              res.children = sscCode(["组六"]);
              res.list = [[]];
              break;
            case "任三组选和值":
              res.children = sscCode(["组选和值"], 26, 0);
              res.list = [[]];
              break;
            //任选四
            case "组选24":
              res.children = sscCode(["单号"]);
              res.list = [[]];
              break;
            case "组选12":
              res.children = sscCode(["二重号", "单号"]);
              res.list = [[], []];
              break;
            case "组选6":
              res.children = sscCode(["二重号"]);
              res.list = [[]];
              break;
            case "组选4":
              res.children = sscCode(["三重号", "单号"]);
              res.list = [[], []];
              break;
            default:
              break;
          }
        });
      });
    });
    let xyMenu = [
      navList[0],
      {
        name: "大小单双",
        children: [
          {
            name: "大小单双",
            children: [
              navList[1].children[0].children[0],
              navList[2].children[0].children[0],
              navList[3].children[0].children[0],
              navList[4].children[0].children[0],
              navList[5].children[0].children[0],
            ],
          },
        ],
      },
      ...navList.slice(6, navList.length),
    ];
    //质合玩法
    let ziheMenu = [
      {
        name: "质合",
        //第2级
        children: [
          {
            name: "质合",
            isOfficial: false,
            //第3级
            children: [
              {
                name: "质合",
                children: ziheList,
              },
            ],
          },
        ],
      },
    ];
    // 玩法整合
    let betListFirst = [...xyMenu, ...ziheMenu, ...navList1];
    let dingweiIndex = betListFirst.findIndex(
      (item) => item.name === "定位胆"
    );
    let newVar = [
      ...betListFirst.slice(dingweiIndex, dingweiIndex + 1),
      ...betListFirst.slice(0, dingweiIndex),
      ...betListFirst.slice(dingweiIndex + 1, betListFirst.length),
    ];
    return newVar;
  }

  static setPk10MethodInit(data, lotteryId, data1, userRebate, inputRebate) {
    let [navList, playByIdMap, navList1, playByIdMap1] = [data.playCateMap[lotteryId], data.playByIdMap, data1.plyCateByCodeMap, data1.playByIdMap]
    // 信用玩法数据处理
    navList.forEach(item => {
      Object.keys(data.playCateMap).forEach(key => {
        if (item.code === key) item.children = data.playCateMap[key]
      })
      if (item.children) {
        item.children.map(val => {
          val.detail = []
          Object.keys(playByIdMap).forEach(keys => {
            let [plays, i] = [playByIdMap[keys], playByIdMap[keys].code]
            playByIdMap[keys].selected = false
            // 赔率计算
            plays.addOdds = parseFloat((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100).oddFixed(4))
            if (i.substr(0, 8) === val.code) val.detail.push(playByIdMap[keys])
          })
        })
      }
    })
    let xyMenu = [
      {
        name: '冠亚军和', children: [navList[0]]
      },
      {
        name: '大小单双1-5', children: navList.slice(1, 6)
      },
      {
        name: '大小单双6-10', children: navList.slice(6, 12)
      },
      {
        name: '龙虎', children: [{name: "龙虎", children: []}]
      }
    ]
    xyMenu[1].children.forEach(item => {
      xyMenu[3].children[0].children.push(item.children[3])
      item.children.pop()
    })
    // 官方玩法数据处理
    let [gfMenu, singleArr, custCode] = [[], Array.from({length: 10}), pksCode()]
    // 自定义号码
    let codeArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
    Object.keys(navList1).forEach(keys => {
      if (navList1[keys].code.length === 9) gfMenu.push(navList1[keys])
    })
    gfMenu.forEach(item => {
      item.children = []
      // 去除猜
      if (item.name.includes('猜')) item.name = item.name.slice(-2)
      // 二级菜单
      Object.keys(playByIdMap1).forEach(keys => {
        let plays = playByIdMap1[keys]
        plays.selected = false
        // 增加官方玩法标识
        plays.isGf = true
        // 赔率计算
        plays.addOdds = parseFloat(((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100)).oddFixed(4)) / 2
        if (item.code === plays.code.substr(0, 9)) item.children.push(playByIdMap1[keys])
      })
      // 自定义号码
      item.children.forEach(ids => {
        if (ids.name === '猜冠军' || ids.name === '猜亚军') {
          let arr = singleArr.map((val, key) => {
            val = JSON.parse(JSON.stringify(ids))
            val.alias = codeArr[key]
            val.value = codeArr[key]
            return val
          })
          ids.detail = [
            {
              name: item.name.slice(-2),
              detail: arr
            }
          ]
        }
        if (ids.name === '猜前二复式') ids.detail = [custCode[0], custCode[1]]
        if (ids.name === '猜前三复式') ids.detail = [custCode[0], custCode[1], custCode[2]]
        if (ids.name === '猜前四复式') ids.detail = [custCode[0], custCode[1], custCode[2], custCode[3]]
        if (ids.name === '猜前五复式') ids.detail = [custCode[0], custCode[1], custCode[2], custCode[3], custCode[4]]
        if (ids.name === '定位胆') ids.detail = pksDw()
        if (ids.name === '猜前二单式') ids.detail = {isSimplex: true, num: 2}
        if (ids.name === '猜前三单式') ids.detail = {isSimplex: true, num: 3}
        if (ids.name === '猜前四单式') ids.detail = {isSimplex: true, num: 4}
        if (ids.name === '猜前五单式') ids.detail = {isSimplex: true, num: 5}
        // 去除猜
        if (ids.name.includes('猜')) {
          ids.name = ids.name.slice(-2)
        }
      })
    })
    // 重新排序
    gfMenu.splice(1, 0, gfMenu[gfMenu.length - 1])
    gfMenu.pop();
    let newVar = [...xyMenu, ...gfMenu];
    return newVar;
  }

  static setMarkSixMethodInit(res, lotteryId, userRebate, inputRebate) {
    let [navList, playByIdMap, specialArr, newSpecial, freeObj] = [res.data.playCateMap[lotteryId], res.data.playByIdMap, [], Array.from({length: 6}), '']
    const [menu, code] = [['特码', '特码B', '正码', '两面', '特码半波', '正码半波'], ['一', '二', '三', '四', '五', '六']]
    // 存储生肖对应的号码
    navList.map(item => {
      Object.keys(res.data.playCateMap).forEach(key => {
        if (item.code === key) item.children = res.data.playCateMap[key]
        // 特码生肖单独加二级匹配
        if (item.code === `${lotteryId}201`) item.children = [{code: `${lotteryId}201`}]
      })
      if (item.children) {
        item.children.map(ids => {
          ids.detail = []
          Object.keys(playByIdMap).forEach(keys => {
            let [plays, i] = [playByIdMap[keys], playByIdMap[keys].code]
            // 增加一个选中属性
            playByIdMap[keys].selected = false
            // 赔率计算
            plays.addOdds = parseFloat((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100).oddFixed(4))
            // 匹配具体玩法号码
            if (playByIdMap[keys].code.substr(0, 8) === ids.code) ids.detail.push(playByIdMap[keys])
            // 连肖、连尾、数组队列组合组数
            if (i === `${lotteryId}204101` || i === `${lotteryId}205101` || i === `${lotteryId}207105` || i === `${lotteryId}207106` || i === `${lotteryId}207107`) playByIdMap[keys].nums = 2
            if (i === `${lotteryId}204102` || i === `${lotteryId}205102` || i === `${lotteryId}207102` || i === `${lotteryId}207103`) playByIdMap[keys].nums = 3
            if (i === `${lotteryId}204103` || i === `${lotteryId}205103` || i === `${lotteryId}207101`) playByIdMap[keys].nums = 4
            if (i === `${lotteryId}204104` || i === `${lotteryId}205104`) playByIdMap[keys].nums = 5
            // 连肖、连尾最大投注笔数并增加一个标识
            if (i.substr(0, 5) === `${lotteryId}204` || i.substr(0, 5) === `${lotteryId}205`) {
              playByIdMap[keys].isZodiac = true
              playByIdMap[keys].betsNum = 8
              // 连肖取最小赔率
              if (i.substr(0, 5) === `${lotteryId}204`) playByIdMap[keys].isSmall = true
              // 连尾取最大赔率
              if (i.substr(0, 5) === `${lotteryId}205`) playByIdMap[keys].isBig = true
            }
            // 连码最大投注笔数
            if (i.substr(0, 5) === `${lotteryId}207`) playByIdMap[keys].betsNum = 10
            // 自选不中、自选中一最大投注笔数 n + 2一级队队列组合组数
            if (i.substr(0, 5) === `${lotteryId}208`) {
              let num = Number(i.slice(-2))
              num < 5 ?
                (playByIdMap[keys].betsNum = num + 4, playByIdMap[keys].nums = num + 2) :
                (playByIdMap[keys].betsNum = num + 2, playByIdMap[keys].nums = num)
            }
            // 合肖中、不中增加一个标识
            if (i === `${lotteryId}206101` || i === `${lotteryId}206102`) {
              if (i === `${lotteryId}206101`) playByIdMap[keys].addHe = 'true'
              if (i === `${lotteryId}206102`) playByIdMap[keys].addHe = 'false'
              playByIdMap[keys].betsNum = 11
            }
          })
          // 连码、自选不中单独加号码
          if (item.code === `${lotteryId}207` || item.code === `${lotteryId}208`) {
            ids.detail[0].isAddAttr = true // 需要增加属性
            ids.detail = [...ids.detail, ...listCode()]
          }
        })
      }
      // 特码、自选不中一级菜单拆分
      if (item.code === `${lotteryId}200`) {
        specialArr = [JSON.stringify(item)]
        item.name = '正码1-6'
        item.children.splice(0, 3)
        item.children.pop()
        // 正码半波拆分
        specialArr.push(JSON.stringify(item))
        // 正码1-6二级菜单名称变更
        item.children.map((val, key) => val.name = `正${code[key]}特`)
      }
      if (item.code === `${lotteryId}208`) {
        freeObj = JSON.stringify(item)
        item.children.splice(0, 4)
      }
    })
    // 一级菜单增加
    let newSpecialArr = newSpecial.map((item, key) => {
      key < 5 ? item = JSON.parse(specialArr[0]) : item = JSON.parse(specialArr[1])
      item.name = menu[key]
      if (key === 0 || key === 1 || key === 2) item.children = [item.children[key]]
      if (key === 3) item.children = [item.children[0]]
      if (key === 4) item.children = [item.children[9]]
      return item
    })
    const newObj = JSON.parse(freeObj)
    newObj.name = '自选中一'
    newObj.children.splice(4, 10)
    navList.push(newObj)
    const newList = [...newSpecialArr, ...navList]
    newList.splice(1, 1)
    sessionStorage.setItem(`lhc${lotteryId}`, JSON.stringify(newList))
    return newList;
  }

  static setLuckyTreeMethodInit(data, lotteryId, data1, userRebate, inputRebate) {
    console.log(data, 'credit');
    console.log(data1, 'official');
    console.log(lotteryId, data.playCateMap[lotteryId], 'data.playCateMap[lotteryId]');
    // let [navList, playByIdMap, navList1, playByIdMap1] = [data.playCateMap[lotteryId], data.playByIdMap, data1.plyCateByCodeMap, data1.playByIdMap]
    let navList = JSON.parse(JSON.stringify(data.playCateMap[lotteryId]))
    let playByIdMap = JSON.parse(JSON.stringify(data.playByIdMap))
    let navList1 = JSON.parse(JSON.stringify(data1.plyCateByCodeMap))
    let playByIdMap1 = JSON.parse(JSON.stringify(data1.playByIdMap))
    // console.log(navList,'navList--k3');
    // console.log(playByIdMap,'playByIdMap--k3');
    // console.log(navList1,'navList1--k3');
    // console.log(playByIdMap1,'playByIdMap1--k3');
    // 信用玩法数据处理
    navList.map(item => {
      // console.log(item,'navList---11');
      item.detail = []
      // 一级菜单合并
      if (item.code === `${lotteryId}101`) {
        item.name = '骰宝、大小、单双'
        item.newCode = `${lotteryId}106`
        item.newCode1 = `${lotteryId}108`
      }
      if (item.code === `${lotteryId}102`) {
        item.name = '围骰、全骰'
        item.newCode = `${lotteryId}107`
      }
      // console.log(playByIdMap,'playByIdMap');
      Object.keys(playByIdMap).forEach(keys => {
        // console.log(keys,'keys');
        let [plays, i] = [playByIdMap[keys], playByIdMap[keys].code]
        plays.selected = false // 选中属性
        // 赔率计算
        plays.addOdds = parseFloat((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100).oddFixed(4))
        if (i === item.code || i === item.newCode || i === item.newCode1) {
          item.detail.push(playByIdMap[keys])
        }
      })
    })
    // 清除合并项
    navList.map((item, key) => {
      if (Number(item.code) > Number(`${lotteryId}105`)) {
        navList.splice(key, 1)
      }
      // 点数数据排序纠正，3点放在第一位
      if (key === 2) {
        for (let i = 0; i < item.detail.length - 1; i++) {
          for (let j = i + 1; j < item.detail.length; j++) {
            if (item.detail[i].sort > item.detail[j].sort) {
              [item.detail[i], item.detail[j]] = [item.detail[j], item.detail[i]]
            }
          }
        }
      }
    })
    navList.pop()
    // 官方玩法数据处理
    let [gfMenu, checkArr, serialArr] = [[], Array.from({length: 6}), Array.from({length: 4})]
    // 自定义号码
    let codeArr = {
      diffCode: [1, 2, 3, 4, 5, 6],
      serialCode: [123, 234, 345, 456],
      checkCode: [111, 222, 333, 444, 555, 666],
      singleCode: [11, 22, 33, 44, 55, 66]
    }
    Object.keys(navList1).forEach(keys => {
      // 取一级菜单
      if (navList1[keys].code.length === 9) gfMenu.push(navList1[keys])
    })
    gfMenu.map(item => {
      item.children = []
      // 和值单独增加二级菜单处理
      if (item.code === `9${lotteryId}102101`) {
        item.children = [{
          name: item.name,
          code: `9${lotteryId}102101101`,
          detail: [
            {
              name: item.name,
              isSpan: true,
              detail: []
            }
          ]
        }]
      }
      // 二级菜单
      Object.keys(playByIdMap1).forEach(keys => {
        let [plays, i] = [playByIdMap1[keys], playByIdMap1[keys].code]
        plays.selected = false
        // 增加官方玩法标识
        plays.isGf = true
        // 赔率计算
        plays.addOdds = parseFloat(((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100)).oddFixed(4)) / 2
        if (item.code === i.substr(0, 9)) {
          // 和值具体玩法
          if (item.code === `9${lotteryId}102101`) {
            // 多层次数据
            plays.isMore = true
            item.children[0].detail[0].detail.push(plays)
          } else {
            item.children.push(plays)
          }
        }
      })
      // 自定义除和值外其它类型玩法
      item.children.map(ids => {
        if (ids.name === '二同号单选 ') {
          let arr = checkArr.map((val, key) => {
            val = JSON.parse(JSON.stringify(ids))
            val.value = codeArr.singleCode[key]
            val.addName = '同号'
            return val
          })
          let arr1 = checkArr.map((val, key) => {
            val = JSON.parse(JSON.stringify(ids))
            val.value = codeArr.diffCode[key]
            val.addName = '不同号'
            return val
          })
          let newArr = [
            {
              name: '同号',
              isSpan: true,
              detail: arr
            },
            {
              name: '不同号',
              isSpan: true,
              detail: arr1
            }
          ]
          ids.detail = newArr
        }
        if (ids.name === '二同号复选' || ids.name === '三同号单选' || ids.name === '三同号复选' || ids.name === '二不同号 ' || ids.name === '三不同号') {
          let arr = checkArr.map((val, key) => {
            val = JSON.parse(JSON.stringify(ids))
            ids.name === '二同号复选' ? val.value = codeArr.singleCode[key]
              : (ids.name === '二不同号 ' || ids.name === '三不同号' ? val.value = codeArr.diffCode[key] : val.value = codeArr.checkCode[key])
            if (ids.name === '二不同号 ') val.num = 2
            if (ids.name === '三不同号') val.num = 3
            return val
          })
          ids.detail = [
            {
              name: ids.name,
              detail: arr
            }
          ]
        }
        if (ids.name === '三连号') {
          ids.name = '三连号通选'
          let arr = serialArr.map((val, key) => {
            val = JSON.parse(JSON.stringify(ids))
            val.value = codeArr.serialCode[key]
            return val
          })
          ids.detail = [
            {
              name: ids.name,
              detail: arr
            }
          ]
        }
      })
    })
    // 玩法整合
    let xyMenu = [{name: '大小骰宝', children: navList}]
    let betList = [...xyMenu, ...gfMenu];
    return betList;
  }

  static setLucky28MethodInit(data, lotteryId, userRebate, inputRebate) {
    let [navList, playByIdMap, singleArr] = [data.playCateMap[lotteryId], data.playByIdMap, Array.from({length: 28})]
    navList.map(item => {
      item.detail = []
      Object.keys(playByIdMap).forEach(keys => {
        let [plays, i] = [playByIdMap[keys], playByIdMap[keys].code]
        plays.selected = false // 选中属性
        // 赔率计算
        plays.addOdds = parseFloat((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100).oddFixed(4))
        // 玩法整合
        if (i.substr(0, 5) === item.code) item.detail.push(playByIdMap[keys])
      })
      // 特码三包增加自定义号码s
      if (item.code === `${lotteryId}104`) {
        let arr = singleArr.map((val, key) => {
          val = JSON.parse(JSON.stringify(item.detail[0]))
          val.value = key
          val.selected = false
          val.nums = 3 // 信用玩法复式投注组数
          return val
        })
        item.detail = arr
      }
    })
    // 玩法整合
    let xyMenu = []
    navList.forEach(item => {
      let list = {
        name: item.name,
        children: [item]
      }
      xyMenu.push(list)
    })
    return xyMenu;
  }

  static setKlcMethodInit(data, lotteryId, userRebate, inputRebate) {
    let [navList, playByIdMap, arrs] = [data.playCateMap[lotteryId], data.playByIdMap, {name: '总和', detail: []}]
    let singArr = Array.from({length: 20})
    // 信用玩法数据处理
    navList.forEach((item, key) => {
      Object.keys(data.playCateMap).forEach(key => {
        if (item.code === key) item.children = data.playCateMap[key]
      })
      if (item.children) {
        item.children.forEach((val, ids) => {
          val.detail = []
          Object.keys(playByIdMap).forEach(keys => {
            let [plays, i] = [playByIdMap[keys], playByIdMap[keys].code]
            plays.selected = false // 增加选中属性
            // 赔率计算
            plays.addOdds = parseFloat((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100).oddFixed(4))
            if (i.substr(0, 8) === val.code && val.code.substr(0, 5) !== `${lotteryId}106`) val.detail.push(plays)
            // 提取两面总和属性
            if (val.code.substr(0, 5) === `${lotteryId}106` && i.substr(0, 8) === val.code) {
              arrs.detail.push(plays)
            }
          })
          // 自定义号码
          if (key > 0 && key !== 5) {
            let betsNum = 0 // 最多可选号码
            if (key === 1) {
              // 任选二最多可选5位
              betsNum = 5
            } else {
              betsNum = 8
            }
            let arr = singArr.map((res, i) => {
              // 号码模拟
              let num = ''
              // 号码前面于两位数加0
              i < 9 ? num = '0' + (i + 1) : num = i + 1 + ''
              res = JSON.parse(JSON.stringify(val.detail[0]))
              res.value = num
              res.alias = num
              res.nums = ids !== 1 ? key + 1 : 1
              res.betsNum = ids !== 1 ? betsNum : ''
              return res
            })
            if ((key === 1 || key === 2) && ids === 1) {
              val.children = [
                {
                  "name": '第一位',
                  detail: arr
                },
                {
                  "name": '第二位',
                  detail: JSON.parse(JSON.stringify(arr))
                }
              ]
              if (key === 2) {
                val.children.push(
                  {
                    "name": '第三位',
                    detail: JSON.parse(JSON.stringify(arr))
                  }
                )
              }
            } else {
              val.children = val.detail
              val.children[0].detail = arr
            }
            delete val.detail
          }
        })
      }
    })
    // 去除总和
    navList.pop()
    // 菜单更新处理
    let xyMenu = [
      {
        name: '选一',
        children: [
          {
            name: '选一',
            children: navList[0].children
          }
        ]
      },
      {
        name: '选二',
        children: navList[1].children
      },
      {
        name: '选三',
        children: navList[2].children
      },
      {
        name: '选四',
        children: navList[3].children
      },
      {
        name: '选五',
        children: navList[4].children
      },
    ]
    // 增加两面玩法
    let newMenu = [
      {
        name: '两面',
        children: [
          {
            name: '两面',
            // 取选一大小单双等数据
            children: JSON.parse(JSON.stringify(navList[0].children))
          }
        ]
      }
    ]
    newMenu[0].children[0].children.push(arrs);
    let newVar = [...xyMenu, ...newMenu];
    return newVar;
  }

  static setGxklsfMethodInit(data, lotteryId, userRebate, inputRebate) {
    let [navList, playByIdMap] = [data.playCateMap[lotteryId], data.playByIdMap]
    let singArr = Array.from({length: 21})
    // 信用玩法数据处理
    navList.forEach((item, key) => {
      Object.keys(data.playCateMap).forEach(key => {
        if (item.code === key) item.children = data.playCateMap[key]
      })
      if (item.children) {
        item.children.forEach((val, ids) => {
          val.detail = []
          Object.keys(playByIdMap).forEach(keys => {
            let [plays, i] = [playByIdMap[keys], playByIdMap[keys].code]
            plays.selected = false // 增加选中属性
            // 赔率计算
            plays.addOdds = parseFloat((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100).oddFixed(4))
            if (i.substr(0, 8) === val.code) {
              val.detail.push(playByIdMap[keys])
            }
          })
          // 连码自定义号码
          if (key === 2) {
            let nums = 0 // 复式投注比例
            if (ids === 0) {
              nums = 2
            }
            if (ids === 1 || ids === 2) {
              nums = 3
            }
            if (ids === 3) {
              nums = 4
            }
            if (ids === 4) {
              nums = 5
            }
            let arr = singArr.map((res, i) => {
              // 号码前面于两位数加0
              let num = ''
              i < 9 ? num = '0' + (i + 1) : num = i + 1 + ''
              res = JSON.parse(JSON.stringify(val.detail[0]))
              res.value = num
              res.alias = num
              res.nums = nums
              res.betsNum = 8 // 最大可选号码
              return res
            })
            val.children = val.detail
            val.children[0].detail = arr
            delete val.detail
          }
        })
      }
    })
    //菜单更新处理
    let xyMenu = [
      {
        name: '特别号,正码特',
        children: [
          {
            name: '特别号,正码特',
            children: navList[0].children
          }
        ]
      },
      {
        name: '一中一,总和',
        children: [
          {
            name: '一中一,总和',
            children: navList[1].children
          }
        ]
      },
      {
        name: '连码',
        children: navList[2].children
      },
      {
        name: '四季五行',
        children: [
          {
            name: '四季五行',
            children: navList[3].children
          }
        ]
      },
    ]
    // 增加两面玩法
    let newMenu = [
      {
        name: '两面',
        children: [
          {
            name: '两面',
            // 取特别号,正码特大小单双等数据
            children: JSON.parse(JSON.stringify(navList[0].children))
          }
        ]
      }
    ];
    let newVar = [...newMenu, ...xyMenu];
    return newVar;
  }

  static setGame11of5fMethodInit(data, lotteryId, data1, userRebate, inputRebate) {
    let [navList, playByIdMap, navList1, playByIdMap1] = [data.playCateMap[lotteryId], data.playByIdMap, data1.playCateMap[lotteryId], data1.playByIdMap]
    // 信用玩法数据处理
    navList.map(item => {
      item.detail = []
      Object.keys(playByIdMap).forEach(keys => {
        let plays = playByIdMap[keys]
        plays.selected = false // 选中属性
        // 赔率计算
        plays.addOdds = parseFloat((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100).oddFixed(4))
        if (playByIdMap[keys].code.substr(0, 5) === item.code) item.detail.push(plays)
      })
    })
    // 连码、直选自定义号码
    let codeList = Array.from({length: 11})
    // 总和龙虎放到第一位
    navList.splice(0, 0, navList[navList.length - 1])
    navList.pop()
    let xyMenu = [
      {
        name: '两面', children: [{name: '两面', children: navList.slice(0, 6)}]
      },
      {
        name: '单号', children: [{name: '单号', children: JSON.parse(JSON.stringify(navList.slice(1, 7)))}]
      },
      {
        name: '连码', children: [{name: '连码', children: navList[7].detail}]
      },
      {
        name: '直选', children: navList[8].detail
      }
    ]
    // 数据处理
    xyMenu.forEach((item, key) => {
      if (key < 3) {
        item.children[0].children.forEach((val, ids) => {
          if (key === 0 && ids > 0) {
            val.detail = val.detail.slice(11, 20)
          }
          if (key === 1 && ids < 5) {
            val.detail = val.detail.slice(0, 11)
          }
          if (key === 2) {
            let betsNum = 0 // 最多可选号码
            let nums = 0 // 复式投注比例
            if (ids === 0 || ids === 7) {
              betsNum = 4
              nums = 2
            }
            if (ids === 1 || ids === 8) {
              betsNum = 5
              nums = 3
            }
            if (ids > 1 && ids < 7) {
              betsNum = ids + 4
              nums = ids + 2
            }
            // 自定义号码
            let arr = codeList.map((res, i) => {
              let num = ''
              i < 9 ? num = '0' + (i + 1) : num = i + 1 + ''
              res = JSON.parse(JSON.stringify(val))
              res.value = num
              res.nums = nums // 信用玩法复式比例
              res.betsNum = betsNum // 最多可选号码
              return res
            })
            val.detail = arr
          }
        })
      }
      if (key === 3) {
        item.children.forEach((val, ids) => {
          let arr = utils.mapArr(val, ids)
          val.children = [
            {
              "name": '第一球',
              detail: arr
            },
            {
              "name": '第二球',
              detail: JSON.parse(JSON.stringify(arr))
            }
          ]
          if (ids === 1) {
            val.children.push(
              {
                name: '第三球',
                detail: JSON.parse(JSON.stringify(arr))
              }
            )
          }
        })
      }
    })
    // 官方玩法数据处理
    let [gfMenu, singleArr, custCode] = [navList1, Array.from({length: 11}), pksDw(11)]
    let codes = pksCode(11)
    let codeArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
    // 自定义号码
    gfMenu.map(item => {
      item.children = []
      Object.keys(playByIdMap1).forEach(keys => {
        let plays = playByIdMap1[keys]
        plays.selected = false
        // 增加官方玩法标识
        plays.isGf = true
        // 官方赔率显示除以2
        plays.addOdds = parseFloat(((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100)).oddFixed(4)) / 2
        if (item.code === plays.code.substr(0, 6)) {
          item.children.push(playByIdMap1[keys])
        }
      })
      // 任选复式排列
      if (item.code === `9${lotteryId}107`) {
        item.children.splice(4, 0, item.children[item.children.length - 1])
        item.children.pop()
      }
      // 趣味行玩法拆分
      if (item.code === `9${lotteryId}105`) {
        let [obj, obj1] = [item.children[0], item.children[item.children.length - 1]]
        var newObj = JSON.parse(JSON.stringify(item.children))
        item.children = [obj, obj1]
      }
      // 自定义号码
      item.children.forEach((ids, i) => {
        let newCode = []
        // 复式投注队列标识
        if (ids.code === '933102101103') {
          ids.nums = 2 // 前二组选复式
        }
        if (ids.code === '933101191103') {
          ids.nums = 3 // 前三组选复式
        }
        if (item.code === `9${lotteryId}107`) {
          ids.num = i + 1 // 任选复式
          ids.betsNum = 8 // 最大可选注数
        }
        // 任选单式复试名称修改
        if (item.code === `9${lotteryId}106` || item.code === `9${lotteryId}107`) ids.name = ids.alias
        // 趣味玩法增加号码
        if (item.code === `9${lotteryId}105`) {
          newObj.map(res => {
            res.isMore = true
            if (res.code === ids.code) newCode.push(res)
          })
          ids.detail = [
            {
              name: ids.name,
              detail: newCode
            }
          ]
        } else {
          // 综合玩法号码处理
          let arr = singleArr.map((res, key) => {
            res = JSON.parse(JSON.stringify(ids))
            res.alias = codeArr[key]
            res.value = codeArr[key] // 不定胆处理
            return res
          })
          ids.detail = [{name: ids.name, detail: arr}]
          if (ids.name === '前二直选复式') {
            ids.detail = [codes[0], codes[1]]
          }
          if (ids.name === '前二直选单式' || ids.name === '前二组选单式') {
            ids.detail = {isSimplex: true, num: 2}
          }
          if (ids.name === '前三直选复式') {
            ids.detail = [codes[0], codes[1], codes[2]]
          }
          if (ids.name === '前三直选单式' || ids.name === '前三组选单式') {
            ids.detail = {isSimplex: true, num: 3}
          }
          if (ids.name === '定位胆') {
            ids.detail = [custCode[0], custCode[1], custCode[2], custCode[3], custCode[4]]
          }
          // 任选单式
          if (item.code === `9${lotteryId}106`) {
            ids.detail = {
              isSimplex: true,
              num: i ? i + 1 : i
            }
          }
        }
      })
    })
    let dw = JSON.stringify(gfMenu.splice(3, 1))
    gfMenu.splice(0, 0, JSON.parse(dw)[0]);
    let newVar = [...xyMenu, ...gfMenu];
    return newVar;
  }

  static setFc3dMethodInit(data, data1, lotteryId, userRebate, inputRebate) {
    let [playCateMap, playByIdMap, playMap, playCateMap1, playByIdMap1] = [
      data.playCateMap,
      data.playByIdMap,
      data.playMap,
      data1.playCateMap,
      data1.playByIdMap,
    ];
    let [navList, navList1] = [
      playCateMap[lotteryId],
      playCateMap1[lotteryId],
    ];
    playCateMap[`${lotteryId}106`] = JSON.parse(JSON.stringify(playCateMap))[lotteryId].slice(-1);
    // 信用玩法数据处理
    navList.map((item) => {
      //第1级
      item.children = [
        {
          name: item.name,
          //第2级
          children: [
            {
              name: item.name,
              isOfficial: false,
              //第3级
              children: [],
            },
          ],
        },
      ];
      //第4级
      Object.keys(playCateMap).forEach((keys) => {
        if (item.code === keys) {
          item.children[0].children[0].children = playCateMap[keys];
        }
      });
      //第5级
      if (item.children[0].children[0]) {
        item.children[0].children[0].children.forEach((ids) => {
          ids.detail = [];
          Object.keys(playByIdMap).forEach((key) => {
            let plays = playByIdMap[key];
            // 赔率计算
            plays.addOdds = parseFloat(
              (
                plays.minOdds +
                (((plays.maxOdds - plays.minOdds) / plays.rebate) *
                  (userRebate - inputRebate)) /
                100
              ).toFixed(4)
            );
            playByIdMap[key].selected = false;
            if (
              playByIdMap[key].name === "百拾定位" ||
              playByIdMap[key].name === "百个定位" ||
              playByIdMap[key].name === "拾个定位"
            ) {
              playByIdMap[key].numList = [[], []];
            }
            if (playByIdMap[key].name === "百拾个定位") {
              playByIdMap[key].numList = [[], [], []];
            }
            if (
              playByIdMap[key].name === "组选三" ||
              playByIdMap[key].name === "祖选六"
            ) {
              playByIdMap[key].numList = [[]];
            }
            if (ids.code === playByIdMap[key].code.substr(0, 8)) {
              ids.detail.push(playByIdMap[key]);
            }
          });
        });
      }
    });
    //官方玩法数据处理
    navList1.map((item) => {
      //第一级
      item.children = [];
      Object.keys(playCateMap1).forEach((keys) => {
        if (item.code === keys) {
          item.children = playCateMap1[keys];
        }
      });
      item.children.forEach((ids) => {
        //第二级
        ids.children = [];
        Object.keys(playCateMap1).forEach((keys) => {
          if (ids.code === keys) {
            ids.children = playCateMap1[keys];
          }
        });
        //第3级
        ids.children.forEach((res) => {
          //暂存投注需要用的信息
          res.isOfficial = true;
          //组合类的数据
          let zh_odds = [];
          Object.keys(playByIdMap1).forEach((key) => {
            let plays = playByIdMap1[key];
            // console.log(plays,"plays")
            plays.addOdds = parseFloat(
              (
                plays.minOdds +
                (((plays.maxOdds - plays.minOdds) / plays.rebate) *
                  (userRebate - inputRebate)) /
                100
              ).toFixed(4)
            );
            if (res.code === playByIdMap1[key].code) {
              if (playByIdMap1[key].name === "组选和值") {
                zh_odds.push([plays.minOdds, plays.maxOdds, plays.addOdds]);
              }
              plays.zh_odds = zh_odds;
              res.del = plays;
            }
          });
          //第4，5级
          switch (res.name) {
            case "定位胆": //定位胆玩法
            case "复式": //复式玩法
              res.list = [[], [], []];
              res.children = sscCode(["百位", "十位", "个位"]);
              break;
            case "前二大小单双": //复式玩法
              res.list = [[], []];
              res.children = fu3dCode(["百位", "十位"]);
              break;
            case "后二大小单双": //复式玩法
              res.list = [[], []];
              res.children = fu3dCode(["十位", "个位"]);
              break;
            case "直选和值":
              res.children = sscCode(["直选和值"], 27);
              res.list = [[]];
              break;
            case "单式":
            case "前二直选单式":
            case "后二直选单式":
            case "前二组选单式":
            case "后二组选单式":
              res.children = [];
              res.list = [[]];
              break;
            case "组三":
              res.children = sscCode(["组三"]);
              res.list = [[]];
              break;
            case "组六":
              res.children = sscCode(["组六"]);
              res.list = [[]];
              break;
            case "组选和值":
              res.children = sscCode(["组选和值"], 26, 0);
              res.list = [[]];
              break;
            //不定胆
            case "一码不定胆":
            case "二码不定胆":
              res.children = sscCode(["不定胆"]);
              res.list = [[]];
              break;
            //二码
            case "前二直选复式":
              res.children = sscCode(["百位", "十位"]);
              res.list = [[], []];
              break;
            case "前二组选复式":
            case "后二组选复式":
              res.children = sscCode(["组选"]);
              res.list = [[]];
              break;
            case "后二直选复式":
              res.children = sscCode(["十位", "个位"]);
              res.list = [[], []];
              break;
          }
        });
      });
    });
    let newVar = [...navList, ...navList1];
    return newVar;
  }

  static setBjkl8MethodInit(data, lotteryId, data1, userRebate, inputRebate) {
    let [navList, playByIdMap, navList1, playByIdMap1] = [data.playCateMap[lotteryId], data.playByIdMap, data1.playCateMap[lotteryId], data1.playByIdMap]
    let [singleArr, cateByCode1] = [Array.from({length: 80}), data1.plyCateByCodeMap]
    // 信用玩法数据处理
    navList.forEach(item => {
      Object.keys(data.playCateMap).forEach(key => {
        if (item.code === key) item.children = data.playCateMap[key]
      })
      if (item.children) {
        item.children.forEach(val => {
          val.detail = []
          Object.keys(playByIdMap).forEach(keys => {
            let [plays, i] = [playByIdMap[keys], playByIdMap[keys].code]
            plays.selected = false // 增加选中属性
            // 赔率计算
            plays.addOdds = parseFloat((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100).oddFixed(4))
            if (i.substr(0, 8) === val.code) val.detail.push(playByIdMap[keys])
          })
        })
      }
    })
    // 去除总和
    navList[0].children.pop()
    // 选1-5自定义号码
    let betsNum = 0 // 最大可选号码
    navList[1].children.map((res, key) => {
      // 更换属性名
      res.children = res.detail
      if (key === 0) {
        // 选一最多可选20位号码
        betsNum = 20
      }
      if (key === 1) {
        // 选二最多可选15位号码
        betsNum = 15
      }
      if (key === 2) {
        // 选三最多可选10位号码
        betsNum = 10
      }
      if (key === 3 || key === 4) {
        // 选四、选五最多可选9位号码
        betsNum = 9
      }
      res.children.forEach(ids => {
        let arr = singleArr.map((val, i) => {
          let num = ''
          i < 9 ? num = '0' + (i + 1) : num = i + 1 + '' // 号码模拟
          val = JSON.parse(JSON.stringify(ids))
          val.alias = num
          val.value = num
          val.nums = key + 1
          val.betsNum = betsNum
          return val
        })
        ids.detail = arr
      })
      delete res.detail
    })
    let xyMenu = [
      {
        name: '整合', children: [navList[0]]
      },
      {
        name: '选1-5', children: navList[1].children
      }
    ]
    // 官方玩法数据处理
    var rxArr = []
    navList1.forEach((item, id) => {
      item.children = []
      Object.keys(cateByCode1).forEach(key => {
        // 二级菜单、任选玩法需自定义号码二级菜单取playByIdMap
        if (key.length > 9 && key.substr(0, 6) === item.code && item.code !== `9${lotteryId}101`) {
          item.children.push(cateByCode1[key])
        }
      })
      // 三级数据
      if (item.children) {
        item.children.forEach((val, key) => {
          val.detail = []
          Object.keys(playByIdMap1).forEach(keys => {
            let [plays, i] = [playByIdMap1[keys], playByIdMap1[keys].code]
            plays.selected = false // 增加选中属性
            //
            if (i.substr(0, 6) !== `9${lotteryId}101`) {
              plays.isMore = true
            }
            // 官方赔率显示除以2
            plays.addOdds = parseFloat(((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100)).oddFixed(4)) / 2
            // 和值大小单双cateName显示异常处理
            if (i === `9${lotteryId}103101103`) {
              plays.cateName = plays.name
            }
            // 具体玩法添加
            if (i === val.code) {
              val.detail.push(playByIdMap1[keys])
            }
            // 任选取二级菜单
            if (i.substr(0, 6) === `9${lotteryId}101` && id === 1 && key === 0) {
              rxArr.push(plays)
            }
            // 和值盘面增加一个标识txt
            if (i === `${lotteryId}103101104` || i === `${lotteryId}103101105`) {
              if (i === `${lotteryId}103101104`) {
                playByIdMap[keys].addPn = 'true'
              }
              if (i === `${lotteryId}103101105`) {
                playByIdMap[keys].addPn = 'false'
              }
              playByIdMap[keys].betsNum = 8
            }
          })
        })
      }
    })
    // 任选自定义号码
    rxArr.forEach((ids, key) => {
      ids.detail = utils.mapArr(ids, key)
    })
    navList1[0].children = rxArr;
    let newVar = [...xyMenu, ...navList1];
    return newVar;
  }

}
