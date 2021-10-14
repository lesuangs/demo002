import {fu3dCode, listCode, pksCode, pksDw, sscCode} from "../../../utils/public";
import utils from "../../../utils/utils";

export default class GamesUtils {
  // ok ssc
  static setSSCMethodInit(creditData, officialData, lotteryId, userRebate, inputRebate) {

    let creditMap = JSON.parse(JSON.stringify(creditData.playCateMap));
    let creditMap_id = JSON.parse(JSON.stringify(creditData.playByIdMap));
    let officialMap = JSON.parse(JSON.stringify(officialData.playCateMap));
    let officialMap_id = JSON.parse(JSON.stringify(officialData.playByIdMap))

    let creditList = JSON.parse(JSON.stringify(creditMap[lotteryId]));
    let officialList = JSON.parse(JSON.stringify(officialMap[lotteryId]));

    //----------------------------------------------------------------
    // 一级导航
    // 创建3层结构
    for (let i = 0; i < creditList.length; i++) {
      let firstItem = creditList[i];
      firstItem.isOfficial = false;
      // let currentCode = firstItem.code;
      firstItem.children = [{
        name: firstItem.name,
        children: [
          {
            name: firstItem.name,
            isOfficial: false,
            children: []
          }
        ]
      }]
    }
    // 先拿到 creditList；再根据creditList里面循环，把它的菜单拿到
    // 然后再循环，获取到菜单下面的方法
    for (let i = 0; i < creditList.length; i++) {
      let firstItem = creditList[i];
      if (creditMap[firstItem.code].length > 0) {
        firstItem.children[0].children[0].children = creditMap[firstItem.code]
      }
    }
    // creditMap[currentCode]
    for (let i = 0; i < creditList.length; i++) {
      let firstItem = creditList[i];
      // console.log(creditItem,'creditItem');
      let fourthList = firstItem.children[0].children[0].children;
      if (fourthList.length > 0) {
        for (let n = 0; n < fourthList.length; n++) {
          let fourItem = fourthList[n];
          // console.log(secondItem,'secondItemsecondItem');
          fourItem.children = [];
          for (let key in creditMap_id) {
            if (creditMap_id[key].code === fourItem.code) {
              creditMap_id[key].selected = false;
              creditMap_id[key].addOdds = parseFloat((creditMap_id[key].minOdds + (((creditMap_id[key].maxOdds - creditMap_id[key].minOdds) / creditMap_id[key].rebate) * (userRebate - inputRebate)) / 100).toFixed(4));
              fourItem.children.push(creditMap_id[key]);
            }
          }
        }
      }
    }
    // console.log(creditList, 'creditListcreditList-new');
    // let newCreditArr = JSON.parse(JSON.stringify(creditList));
    let newCreditArr = [];
    let creditMenu_bigSmall = {
      name: '大小单双',
      isOfficial: false,
      children: [
        {
          name: '大小单双',
          isOfficial: false,
          children: []
        }
      ],
    }
    let ziHeMenu = {
      name: '质合',
      isOfficial: false,
      children: [
        {
          name: '质合',
          isOfficial: false,
          children: [
            {
              name: '质合',
              isOfficial: false,
              children: []
            }
          ]
        }
      ],
    }
    let arrCodeBase = ['102', '103', '104', '105', '106']; // 万千百十个
    let ziHeList = ['102104', '103104', '104104', '105104', '106104']; // zihe
    for (let i = 0; i < creditList.length; i++) { // 合并=》大小单双
      let firstItem = creditList[i];
      // console.log(firstItem, 'firstItem');
      if (arrCodeBase.includes(firstItem.codeBase)) {
        // 当前循环目的获取ziHe
        let fourth = firstItem.children[0].children[0].children
        for (let n = 0; n < fourth.length; n++) {
          let fourthMethod = fourth[n];
          if (ziHeList.includes(fourthMethod.codeBase)) {
            firstItem.children.splice(n, 1); // 删除当前这一项
            ziHeMenu.children[0].children[0].children.push(fourthMethod); // 拿到它
            break;
          }
        }
        creditMenu_bigSmall.children[0].children.push(firstItem);
      } else {
        newCreditArr.push(firstItem)
      }
    }
    let second_bigSmall = creditMenu_bigSmall.children[0].children;
    for (let i = 0; i < second_bigSmall.length; i++) {
      let secondItem = second_bigSmall[i];
      let forthItem = secondItem.children[0].children[0].children;
      secondItem.children = forthItem;
    }
    // console.log(creditMenu_bigSmall, 'creditMenu_bigSmall');
    // console.log(ziHeMenu, 'ziHeMenu');
    newCreditArr.push(creditMenu_bigSmall);
    newCreditArr.push(ziHeMenu);
    // console.log(newCreditArr, 'newCreditArr---newCreditArr');
    //---------------------------------------------------------------
    let zh_codeList = ['前三组选和值', '中三组选和值', '后三组选和值', '五星组合', '任三组选和值',
      '后四组合', '前四组合'];
    let specialNumberList = ['后三特殊号', '前三特殊号', '中三特殊号'];
    // 获取第一层
    for (let i = 0; i < officialList.length; i++) {
      let officialItem = officialList[i];
      officialItem.isOfficial = true;
      let currentCode = officialItem.code;
      officialItem.children = officialMap[currentCode]
    }
    // 获取第二层
    for (let i = 0; i < officialList.length; i++) {
      let firstItem = officialList[i];
      if (firstItem.children.length > 0) {
        for (let n = 0; n < firstItem.children.length; n++) {
          let secondItem = firstItem.children[n];

          let code = secondItem.code;
          // console.log(code, 'code');
          secondItem.children = officialMap[code]
        }
      }
    }
    // 第三层数据要将其通过算法获取
    for (let i = 0; i < officialList.length; i++) {
      let firstItem = officialList[i];
      if (firstItem.children.length > 0) {
        for (let n = 0; n < firstItem.children.length; n++) {
          let secondItem = firstItem.children[n];
          if (secondItem.children.length > 0) {
            for (let m = 0; m < secondItem.children.length; m++) {
              let thirdItem = secondItem.children[m];
              thirdItem.isOfficial = true;
              // console.log(thirdItem, thirdItem.name, thirdItem.code);
              if (specialNumberList.includes(thirdItem.name)) {
                // thirdItem.del.zh_odds = [];
                thirdItem.specialNum = true;
                thirdItem.hideOdd = true;
                thirdItem.tool = 'min';
                thirdItem.children = [
                  {
                    name: "特殊号",
                    detail: [],
                  },
                ];
              }
              let zh_odds = [];
              for (let key in officialMap_id) {
                // console.log(officialMap_id[key],'officialMap_id-item');
                if (officialMap_id[key].code === thirdItem.code) {
                  // console.log(officialMap_id[key], 'nnname');
                  let currentItem = officialMap_id[key]
                  currentItem.selected = false;
                  currentItem.addOdds = parseFloat((currentItem.minOdds + (((currentItem.maxOdds - currentItem.minOdds) / currentItem.rebate) * (userRebate - inputRebate)) / 100).toFixed(4));
                  // thirdItem.detail.push(officialMap_id[key]);
                  sscDetailCode(thirdItem);
                  sscHaveCheckList(thirdItem);
                  if (zh_codeList.includes(currentItem.name)) {
                    // currentItem.zh_odds = [currentItem.minOdds, currentItem.maxOdds, currentItem.addOdds];
                    zh_odds.push([currentItem.minOdds, currentItem.maxOdds, currentItem.addOdds])
                  }
                  currentItem.zh_odds = zh_odds;
                  if (specialNumberList.includes(thirdItem.name)) {
                    // console.log(currentItem, '特效好');
                    currentItem.selected = false;
                    thirdItem.children[0].detail.push(currentItem);
                    thirdItem.list = [[]];
                    thirdItem.del = currentItem;
                  } else {
                    thirdItem.del = currentItem;
                  }
                }
              }
            }
          }
        }
      }
    }
    // console.log(officialList, 'officialListofficialList-final');
    return [...newCreditArr, ...officialList]
  }

  // ok pk10
  static setPk10MethodInit(data, lotteryId, data1, userRebate, inputRebate) {
    // let [navList, playByIdMap, navList1, playByIdMap1] = [data.playCateMap[lotteryId], data.playByIdMap, data1.plyCateByCodeMap, data1.playByIdMap]

    console.log(data,'ccccredit');
    let navList = JSON.parse(JSON.stringify(data.playCateMap[lotteryId]));
    let playByIdMap = JSON.parse(JSON.stringify(data.playByIdMap));
    let navList1 = JSON.parse(JSON.stringify(data1.plyCateByCodeMap));
    let playByIdMap1 = JSON.parse(JSON.stringify(data1.playByIdMap));
    // 信用玩法数据处理
    navList.forEach(item => {
      Object.keys(data.playCateMap).forEach(key => {
        if (item.code === key) {
          item.children = data.playCateMap[key]
        }
      })
      if (item.children) {
        item.isOfficial = false;
        item.children.map(val => {
          val.detail = [];
          if (['冠亚军和', '冠军', '亚军', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'].includes(val.name)) {
            val.isSpan = true;
          }
          Object.keys(playByIdMap).forEach(keys => {
            let [plays, i] = [playByIdMap[keys], playByIdMap[keys].code]
            playByIdMap[keys].selected = false
            // 赔率计算
            plays.addOdds = parseFloat((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100).oddFixed(4))
            if (i.substr(0, 8) === val.code) {
              val.detail.push(playByIdMap[keys])
            }
          })
        })
      }
    })
    let xyMenu = [
      {
        name: '冠亚军和',
        children: [navList[0]],
      },
      {
        name: '大小单双1-5', children: navList.slice(1, 6)
      },
      {
        name: '大小单双6-10', children: navList.slice(6, 12)
      },
      {
        name: '龙虎',
        children: [{
          name: "龙虎",
          children: [],
          isOfficial: false,
        }],

      }
    ]
    xyMenu[1].children.forEach(item => {
      xyMenu[3].children[0].children.push(item.children[3])
      item.children.pop()
    })
    console.log(xyMenu, '--------xyMenu');
    // 官方玩法数据处理
    let [gfMenu, singleArr, custCode] = [[], Array.from({length: 10}), pksCode()]
    // 自定义号码
    let codeArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
    Object.keys(navList1).forEach(keys => {
      if (navList1[keys].code.length === 9) {
        gfMenu.push(navList1[keys])
      }
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
        plays.isOfficial = true;
        plays.tool = 'full';
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

  // lhc
  static setMarkSixMethodInit(res, lotteryId, userRebate, inputRebate) {
    // let [navList, playByIdMap, specialArr, newSpecial, freeObj] = [res.playCateMap[lotteryId], res.playByIdMap, [], Array.from({length: 6}), '']
    console.log(res, lotteryId, '----');
    let creditCateMap = JSON.parse(JSON.stringify(res.playCateMap[lotteryId]));
    let creditIdMap = JSON.parse(JSON.stringify(res.playByIdMap));
    let playMap = JSON.parse(JSON.stringify(res.playMap));
    let playCateMap = JSON.parse(JSON.stringify(res.playCateMap));
    let id = lotteryId;
    let numbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49'];
    let layoutH5Credit = [
      {
        name: '特码',
        code: '200',
        menu: [
          {
            name: '特码',
            code: '200101',
            codeArr: ['200101001', '200101002', '200101003', '200101004', '200101005', '200101006'],
            isOfficial: false,
            rows: [
              {
                code: ["200101001"],
                isSpan: true,
                tool: 'fullRGB',
                content: []
              },
              // {
              //   code: ['200101002', '200101003', '200101004', '200101005', '200101006'],
              //   isSpan: false,
              //   content: []
              // }
            ],
          },
        ],
      },
      {
        name: '正码',
        code: '200',
        menu: [
          {
            name: '正码',
            code: '200102',
            codeArr: ["200102"],
            isOfficial: false,
            rows: [
              {
                code: ["200102"],
                isSpan: true,
                tool: 'fullRGB',
                content: []
              }
            ],
          },
        ],
      },
      {
        name: '两面',
        code: '200',
        menu: [
          {
            name: '特码',
            code: '200101',
            codeArr: ['200101001', '200101002', '200101003', '200101004', '200101005', '200101006'],
            isOfficial: false,
            rows: [
              {
                code: ['200101002', '200101003', '200101004', '200101005', '200101006'],
                isSpan: false,
                content: []
              }
            ],
          },
        ],
      },
      {
        name: '特码半波',
        code: '200',
        menu: [
          {
            name: '特码半波', // 半波
            code: '200109',
            codeArr: ['200109001', '200109002'],
            isOfficial: false,
            rows: [
              {
                code: ['200109001', '200109002'],
                content: []
              }
            ],
            allCode: [
              {
                name: '半波单双',
                code: "200109001",
              },
              {
                name: '半波大小',
                code: "200109002",
              }
            ]
          }
        ],
      },
      {
        name: '正码半波',
        code: '200',
        menu: [
          {
            name: '正码半波',
            menuCode: '200',
            title: [
              {
                code: ['200103', '200104', '200105', '200106', '200107', '200108'],
                content: []
              }
            ],
            isOfficial: false,
            rows: [
              {
                code: ['200103001', '200103002', '200103003', '200103004'],
                isSpan: false,
                content: []
              },
              {
                code: ['200104001', '200104002', '200104003', '200104004'],
                content: [],
                isSpan: false,
              },
              {
                code: ['200105001', '200105002', '200105003', '200105004'],
                content: [],
                isSpan: false,
              },
              {
                code: ['200106001', '200106002', '200106003', '200106004'],
                content: [],
                isSpan: false,
              },
              {
                code: ['200107001', '200107002', '200107003', '200107004'],
                content: [],
                isSpan: false,
              },
              {
                code: ['200108001', '200108002', '200108003', '200108004'],
                content: [],
                isSpan: false,
              }
            ],
          },
        ],
      },
      {
        name: '正码1-6',
        code: '200',
        menu: [
          {
            name: '正码1-6',
            menuCode: '200',
            title: [
              {
                code: ['200103', '200104', '200105', '200106', '200107', '200108'],
                content: []
              }
            ],
            isOfficial: false,
            rows: [
              {
                code: ['200103005'],
                isSpan: true,
                tool: 'fullRGB',
                content: []
              },
              {
                code: ['200104005'],
                isSpan: true,
                tool: 'fullRGB',
                content: []
              },
              {
                code: ['200105005'],
                isSpan: true,
                tool: 'fullRGB',
                content: []
              },
              {
                code: ['200106005'],
                isSpan: true,
                tool: 'fullRGB',
                content: []
              },
              {
                code: ['200107005'],
                isSpan: true,
                tool: 'fullRGB',
                content: []
              },
              {
                code: ['200108005'],
                isSpan: true,
                tool: 'fullRGB',
                content: []
              }
            ],
          },
        ],
      },
      {
        name: '特码生肖',
        code: '201',
        menu: [
          {
            name: '特码生肖',
            playMap: true,
            isOfficial: false,
            rows: [
              {
                code: ['201'],
                addNumber: true,
                content: []
              }
            ],
          },
        ],
      },
      {
        name: '一肖正特尾数',
        code: '202',
        menu: [
          {
            name: "一肖正特尾数",
            code: '202101',
            // title:[
            //   {
            //     code:['202101','202102','202103','202104'],
            //     content:[]
            //   }
            // ],
            isOfficial: false,
            rows: [
              {
                code: ["202101"],
                addNumber: true,
                content: []
              },
              {
                code: ['202102', '202103', '202104'],
                content: []
              }
            ],
          }
        ]
      },
      {
        name: '正肖',
        code: '203',
        menu: [
          {
            name: "正肖",
            isOfficial: false,
            rows: [
              {
                code: ["203102"],
                addNumber: true,
                content: []
              },
              {
                code: ['203103'],
                isSpan: false,
                content: []
              }
            ],
          }
        ]
      },
      {
        name: '连肖',
        code: '204',
        menu: [
          {
            name: "连肖",
            menuCode: '204',
            title: [
              {
                code: ['204101', '204102', '204103', '204104'],
                content: []
              }
            ],
            isOfficial: false,
            rows: [
              {
                code: ["204101"],
                addNumber: true,
                isSpan: false,
                content: []
              },
              {
                code: ["204102"],
                addNumber: true,
                isSpan: false,
                content: []
              },
              {
                code: ["204103"],
                addNumber: true,
                isSpan: false,
                content: []
              },
              {
                code: ["204104"],
                addNumber: true,
                isSpan: false,
                content: []
              },
            ],
          }
        ]
      },
      {
        name: '连尾',
        code: '205',
        menu: [
          {
            name: "连肖",
            menuCode: '205',
            title: [
              {
                code: ['205101', '205102', '205103', '205104'],
                content: []
              }
            ],
            isOfficial: false,
            rows: [
              {
                code: ["205101"],
                addNumber: true,
                isSpan: false,
                content: []
              },
              {
                code: ["205102"],
                addNumber: true,
                isSpan: false,
                content: []
              },
              {
                code: ["205103"],
                addNumber: true,
                isSpan: false,
                content: []
              },
              {
                code: ["205104"],
                addNumber: true,
                isSpan: false,
                content: []
              },
            ],
          }
        ]
      },
      {
        name: '合肖',
        code: '206',
        menu: [
          {
            name: "合肖",
            menuCode: '206',
            title: [
              {
                code: ['206101', '206102'],
                content: []
              }
            ],
            isOfficial: false,
            rows: [
              {
                code: ["206101"],
                addNumber: true,
                isSpan: false,
                content: []
              },
              {
                code: ['206102'],
                isSpan: false,
                addNumber: true,
                content: []
              }
            ],
          }
        ]
      },
      {
        name: '连码',
        code: '207',
        menu: [
          {
            name: "连码",
            menuCode: '207',
            title: [
              {
                code: ['207101', '207102', '207103', '207105', '207106', '207107'],
                content: []
              }
            ],
            isOfficial: false,
            rows: [
              {
                code: ["207101"],
                isSpan: true,
                titleInfo: [],
                content: [],
                nums: 4,
              },
              {
                code: ["207102"],
                isSpan: true,
                titleInfo: [],
                content: [],
                nums: 3,
              },
              {
                code: ["207103"],
                isSpan: true,
                titleInfo: [],
                content: [],
                nums: 3,
              },
              {
                code: ["207105"],
                isSpan: true,
                titleInfo: [],
                content: [],
                nums: 2,
              },
              {
                code: ["207106"],
                isSpan: true,
                titleInfo: [],
                content: [],
                nums: 2,
              },
              {
                code: ["207107"],
                isSpan: true,
                titleInfo: [],
                content: [],
                nums: 2,
              },
            ],
          }
        ]
      },
      {
        name: '自选不中',
        code: '208',
        menu: [
          {
            name: "自选不中",
            menuCode: '208',
            title: [
              {
                code: ['208105', '208106', '208107', '208108', '208109', '208110', '208111', '208112'],
                content: []
              }
            ],
            isOfficial: false,
            rows: [
              {
                code: ["208105"],
                isSpan: true,
                nums: 5,
                content: []
              },
              {
                code: ['208106'],
                isSpan: true,
                nums: 6,
                content: []
              },
              {
                code: ['208107'],
                isSpan: true,
                nums: 7,
                content: []
              },
              {
                code: ['208108'],
                isSpan: true,
                nums: 8,
                content: []
              },
              {
                code: ['208109'],
                isSpan: true,
                nums: 9,
                content: []
              },
              {
                code: ['208110'],
                isSpan: true,
                nums: 10,
                content: []
              },
              {
                code: ['208111'],
                isSpan: true,
                nums: 11,
                content: []
              },
              {
                code: ['208112'],
                isSpan: true,
                nums: 12,
                content: []
              }
            ],
          }
        ]
      },
      {
        name: '自选中一',
        code: '208',
        menu: [
          {
            name: "自选中一",
            menuCode: '208',
            title: [
              {
                code: ['208101', '208102', '208103', '208104'],
                content: []
              }
            ],
            isOfficial: false,
            rows: [
              {
                code: ["208101"],
                isSpan: true,
                nums: 3,
                content: []
              },
              {
                code: ['208102'],
                isSpan: true,
                nums: 4,
                content: []
              },
              {
                code: ['208103'],
                isSpan: true,
                nums: 5,
                content: []
              },
              {
                code: ['208104'],
                isSpan: true,
                nums: 6,
                content: []
              }
            ],
          }
        ]
      }
    ];
    for (let menuObj of layoutH5Credit) {
      // console.log(menuObj, 'menuObjmenuObj');
      for (let menu of menuObj.menu) {
        if (menu.title !== undefined) {
          for (let title of menu.title) {
            for (let currentCode of title.code) {
              let code = String(id) + currentCode;
              let menuCode = String(id) + menu.menuCode;
              if (playCateMap[menuCode] !== undefined) {
                for (let item of playCateMap[menuCode]) {
                  if (code === item.code) {
                    title.content.push(item);
                  }
                }
              }
            }
          }
        }
        for (let rows of menu.rows) {
          for (let currentCode of rows.code) {
            if (['208'].includes(menu.menuCode)) { // 208自选
              let code = String(id) + currentCode;
              if (playMap[code] !== undefined) {
                for (let item of playMap[code]) {
                  // 这里自定义加入49个号码
                  for (let i = 0; i < 49; i++) {
                    let value = i < 9 ? '0' + (i + 1) : String(i + 1);
                    rows.content.push(Object.assign({}, item, {selected: false, value: value}));
                  }
                }
              }
            }
            else if (['207'].includes(menu.menuCode)) { // 207 连码
              let code = String(id) + currentCode;
              if (playMap[code] !== undefined) {
                for (let item of playMap[code]) {
                  rows.titleInfo.push(Object.assign({}, item));
                  // 这里自定义加入49个号码
                  for (let i = 0; i < 49; i++) {
                    let value = i < 9 ? '0' + (i + 1) : String(i + 1);
                    rows.content.push(Object.assign({}, item, {selected: false, value: value}));
                  }
                }
              }
            }
            else {
              let code = String(id) + currentCode;
              if (playMap[code] !== undefined) {
                for (let item of playMap[code]) {
                  rows.content.push(Object.assign({}, item, {selected: false}));
                }
              }
            }
          }
        }
      }
    }
    let newLayout = [];
    for (let layout of layoutH5Credit) {
      let code = '' + lotteryId + layout.code;
      for (let map of creditCateMap) {
        if (map.code === code) {
          newLayout.push(layout);
        }
      }
    }
    return newLayout;
    // normal
    let normalLayoutH5Credit = [
      {
        name: '特码/正码/正码特',
        code: '200',
        menu: [
          {
            name: '特码',
            code: '200101',
            codeArr: ['200101001', '200101002', '200101003', '200101004', '200101005', '200101006'],
            rows: [
              {
                code: ["200101001"],
                content: []
              },
              {
                code: ['200101002', '200101003', '200101004', '200101005', '200101006'],
                content: []
              }
            ],
            allCode: [
              {
                name: '特码',
                code: "200101001",
              },
              {
                name: '特码单双',
                code: "200101002",
              },
              {
                name: '特码大小',
                code: "200101003",
              },
              {
                name: '特码合码单双',
                code: "200101004",
              },
              {
                name: '特码色波',
                code: "200101005",
              },
              {
                name: '特码合码大小',
                code: '200101006'
              }
            ]
          },
          {
            name: '正码',
            code: '200102',
            codeArr: [],
            rows: []
          },
          {
            name: '正码一',
            code: '200103',
            codeArr: ['200103005', '200103001', '200103002', '200103003', '200103004'],
            rows: [
              {
                code: ["200103005"],
                content: []
              },
              {
                code: ['200103001', '200103002', '200103003', '200103004'],
                content: []
              }
            ],
            allCode: [
              {
                name: '正码1单双',
                code: "200103001",
              },
              {
                name: '正码1大小',
                code: "200103002",
              },
              {
                name: '正码1色波',
                code: "200103003",
              },
              {
                name: "正码1合单双",
                code: "200103004",
              },
              {
                name: '正1特',
                code: "200103005",
              },
              {
                name: '总和',
                code: '200103006'
              },
              {
                name: '和单双',
                code: '200103007'
              },
              {
                name: '生肖',
                code: '200103008'
              }
            ]
          },
          {
            name: '正码二',
            code: '200104',
            codeArr: ['200104005', '200104001', '200104002', '200104003', '200104004'],
            rows: [
              {
                code: ["200104005"],
                content: []
              },
              {
                code: ['200104001', '200104002', '200104003', '200104004'],
                content: []
              }
            ],
            allCode: [
              {
                name: '正2特',
                code: "200104005",
              },
              {
                name: '正码2单双',
                code: "200104001",
              },
              {
                name: '正码2大小',
                code: "200104002",
              },
              {
                name: '正码2色波',
                code: "200104003",
              },
              {
                name: "正码2合单双",
                code: "200104004",
              }
            ]
          },
          {
            name: '正码三',
            code: '200105',
            codeArr: ['200105005', '200105001', '200105002', '200105003', '200105004'],
            rows: [
              {
                code: ["200105005"],
                content: []
              },
              {
                code: ['200105001', '200105002', '200105003', '200105004'],
                content: []
              }
            ],
            allCode: [
              {
                name: '正3特',
                code: "200105005",
              },
              {
                name: '正码3单双',
                code: "200105001",
              },
              {
                name: '正码3大小',
                code: "200105002",
              },
              {
                name: '正码3色波',
                code: "200105003",
              },
              {
                name: "正码3合单双",
                code: "200105004",
              }
            ]
          },
          {
            name: '正码四',
            code: '200106',
            codeArr: ['200106005', '200106001', '200106002', '200106003', '200106004'],
            rows: [
              {
                code: ["200106005"],
                content: []
              },
              {
                code: ['200106001', '200106002', '200106003', '200106004'],
                content: []
              }
            ],
            allCode: [
              {
                name: '正4特',
                code: "200106005",
              },
              {
                name: '正码4单双',
                code: "200106001",
              },
              {
                name: '正码4大小',
                code: "200106002",
              },
              {
                name: '正码4色波',
                code: "200106003",
              },
              {
                name: "正码4合单双",
                code: "200106004",
              }
            ]
          },
          {
            name: '正码五',
            code: '200107',
            codeArr: ['200107005', '200107001', '200107002', '200107003', '200107004'],
            rows: [
              {
                code: ["200107005"],
                content: []
              },
              {
                code: ['200107001', '200107002', '200107003', '200107004'],
                content: []
              }
            ],
            allCode: [
              {
                name: '正5特',
                code: "200107005",
              },
              {
                name: '正码5单双',
                code: "200107001",
              },
              {
                name: '正码5大小',
                code: "200107002",
              },
              {
                name: '正码5色波',
                code: "200107003",
              },
              {
                name: "正码5合单双",
                code: "200107004",
              }
            ]
          },
          {
            name: '正码六',
            code: '200108',
            codeArr: ['200108005', '200108001', '200108002', '200108003', '200108004'],
            rows: [
              {
                code: ["200108005"],
                content: []
              },
              {
                code: ['200108001', '200108002', '200108003', '200108004'],
                content: []
              }
            ],
            allCode: [
              {
                name: '正6特',
                code: "200108005",
              },
              {
                name: '正码6单双',
                code: "200108001",
              },
              {
                name: '正码6大小',
                code: "200108002",
              },
              {
                name: '正码6色波',
                code: "200108003",
              },
              {
                name: "正码6合单双",
                code: "200108004",
              }
            ]
          },
          {
            name: '半波',
            code: '200109',
            codeArr: ['200109001', '200109002'],
            rows: [
              {
                code: ['200109001', '200109002'],
                content: []
              }
            ],
            allCode: [
              {
                name: '半波单双',
                code: "200109001",
              },
              {
                name: '半波大小',
                code: "200109002",
              }
            ]
          }
        ],
      },
      {
        name: '特码生肖',
        code: '201',
        menu: []
      },
      {
        name: '一肖正特尾数',
        code: '202',
        menu: [
          {
            name: '一肖正特尾数',
            title: [],
            rows: []
          },
          {
            name: "一肖[中]",
            code: '202101',
            codeArr: ['200101001', '200101002', '200101003', '200101004', '200101005', '200101006'],
            rows: [
              {
                code: ["200101001"],
                content: []
              },
              {
                code: ['200101002', '200101003', '200101004', '200101005', '200101006'],
                content: []
              }
            ],
            allCode: [
              {
                name: '特码',
                code: "200101001",
              },
              {
                name: '特码单双',
                code: "200101002",
              },
              {
                name: '特码大小',
                code: "200101003",
              },
              {
                name: '特码合码单双',
                code: "200101004",
              },
              {
                name: '特码色波',
                code: "200101005",
              },
              {
                name: '特码合码大小',
                code: '200101006'
              }
            ]
          },
          {
            name: "正特尾数",
            code: '202102',
            codeArr: ['200101001', '200101002', '200101003', '200101004', '200101005', '200101006'],
            rows: [
              {
                code: ["200101001"],
                content: []
              },
              {
                code: ['200101002', '200101003', '200101004', '200101005', '200101006'],
                content: []
              }
            ],
            allCode: [
              {
                name: '特码',
                code: "200101001",
              },
              {
                name: '特码单双',
                code: "200101002",
              },
              {
                name: '特码大小',
                code: "200101003",
              },
              {
                name: '特码合码单双',
                code: "200101004",
              },
              {
                name: '特码色波',
                code: "200101005",
              },
              {
                name: '特码合码大小',
                code: '200101006'
              }
            ]
          },
          {
            name: "总肖",
            code: '202103',
            codeArr: ['200101001', '200101002', '200101003', '200101004', '200101005', '200101006'],
            rows: [
              {
                code: ["200101001"],
                content: []
              },
              {
                code: ['200101002', '200101003', '200101004', '200101005', '200101006'],
                content: []
              }
            ],
            allCode: [
              {
                name: '特码',
                code: "200101001",
              },
              {
                name: '特码单双',
                code: "200101002",
              },
              {
                name: '特码大小',
                code: "200101003",
              },
              {
                name: '特码合码单双',
                code: "200101004",
              },
              {
                name: '特码色波',
                code: "200101005",
              },
              {
                name: '特码合码大小',
                code: '200101006'
              }
            ]
          },
          {
            name: "总肖单双",
            code: '202104',
            codeArr: ['200101001', '200101002', '200101003', '200101004', '200101005', '200101006'],
            rows: [
              {
                code: ["200101001"],
                content: []
              },
              {
                code: ['200101002', '200101003', '200101004', '200101005', '200101006'],
                content: []
              }
            ],
            allCode: [
              {
                name: '特码',
                code: "200101001",
              },
              {
                name: '特码单双',
                code: "200101002",
              },
              {
                name: '特码大小',
                code: "200101003",
              },
              {
                name: '特码合码单双',
                code: "200101004",
              },
              {
                name: '特码色波',
                code: "200101005",
              },
              {
                name: '特码合码大小',
                code: '200101006'
              }
            ]
          },
        ]
      },

    ];
    let layoutPcCredit = [
      {
        name: '特码/正码/正码特',
        code: '200',
        menu: [
          {
            name: '特码',
            code: '200101',
            codeArr: ['200101001', '200101002', '200101003', '200101004', '200101005', '200101006'],
            rows: [
              {
                code: ["200101001"],
                content: []
              },
              {
                code: ['200101002', '200101003', '200101004', '200101005', '200101006'],
                content: []
              }
            ],
            allCode: [
              {
                name: '特码',
                code: "200101001",
              },
              {
                name: '特码单双',
                code: "200101002",
              },
              {
                name: '特码大小',
                code: "200101003",
              },
              {
                name: '特码合码单双',
                code: "200101004",
              },
              {
                name: '特码色波',
                code: "200101005",
              },
              {
                name: '特码合码大小',
                code: '200101006'
              }
            ]
          },
          {
            name: '正码',
            code: '200102',
            codeArr: ['200102'],
            rows: [
              {
                code: ["200102"],
                content: []
              },
            ]
          },
          {
            name: '正码一',
            code: '200103',
            rows: [
              {
                code: ["200103005"],
                content: []
              },
              {
                code: ['200103001', '200103002', '200103003', '200103004'],
                content: []
              }
            ],
            codeArr: ['200103005', '200103001', '200103002', '200103003', '200103004'],
            allCode: [
              {
                name: '正码1单双',
                code: "200103001",
              },
              {
                name: '正码1大小',
                code: "200103002",
              },
              {
                name: '正码1色波',
                code: "200103003",
              },
              {
                name: "正码1合单双",
                code: "200103004",
              },
              {
                name: '正1特',
                code: "200103005",
              },
              {
                name: '总和',
                code: '200103006'
              },
              {
                name: '和单双',
                code: '200103007'
              },
              {
                name: '生肖',
                code: '200103008'
              }
            ]
          },
          {
            name: '正码二',
            code: '200104',
            codeArr: ['200104005', '200104001', '200104002', '200104003', '200104004'],
            rows: [
              {
                code: ["200104005"],
                content: []
              },
              {
                code: ['200104001', '200104002', '200104003', '200104004'],
                content: []
              }
            ],
            allCode: [
              {
                name: '正2特',
                code: "200104005",
              },
              {
                name: '正码2单双',
                code: "200104001",
              },
              {
                name: '正码2大小',
                code: "200104002",
              },
              {
                name: '正码2色波',
                code: "200104003",
              },
              {
                name: "正码2合单双",
                code: "200104004",
              }
            ]
          },
          {
            name: '正码三',
            code: '200105',
            codeArr: ['200105005', '200105001', '200105002', '200105003', '200105004'],
            rows: [
              {
                code: ["200105005"],
                content: []
              },
              {
                code: ['200105001', '200105002', '200105003', '200105004'],
                content: []
              }
            ],
            allCode: [
              {
                name: '正3特',
                code: "200105005",
              },
              {
                name: '正码3单双',
                code: "200105001",
              },
              {
                name: '正码3大小',
                code: "200105002",
              },
              {
                name: '正码3色波',
                code: "200105003",
              },
              {
                name: "正码3合单双",
                code: "200105004",
              }
            ]
          },
          {
            name: '正码四',
            code: '200106',
            codeArr: ['200106005', '200106001', '200106002', '200106003', '200106004'],
            rows: [
              {
                code: ["200106005"],
                content: []
              },
              {
                code: ['200106001', '200106002', '200106003', '200106004'],
                content: []
              }
            ],
            allCode: [
              {
                name: '正4特',
                code: "200106005",
              },
              {
                name: '正码4单双',
                code: "200106001",
              },
              {
                name: '正码4大小',
                code: "200106002",
              },
              {
                name: '正码4色波',
                code: "200106003",
              },
              {
                name: "正码4合单双",
                code: "200106004",
              }
            ]
          },
          {
            name: '正码五',
            code: '200107',
            codeArr: ['200107005', '200107001', '200107002', '200107003', '200107004'],
            rows: [
              {
                code: ["200107005"],
                content: []
              },
              {
                code: ['200107001', '200107002', '200107003', '200107004'],
                content: []
              }
            ],
            allCode: [
              {
                name: '正5特',
                code: "200107005",
              },
              {
                name: '正码5单双',
                code: "200107001",
              },
              {
                name: '正码5大小',
                code: "200107002",
              },
              {
                name: '正码5色波',
                code: "200107003",
              },
              {
                name: "正码5合单双",
                code: "200107004",
              }
            ]
          },
          {
            name: '正码六',
            code: '200108',
            codeArr: ['200108005', '200108001', '200108002', '200108003', '200108004'],
            rows: [
              {
                code: ["200108005"],
                content: []
              },
              {
                code: ['200108001', '200108002', '200108003', '200108004'],
                content: []
              }
            ],
            allCode: [
              {
                name: '正6特',
                code: "200108005",
              },
              {
                name: '正码6单双',
                code: "200108001",
              },
              {
                name: '正码6大小',
                code: "200108002",
              },
              {
                name: '正码6色波',
                code: "200108003",
              },
              {
                name: "正码6合单双",
                code: "200108004",
              }
            ]
          },
          {
            name: '半波',
            code: '200109',
            codeArr: ['200109001', '200109002'],
            rows: [
              {
                code: ['200109001', '200109002'],
                content: []
              }
            ],
            allCode: [
              {
                name: '半波单双',
                code: "200109001",
              },
              {
                name: '半波大小',
                code: "200109002",
              }
            ]
          }
        ],
      },
      {
        name: '特码生肖',
        code: '201',
        menu: []
      },
      {
        name: '一肖正特尾数',
        code: '202',
        menu: [
          {
            name: "一肖[中]",
            code: '202101',
            codeArr: ['200101001', '200101002', '200101003', '200101004', '200101005', '200101006'],
            rows: [
              {
                code: ["200101001"],
                content: []
              },
              {
                code: ['200101002', '200101003', '200101004', '200101005', '200101006'],
                content: []
              }
            ],
            allCode: [
              {
                name: '特码',
                code: "200101001",
              },
              {
                name: '特码单双',
                code: "200101002",
              },
              {
                name: '特码大小',
                code: "200101003",
              },
              {
                name: '特码合码单双',
                code: "200101004",
              },
              {
                name: '特码色波',
                code: "200101005",
              },
              {
                name: '特码合码大小',
                code: '200101006'
              }
            ]
          },
          {
            name: "正特尾数",
            code: '202102',
            codeArr: ['200101001', '200101002', '200101003', '200101004', '200101005', '200101006'],
            rows: [
              {
                code: ["200101001"],
                content: []
              },
              {
                code: ['200101002', '200101003', '200101004', '200101005', '200101006'],
                content: []
              }
            ],
            allCode: [
              {
                name: '特码',
                code: "200101001",
              },
              {
                name: '特码单双',
                code: "200101002",
              },
              {
                name: '特码大小',
                code: "200101003",
              },
              {
                name: '特码合码单双',
                code: "200101004",
              },
              {
                name: '特码色波',
                code: "200101005",
              },
              {
                name: '特码合码大小',
                code: '200101006'
              }
            ]
          },
          {
            name: "总肖",
            code: '202103',
            codeArr: ['200101001', '200101002', '200101003', '200101004', '200101005', '200101006'],
            rows: [
              {
                code: ["200101001"],
                content: []
              },
              {
                code: ['200101002', '200101003', '200101004', '200101005', '200101006'],
                content: []
              }
            ],
            allCode: [
              {
                name: '特码',
                code: "200101001",
              },
              {
                name: '特码单双',
                code: "200101002",
              },
              {
                name: '特码大小',
                code: "200101003",
              },
              {
                name: '特码合码单双',
                code: "200101004",
              },
              {
                name: '特码色波',
                code: "200101005",
              },
              {
                name: '特码合码大小',
                code: '200101006'
              }
            ]
          },
          {
            name: "总肖单双",
            code: '202104',
            codeArr: ['200101001', '200101002', '200101003', '200101004', '200101005', '200101006'],
            rows: [
              {
                code: ["200101001"],
                content: []
              },
              {
                code: ['200101002', '200101003', '200101004', '200101005', '200101006'],
                content: []
              }
            ],
            allCode: [
              {
                name: '特码',
                code: "200101001",
              },
              {
                name: '特码单双',
                code: "200101002",
              },
              {
                name: '特码大小',
                code: "200101003",
              },
              {
                name: '特码合码单双',
                code: "200101004",
              },
              {
                name: '特码色波',
                code: "200101005",
              },
              {
                name: '特码合码大小',
                code: '200101006'
              }
            ]
          },
        ]
      }

    ];
  }

  // ok k3
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
      item.detail = [];
      item.isOfficial = false;
      // 一级菜单合并
      if (item.code === `${lotteryId}101`) {
        item.name = '骰宝、大小、单双'
        item.specialLayout = true;
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
          isSpan: true,
          hideOdd: true,
          detail: [{
            name: item.name,
            isSpan: true,
            detail: [],
            hasOdds: true
          }],
          isOfficial: true,
        }]
      }
      // 二级菜单
      Object.keys(playByIdMap1).forEach(keys => {
        let [plays, i] = [playByIdMap1[keys], playByIdMap1[keys].code]
        plays.selected = false
        // 增加官方玩法标识
        plays.isGf = true;
        plays.isOfficial = true;
        // 赔率计算
        plays.addOdds = parseFloat(((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100)).oddFixed(4)) / 2
        if (item.code === i.substr(0, 9)) {
          // 和值具体玩法
          if (item.code === `9${lotteryId}102101`) {
            // 多层次数据
            plays.isMore = true;
            name = item.name;
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
            if (ids.name === '二不同号 ') {
              val.num = 2;
              ids.num = 2;
            }
            if (ids.name === '三不同号') {
              val.num = 3;
              ids.num = 3;
            }
            return val
          })
          ids.detail = [
            {
              isSpan: true,
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

  // pcdd
  static setLucky28MethodInit(data, lotteryId, userRebate, inputRebate) {
    // let [navList, playByIdMap, singleArr] = [data.playCateMap[lotteryId], data.playByIdMap, Array.from({length: 28})];
    let navList = JSON.parse(JSON.stringify(data.playCateMap[lotteryId]));
    let playByIdMap = JSON.parse(JSON.stringify(data.playByIdMap));
    let singleArr = JSON.parse(JSON.stringify(Array.from({length: 28})));
    // 信用
    navList.map(item => {
      item.detail = [];
      item.isOfficial = false;
      Object.keys(playByIdMap).forEach(keys => {
        let [plays, i] = [playByIdMap[keys], playByIdMap[keys].code]
        plays.selected = false // 选中属性
        // 赔率计算
        plays.addOdds = parseFloat((plays.minOdds + (plays.maxOdds - plays.minOdds) / plays.rebate * (userRebate - inputRebate) / 100).oddFixed(4))
        // 玩法整合
        if (i.substr(0, 5) === item.code) item.detail.push(playByIdMap[keys])
      })
      // 特码三包增加自定义号码s
      if (item.name === '特码') {
        item.isSpan = true
      }
      if (item.code === `${lotteryId}104`) {
        item.nums = 3 // 信用玩法复式投注组数
        let arr = singleArr.map((val, key) => {
          val = JSON.parse(JSON.stringify(item.detail[0]))
          val.value = key
          val.selected = false
          val.nums = 3 // 信用玩法复式投注组数
          return val
        })
        item.isSpan = true
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

  // klc
  static setKlcMethodInit(creditData, lotteryId) {
    // console.log(creditData, 'klc---creditData');
    let credit_playCateMap = creditData.playCateMap;
    let credit_playMap = creditData.playMap;
    let id = lotteryId;
    let creditLayout = [
      {
        name: '选一',
        code: '101',
        isOfficial: false,
        menu: [
          {
            name: '选一',
            menuCode: '101',
            subMenu: [
              {
                name: '第一球',
                code: '101101',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '第一球',
                    code: ["101101101"],
                    isSpan: true,
                    content: []
                  },
                  {
                    name: '第一球 两面',
                    code: ["101101102", '101101103', '101101104', '101101105'],
                    isSpan: false,
                    content: []
                  }
                ]
              },
              {
                name: '第二球',
                code: '101102',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '第二球',
                    code: ["101102101"],
                    isSpan: true,
                    content: []
                  },
                  {
                    name: '第二球 两面',
                    code: ["101102102", '101102103', '101102104', '101102105'],
                    isSpan: false,
                    content: []
                  }
                ]
              },
              {
                name: '第三球',
                code: '101103',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '第三球',
                    code: ["101103101"],
                    isSpan: true,
                    content: []
                  },
                  {
                    name: '第三球 两面',
                    code: ["101103102", '101103103', '101103104', '101103105'],
                    isSpan: false,
                    content: []
                  }
                ]
              },
              {
                name: '第四球',
                code: '101104',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '第四球',
                    code: ["101104101"],
                    isSpan: true,
                    content: []
                  },
                  {
                    name: '第四球 两面',
                    code: ["101104102", '101104103', '101104104', '101104105'],
                    isSpan: false,
                    content: []
                  }
                ]
              },
              {
                name: '第五球',
                code: '101105',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '第五球',
                    code: ["101105101"],
                    isSpan: true,
                    content: []
                  },
                  {
                    name: '第五球 两面',
                    code: ["101105102", '101105103', '101105104', '101105105'],
                    isSpan: false,
                    content: []
                  }
                ]
              },
              {
                name: '第六球',
                code: '101106',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '第六球',
                    code: ["101106101"],
                    isSpan: true,
                    content: []
                  },
                  {
                    name: '第六球 两面',
                    code: ["101106102", '101106103', '101106104', '101106105'],
                    isSpan: false,
                    content: []
                  }
                ]
              },
              {
                name: '第七球',
                code: '101107',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '第七球',
                    code: ["101107101"],
                    isSpan: true,
                    content: []
                  },
                  {
                    name: '第七球 两面',
                    code: ["101107102", '101107103', '101107104', '101107105'],
                    isSpan: false,
                    content: []
                  }
                ]
              },
              {
                name: '第八球',
                code: '101108',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '第八球',
                    code: ["101108101"],
                    isSpan: true,
                    content: []
                  },
                  {
                    name: '第八球 两面',
                    code: ["101108102", '101108103', '101108104', '101108105'],
                    isSpan: false,
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '选二',
        code: '102',
        isOfficial: false,
        menu: [
          {
            name: '选二',
            menuCode: '102',
            subMenu: [
              {
                name: '任选二',
                code: '102101',
                isCollapse: true,
                nums: 2,
                maxCount: 8,
                isOfficial: false,
                rows: [
                  {
                    name: '任选二',
                    code: ["102101"],
                    isSpan: true,
                    info: [],
                    content: []
                  }
                ]
              },
              {
                name: '选二连直',
                code: '102102',
                isCollapse: true,
                nums: 2,
                maxCount: 12,
                isOfficial: false,
                rows: [
                  {
                    name: '第一位',
                    code: ["102102101"],
                    isSpan: true,
                    info: [],
                    maxCount: 11,
                    content: []
                  },
                  {
                    name: '第二位',
                    code: ["102102102"],
                    isSpan: true,
                    nums: 2,
                    maxCount: 11,
                    info: [],
                    content: []
                  }
                ]
              },
              {
                name: '选二连组',
                code: '102103',
                isCollapse: true,
                nums: 2,
                maxCount: 8,
                isOfficial: false,
                rows: [
                  {
                    name: '选二连组',
                    code: ["102103"],
                    isSpan: true,
                    info: [],
                    nums: 2,
                    maxCount: 8,
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '选三',
        code: '103',
        isOfficial: false,
        menu: [
          {
            name: '选三',
            menuCode: '103',
            subMenu: [
              {
                name: '任选三',
                code: '103101',
                isCollapse: true,
                nums: 3,
                maxCount: 8,
                isOfficial: false,
                rows: [
                  {
                    name: '任选三',
                    code: ["103101"],
                    isSpan: true,
                    info: [],
                    content: []
                  }
                ]
              },
              {
                name: '前三直选',
                code: '103102',
                isCollapse: true,
                nums: 3,
                maxCount: 12,
                isOfficial: false,
                rows: [
                  {
                    name: '第一位',
                    code: ["103102101"],
                    isSpan: true,
                    info: [],
                    maxCount: 11,
                    content: []
                  },
                  {
                    name: '第二位',
                    code: ["103102102"],
                    isSpan: true,
                    maxCount: 11,
                    info: [],
                    content: []
                  },
                  {
                    name: '第三位',
                    code: ["103102103"],
                    isSpan: true,
                    maxCount: 11,
                    info: [],
                    content: []
                  }
                ]
              },
              {
                name: '前三组选',
                code: '103103',
                isCollapse: true,
                nums: 3,
                maxCount: 8,
                isOfficial: false,
                rows: [
                  {
                    name: '前三组选',
                    code: ["103103"],
                    isSpan: true,
                    info: [],
                    nums: 3,
                    maxCount: 8,
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '选四',
        code: '104',
        isOfficial: false,
        menu: [
          {
            name: '选四',
            menuCode: '104',
            subMenu: [
              {
                name: '任选四',
                code: '104101',
                isCollapse: true,
                nums: 4,
                maxCount: 8,
                isOfficial: false,
                rows: [
                  {
                    name: '任选四',
                    code: ["104101"],
                    isSpan: true,
                    info: [],
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '选五',
        code: '105',
        isOfficial: false,
        menu: [
          {
            name: '选五',
            menuCode: '105',
            subMenu: [
              {
                name: '任选五',
                code: '105101',
                isCollapse: true,
                nums: 5,
                maxCount: 8,
                isOfficial: false,
                rows: [
                  {
                    name: '任选五',
                    code: ["105101"],
                    isSpan: true,
                    info: [],
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '总和,龙虎',
        code: '106',
        isOfficial: false,
        menu: [
          {
            name: '总和,龙虎',
            menuCode: '106',
            subMenu: [
              {
                name: '总和,龙虎和',
                code: '106',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '总和单双',
                    code: ["106101"],
                    isSpan: false,
                    info: [],
                    content: []
                  },
                  {
                    name: '总和大小',
                    code: ["106102"],
                    isSpan: false,
                    info: [],
                    content: []
                  },
                  {
                    name: '总和尾数大小',
                    code: ["106103"],
                    isSpan: false,
                    info: [],
                    content: []
                  },
                  {
                    name: '总和龙虎',
                    code: ["106104"],
                    isSpan: false,
                    info: [],
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
    ];
    // 双面盘
    for (let menuObj of creditLayout) {
      // console.log(menuObj, 'menuObjmenuObj');
      for (let menu of menuObj.menu) {
        for (let subMenu of menu.subMenu) {
          for (let rows of subMenu.rows) {
            for (let currentCode of rows.code) {
              if (['102101', '102103', '103101', '103103', '104101', '105101'].includes(currentCode)) { // 选二->任选二；选二->选二连组
                let code = String(id) + currentCode;
                if (credit_playMap[code] !== undefined) {
                  for (let item of credit_playMap[code]) {
                    // 这里自定义加入20个号码
                    for (let i = 1; i <= 20; i++) {
                      let alias = i < 10 ? '0' + i : i;
                      rows.content.push(Object.assign({}, item, {selected: false, alias: alias}));
                    }
                  }
                }
              }
              else if (['102102101', '102102102', '103102101', '103102102', '103102103'].includes(currentCode)) { // 选二->选二连直
                let code = String(id) + subMenu.code;
                if (credit_playMap[code] !== undefined) {
                  for (let item of credit_playMap[code]) {
                    // 这里自定义加入20个号码
                    for (let i = 1; i <= 20; i++) {
                      let alias = i < 10 ? '0' + i : i;
                      rows.content.push(Object.assign({}, item, {selected: false, disable: false, alias: alias}));
                    }
                  }
                }
              }
              else {
                let code = String(id) + currentCode;
                if (credit_playMap[code] !== undefined) {
                  for (let item of credit_playMap[code]) {
                    rows.content.push(Object.assign({}, item, {selected: false}));
                  }
                }
              }
            }
          }
        }

      }
    }
    let newCreditLayout = [];
    for (let layout of creditLayout) {
      let code = '' + lotteryId + layout.code;
      for (let map of credit_playCateMap[lotteryId]) {
        if (map.code === code) {
          newCreditLayout.push(layout);
        }
      }
    }
    // console.log(newCreditLayout, 'creditLayout---klc');
    return newCreditLayout
  }

  // klsf
  static setGxklsfMethodInit(creditData, lotteryId) {
    console.log(creditData, 'klsf---creditData');
    let credit_playCateMap = creditData.playCateMap;
    let credit_playMap = creditData.playMap;
    let id = lotteryId;
    let creditLayout = [
      {
        name: '两面',
        code: '101',
        isOfficial: false,
        menu: [
          {
            name: '两面',
            menuCode: '101',
            subMenu: [
              {
                name: '两面',
                code: '101101',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '总和',
                    code: [""],
                    isSpan: true,
                    content: []
                  },
                  {
                    name: '特码',
                    code: ["101101102", '101101103', '101101104', '101101105', '101101106'],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '正码一',
                    code: ["101102102", '101102103', '101102104', '101102105', '101102106'],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '正码二',
                    code: ["101103102", '101103103', '101103104', '101103105', '101103106'],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '正码三',
                    code: ["101104102", '101104103', '101104104', '101104105', '101104106'],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '正码四',
                    code: ["101105102", '101105103', '101105104', '101105105', '101105106'],
                    isSpan: false,
                    content: []
                  },
                ]
              },
            ]
          }
        ]
      },
      {
        name: '特别号,正码',
        code: '101',
        isOfficial: false,
        menu: [
          {
            name: '特别号,正码',
            menuCode: '101',
            subMenu: [
              {
                name: '特别号,正码',
                code: '101',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '特码',
                    code: ["101101101"],
                    isSpan: true,
                    content: []
                  },
                  {
                    name: '正码一',
                    code: ["101102101"],
                    isSpan: true,
                    content: []
                  },
                  {
                    name: '正码二',
                    code: ["101103101"],
                    isSpan: true,
                    content: []
                  },
                  {
                    name: '正码三',
                    code: ["101104101"],
                    isSpan: true,
                    content: []
                  },
                  {
                    name: '正码四',
                    code: ["101105101"],
                    isSpan: true,
                    content: []
                  },
                ]
              }
            ]
          }
        ]
      },
      {
        name: '一中一,总和',
        code: '102',
        isOfficial: false,
        menu: [
          {
            name: '一中一,总和',
            menuCode: '102',
            subMenu: [
              {
                name: '一中一,总和',
                code: '102101',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '一中一',
                    code: ["102101"],
                    isSpan: true,
                    info: [],
                    content: []
                  },
                  {
                    name: '总和',
                    code: ["102102", "102103"],
                    isSpan: false,
                    info: [],
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '连码',
        code: '103',
        isOfficial: false,
        menu: [
          {
            name: '连码',
            menuCode: '103',
            subMenu: [
              {
                name: '二中二',
                code: '103101',
                nums: 2,
                maxCount: 8,
                addOdds: true,
                info:'',
                isOfficial: false,
                rows: [
                  {
                    name: '二中二',
                    code: ["103101"],
                    isSpan: true,
                    info: [],
                    content: []
                  }
                ]
              },
              {
                name: '三中二',
                code: '103102',
                nums: 3,
                maxCount: 8,
                addOdds: true,
                info:'',
                isOfficial: false,
                rows: [
                  {
                    name: '三中二',
                    code: ["103102"],
                    isSpan: true,
                    info: [],
                    content: []
                  }
                ]
              },
              {
                name: '三中三',
                code: '103103',
                nums: 3,
                maxCount: 8,
                addOdds: true,
                info:'',
                isOfficial: false,
                rows: [
                  {
                    name: '三中三',
                    code: ["103103"],
                    isSpan: true,
                    info: [],
                    content: []
                  }
                ]
              },
              {
                name: '四中三',
                code: '103104',
                nums: 4,
                maxCount: 8,
                addOdds: true,
                info:'',
                isOfficial: false,
                rows: [
                  {
                    name: '四中三',
                    code: ["103104"],
                    isSpan: true,
                    info: [],
                    content: []
                  }
                ]
              },
              {
                name: '五中三',
                code: '103105',
                nums: 5,
                maxCount: 8,
                addOdds: true,
                isOfficial: false,
                rows: [
                  {
                    name: '五中三',
                    code: ["103105"],
                    isSpan: true,
                    info: [],
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '四季五行',
        code: '104',
        isOfficial: false,
        menu: [
          {
            name: '四季五行',
            menuCode: '104',
            subMenu: [
              {
                name: '特别号',
                code: '104101',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '四季',
                    code: ["104101101"],
                    isSpan: false,
                    info: [],
                    content: []
                  },
                  {
                    name: '五行',
                    code: ["104101102"],
                    isSpan: false,
                    info: [],
                    content: []
                  }
                ]
              },
              {
                name: '正码一特',
                code: '104102',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '四季',
                    code: ["104102101"],
                    isSpan: false,
                    info: [],
                    content: []
                  },
                  {
                    name: '五行',
                    code: ["104102102"],
                    isSpan: false,
                    info: [],
                    content: []
                  }
                ]
              },
              {
                name: '正码二特',
                code: '104103',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '四季',
                    code: ["104103101"],
                    isSpan: false,
                    info: [],
                    content: []
                  },
                  {
                    name: '五行',
                    code: ["104103102"],
                    isSpan: false,
                    info: [],
                    content: []
                  }
                ]
              },
              {
                name: '正码三特',
                code: '104104',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '四季',
                    code: ["104104101"],
                    isSpan: false,
                    info: [],
                    content: []
                  },
                  {
                    name: '五行',
                    code: ["104104102"],
                    isSpan: false,
                    info: [],
                    content: []
                  }
                ]
              },
              {
                name: '正码四特',
                code: '104105',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '四季',
                    code: ["104105101"],
                    isSpan: false,
                    info: [],
                    content: []
                  },
                  {
                    name: '五行',
                    code: ["104105102"],
                    isSpan: false,
                    info: [],
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },

    ];
    // 双面盘
    for (let menuObj of creditLayout) {
      // console.log(menuObj, 'menuObjmenuObj');
      for (let menu of menuObj.menu) {
        for (let subMenu of menu.subMenu) {
          for (let rows of subMenu.rows) {
            for (let currentCode of rows.code) {
              if (['103101', '103102', '103103', '103104', '103105'].includes(currentCode)) { // 连码->二中二,三中二
                let code = String(id) + currentCode;
                if (credit_playMap[code] !== undefined) {
                  for (let item of credit_playMap[code]) {
                    // 这里自定义加入20个号码
                    for (let i = 1; i <= 21; i++) {
                      let value = i < 10 ? '0' + i : i;
                      rows.content.push(Object.assign({}, item, {selected: false, value: value}));
                    }
                    subMenu.info = item;
                  }
                }
              }
              else {
                let code = String(id) + currentCode;
                if (credit_playMap[code] !== undefined) {
                  for (let item of credit_playMap[code]) {
                    rows.content.push(Object.assign({}, item, {selected: false}));
                  }
                }
              }
            }
          }
        }

      }
    }
    let newCreditLayout = [];
    for (let layout of creditLayout) {
      let code = '' + lotteryId + layout.code;
      for (let map of credit_playCateMap[lotteryId]) {
        if (map.code === code) {
          newCreditLayout.push(layout);
        }
      }
    }
    console.log(newCreditLayout, 'creditLayout---klsf');
    return newCreditLayout
  }

  // ok 11x5
  static setGame11of5fMethodInit(data, lotteryId, data1, userRebate, inputRebate) {
    // let [navList, playByIdMap, navList1, playByIdMap1] = [data.playCateMap[lotteryId], data.playByIdMap, data1.playCateMap[lotteryId], data1.playByIdMap]

    let navList = JSON.parse(JSON.stringify(data.playCateMap[lotteryId]));
    let playByIdMap = JSON.parse(JSON.stringify(data.playByIdMap));
    let navList1 = JSON.parse(JSON.stringify(data1.playCateMap[lotteryId]));
    let playByIdMap1 = JSON.parse(JSON.stringify(data1.playByIdMap));

    // 信用玩法数据处理
    navList.map(item => {
      item.detail = [];
      item.isOfficial = false;
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
        name: '两面',
        children: [{
          name: '两面',
          children: navList.slice(0, 6),
          isOfficial: false
        }]
      },
      {
        name: '单号',
        children: [{
          name: '单号',
          children: JSON.parse(JSON.stringify(navList.slice(1, 7))),
          isOfficial: false,
          isSpan: true
        }]
      },
      {
        name: '连码',
        children: [{
          name: '连码',
          children: navList[7].detail,
          isOfficial: false,
          addTabs: true
        }]
      },
      {
        name: '直选',
        children: navList[8].detail,
        isOfficial: false
      }
    ]
    // 数据处理
    xyMenu.forEach((item, key) => {
      if (key < 3) {
        item.children[0].children.forEach((val, ids) => {
          if (key === 0 && ids > 0) { // 两面
            val.detail = val.detail.slice(11, 20)
          }
          if (key === 1 && ids < 5) { // 单号
            // val.isSpan = true
            val.detail = val.detail.slice(0, 11)
          }
          if (key === 1) { // 单号-->选一
            val.isSpan = true
          }
          if (key === 2) { // 连码
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
            });
            val.nums = nums // 信用玩法复式比例
            val.betsNum = betsNum // 最多可选号码
            val.detail = arr
          }
        })
      }
      if (key === 3) { // 直选
        item.children.forEach((val, ids) => {
          let arr = utils.mapArr(val, ids)
          console.log(arr, val, ids, '---arrarr');
          for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            item.disable = false;
          }
          val.isOfficial = false;
          // val.isSpan=true;
          val.children = [
            {
              "name": '第一球',
              detail: arr,
              isSpan: true
            },
            {
              "name": '第二球',
              detail: JSON.parse(JSON.stringify(arr)),
              isSpan: true
            }
          ]
          if (ids === 1) {
            val.children.push(
              {
                name: '第三球',
                detail: JSON.parse(JSON.stringify(arr)),
                isSpan: true
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
      item.children = [];
      item.isOfficial = true;
      item.x = 1
      Object.keys(playByIdMap1).forEach(keys => {
        let plays = playByIdMap1[keys]
        plays.selected = false
        // 增加官方玩法标识
        plays.isGf = true
        plays.isOfficial = true
        plays.x = 2
        if (plays.name === '定单双') {
          plays.hideOdd = true
        }
        // if(plays.name === '猜中位'){
        //   plays.tool = 'full'
        // }
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
          ids.nums = i + 1 // 任选复式
          ids.betsNum = 8 // 最大可选注数
        }
        // 任选单式复试名称修改
        if (item.code === `9${lotteryId}106` || item.code === `9${lotteryId}107`) {
          ids.name = ids.alias
        }
        // 趣味玩法增加号码
        if (item.code === `9${lotteryId}105`) {
          console.log(ids, 'idsids');
          newObj.map(res => {

            res.isMore = true
            res.isSpan = false
            if (res.code === ids.code) {
              newCode.push(res)
            }
          })
          // ids.isSpan = false
          if (ids.name === '猜中位') {
            ids.isSpan = true;
            ids.hasOdds = true;
          }
          if (ids.name === '定单双') {
            ids.isSpan = false;
            ids.hasOdds = true;
          }
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
            ids.tool = 'full';
            ids.isSpan = true;
            ids.detail = [codes[0], codes[1]]
          }
          if (ids.name === '前二直选单式' || ids.name === '前二组选单式') {
            ids.detail = {isSimplex: true, num: 2}
          }
          if (ids.name === '前三直选复式') {
            ids.tool = 'full';
            ids.isSpan = true;
            ids.detail = [codes[0], codes[1], codes[2]]
          }
          if (ids.name === '前三组选复式' || ids.name === '前二组选复式' || ids.name === '不定胆') {
            ids.tool = 'full';
            ids.isSpan = true;
          }
          if (ids.name === '前三直选单式' || ids.name === '前三组选单式') {
            ids.detail = {isSimplex: true, num: 3}
          }
          if (ids.name === '定位胆') {
            ids.tool = 'full';
            ids.isSpan = true;
            ids.detail = [custCode[0], custCode[1], custCode[2], custCode[3], custCode[4]]
          }
          // 任选单式
          if (item.code === `9${lotteryId}106`) {
            ids.detail = {
              isSimplex: true,
              num: i ? i + 1 : 1
            }
          }
          ;
          // 任选复式
          if (item.code === `9${lotteryId}107`) {
            ids.tool = 'full';
            ids.isSpan = true;
          }
        }
      })
    })
    let dw = JSON.stringify(gfMenu.splice(3, 1)) // 定位胆
    gfMenu.splice(0, 0, JSON.parse(dw)[0]);
    let newVar = [...xyMenu, ...gfMenu];
    return newVar;
  }

  // fc3d
  static setFc3dMethodInit(creditData, officialData, lotteryId) {
    console.log(officialData, 'officialData');
    let credit_playCateMap = creditData.playCateMap;
    let credit_playMap = creditData.playMap;
    let official_playCateMap = officialData.playCateMap;
    let official_playMap = officialData.playMap;
    let id = lotteryId;
    let creditLayout = [
      {
        name: '一字',
        code: '101',
        isOfficial: false,
        menu: [
          {
            name: '一字',
            menuCode: '101',
            subMenu: [
              {
                name: '一字',
                code: '101101',
                isOfficial: false,
                rows: [
                  {
                    name: '组合',
                    code: ["101101101"],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '百',
                    code: ["101102101", "101102102", "101102103", "101102104"],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '拾',
                    code: ["101103101", "101103102", "101103103", "101103104"],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '个',
                    code: ["101104101", "101104102", "101104103", "101104104"],
                    isSpan: false,
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '二字',
        code: '102',
        isOfficial: false,
        menu: [
          {
            name: '二字',
            code: '102',
            isOfficial: false,
            subMenu: [
              {
                name: '二字',
                menuCode: '102',
                title: [
                  {
                    // code: ['102101', '102102', '102103', '102104'],
                    code: ['102101', '102102', '102103', '102104'],
                    content: []
                  }
                ],
                isOfficial: false,
                rows: [
                  {
                    name: '二字组合',
                    code: ["102101"],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '百拾定位',
                    code: ["102102"],
                    isSpan: true,
                    addTabs: true,
                    content: []
                  },
                  {
                    name: '百个定位',
                    code: ["102103"],
                    isSpan: true,
                    addTabs: true,
                    content: []
                  },
                  {
                    name: '拾个定位',
                    code: ["102104"],
                    isSpan: true,
                    addTabs: true,
                    content: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: '三字',
        code: '103',
        isOfficial: false,
        menu: [
          {
            name: '三字',
            code: '103',
            isOfficial: false,
            subMenu: [
              {
                name: '三字',
                menuCode: '103',
                title: [
                  {
                    code: ['103101', '103102', '103103', '103104'],
                    content: []
                  }
                ],
                isOfficial: false,
                rows: [
                  {
                    name: '三字组合',
                    code: ["103101"],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '组选三',
                    code: ["103102"],
                    isSpan: true,
                    addTabs: true,
                    content: []
                  },
                  {
                    name: '组选六',
                    code: ["103103"],
                    isSpan: true,
                    addTabs: true,
                    content: []
                  },
                  {
                    name: '百拾个定位',
                    code: ["103104"],
                    isSpan: true,
                    addTabs: true,
                    content: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: '和数',
        code: '104',
        isOfficial: false,
        menu: [
          {
            name: '和数',
            code: '104',
            subMenu: [
              {
                name: '和数',
                code: '104',
                isOfficial: false,
                rows: [
                  {
                    name: '百拾个和数',
                    code: ["104101"],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '百拾个和数单双',
                    code: ["104102"],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '百拾个和数大小',
                    code: ["104103"],
                    isSpan: false,
                    content: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: '和数尾数',
        code: '105',
        isOfficial: false,
        menu: [
          {
            name: '和数尾数',
            code: '105',
            subMenu: [
              {
                name: '和数尾数',
                code: '105',
                isOfficial: false,
                rows: [
                  {
                    name: '百拾个和数尾数',
                    code: ["105101"],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '百拾个和数尾数大小',
                    code: ["105102"],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '百拾个和数尾数质合',
                    code: ["105103"],
                    isSpan: false,
                    content: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: '跨度',
        code: '106',
        isOfficial: false,
        menu: [
          {
            name: '跨度',
            code: '106',
            subMenu: [
              {
                name: '跨度',
                code: '106',
                isOfficial: false,
                rows: [
                  {
                    name: '跨度',
                    code: ["106"],
                    isSpan: false,
                    content: []
                  }
                ]
              }
            ]
          }
        ]
      },
    ];
    let officialLayout = [
      {
        name: '三码',
        code: '101',
        menu: [
          {
            name: '直选',
            menuCode: '101101',
            subMenu: [
              {
                name: '复式',
                code: '101101101',
                isOfficial: true,
                rows: [
                  {
                    name: '复式',
                    code: ["101101101"],
                    isSpan: true,
                    tool: 'full',
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '单式',
                code: '101101102',
                isOfficial: true,
                isSingle: true,
                separate:3,
                rows: [
                  {
                    name: '单式',
                    code: ["101101102"],
                    isSingle: true,
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '直选和值',
                code: '101101103',
                isOfficial: true,
                rows: [
                  {
                    name: '直选和值',
                    code: ["101101103"],
                    isSpan: true,
                    content: [],
                    info: [],
                  },
                ]
              },
            ]
          },
          {
            name: '组选',
            menuCode: '101102',
            subMenu: [
              {
                name: '组三',
                code: '101102101',
                isOfficial: true,
                rows: [
                  {
                    name: '组三',
                    code: ["101102101"],
                    tool: 'full',
                    isSpan: true,
                    content: [],
                    info: [],
                  }
                ]
              },
              {
                name: '组六',
                code: '101102102',
                isOfficial: true,
                rows: [
                  {
                    name: '组六',
                    code: ["101102102"],
                    tool: 'full',
                    isSpan: true,
                    content: [],
                    info: [],
                  }
                ]
              },
              {
                name: '组选和值',
                code: '101102104',
                isOfficial: true,
                rows: [
                  {
                    name: '组选和值',
                    code: ["101102104"],
                    isSpan: true,
                    content: [],
                    info: [],
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '不定胆',
        code: '102',
        menu: [
          {
            name: '不定胆',
            menuCode: '102101',
            subMenu: [
              {
                name: '一码不定胆',
                code: '102101101',
                isOfficial: true,
                rows: [
                  {
                    name: '一码不定胆',
                    code: ["102101101"],
                    isSpan: true,
                    tool: 'full',
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '二码不定胆',
                code: '102101102',
                isOfficial: true,
                rows: [
                  {
                    name: '二码不定胆',
                    code: ["102101102"],
                    isSpan: true,
                    tool: 'full',
                    content: [],
                    info: [],
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        name: '二码',
        code: '103',
        menu: [
          {
            name: '直二',
            menuCode: '103101',
            subMenu: [
              {
                name: '前二直选复式',
                code: '103101101',
                isOfficial: true,
                rows: [
                  {
                    name: '前二直选复式',
                    code: ["103101101"],
                    isSpan: true,
                    tool: 'full',
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '前二直选单式',
                code: '103101102',
                isOfficial: true,
                isSingle: true,
                separate:2,
                rows: [
                  {
                    name: '前二直选单式',
                    code: ["103101102"],
                    isSingle: true,
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '前二组选复式',
                code: '103101103',
                isOfficial: true,
                nums: 2,
                rows: [
                  {
                    name: '前二组选复式',
                    code: ["103101103"],
                    isSpan: true,
                    tool: 'full',
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '前二组选单式',
                code: '103101104',
                isOfficial: true,
                isSingle: true,
                separate:2,
                rows: [
                  {
                    name: '前二组选单式',
                    code: ["103101104"],
                    isSpan: true,
                    content: [],
                    info: [],
                  },
                ]
              },
            ]
          },
          {
            name: '后二',
            menuCode: '103102',
            subMenu: [
              {
                name: '后二直选复式',
                code: '103102101',
                isOfficial: true,
                rows: [
                  {
                    name: '后二直选复式',
                    code: ["103102101"],
                    tool: 'full',
                    isSpan: true,
                    content: [],
                    info: [],
                  }
                ]
              },
              {
                name: '后二直选单式',
                code: '103102102',
                isOfficial: true,
                isSingle: true,
                separate:2,
                rows: [
                  {
                    name: '后二直选单式',
                    code: ["103102102"],
                    content: [],
                    info: [],
                  }
                ]
              },
              {
                name: '后二组选复式',
                code: '103102103',
                isOfficial: true,
                nums: 2,
                rows: [
                  {
                    name: '后二组选复式',
                    code: ["103102103"],
                    isSpan: true,
                    tool: 'full',
                    content: [],
                    info: [],
                  }
                ]
              },
              {
                name: '后二组选单式',
                code: '103102104',
                isOfficial: true,
                isSingle: true,
                separate:2,
                rows: [
                  {
                    name: '后二组选单式',
                    code: ["103102104"],
                    isSpan: false,
                    content: [],
                    info: [],
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '定位胆',
        code: '104',
        menu: [
          {
            name: '定位胆',
            menuCode: '104101',
            subMenu: [
              {
                name: '定位胆',
                code: '104101101',
                isOfficial: true,
                rows: [
                  {
                    name: '定位胆',
                    code: ["104101101"],
                    isSpan: true,
                    tool: 'full',
                    content: [],
                    info: [],
                  },
                ]
              }
            ]
          },
        ]
      },
      {
        name: '大小单双',
        code: '105',
        menu: [
          {
            name: '大小单双',
            menuCode: '105101',
            subMenu: [
              {
                name: '前二大小单双',
                code: '105101101',
                isOfficial: true,
                rows: [
                  {
                    name: '前二大小单双',
                    code: ["105101101"],
                    isSpan: true,
                    tool: 'min',
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '后二大小单双',
                code: '105101102',
                isOfficial: true,
                rows: [
                  {
                    name: '后二大小单双',
                    code: ["105101102"],
                    isSpan: true,
                    tool: 'min',
                    content: [],
                    info: [],
                  },
                ]
              },
            ]
          },
        ]
      },
    ];
    // 双面盘
    for (let menuObj of creditLayout) {
      // console.log(menuObj, 'menuObjmenuObj');
      for (let menu of menuObj.menu) {
        for (let subMenu of menu.subMenu) {
          // 添加title
          if (subMenu.title !== undefined) {
            for (let title of subMenu.title) {
              for (let currentCode of title.code) {
                let code = String(id) + currentCode;
                let menuCode = String(id) + subMenu.menuCode;
                // console.log(menuCode, code, credit_playCateMap[menuCode], currentCode, '==------playCateMap[menuCode]');
                if (credit_playCateMap[menuCode] !== undefined) {
                  for (let item of credit_playCateMap[menuCode]) {
                    if (code === item.code) {
                      title.content.push(item);
                    }
                  }
                }
              }
            }
          }
          for (let rows of subMenu.rows) {
            for (let currentCode of rows.code) {
              if (currentCode === '102102') { // 二字->百拾定位
                let code = String(id) + currentCode;
                if (credit_playMap[code] !== undefined) {
                  for (let item of credit_playMap[code]) {
                    let bai = {
                      name: '百',
                      arr: []
                    }
                    let shi = {
                      name: '拾',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      bai.arr.push(Object.assign({}, item, {selected: false, value: i}));
                      shi.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(bai).concat(shi);
                  }
                }
              }
              else if (currentCode === '102103') { // 二字->百个定位
                let code = String(id) + currentCode;
                if (credit_playMap[code] !== undefined) {
                  for (let item of credit_playMap[code]) {
                    let bai = {
                      name: '百',
                      arr: []
                    }
                    let ge = {
                      name: '个',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      bai.arr.push(Object.assign({}, item, {selected: false, value: i}));
                      ge.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(bai).concat(ge);
                  }
                }
              }
              else if (currentCode === '102104') { // 二字->拾个定位
                let code = String(id) + currentCode;
                if (credit_playMap[code] !== undefined) {
                  for (let item of credit_playMap[code]) {
                    let shi = {
                      name: '拾',
                      arr: []
                    }
                    let ge = {
                      name: '个',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      ge.arr.push(Object.assign({}, item, {selected: false, value: i}));
                      shi.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(shi).concat(ge);
                  }
                }
              }
              else if (currentCode === '103102') { // 三字->组选3
                let code = String(id) + currentCode;
                if (credit_playMap[code] !== undefined) {
                  for (let item of credit_playMap[code]) {
                    let zuXuan = {
                      name: '组选',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      zuXuan.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(zuXuan);
                  }
                }
              }
              else if (currentCode === '103103') { // 三字->组选6
                let code = String(id) + currentCode;
                if (credit_playMap[code] !== undefined) {
                  for (let item of credit_playMap[code]) {
                    let zuXuan = {
                      name: '组选',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      zuXuan.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(zuXuan);
                  }
                }
              }
              else if (currentCode === '103104') { // 三字->百拾个定位
                let code = String(id) + currentCode;
                if (credit_playMap[code] !== undefined) {
                  for (let item of credit_playMap[code]) {
                    let bai = {
                      name: '百',
                      arr: []
                    }
                    let shi = {
                      name: '拾',
                      arr: []
                    }
                    let ge = {
                      name: '个',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      bai.arr.push(Object.assign({}, item, {selected: false, value: i}));
                      shi.arr.push(Object.assign({}, item, {selected: false, value: i}));
                      ge.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(bai).concat(shi).concat(ge);
                  }
                }
              }
              else {
                let code = String(id) + currentCode;
                if (credit_playMap[code] !== undefined) {
                  for (let item of credit_playMap[code]) {
                    rows.content.push(Object.assign({}, item, {selected: false}));
                  }
                }
              }
            }
          }
        }

      }
    }
    let newCreditLayout = [];
    for (let layout of creditLayout) {
      let code = '' + lotteryId + layout.code;
      for (let map of credit_playCateMap[lotteryId]) {
        if (map.code === code) {
          newCreditLayout.push(layout);
        }
      }
    }
    console.log(newCreditLayout, 'creditLayout---fc3d');
    // 官方
    for (let menuObj of officialLayout) {
      // console.log(menuObj, 'menuObjmenuObj');
      for (let menu of menuObj.menu) {
        for (let subMenu of menu.subMenu) {
          // 添加title
          if (subMenu.title !== undefined) {
            for (let title of subMenu.title) {
              for (let currentCode of title.code) {
                let code = String(id) + currentCode;
                let menuCode = String(id) + subMenu.menuCode;
                console.log(menuCode, code, credit_playCateMap[menuCode], currentCode, 'offfff==------playCateMap[menuCode]');
                if (official_playCateMap[menuCode] !== undefined) {
                  for (let item of official_playCateMap[menuCode]) {
                    if (code === item.code) {
                      title.content.push(item);
                    }
                  }
                }
              }
            }
          }
          for (let rows of subMenu.rows) {
            for (let currentCode of rows.code) {
              if (currentCode === '101101101') { // 直选->复式
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let bai = {
                      name: '百位',
                      tool: 'full',
                      arr: []
                    }
                    let shi = {
                      name: '十位',
                      tool: 'full',
                      arr: []
                    }
                    let ge = {
                      name: '个位',
                      tool: 'full',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      bai.arr.push(Object.assign({}, item, {selected: false, value: i}));
                      shi.arr.push(Object.assign({}, item, {selected: false, value: i}));
                      ge.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(bai).concat(shi).concat(ge);
                    rows.info.push(item);
                  }
                }
              }
              else if (currentCode === '101101103') { // 直选->直选和值
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let bai = {
                      name: '直选和值',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i <= 27; i++) {
                      bai.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(bai);
                    rows.info.push(item);
                  }
                }
              }
              else if (currentCode === '101102101') { // 组选->组三
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let zuSan = {
                      name: '组三',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      zuSan.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(zuSan);
                    rows.info.push(item);
                  }
                }
              }
              else if (currentCode === '101102102') { // 组选->组六
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let zuLiu = {
                      name: '组六',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      zuLiu.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(zuLiu);
                    rows.info.push(item);
                  }
                }
              }
              else if (currentCode === '101102104') { // 直选->组选和值
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let bai = {
                      name: '组选和值',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 1; i < 27; i++) {
                      bai.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(bai);
                    rows.info.push(item);
                  }
                }
              }
              else if (currentCode === '102101101') { // 不定胆->一码不定胆
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let bai = {
                      name: item.name,
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      bai.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(bai);
                    rows.info.push(item);
                  }
                }
              }
              else if (currentCode === '102101102') { // 不定胆->二码不定胆
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let bai = {
                      name: item.name,
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      bai.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(bai);
                    rows.info.push(item);
                  }
                }
              }
              else if (currentCode === '103101101') { // 直二->前二直选复式
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let bai = {
                      name: '百位',
                      arr: []
                    }
                    let shi = {
                      name: '十位',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      bai.arr.push(Object.assign({}, item, {selected: false, value: i}));
                      shi.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(bai).concat(shi);
                    rows.info.push(item);
                  }
                }
              }
              else if (currentCode === '103101103') { // 直二->前二组选复式
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let bai = {
                      name: '组选',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      bai.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(bai);
                    rows.info.push(item);
                  }
                }
              }
              else if (currentCode === '103102101') { // 后二->后二直选复式
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let shi = {
                      name: '十位',
                      arr: []
                    }
                    let ge = {
                      name: '个位',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      ge.arr.push(Object.assign({}, item, {selected: false, value: i}));
                      shi.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(shi).concat(ge);
                    rows.info.push(item);
                  }
                }
              }
              else if (currentCode === '103102103') { // 后二->后二组选复式
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let bai = {
                      name: '组选',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      bai.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(bai);
                    rows.info.push(item);
                  }
                }
              }
              else if (currentCode === '104101101') { // 定位胆->定位胆
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let bai = {
                      name: '百位',
                      arr: []
                    }
                    let shi = {
                      name: '十位',
                      arr: []
                    }
                    let ge = {
                      name: '个位',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    for (let i = 0; i < 10; i++) {
                      bai.arr.push(Object.assign({}, item, {selected: false, value: i}));
                      shi.arr.push(Object.assign({}, item, {selected: false, value: i}));
                      ge.arr.push(Object.assign({}, item, {selected: false, value: i}));
                    }
                    rows.content = [].concat(bai).concat(shi).concat(ge);
                    rows.info.push(item);
                  }
                }
              }
              else if (currentCode === '105101101') { // 大小单双->前二大小单双
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let bai = {
                      name: '百位',
                      arr: []
                    }
                    let shi = {
                      name: '十位',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    let number = ['大', '小', '单', '双']
                    for (let i = 0; i < number.length; i++) {
                      bai.arr.push(Object.assign({}, item, {selected: false, value: number[i]}));
                      shi.arr.push(Object.assign({}, item, {selected: false, value: number[i]}));
                    }
                    rows.content = [].concat(bai).concat(shi);
                    rows.info.push(item);
                  }
                }
              }
              else if (currentCode === '105101102') { // 大小单双->后二大小单双
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {

                    let shi = {
                      name: '十位',
                      arr: []
                    }
                    let ge = {
                      name: '个位',
                      arr: []
                    }
                    // 这里自定义加入9个号码
                    let number = ['大', '小', '单', '双']
                    for (let i = 0; i < number.length; i++) {
                      ge.arr.push(Object.assign({}, item, {selected: false, value: number[i]}));
                      shi.arr.push(Object.assign({}, item, {selected: false, value: number[i]}));
                    }
                    rows.content = [].concat(shi).concat(ge);
                    rows.info.push(item);
                  }
                }
              }
              else {
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    rows.content.push(Object.assign({}, item, {selected: false}));
                    rows.info.push(item);
                  }
                }
              }
            }
          }
        }

      }
    }
    let newOfficialLayout = [];
    for (let layout of officialLayout) {
      let code = '9' + lotteryId + layout.code;
      for (let map of official_playCateMap[lotteryId]) {
        if (map.code === code) {
          newOfficialLayout.push(layout);
        }
      }
    }
    console.log(newOfficialLayout, 'officialLayout---fc3d');
    return [].concat(newCreditLayout).concat(newOfficialLayout)

  }

  // bjkl8
  static setBjkl8MethodInit(creditData, officialData, lotteryId) {
    console.log(creditData, 'bjkl8---creditData');
    console.log(officialData, 'bjkl8---officialData');
    let credit_playCateMap = creditData.playCateMap;
    let credit_playMap = creditData.playMap;
    let official_playCateMap = officialData.playCateMap;
    let official_playMap = officialData.playMap;
    let id = lotteryId;
    let creditLayout = [
      {
        name: '选1-5',
        code: '101',
        isOfficial: false,
        menu: [
          {
            name: '选1-5',
            menuCode: '101',
            subMenu: [
              {
                name: '选1-5',
                code: '101101',
                oddsArr: [
                  {
                    code: [['101102'], ['101103'], ['101104', '101104'], ['101105', '101105', '101105'], ['101106', '101106', '101106']],
                    content: []
                  }
                ],
                isOfficial: false,
                rows: [
                  {
                    name: '选1-5',
                    code: ["101101"],
                    isSpan: true,
                    maxCount: 5,
                    content: [],
                    addOdds: true
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '选一',
        code: '101',
        isOfficial: false,
        menu: [
          {
            name: '选一',
            menuCode: '101',
            subMenu: [
              {
                name: '选一',
                code: '101102',
                oddsArr: [
                  {
                    code: [['101102']],
                    content: []
                  }
                ],
                isOfficial: false,
                rows: [
                  {
                    name: '一中一',
                    code: ["101102"],
                    isSpan: true,
                    maxCount: 20,
                    nums: 1,
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '选二',
        code: '101',
        isOfficial: false,
        menu: [
          {
            name: '选二',
            menuCode: '101',
            subMenu: [
              {
                name: '选二',
                code: '101103',
                oddsArr: [
                  {
                    code: [['101103']],
                    content: []
                  }
                ],
                isOfficial: false,
                rows: [
                  {
                    name: '二中二',
                    code: ["101103"],
                    isSpan: true,
                    info: [],
                    maxCount: 15,
                    nums: 2,
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '选三',
        code: '101',
        isOfficial: false,
        menu: [
          {
            name: '选三',
            menuCode: '101',
            subMenu: [
              {
                name: '选三',
                code: '101104',
                oddsArr: [
                  {
                    code: [['101104', '101104']],
                    content: []
                  }
                ],
                isOfficial: false,
                rows: [
                  {
                    name: '选三',
                    code: ["101104"],
                    isSpan: true,
                    info: [],
                    nums: 3,
                    maxCount: 10,
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '选四',
        code: '101',
        isOfficial: false,
        menu: [
          {
            name: '选四',
            menuCode: '101',
            subMenu: [
              {
                name: '选四',
                code: '101105',
                oddsArr: [
                  {
                    code: [['101105', '101105', '101105']],
                    content: []
                  }
                ],
                isOfficial: false,
                rows: [
                  {
                    name: '选四',
                    code: ["101105"],
                    isSpan: true,
                    info: [],
                    maxCount: 9,
                    nums: 4,
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '选五',
        code: '101',
        isOfficial: false,
        menu: [
          {
            name: '选五',
            menuCode: '101',
            subMenu: [
              {
                name: '选五',
                code: '101106',
                oddsArr: [
                  {
                    code: [['101106', '101106', '101106']],
                    content: []
                  }
                ],
                isOfficial: false,
                rows: [
                  {
                    name: '选五',
                    code: ["101106"],
                    isSpan: true,
                    info: [],
                    maxCount: 9,
                    nums: 5,
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '整合',
        code: '102',
        isOfficial: false,
        menu: [
          {
            name: '整合',
            menuCode: '102',
            subMenu: [
              {
                name: '整合',
                code: '102',
                isCollapse: true,
                isOfficial: false,
                rows: [
                  {
                    name: '和数单双',
                    code: ["102107"],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '和数大小',
                    code: ["102108"],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '和数大小和',
                    code: ["102109"],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '和数上中下',
                    code: ["102110"],
                    isSpan: false,
                    content: []
                  },
                  {
                    name: '和数奇偶和',
                    code: ["102111"],
                    isSpan: false,
                    content: []
                  }
                ]
              },
            ]
          }
        ]
      },
    ];
    let officialLayout = [
      {
        name: '任选',
        code: '101',
        menu: [
          {
            name: '任选',
            menuCode: '101101',
            subMenu: [
              {
                name: '任选一',
                code: '101101101',
                isOfficial: true,
                nums: 1,
                maxCount: 100,
                rows: [
                  {
                    name: '任选一',
                    code: ["101101101"],
                    isSpan: true,
                    isOfficial: true,
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '任选二',
                code: '101101102',
                isOfficial: true,
                nums: 2,
                maxCount: 8,
                rows: [
                  {
                    name: '任选二',
                    code: ["101101102"],
                    isSpan: true,
                    content: [],
                    info: [],
                  }
                ]
              },
              {
                name: '任选三',
                code: '101101103',
                isOfficial: true,
                maxCount: 8,
                nums: 3,
                rows: [
                  {
                    name: '任选三',
                    code: ["101101103"],
                    isSpan: true,
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '任选四',
                code: '101101104',
                isOfficial: true,
                maxCount: 8,
                nums: 4,
                rows: [
                  {
                    name: '任选四',
                    code: ["101101104"],
                    isSpan: true,
                    content: [],
                    info: [],
                  }
                ]
              },
              {
                name: '任选五',
                code: '101101105',
                isOfficial: true,
                nums: 5,
                maxCount: 8,
                rows: [
                  {
                    name: '任选五',
                    code: ["101101105"],
                    isSpan: true,
                    content: [],
                    info: [],
                  }
                ]
              },
              {
                name: '任选六',
                code: '101101106',
                isOfficial: true,
                nums: 5,
                maxCount: 8,
                rows: [
                  {
                    name: '任选六',
                    code: ["101101106"],
                    isSpan: true,
                    content: [],
                    info: [],
                  }
                ]
              },
              {
                name: '任选七',
                code: '101101107',
                isOfficial: true,
                nums: 7,
                maxCount: 8,
                rows: [
                  {
                    name: '任选七',
                    code: ["101101107"],
                    isSpan: true,
                    content: [],
                    info: [],
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        name: '趣味',
        code: '102',
        menu: [
          {
            name: '趣味',
            menuCode: '102101',
            subMenu: [
              {
                name: '和值单双',
                code: '102101101',
                isOfficial: true,
                rows: [
                  {
                    name: '和值单双',
                    code: ["102101101"],
                    isSpan: false,
                    tool: 'min',
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '和值大小',
                code: '102101102',
                isOfficial: true,
                rows: [
                  {
                    name: '和值大小',
                    code: ["102101102"],
                    isSpan: false,
                    tool: 'min',
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '上下盘',
                code: '102101103',
                isOfficial: true,
                rows: [
                  {
                    name: '上下盘',
                    code: ["102101103"],
                    isSpan: false,
                    tool: 'min',
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '奇偶盘',
                code: '102101104',
                isOfficial: true,
                rows: [
                  {
                    name: '奇偶盘',
                    code: ["102101104"],
                    isSpan: false,
                    tool: 'min',
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '和值大小单双',
                code: '102101105',
                isOfficial: true,
                rows: [
                  {
                    name: '和值大小单双',
                    code: ["102101105"],
                    isSpan: false,
                    tool: 'min',
                    content: [],
                    info: [],
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        name: '和值',
        code: '103',
        menu: [
          {
            name: '和值',
            menuCode: '103101',
            subMenu: [
              {
                name: '和值单双',
                code: '103101101',
                isOfficial: true,
                rows: [
                  {
                    name: '和值单双',
                    code: ["103101101"],
                    isSpan: false,
                    tool: 'min',
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '和值大小',
                code: '103101102',
                isOfficial: true,
                rows: [
                  {
                    name: '和值大小',
                    code: ["103101102"],
                    isSpan: false,
                    tool: 'min',
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '和值大小单双',
                code: '103101103',
                isOfficial: true,
                rows: [
                  {
                    name: '和值大小单双',
                    code: ["103101103"],
                    isSpan: false,
                    tool: 'min',
                    content: [],
                    info: [],
                  },
                ]
              }
            ]
          },
        ]
      },
      {
        name: '盘面',
        code: '104',
        menu: [
          {
            name: '盘面',
            menuCode: '104101',
            subMenu: [
              {
                name: '上下盘',
                code: '104101101',
                isOfficial: true,
                rows: [
                  {
                    name: '上下盘',
                    code: ["104101101"],
                    isSpan: false,
                    tool: 'min',
                    content: [],
                    info: [],
                  },
                ]
              },
              {
                name: '奇偶盘',
                code: '104101102',
                isOfficial: true,
                rows: [
                  {
                    name: '奇偶盘',
                    code: ["104101102"],
                    isSpan: false,
                    tool: 'min',
                    content: [],
                    info: [],
                  },
                ]
              },
            ]
          },
        ]
      },
    ];
    // 双面盘
    for (let menuObj of creditLayout) {
      // console.log(menuObj, 'menuObjmenuObj');
      for (let menu of menuObj.menu) {
        for (let subMenu of menu.subMenu) {
          // 添加oddsArr
          if (subMenu.oddsArr !== undefined) {
            if (['101101', '101102', '101103', '101104', '101105', '101106'].includes(subMenu.code)) { // 赔率随着选择的号码数量而变化
              for (let oddsArr of subMenu.oddsArr) {
                for (let i = 0; i < oddsArr.code.length; i++) {
                  let currentCodeArr = oddsArr.code[i];
                  let infoArr = [];
                  for (let m = 0; m < currentCodeArr.length; m++) {
                    let currentCode = currentCodeArr[m];
                    let code = String(id) + currentCode;
                    if (credit_playMap[code] !== undefined) {
                      for (let n = 0; n < credit_playMap[code].length; n++) {
                        let item = credit_playMap[code][n];
                        if (m === n) {
                          infoArr.push(item);
                        }
                      }
                    }
                  }
                  oddsArr.content.push(infoArr);
                }
              }
            }
          }
          for (let i = 0; i < subMenu.rows.length; i++) {
            let rows = subMenu.rows[i];
            for (let currentCode of rows.code) {
              if (['101101'].includes(currentCode)) {
                // 选1-5->
                // 这里自定义加入80个号码
                for (let m = 1; m <= 80; m++) {
                  let value = m < 10 ? '0' + m : m;
                  rows.content.push(Object.assign({}, {selected: false, value: value}));
                }
              }
              else if (['101102', '101103', '101104', '101105', '101106'].includes(currentCode)) { // 选1->选三->三中二,三中三
                let code = String(id) + currentCode;
                if (credit_playMap[code] !== undefined) {
                  let item = credit_playMap[code][0];
                  // 这里自定义加入80个号码
                  for (let m = 1; m <= 80; m++) {
                    let value = m < 10 ? '0' + m : m;
                    rows.content.push(Object.assign({}, item, {selected: false, value: value}));
                  }
                }
              }
              else {
                let code = String(id) + currentCode;
                if (credit_playMap[code] !== undefined) {
                  for (let item of credit_playMap[code]) {
                    rows.content.push(Object.assign({}, item, {selected: false}));
                  }
                }
              }
            }
          }
        }

      }
    }
    let newCreditLayout = [];
    for (let layout of creditLayout) {
      let code = '' + id + layout.code;
      for (let map of credit_playCateMap[id]) {
        if (map.code === code) {
          newCreditLayout.push(layout);
        }
      }
    }
    console.log(newCreditLayout, 'creditLayout---bjkl8');
    // 官方
    for (let menuObj of officialLayout) {
      // console.log(menuObj, 'menuObjmenuObj');
      for (let menu of menuObj.menu) {
        for (let subMenu of menu.subMenu) {
          // 添加title
          if (subMenu.title !== undefined) {
            for (let title of subMenu.title) {
              for (let currentCode of title.code) {
                let code = String(id) + currentCode;
                let menuCode = String(id) + subMenu.menuCode;
                console.log(menuCode, code, credit_playCateMap[menuCode], currentCode, 'offfff==------playCateMap[menuCode]');
                if (official_playCateMap[menuCode] !== undefined) {
                  for (let item of official_playCateMap[menuCode]) {
                    if (code === item.code) {
                      title.content.push(item);
                    }
                  }
                }
              }
            }
          }
          for (let rows of subMenu.rows) {
            for (let currentCode of rows.code) {
              if (['101101101', '101101102', '101101103', '101101104', '101101105', '101101106', '101101107'].includes(currentCode)) { // 任选一
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  for (let item of official_playMap[code]) {
                    let up = {
                      name: '上',
                      arr: []
                    }
                    let down = {
                      name: '下',
                      arr: []
                    }
                    // 这里自定义加入40个号码
                    for (let i = 1; i <= 40; i++) {
                      let value = i < 10 ? '0' + i : i
                      up.arr.push(Object.assign({}, item, {selected: false, value: value}));
                      down.arr.push(Object.assign({}, item, {selected: false, value: i + 40}));
                    }
                    rows.content = [].concat(up).concat(down);
                    rows.info.push(item);
                  }
                }
              }
              else {
                let code = '9' + String(id) + currentCode;
                if (official_playMap[code] !== undefined) {
                  let obj = {
                    arr: [],
                    name: rows.name
                  }
                  for (let item of official_playMap[code]) {
                    obj.arr.push(Object.assign({}, item, {selected: false}));
                    rows.info.push(item);
                  }
                  rows.content = [obj]
                }
              }
            }
          }
        }
      }
    }
    let newOfficialLayout = [];
    for (let layout of officialLayout) {
      let code = '9' + lotteryId + layout.code;
      for (let map of official_playCateMap[lotteryId]) {
        if (map.code === code) {
          newOfficialLayout.push(layout);
        }
      }
    }
    console.log(newOfficialLayout, 'officialLayout---bjkl8');


    return [].concat(newCreditLayout).concat(newOfficialLayout)
  }

}

function sscDetailCode(item) {
  let res = item;
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
      res.tool = 'full';
      res.children = sscCode(["组选120"]);
      res.list = [[]];
      break;
    case "组选60":
    case "组选30":
    case "前四组选12": //前四玩法
    case "后四组选12": //后四玩法
      res.tool = 'full';
      res.children = sscCode(["二重号", "单号"]);
      res.list = [[], []];
      break;
    case "组选20":
    case "前四组选4": //前四玩法
    case "后四组选4": //后四玩法
      res.tool = 'full';
      res.children = sscCode(["三重号", "单号"]);
      res.list = [[], []];
      break;
    case "组选10":
      res.tool = 'full';
      res.children = sscCode(["三重号", "二重号"]);
      res.list = [[], []];
      break;
    case "组选5":
      res.tool = 'full';
      res.children = sscCode(["四重号", "单号"]);
      res.list = [[], []];
      break;
    //前四玩法
    case "前四复式":
    case "前四组合":
      res.tool = 'full';
      res.children = sscCode(["万位", "千位", "百位", "十位"]);
      res.list = [[], [], [], []];
      break;
    case "前四组选24":
    case "后四组选24":
      res.children = sscCode(["组选24"]);
      res.list = [[]];
      res.tool = 'full';
      break;
    case "前四组选6":
    case "后四组选6":
      res.tool = 'full';
      res.children = sscCode(["二重号"]);
      res.list = [[]];
      break;
    //后四玩法
    case "后四复式":
    case "后四组合":
      res.tool = 'full';
      res.children = sscCode(["千位", "百位", "十位", "个位"]);
      res.list = [[], [], [], []];
      break;

    //后三码玩法
    case "后三直选复式":
      res.tool = 'full';
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
      res.tool = 'full';
      res.children = sscCode(["组三"]);
      res.list = [[]];
      break;
    case "后三组六":
    case "前三组六":
    case "中三组六":
      res.tool = 'full';
      res.children = sscCode(["组六"]);
      res.list = [[]];
      break;
    case "后三组选和值":
    case "前三组选和值":
    case "中三组选和值":
      res.tool = false;
      res.children = sscCode(["组选和值"], 26, 0);
      res.list = [[]];
      break;
    //前三码
    case "前三直选复式":
      res.tool = 'full';
      res.children = sscCode(["万位", "千位", "百位"]);
      res.list = [[], [], []];
      break;

    //中三码
    case "中三直选复式":
      res.tool = 'full';
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
      res.haveCheckList = true;
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
      res.tool = "full";
      res.children = sscCode(["组三"]);
      res.list = [[]];
      break;
    case "任三组六":
      res.tool = "full";
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
}

function sscHaveCheckList(item) {
  let res = item
  switch (res.name) {
    case "任二直选单式":
    case  "任二直选和值":
    case  "任二组选复式":
    case  "任二组选单式":
    case  "任二组选和值":
    case  "任三直选单式":
    case  "任三直选和值":
    case  "任三组三":
    case  "任三组六":
    case  "任三组选和值":
    case  "任四直选单式":
    case  "组选24":
    case  "组选12":
    case  "组选6":
    case  "组选4":
      res.haveCheckList = true;
    default:
    // res.haveCheckList = false;
  }
}
