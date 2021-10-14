const en = {
  // '彩票下注':'Lottery betting',
  // '后台转入':'Manual deposit',
  lang: {
    common: {
      auditDetails: 'Audit details',//稽核详情
      agentDescription: 'Agent description',//代理说明
      Balance: 'Balance',//余额
      AccountBalance: 'Account balance',//账户余额
      yuan: '￥',//元
      noData: 'No Data',//暂无数据
      determine: 'Determine',//确定
      refreshSuccessfully: 'Refresh successfully',//刷新成功
      combinationRule: 'Number/letter/underline combination between 6-16',//6-16之间数字/字母/下划线组合
      loginTimedOut: 'Login timed out, please log in again',//登录超时，请重新登录
      serverBusy: 'Server is busy',//服务器繁忙
      ziYuanBuCunZai: 'The resource you are accessing does not exist',//资源不存在
      requestError: 'Request error',//请求错误
      duanWangLa: 'Disconnected',//断网啦
      verificationCode: 'Code',//验证码
      pleaseEnterVerificationCode: 'Verification code',//请输入验证码
      noRecords: 'No records',//暂无记录
      remark: 'Remark',// 备注
      to: 'to',// 日期选项器的‘到’
      starTime: 'Star Time',//开始时间
      endTime: 'End Time',//结束时间
      search: 'search',// 查询，搜索
      delete: 'Delete', // 删除
      query: 'search',
      title: 'title',// 标题
      website: 'website',//平台
      converting: 'converting…', // 转换中
      returning: 'Returning…',//归还中
      successfulReturn: 'Successful Return',//归还成功
      openSoon: 'It will open soon. Please look forward to it',
      nextStep: 'Next Step',//下一步
      lastStep: 'Last Step',//上一步
      copy: 'Copy',//复制
      buttonTextConfirm: 'Confirm',
      ifCallService: 'If you have any questions, please contact',//如有问题，请联系
      submitIng: 'Data being submitted…',//数据提交中
      submited: 'Data submitted',//数据已提交
      di: 'The',//第
      issueText: 'Issue',//期
      openPrizeSoon: 'Coming Soon',//即将开奖
      loading: 'loading...',
      deadline: 'Deadline',
      submit: 'Submit',//提交
      drawing: 'drawing...',
      blocking: 'blocking...',
      contactService: 'Contact service',//联系客服
      btn: ['Close', 'Delete', 'Cancel', 'OK', 'Home', 'Confirm'],
      datetimeData: ['datetimeData'],
      del_tips: ['The deleted data cannot be recovered. Are you sure you want to delete it?', 'Successfully deleted'],
      edit_tips: ['Modified successfully', 'Submitted successfully', 'Operation successful', 'Request error', 'The modification is successful. You need to log in again!'],
      add_tips:['Add succeeded', 'Add failed'],
      error_alert:['Response failed, please try again later! '],
    },
    apply_agency: {
      agency: ['There are currently', 'agents'],
      money: ['Earn', 'wealth a day'],
      btn: ['Join now'],
    },
    trend: {
      issue_text: 'Issue No.',//期数
      K3_tabs: ['Sum', 'First', 'Second', 'Third'],//'和值','第一位','第二位','第三位'
      k3_title_sum: ['Issue No.', 'Num', 'Sum', 'big-small', 'odd-even'],//'期数','开奖号码','和值','大小','单双'
      ssc_tabs: ['1th', '2th', '3th', '4th', '5th'],//'万位','千位','百位','十位','个位'
      eleven5_tabs: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],//'第一位','第二位','第三位','第四位','第五位'
      pk10_tabs: ['Champion', 'Runner-up', 'Third place', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'],//'冠军','亚军','季军','四位','五位','六位','七位','八位','九位','十位'
      fc3d_tabs: ['3th', '4th', '5th'],//'百位','十位','个位'
      common_title: ['Issue No.', 'Num'],//'期数','开奖号码'
      k3_title_position: ['Issue No.', 'istribution'],//'期数','号码分布'
      refresh: 'Refresh',
      select: 'Take a item',
      goToLoddy: 'To drop a note',
      chart: 'Chart'
    },
    threeGame: {
      tips: ['Are you sure you want to quit the current game?'],
      title: ['eminder'],
    },
    ranking: {
      title: 'Winning ',//中奖
      navList: ['Latest winner', 'Ranking yesterday'],
      in: 'In {game}'
    },
    state: {
      processing: 'Processing',//受理中
      pending: 'Pending',//待处理
      solved: 'Solved', //已解决
      paidIn: 'PaidIn',//已入款
      canceled: 'Canceled',//已取消，已注销
      notSet: 'Not Set',//未设置
      yesSet: 'Already set, Click to modify fund password',//已设置
      changeLoginPwd:'Click Modify login password',
      copySuccess: 'Copy Success',//复制成功
      copyError: 'Copy Error',//复制失败
      addSuccess: 'Added successfully',//添加成功
      draw: 'Draw',//和局
      win: 'Win',//中奖
      noWin: 'NO Win',//未中奖
      openWin: 'Opening',//开奖中
      loading: 'Loading',//加载中
      close: 'Closed Offer',//封盘中
      unpaid: 'Unpaid',//待支付
    },
    register: {
      accountType: ['Type', 'Member', 'Agent'],
      userNickname: ['Nickname', 'Enter user nickname', 'The nickname consists of 2-15 Chinese characters, letters or numbers'],
      loginAccount: ['Account', 'Enter the login account number', 'The account starts with a letter and consists of 6-10 letters and numbers or underscores'],
      actualName: ['Real name', 'Enter your real name', 'The real name is 2 to 20 Chinese characters'],
      memberPhone: ['Member phone', 'Enter the member phone number', 'The phone number is 11 digits'],
      userPwd: ['Password', 'Enter the password', 'The password consists of 6-12 letters and numbers or underscores, not pure numbers'],
      oldPwd: ['Old password', 'Enter the old password', 'The password must be at least 6 digits'],
      confirmPwd: ['Confirm password', 'Enter the password again', 'The two passwords are inconsistent'],
      changeNewPwd: ['New password', 'Please enter a new password'],
      changeRePwd: ['Confirm new password', 'New password again'],
      hasValue: ['Account number already exists'],
      fundPwdRules: ['Please enter the withdrawal password','Please enter a length of 4 digits'],


    },
    lotteryTips: {
      title: 'Rules of play',//玩法规则,
      playTipsTitle: 'Tips for playing',//玩法提示,
      playTipsDesc: 'No description',//暂无说明,
      winInstructionTitle: 'Winning instructions',//中奖说明
      winInstructionDesc: 'No description',//暂无说明,
      exampleTitle: 'Example',//范例
      exampleDesc: 'No description',//暂无说明,
    },
    lotterySort: {
      all: 'All',// 全部
      markSixLottery: 'lhc',// 六合彩
      fc3d: 'dp',//低频彩
      ssLottery: 'ssc',//时时彩
      pK10: 'pk10',//PK拾
      Xuan5: '11x5',//11选5
      happyLottery: 'lk',//快乐彩
      kuai3: 'k3',//快3
      pcDanDan: 'pc',//PC蛋蛋
      ffssc: 'ffssc',//分分时时彩
      ffpk10: 'ffpk10',//分分PK拾
      fflhc: 'fflhc',//分分六合彩
      ffccs1: 'ffccs-1',//分分时时彩1
      ffpk101: 'ffpk10-1',//分分时时彩1
      fflhc1: 'fflhc-1',//分分时时彩1
    },
    lottery: {
      buyLottery: 'Go to Order',//去购彩
      trend: 'Trend',//走势
      play: 'Play',//玩法
      collect: 'Collect',//收藏
      collected: 'Collect',//已收藏
      toast: ['The function is not available.'],
      randomAndTips: ['SHAKE for BET', 'TIPS'],
      odds: 'Odds',
      balance: 'Balance',
      simplexOption: ['Delete repeated numbers', 'Clear'],
      simplexTips_1: ['If the number not enough', 'bits, add', 'in front of the number. For example if going to type', ', there should be type '],
      simplexTips_2: ['Every bets of the numbers need', 'to separate'],
      simplexTips_3: ['Illegal numbers will be filtered automatically,you could click', ' button to format what you typed.'],
      nav: ['Trend', 'Coming', 'Record', 'Introduce', 'The route', 'Dragon'],
      issueInfo: ['No. ', 'NEXT:', ''],
      historyTitle: ['ISSUE', 'DRAWING NUMBERS'],
      K3_total: 'Total',
      bottom: {
        info: ['Stakes:', ',Total:', 'Yuan', 'Max Profit <br> / Stake:'],
        tools: ['Clear', 'AddtoQueue', 'Waiting Betting', 'Quickly Betting'],
        multiple: ['Stake', 'Yuan', 'yuan/ <br> Stake', 'Multiple'],
        queue: {
          title: 'Setting',
          info: ['Rebate', 'Amount', 'Stake', 'Total', 'Yuan', 'Max Profit/Stake'],
          btn: ['Cancel', 'Confirm']
        }
      },
      dialog: {
        title: 'TIPS',
        warning: [
          'Please go to login in first,then order again!',
          'Please wait a moment, The issue is changing!',
          '开奖中，请稍后',
          'Please go to recharge, The Balance is not enough!',
          'Success！',
          'Please order again, request time out.',
          'Ordering...',
          'Choose the numbers first, the list is empty.',
          'The issue is changing to',
          'There are some stakes waiting to order, are you sure to cancel?',
          '请先输入正确的倍数'
        ],
        buttons: [
          'To recharge', //'去充值'
        ]
      },
      orderList: {
        title: 'Betting List',
        countDown: ['No.', ' will be blocked to order in'],
        random: ['Random one stake', 'Random five stakes', 'Intelligently following'],
        info: ['', 'Stakes Total', 'Yuan', 'Total', 'Balance'],
      },
      ssc: {
        tips: ['You have selected', 'positions, It will automatically be composed ', ' cases by system.']
      }
    },
    user: {
      withdraw: 'Withdraw',//提现
      Recharge: 'Recharge',//充值
      transfer: 'Transfer',//转账
      accountDetails: 'Account details',//账户明细

      rechargeRecord: 'Record',//充值记录
      withdrawalsRecord: 'Withdrawals record',//提现记录
      quotaConversion: 'Quota conversion',//额度转换
      orderInquiry: 'Order Inquiry',//订单查询
      myCollection: 'My collection',//我的收藏
      myDiscountCoupon: 'My discount coupon',//我的优惠券
      contactCustomerService: 'Call service',//联系客服
      helpAndFeedback: 'Help and feedback',//帮助与反馈
      securityCenter: 'Security center',//安全中心
      bonusDetails: 'Bonus details',//奖金详情
      language: '语言 / Language',
      joinAgent: 'Join agent',//加入代理
      tryItForFree: 'Try it for free',//免费试玩
      notVIP: 'You are using a demo account and cannot see how to become a VIP',//您使用的是试玩账号，无法查看如何成为VIP
      howVip: 'How to become a VIP',//如何成为VIP
      cancel: 'cancel',//取消
      myTeam: 'My team (Agent center)',//我的团队（代理中心）
      balanceJin: 'Investment Fund',//余额生金
      hello: 'hello',//hello,你好
      languageSelected: 'Please select language',
      balance: 'Balance',//余额
      setFundPwd: 'Please set the fund password first',//请先设置资金密码
    },
    header: {
      topUpType: 'Recharge type',//充值类型
      topUp:'Recharge',
      Withdrawal: 'Withdrawal',//提款
      walletTransfer: 'Transfer',//钱包转账
      physicalEducation: 'Physical education',//体育
      electronic: 'Electronic',//电子
      ApplicationAgent: 'Application agent',//申请代理
      SetFundPassword: 'Set fund password',//设置资金密码
      modifyFundPassword: 'Fund password setting',//修改资金密码
      StationLetter: 'Station letter',//站内信
      historicalBet: 'Historical bet',//历史注单
      couponDescription: 'Coupon description',//优惠券说明
      Promotions: 'Promotions',//优惠活动
      download: 'Download'
    },
    footer: {
      home: 'Home',//首页
      Draw: 'Draw',//开奖
      betSlip: 'Order',//注单
      member: 'Mine',//会员
      find: 'Discovery',//发现
      Lottery: 'Buy',
      goucaidating: require('@/assets/img/goucaidating.svg')

    },
    feedback: {
      title: 'User feedback',//用户反馈
      radioBug: 'BUG',//程序BUG
      radioBet: 'Related bets',//相关投注
      radioOther: 'Other suggestions',//其他建议
      placeContentCon: 'Content of complaint or correction',//请输入您想投诉或纠错的内容
      addImg: 'Add Image',//添加图片
      addPhone: 'Email or mobile phone',//请输入联系方式(邮箱或手机)
      labelContact: 'Contact Us',//联系方式

    },
    loginContent: {
      login: 'Login',//登录
      member: 'Member',//会员
      loginTitle: 'Member Login',//会员登录
      loginNow: 'Sign in now',//立即登录
      quickRegister: 'Quick Registration',//快速注册
      register: 'Register',//注册
      lottery: 'Lottery',//彩票
      registerNow: 'Register',//立即注册
      retrievePassword: 'Retrieve password',//找回密码
      PLZenterUserName: 'Please enter the correct user name',//请输入用户名
      PLZenterPWD: 'Please enter the correct password',//请输入密码
      enterUserName: 'Username',//用户名
      enterPassword: 'Password',//请输入密码
      pleaseEnterVerificationCode: 'Verification code',//请输入验证码
      loginSuccessful: 'login successful',//登录成功
      emptyPassword: 'Password cannot be empty',//密码不能为空
      passwordRule: 'Please input the password, which is 6-16 in length and composed of number and letter',//请输入密码长度为6-16之间，由数字+字母组合
      differentPassword: 'The two new passwords are inconsistent',//两次新密码不一致
      loginAgain: 'Successfully modified,please login again',//修改成功,请重新登录
      noLogin: 'You haven\'t signed in yet',//您还没有登录
      loginTimeout: 'Timeout，Sign in again.',
    },
    registerContent: {
      accountNumber: 'Account number',//账号
      verificationCode: 'Verification code',//验证码
      invitationCode: 'Invitation code',
      pleaseConfirmYourPassword: 'Please confirm your password',//请确认密码
      pleaseEnterTheInvitationCode: 'Invitation code',//请输入邀请码
      accountAlreadyExists: 'Account already exists',//账号已存在
      alreadyHaveAnAccount: 'Already have an account',//已有账号
      signInNow: 'Sign in now',//立即登录
      agreedTreaties: 'Registration means that you have agreed to the opening treaties',//注册代表您已同意各项开启条约
      openAgreement: 'Account opening agreement',//开户协议
      shuRuGuiZe: 'The account number is composed of 6-10 letters, numbers or underscores',//账号由6-10位字母、数字或下划线组成
      pwdRule: 'The password consists of 6-12 letters and numbers or underscores, not pure numbers',//密码由6-12位字母和数字或下划线组成
      password: ['Password', 'Enter the password'],//'密码','请输入密码'
      confirmPassword: ['Confirm Password', 'Enter the password again', 'Inconsistent password input'],//'确认密码','请再次输入密码'.'密码输入不一致'
      Account: ['Account', 'Enter the account number'],//'账号','请输入账号'
      vCode: ['Code', 'Enter the code', 'Code cannot be empty'],//'验证码','请输入验证码','验证码不能为空'
      tips: ['login was successful,ready to sign in'],
      error_tips: ['login has failed'],
      fundPwd: ['Withdrawals password','Enter 4-digit withdrawal password'],

      realName: ['RealName','Enter your real name','The real name already exists'],
      emailInfo: ['Email','Enter email address'],
      phoneInfo: ['Mobile phone no.','Enter mobile phone number','The mobile number already exists'],
      phonePromotion: ['Mobile promotion code','Enter mobile promotional code'],
      qqNumber: ['QQ','Enter QQ id'],
      weChat: ['WeChat'],
      bornInfo: ['Birthday','Please choose birthday','Enter the verification code'],


      // accountNumber: 'Account number',//账号
      // password: 'Password',//密码
      // confirmPassword: 'Confirm password',//确认密码
      // verificationCode: 'Verification code',//验证码
      // invitationCode: 'Invitation code',
      // pleaseConfirmYourPassword: 'Please confirm your password',//请确认密码
      // pleaseEnterTheInvitationCode: 'Please enter the invitation code',//请输入邀请码
      // accountAlreadyExists: 'Account already exists',//账号已存在
      // alreadyHaveAnAccount: 'Already have an account',//已有账号
      // signInNow: 'Sign in now',//立即登录
      // agreedTreaties: 'Registration means that you have agreed to the opening treaties',//注册代表您已同意各项开启条约
      // openAgreement: 'Account opening agreement',//开户协议
      // shuRuGuiZe: 'Please enter a length between 6-16, a combination of numbers/letters/underscores',//'请输入长度为6-16之间，由数字/字母/下划线组合'
      // pwdRule: 'Password consists of 6-16 letters or numbers',//密码由6-16位字母或数字组成
      // Account: 'Account',//账号
    },
    withDraw: {
      tiXianTongGuo: 'After the withdrawal is approved, the withdrawal funds will arrive within 24 hours at the latest!',//提现通过后，提现资金最晚24小时内到账！
      mingRiTiKuna: 'The number of withdrawals today has been exceeded, please apply for withdrawal tomorrow!',//今日提现次数已超额，请明日再申请提款！
      damabuzu: 'The current coding amount is insufficient, please apply for withdrawal after the coding amount is sufficient',//当前打码量不足，请在打码量足够后再申请提款
      withdrawalInstructions: 'Withdrawal instructions',//提现说明
      pleaseEnterWithDrawAmount: 'Please enter the withdrawal amount（If you have any questions, please contact {onlineService})',//请输入提现金额（如有问题，请联系
      onlineService: 'Service',//在线客服
      WithdrawalAmount: 'Withdrawal amount',//提现金额
      WithdrawalPassword: 'Password',//提现密码
      endOf: 'End of',// 尾号
      debitCard: 'Debit card',// 储蓄卡
      wish: 'Congratulations, your withdrawal application has been submitted successfully',//恭喜您，您的提现申请已经提交成功
      wait: 'Queuing, waiting for customer service confirmation',//正在排队，等待客服确认
      succWith: 'Successful withdrawal',//提现成功
      succReq: 'The withdrawal is submitted successfully!',//提款提交成功！
      withDrawDetail: 'Withdrawal detail',
      withdrawalsRecord: 'Withdrawals record',//提现记录
      detailLabel: ['Order','Amount','Fee','Payment','State','Time','Remarks'],
      tips:['The fund password has been set, do you want to tie the card?'],
      errorCode: 'Verification code must be filled', //验证码不能为空
      errorAmount: 'The amount is entered invalid', //金额输入有误
      errorPassword: 'Password can not be blank', //密码不能为空
      errorMinimun: 'The single withdrawal amount shall not be less than {amount}', //单次提款金额不得少于
      loading: 'loading...', //数据提交中...
      serverBusy: 'Server is busy!',//服务器繁忙

    },
    recharge: {
      PaymentConfirmation: 'The recharge amount of some payment channels is randomly 1 decimal place, please confirm when making payment',//部分支付渠道充值金额随机1位小数，请在付款时确认
      PleaseSelectRechargeType: 'Please select recharge type',//请选择充值类型
      RechargeType: 'Recharge type',//充值类型
      attention: 'Attention',//注意
      companyIncome: 'Company income - online bank transfer',//公司入款-网银转账
      selectAccount: 'Select the collection account you want to transfer in, complete the transfer by yourself, and follow the steps on the page. The system will arrive in 3 minutes.',//选择您要转入的收款账户，自行完成转账后，按页面步骤操作，系统会在3分钟内到账。
      onlinePay: 'Online banking - online payment',//网银-在线支付
      paymentMethod: 'QQ Wallet / UnionPay Wallet / wechat / JD Wallet - code scanning payment, please follow the steps on the page to complete the operation. After the payment is successful, there is no need to go through customer service, and the system will automatically arrive at the account.',//QQ钱包/银联钱包/微信/京东钱包-扫码支付，请按页面步骤完成操作，支付成功后无需经过客服，系统自动到账。
      wallet: 'QQ Wallet / Jingdong Wallet',//QQ钱包/京东钱包
      onePayment: 'One click payment: at present, it only supports app version and mobile web version.',//一键支付：目前只支持app版与手机网页版。
      ifCallService: 'If you have any questions, please contact online customer service.',//如有问题，请联系在线客服。

    },
    setting: {
      Universal: 'Universal',//通用
      setting: 'Setting',//设置
      versionCheck: 'Version check',//版本检测
      currentVersion: 'Current version is ',//当前版本为
      aboutUs: 'About Us',//关于我们
      clearCache: 'Clear cache',//清除缓存
      dropOut: 'Log Out',//退出
      cacheCleared: 'Cache cleared',//缓存已清除
      IKnow: 'I know',//我知道了
    },
    bankPay: {
      rechargeType: 'Type',//充值类型
      bankTransfer: 'Bank Transfer',//银行转账
      inputMoney: 'Please input recharge amount',//请输入充值金额
      selectWay: 'Select the recharge method (if you have any questions, please contact ',//选择充值方式（如有问题，请联系
      onlineService: 'Online Service',//在线客服
      receivingBank: 'Bank',//收款银行
      receivingNumber: 'No.',//收款账号
      receivingName: 'Name',//收款人
      receivingBranch: 'Accounts Bank',//开户网点
      accountInfo: 'Collection account information',//收款账号信息
      depositorAccountInfo: 'Depositor account information',//存款人账号信息
      depositTime: 'Time',//存款时间
      depositMoney: 'Money',//存款金额
      depositName: 'Name',//存款人姓名
      paid: 'Paid',//我已支付
      enterDepositName: 'Depositor\'s name',//请输入存款人姓名
      enterRemark: 'Remark information',//请输入备注信息
      remark_check: ['Incorrect format of remarks！'],//备注信息格式不正确！
      selectBank: 'Select bank card',//请选择银行卡
      payMaintain: 'During maintenance, please use other payment methods to recharge',
      rechargeMethod: 'Recharge method',//充值方式
      rechargeExplain: 'Recharge explain',//充值说明
      firstStep: 'Congratulations, your recharge application has been ',//恭喜您，您的充值申请已提交成功
      success: 'submitted successfully',//提交成功
      rechargeMoney: 'Amount',//充值金额
      lineUp: 'Waiting for customer service to confirm',//正在排队，等待客服进行确认
      rechargeSuccess: 'Recharge success',//充值成功
      thirdStep: 'Recharge success after successful recharge, your balance will be updated within 3 minutes, please check later, if not updated in time, please',//充值成功充值成功后，您的余额将在3分钟内更新，请稍后查看，如若及时未能更新，请立即联系客服。
      havePaid: 'I have paid. I want the bill of lading',//已支付,我要提单
    },
    aliPay: {
      service: 'Online service',//联系客服
      selectWay: 'Select the recharge method (if you have any questions, please contact {service})',//选择充值方式（如有问题，请联系
      screenPay: 'Please take a screen shot and scan the code to pay',//请截屏扫码支付
      rechargeSteps: 'Recharge steps',//充值步骤
      keepPage: 'Save the screenshot of the page',//将该页面截图保存
      pressSame: 'Press at the same time',//同时按下
      powerKey: 'Power keyx',//Power key
      homeKey: 'Home key',//Home键
      screenshot: 'Screenshot',//可截图
      volumeDownKey: 'Volume down key',//音量减小键
      and: 'and',//和
      openAlipay: 'Open Alipay',//打开支付宝
      selectSweep: 'Select Alipay sweep function',//选择支付宝扫一扫功能
      clickScan: 'Click the album in the scan function to open and select the previously saved screenshot',//在扫一扫功能中点击相册，打开选择之前保存的截图
      inputAmount: 'Input recharge amount',//输入充值金额
      sameOrder: 'It should be consistent with the order amount',//需与订单金额一致
      addNote: 'Add notes',//添加备注
      returnApp: 'After successful payment, return to app and click',//付款成功后返回App点击
      havePaid: 'I have paid. I want the bill of lading',//已支付,我要提单
      minimumAmount: 'The minimum recharge amount is',//最小充值金额为
      maximumAmount: 'The maximum recharge amount is',//最大充值金额为
      submitOrder: 'Are you sure to submit the order?',//确定提交订单
      goPage: 'Go to the recharge page',//极速前往充值页面
    },
    wechat: {
      tips: ['recharge steps', '1,save the screenshot of the page', 'Iphone:press at the same time', 'power key', 'and', 'Home key', 'screenshot', 'Android:press at the same time', 'power key', 'and', 'volume down button', 'screenshot', '2,open wechat and switch to discovery', '3,select scan function', '4,click the album in the scan function to open and select the previously saved screenshot', '5.input recharge amount', 'It should be consistent with the order amount', '6,add notes：', 'kaka999', '7,after successful payment, return to app and click', 'Paid, I want bill of lading'],
    },
    RechargeData: {
      All: 'All',//全部
      Accepting: 'Accepting',//受理中
      noAccept: 'Not accepted',//未受理
      topUpSuccessfully: 'Successfully',//充值成功
      rechargeFailed: 'Failed',//充值失败
      topUpMode: 'Recharge mode',//充值模式
      paymentTypes: 'Payment type',//支付类型
      rechargeStatus: 'Top-up state',//充值状态
      rechargeAmount: 'Top-up amount',//充值金额
      discountedPrice: 'Discount amount',//优惠金额
      totalRechargeAmount: 'Total value',//充值总金额
      offerType: 'Preferential type',//优惠类型
      orderTime: 'Order time',//订单时间
      cancellationTime: 'Cancel the time',//取消时间
      depositTime: 'Time of payment',//入款时间
      orderNo: 'OrderNo',//订单号
      rechargeDetail: 'Recharge Details',//充值详情
      SupportedAmount: 'The recharge amount is a fixed amount and cannot be modified. Only the above recharge amount is supported. The amount is 100.00 ~ 99999.00',//充值金额为固定金额，不可进行修改额度，仅支持以上充值金额，额度100.00~99999.00
      giveBack: '账户总数余额将回归至',
      changeSuccess: 'Change Success',//转换成功
      inputMoney: 'Please input the amount',//请输入金额
      orderModel: ['Transfer and remittance', 'Online payment', 'Manual recharge', 'Manual recharge (abnormal income)'],
      rechargeType: ['No offer type'],//无优惠类型

    },
    totalData: {
      paidOut: 'Paid out',//已出款
      Cancelled: 'Cancelled',//已取消
      refuseToPay: 'Refuse to pay',//拒绝出款

    },
    BalanceChange: {
      ConversionAmount: 'Conversion amount',//转换额度
      ConversionRecord: 'Conversion record',//转换记录
      bettingRecord: 'Betting record',//投注记录
      platformTransferOut: 'Platform transfer out',//平台转出
      platformTransfer: 'Platform transfer',//平台转入
      ChooseOutPlatform: 'Choose transfer out platform',//选择转出平台
      ChoosePlatform: 'Choose transfer platform',//选择转入平台
      pleaseEnterAmount: 'Enter an integer amount',//请输入整数金额
      confirmConversion: 'Confirm conversion',//确定转换
      oneClickTotal: 'One-click total',//一键归户总额
      returnToPlatform: 'The total account balance will return to the 1516 lottery platform',//账户总数余额将回归至1516彩票平台
      noRecords: 'No records',//暂无记录
      changeDetails: 'Change Details',// 转换详情
      autoChange:['Automatic quota'],
      tips:['transfer out','transfer in','Insufficient balance'],
      refresh: 'One-click refresh'
    },
    myCoupon: {
      Unused: 'Unused',//未使用
      Used: 'Used',//已使用
      Expired: 'Expired',//已过期
      No: 'No',//暂无
      coupon: 'coupon',//优惠券
    },
    SecurityCenter: {
      myBankCard: 'My bank card',//我的银行卡
      loginPassword: 'Login password',//登录密码
      fundPassword: 'Set fund password',//资金密码
      confirmPassword: 'Confirm password',//确认密码
      oldPwd: 'Old password',//原密码
      unboundCard: 'Unbound bank card',//未绑定银行卡
    },
    surplusFund: {
      title: 'Surplus Fund',// 余额生金
      yesterdayEarnings: 'Yesterday Earnings',//昨日收益
      totalAmout: 'Total amount of withdrawal',//可提现总金额
      income: 'Accumulated income',//累计收益
      minAmout: 'Minimum amount',//最小金额
      maxAmout: 'Maximum amount',//最大金额
      dailyReturn: 'Daily return',//日收益率
      annualIncome: 'Estimated annual income of 10000 shares',//预计万份年收益
      monthlyIncome: 'Estimated monthly income of 10000 shares',//预计万份月收益
      detailTitle: 'Income Details',//收益明细
    },
    changePassword: {
      changePassword: 'Change password',//修改登录密码
      oldPassword: 'Old password',//旧密码
      enterNewPwd: 'New password',//输入新密码
      confirmNewPassword: 'Confirm password',//确认新密码
      passwordRules: 'Password rules',//密码规则
      miMaGuiZe: 'The password consists of 6-12 letters and numbers or underscores, not pure numbers',//密码由6-12位字母和数字或下划线组成
      oldPwdRule: 'The old password format is incorrect',//旧密码格式不正确
    },
    setFundsPassword: {
      originalPassword: 'Original password'//原始密码
    },
    myBankInfo: {
      title: 'Binding Bank Card',//绑定银行卡
      cardholder: 'Cardholder',//持卡人
      bankName: 'Bank name',//银行名字
      bankCardNumber: 'Account Number',//银行卡号
      accountOpeningAddress: 'Account opening address',//开户地址
      UpdateTime: 'Update time',//更新时间
      selectBank: 'Please select bank',//请选择银行
      inputBranch: 'Address of the account bank',//请输入开户支行地址
      cardRule: 'Please input 16-19 digit card number',//请输入16-19位卡号
      noModification: 'It cannot be modified after binding',//绑定后不可修改
      inputPeopleName: 'Cardholder\'s name',//请输入持卡人姓名
      inputBankName: 'Please select bank name',//请选择银行名称
      inputBankNo: 'Please input bank card number',//请输入银行卡号
      inputBranchInfo: 'Please fill in the branch information',//请填写支行信息
      cardNoRule: 'The length of bank card number must be 16-19 digits',//银行卡号长度必须为16-20位
      info: 'Up to 5 bank cards can be bound with withdrawal',
      tipsTitle: 'Tips',
      tipsContent: 'If you need to modify or delete your bank card, please contact {service}',
      service: 'online customer service',
      addBankCard: ['Add a bank card','Add a bank card'],
      bank_tips:['Please add your bank card information before making a withdrawal, thank you'],
    },

    lotteryNote: {
      detailTitle: 'Order Details',//订单详情
      di: 'The',//第
      issueText: 'Issue',//期
      abnormalOrder: 'Abnormal order',//异常订单
      winning: 'Winning the prize',//中奖
      noWin: 'No win, keep up',//没有中奖,再接再厉
      rescinded: 'The note has been withdrawn',//该注单已撤销

      lotteryNumber: 'No',//开奖号码
      betNumber: 'Bet No',//投注号码
      orderNo: 'Order No',//注单单号
      betTime: 'Bet Time',//投注时间
      playName: 'Play name',//玩法名称
      betMoney: 'Bet Amount',//投注金额
      betRebate: 'Betting Rebate',//投注返点
      betOdds: 'Bet Odds',//投注赔率
      revoke: 'Revoke',//撤销
      moreShot: 'One more shot',//再来一注
      ifRevoke: 'Are you sure you want to cancel the note?',//确定撤销该注单
      CancellationSuccessful: 'Order cancelled successfully',//撤单成功
      cancelOrder: 'Cancel order',//撤销订单
      allBets: 'All orders',//全部订单
      hasWon: 'Has won',//已中奖
      noDraw: 'No draw',//未开奖

      orderCancelled: 'Cancelled',//已撤单
      bets: 'bets',//投注


    },
    DatePicker: {
      chooseTimePeriod: 'Choose time period',//选择时间段
      yesterday: 'Yesterday',//昨天
      nearlyWeek: 'Nearly a week',//近一周
      nearlyMonth: 'Nearly one month',//近一月
      ymd:['Year','Month','Day'],//'年','月','日'
    },
    HelpCenter: {
      rulesOfPlay: 'Rules of lotteryNew',//玩法规则
      introduceLottery: 'Introduce of lottery',//彩种介绍
      detailedSettings: 'Detailed settings',//详细设定
      Feedback: 'Feedback',//反馈
      customerFeedback: 'Customer feedback',//用户反馈
      numLottery: 'No. Lottery',
      sportLottery: 'Sport Lottery',
      openingTime: 'Opening Time',//开奖时间
      playIntroduce: 'Play Introduce',//玩法介绍
    },
    NoteHistory: {
      data: 'Data',//日期
      betAmount: 'Bet amount',//下注金额
      AmountWinningLosing: 'Winning and losing amount',//输赢金额
    },
    LotteryPicker: {
      customFilter: 'Custom filter',//自定义筛选
      Reset: 'Reset',//重置
      lotteryType: 'Lottery type',//彩种
      chooseLottery: 'Choose lottery',//选择彩种
    },
    auditDetails: {
      PreferentialDeduction: 'Preferential review + regular review total deduction',//优惠审核 + 常态性审核 共需扣除
      theWithdrawalTime: 'The withdrawal time is',//此次出款时间为
      sinceTotalValidBet: 'Since the first deposit after withdrawal, the total valid bet',//自出款后第一次存款开始之后，总有效投注
      allValidBets: 'All valid bets',//既所有有效投注额
      Withdrawable: 'Withdrawable',//可提款
      noWithdrawal: 'No withdrawal',//不可提款
      deposit: 'Deposit',//存款
      Discount: 'Discount',//优惠
      withdrawalVolume: 'Withdrawal must reach',//提款需达投注量
      betAmountReached: 'Bet amount reached',//已达投注量
      Start: 'Start',//起始
      End: 'End',//结束
      status: 'Status',//状态
    },
    CouponExplain: {
      ObtainingCoupons: 'Obtaining coupons',//优惠券的获取
      huodong: 'Obtained through activities, sign-in, customer service compensation, etc. (automatically added by the system, no exchange required);',//通过活动、签到、客服补偿等获得(系统自动添加, 无需兑换);
      couponUse: 'Coupon use',//优惠券使用
      meizhanag: 'Each voucher can only be used once, no change, no refund, no cash exchange, no cash withdrawal, and can only be used on this platform;',//每张抵用券仅能使用一次，不找零，不退换，不兑换现金，不可提现，只限在本平台使用；
      chongzhi: 'Coupon recharge voucher is the face value of the gift voucher, and bet ticket voucher is the face value of the discount voucher;',//充值使用劵为赠送劵面值金额，注单使用劵为减免劵面值金额；
      zhudan: 'The bet amount must be greater than the face value of the coupon when using the no-threshold coupon for coupon betting or recharge.',//注单或充值使用无门槛劵时投注金额必须大于劵面值金额即可用
      danbi: 'Only one coupon can be used for a single order, and multiple coupons cannot be used at the same time. After the coupon is used, the difference will not be changed or returned;',//单笔订单只能使用1张优惠券, 不支持同时使用多张, 用券后差额不找零, 不退回；
      baokuo: 'Coupons and coupons (including new user coupons) cannot be deducted from others, and can only be deducted according to the point of use of the coupon. Coupons cannot be used for special colors, which are different from other discounts;',//优惠券 (包括新用户券) 不能抵扣其他, 只能根据券的使用节点抵扣金额。特殊彩种不可使用优惠券, 与其他优惠不同享；
      meizhanger: 'Please refer to the usage instructions of the corresponding coupon for the use conditions of each coupon;',//每张优惠券的使用条件请查看对应优惠券的使用说明；
      qingzai: 'Please use the coupons within the validity period. Unused coupons will be automatically invalid after expiration;',//请在有效期内使用优惠券, 未使用的优惠券过期后, 将自动作废；
      touzhuhuo: 'During the coupon betting or recharge process, the system automatically displays the available coupons, just select and confirm the bet or recharge;',//投注或充值过程中，系统自动显示可使用优惠券，只需选择并确认投注或充值即可；
      shixiao: 'Coupon coupon invalid',//优惠券失效
      shiyongshijian: 'Coupon coupons expire after the expiration time,,',//优惠券使用时间到期后失效,
      dingdan: 'For orders that use coupons, if they have been used, the coupons will not be returned, and will not be returned after the order is cancelled;',//使用优惠券的订单, 若已使用, 优惠券均不退回, 取消订单后不返还；
      yanjing: 'Coupons are strictly prohibited from being sold or transferred. If found and verified, the coupons will be invalidated;',//优惠券严禁出售或转让, 如经发现并证实的, 该券将予以失效处理；
      shuadan: 'Coupons have been swiped or violated. Once discovered and confirmed, the coupons will be invalidated;',//优惠券存在刷单，违规行为，经发现并证实，优惠券予以失效处理；
      ruxu: 'For more information, please contact online customer service',//如需了解更多, 请联系在线客服
    },
    Customerserve: {
      fullDayServe: '24-hour hotline service',//24小时热线服务
      advisory: 'Advisory',//咨询
      QQCustomerService: 'QQ customer service',//QQ客服
      copy: 'Copy',//复制
      weChatCustomerService: 'WeChat Customer Service',//微信客服
      copySuccessfully: 'Copy successfully',//复制成功
    },
    AboutUs: {
      abusOne: '1516 Lottery Asia Edition is a legally registered gaming company in the British Virgin Islands and holds a sports betting and online casino license issued by the Philippine government\'s Cagayan Special Economic Zone First Cagayan Leisure and Resort Corporation and is supervised by it. A strong presence in the Asian market, a management team with many years of industry experience and a strong background. Please look for the only official website of the 1516 lottery Asian version: 1516.com',//1516彩票亚洲版是英属维京群岛合法注册的博彩公司并持有菲律宾政府卡格扬经济特区 First Cagayan leisure and Resort Corporation颁发的体育博彩与线上赌场执照并受其监督。强势入驻亚洲市场，拥有多年业界经验的管理团队及雄厚的实力背景。请认准1516彩票亚洲版本的唯一官方网址：1516.com
      abusTwo: '1516 Lottery is the first professional sports lottery online investment legal institution in Asia. It is committed to creating a convenient, fast and stable one-stop lottery platform for users. It is a pioneer in the field of 1516 lottery Internet sports lottery sales!',//1516彩票是亚洲首家专业体彩网投合法机构，致力于为用户打造方便快捷、稳定的一站式购彩平台，1516彩票互联网体彩销售领域先驱者！
      abusThree: '1516 lottery provides mobile APP downloads, combined with PC and WAP terminals, breaking the constraints of space and time, 24 hours a day, you can experience the fun of buying lottery anytime, anywhere!',//1516彩票提供手机APP下载、结合PC端及WAP端，突破空间与时间的束缚，全天24小时可方便快捷、随时随地体验购彩的乐趣！
      abusFour: 'Our companys online betting is absolutely safe. Your account and login details are unique to you, ensuring that no one except you can use your account. Clients’ funds and personal data are the company’s primary consideration. The company adopts the most high-end encryption technology and a serious security management system to ensure that the safety of customers is the most complete protection. All customer transactions are carried out under extremely strict conditions. ! You can rest assured to lotteryNew in our company.',//我们公司的网上投注是绝对安全的。您的账号和登入详细资料都是您独有的，可以确保除 您之外任何人都不能使用您的账号。客户的资金及个人资料是公司的首要考虑因素，公司采用最高端的加密技术和严肃的安全管理体系，确保客户安全得到最完善的保障，客户的所有交易活动都是在极其严密的情况下进行的！您可以放心在我们公司游戏。
      abusFive: 'Before joining our game, please make sure you are over 18 years old;',//在加入我们的游戏之前，请您确定您已年满18周岁；
      abusSix: 'Each user can only have a corresponding unique account. If we find any user has fraudulent behavior or unconventional betting methods, we will immediately close and cancel the account, and have the right to freeze the account profit and betting principal.',//每一个用户只能拥有相对应的唯一的账户。如果我们发现任何用户有欺诈行为或非常规的投注方式，我们将立即关闭及取消账户，并且有权利冻结账户盈利以及投注本金。
      abusSeven: 'Any user under the age of 18, opening an account in 1516 lottery will be frozen and cancelled. Gambling is just a form of entertainment and pastime. It strongly reminds you not to be overly addicted to games that will negatively affect your economy, career, family and society. We strongly recommend that all customers face gambling behavior correctly and have a correct gaming mentality. In order to protect the interests of customers, we provide account self-freezing and maximum betting amount limitation functions. Once customers apply for an account, they can be frozen or limit the betting amount.',//任何未年满18岁的用户，在1516彩票开户都将被冻结并注销账户。博彩只是一种娱乐消遣的方式，强烈提醒您不要过度沉迷于游戏以至于对其经济，事业，家庭和社会产生负面影响。我们强烈建议所有客户正确面对博彩行为以及拥有一个正确的游戏心态。为保障客户利益，我们提供账户自我冻结、最高投注金额限制功能，客户一旦申请账户可以被冻结或者限制投注金额。
      abusEight: 'If you have any questions, please feel free to visit our online customer service. We will have online customer service to answer your questions patiently. Thank you!',//如果您还有任何的疑问随时欢迎访问我们的线上客服，我们将有在线客服耐心回答您的问题。谢谢！
    },
    tryItForFree: {
      shiWanShiJian: 'The trial account is only for players to familiarize themselves with the game. Recharge and withdrawal are not allowed, and do not enjoy the right to participate in preferential activities. The valid time is',//试玩账号只供玩家熟悉游戏。不允许充值和提款，且不享有参加优惠活动的权利，有效时间为
      qrHours: '72 hours',//72小时
      temporarily: 'Not playing temporarily',//暂时不玩
      GoTry: 'Go try',//去试玩
      pleaseLogFirst: 'Sign in now',//立即登录
    },
    Promotions: {
      ActivityTime: 'Activity time',//活动时间
      seeDetails: 'View details',//查看详情
    },
    findPwd: {
      forgetPassword: 'forget password',//忘记密码
      zhaoHuiMiMa: 'Please enter your account number and withdrawal password correctly to make sure to retrieve the password!',//请正确输入您的账号及取款密码，确保找回密码！
      memberAccount: 'member account',//会员账号
      enterMemberAccount: 'Please enter member account',//请输入会员账号
      withdrawalsPassword: 'Withdrawals password',//取款密码
      enterWithdrawalsPassword: 'Withdrawal password',//请输入取款密码
    },
    NoteHistoryDel: {
      historyRecord: 'history record',//历史记录
    },
    Popup: {
      ChooseTransactionType: 'Choose transaction type',//选择交易类型
    },
    AccountDetail: {
      fundTransfer: 'Fund transfer',//转账充值
      onlinePayment: 'Online payment',//线上支付
      lotteryBetting: 'Lottery betting',//彩票下注
      lotteryPayouts: 'Lottery payouts',//彩票派彩
      userWithdrawal: 'User withdrawal',//用户提款
      cancellationRebate: 'Cancellation rebate',//撤单返款
      withdrawalFailed: 'Withdrawal failed',//提款失败
      commissionRebate: 'Commission rebate (dividends)',//退佣(分红)
      backgroundTransfer: 'Background transfer',//后台转入
      backgroundTransferOut: 'Background transfer out',//后台转出
      //Register注册送彩
      agentRebate: 'Agent rebate',//代理返点
      manualDeposit: 'Manual deposit',//人工存入
      giveRebate: 'Give rebate',//给予返水
      activityOffers: 'Activity Offers',//活动优惠
      rebateNumber: 'Rebate number',//追号返款
      systemReward: 'System reward',//系统奖励
      agentDailySalary: 'Agent daily salary',//代理日工资
      agencySupport: 'Agency support',//代理扶持
      otherRecharge: 'Other recharge',//其他充值
      playAndRebate: 'Play and rebate',//打和返款
      writeRebate: 'Write-off rebate',//冲销返水
      manuallyProposed: 'Manually proposed',//人工提出
      numberDeduction: 'Number deduction',//追号扣款
      discountDeduction: 'Discount deduction',//优惠扣除
      otherDeductions: 'Other deductions',//其他扣除
      reversalAward: 'Reversal Award',//冲销派奖
      transferIn: 'Transfer in',//额度转入
      transferOut: 'Transfer out',//额度转出
      sportsBetting: 'Sports betting',//体育下注
      sportsSettlement: 'Sports settlement',//体育结算
      refundRegulations: 'Refund of principal in violation regulations',//违规退还本金
      reSettlement: 'Re-settlement',//重新结算
      cancelOrder: 'cancel order',//取消订单
      realRebate: 'Real rebate',//真人返点
      rebateRebate: 'Rebate Rebate',//真人返点回收
      transactionType: 'Type',//交易类型
      orderNum: 'OrderNo',//订单号
      issueNum: 'Number',//期号
      money: 'Amount',//涉及金额
      dealTime: 'Time',//交易时间
      remarks: 'Remarks',//备注
      changeMoney: 'Change Money',//转换金额
    },
    ExplainWithDraw: {
      Reminder: 'Reminder',//温馨提示
      queRenTiKuanYiZhi: 'Confirm the correctness of the bank information submitted during withdrawal. It must be ensured that the bank card user name is consistent with the user’s real name submitted during registration.',//确认提款时提交的银行信息的正确性。必须保证银行卡用户名与注册时提交的用户真实姓名一致。
      danBiTiKuan: 'The minimum amount for a single withdrawal is',//单笔提款金额最低金额为
      ziJinAnQuan: 'To ensure the safety of account funds, member withdrawals are limited to',//为保证账户资金安全，会员提款每天限
      ciShu: 'time per day',//次数
      meiRiJinE: 'Daily limit of',//每日限制金额
      maximumLimit: 'Maximum limit',//最高限制
      meiRiShouXuFei: 'The handling fee is waived 3 times a day, and the handling fee will be deducted for more than 3 times. According to:',//每日免手续费3次，超出3次需扣除手续费按
      shiRenMinBi: 'RMB per transaction',//RMB收取。
      shiFouManZuDaMa: 'Whether it meets the requirements of cash withdrawal and coding, please check the audit details',//是否满足提现打码，请查询稽核详情
      dangQianDingDan: 'There are currently',//当前存在订单共
      bi: 'withdrawal orders',//笔
      shangShu24XiaoShi: 'Note: The above daily refers to "within 24 hours"',//注意：上述的每日是指在「24小時内」
      tiKuan: 'withdrawal Amount',//提款金额
      calc: 'count',//计算
    },
    BonusInfo: {
      fiveStars: 'Five stars',//五星
      fanDianBFB: 'Rebate13.00%',//返点13.00%
      fuShi: 'Duplex',//复试
      peiLvOne: 'Odds98000.000',//赔率
      danShi: 'Single',//单式
      zuHe: 'combination',//组合
      zuXuanYEL: 'Group selection120',//组选120
      YRLpeiLV: 'Odds816.666',//赔率816.666
      zuXuanLS: 'Group selection60',//组选60
      LSpeiLV: 'Odds1633.333',//赔率1633.333
      plJBL: 'Odds98000.000,9800.000,980.000,98.000,9.800',//    plJBL:'赔率98000.000,9800.000,980.000,98.000,9.800'
    },
    ChangeBalance: {
      mainPlatformBalance: 'Main platform balance',//主平台余额
    },
    daiLiZhongXin: {
      agencyCenter: 'Agency Center',//代理中心
      agentDescription: 'Agent description',//代理说明
      teamOverview: 'Team overview',//团队总览
      userList: 'User list',//用户列表
      registrationManagement: 'Registration management',//注册管理
      promotionRegistration: 'Promotion registration',//推广注册
      UserName: 'User name',//用户名
      lotteryRebates: 'Lottery rebates',//彩票返点
      accountBalance: 'Account balance',//账号余额
      teamSize: 'Team size',//团队人数
      teamBalance: 'Team balance',//团队总余额
      yesterdaysCommission: 'Yesterday\'s commission',//昨日佣金
      cumulativeCommission: 'Cumulative commission',//累计佣金
      rule: ['The promotion code consists of 3-10 letters or numbers'],//推广码由3-10位字母或数字组成
      type: ['Proxy', 'Member'],
    },
    teamOverview: {
      totalNumberTeam: 'Total number of team',//团队总人数
      numberRegisteredPeople: 'Number of registered people',//范围时间内注册人数
      numberTopUps: 'Number of top-ups',//充值人数
      numberFirstCharge: 'Number of first charge',//首充人数
      netProfit: 'Net profit',//净利润
      netPrefitIs: 'Net profit = game win or loss + discount + agent total',//净利润=游戏输赢+优惠+代理总计
      depositAndWithdrawal: 'Deposit and withdrawal',//充值提现
      rechargeOffer: 'Recharge offer',//充值优惠
      otherOffers: 'Other offers',//其他优惠
      betAmount: 'Bet amount',//投注金额
      rebateAmount: 'Rebate amount',//返点金额
      agentTotal: 'Agent total',//代理总计
      agencyDividend: 'Agency dividend',//代理分红
    },
    UserList: {
      PLZenterUserName: 'Please enter the correct user name',//请输入用户名
      UserName: 'User Name',
      userType: 'User Type',//用户类型
      registrationTime: 'Registration time',//注册时间
      onlineStatus: 'Online status',//在线状态
      lastLoginTime: 'last login time',//最后登录时间
      rebateLevel: 'Rebate level',//返利级别
      status: 'status',//状态
      Pending: 'Pending',//待审核
      Enable: 'Enable',//启用
      Deactivate: 'Deactivate',//停用
      proxy: 'Proxy',//代理
      trialMember: 'Trial member',//试玩会员
      Online: 'Online',//在线
      Offline: 'Offline',//离线
      member: 'Member',
    },
    EnrollmentManagement: {
      accountType: ['Type', 'Member', 'Agent'],
      userNickname: ['Nickname', 'Enter user nickname', 'The nickname consists of 2-15 Chinese characters, letters or numbers'],
      loginAccount: ['Login Account', 'Enter the login account number', 'The account number starts with a letter and consists of 5-30 letters, numbers or underscores'],
      actualName: ['Real name', 'Enter your real name', 'The real name is 2-15 Chinese characters or numbers'],
      memberPhone: ['Member phone', 'Enter the member phone number', 'The phone number is 11 digits'],
      userPwd: ['Login password', 'Enter the password', 'The password consists of 6-12 letters, numbers or underscores'],//密码由6-12位字母、数字或下划线组成
      confirmPwd: ['Confirm password', 'Enter the password again', 'The two passwords are inconsistent'],
      bonusSettings: 'Bonus setting',//奖金设置
      openAccountNow: 'Open an account now',//立即开户
      accountAlready: 'Account already exists, please re-enter',//账号已存在请重新输入
      realName: 'The real name already exists, please re-enter!',//真实姓名已存在请重新输入!
      dianHuaYiCunZai: 'The phone already exists, please re-enter!',//电话已存在请重新输入！
      xinZengChengGong: 'added successfully!',//新增成功！
      messageThree: 'The real name is 2-15 Chinese characters or numbers',//真实姓名为2-15位汉字或数字
      thePhoneDigits: 'The phone is 11 digits',//电话为11位数字
      enterPwdAgine: 'Enter the password again',//再次输入密码
      user: 'user',//用户
    },
    promotionRegistration: {
      addPromotion: 'Add Promotion',//新增推广
      promotionChannelConnection: 'Promotion channel link',//推广渠道连接
      promotionCode: 'Promotion code',//推广码
      promotionPage: 'Promotion page',//推广页面
      promotionGoal: 'Promotion goal',//推广目标
      bonus: 'Bonus',//奖金
      bonusSetting: 'Bonu Setting',//奖金设置
      Views: 'Views',//访问量
      registeredNumber: 'Registered number',//注册人数
      releaseTime: 'release time',//发布时间
      operating: 'operating',//操作
      newPromotionCode: 'New promotion code',//新增推广码
      edit: 'edit',//编辑
      Details: 'Details',//详情
      QRcode: 'QR code',//二维码
      kaiShiShiJian: 'The start time cannot be greater than the end time',//开始时间不能大于结束时间
      webConnection: 'Web Link',//网页链接
      wechatConnection: 'Wechat Link',//微信链接
    },
    index: {
      popularLottery: 'Popular lottery',//热门彩票
      boardGame: 'Board game',//棋牌游戏
      liveVideo: 'Live video',//真人视讯
      electronicGames: 'Electronic games',//电子游戏
      sportsGames: 'SportsGames', // 体育游戏
      dengLuHou: 'Please log in to recharge',//请登入后再进行充值操作
      dengLuJinRu: 'Please log in before entering the game',//请登入后再进入游戏
      depositRecharge: 'Recharge',//存款充值
      xiZhong: 'win',//喜中
      reMenQiPai: 'Popular chess',//热门棋牌
      zuiXinZhongJiangBang: 'The latest winning list',//最新中奖榜
      moreGames: 'More games',//更多游戏
      quGames: 'All lottery',// 查看全部彩票
    },
    NoticeList: {
      announcement: 'Announcement',//公告
    },
    reg: {
      preface: 'Preface',//导言
      huanYingShiYong: 'Welcome to use 1516 lottery platform services provided by 1516 lottery!',//欢迎您使用1516彩票提供的1516彩票平台服务！
      benXieYiShiNinYu: 'This agreement is an agreement between you and 1516 Lottery Company regarding your use of 1516 Lottery Platform Services. To use 1516 Lottery Platform services, you should read and abide by the "1516 Lottery Account Opening Agreement" and other rules. Please read carefully and fully understand the content of each clause, especially the clauses for exemption or limitation of liability, and the separate agreement for opening or using a certain service, and choose to accept or not. Unless you have read and accepted all the terms of this agreement, you have no right to use 1516 lottery platform services. Your download, installation, use, login and other actions are deemed to have read and agreed to the constraints of this agreement. You guarantee that you are at least 18 years old when you use this service and have full capacity for civil conduct.',//本协议是您与1516彩票公司之间关于您使用1516彩票平台服务所订立的协议，为使用1516彩票平台服务，您应当阅读并遵守《1516彩票开户协议》等规则。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。除非您已阅读并接受本协议所有条款，否则您无权使用1516彩票平台服务。您的下载、安装、使用、登录等行为即视为您已阅读并同意本协议的约束。您保证您在使用本服务时已满18周岁，且具有完全的民事行为能力。
      xiangGuanDingYi: 'Related definitions',//相关定义
      zhiZaiYWYL: 'Refers to registered members who have registered in the 1516 lottery and are recognized by the 1516 lottery and are eligible to enjoy the 1516 lottery service.',//指在1516彩票注册登记，并得到1516彩票在认可，有资格享受1516彩票服务的注册会员。
      gouCai: 'Buy lottery',//购彩
      zhiZhuCeDeYongHu: 'It means that registered users can purchase lottery tickets on this site and have full bonus rights to the purchased lottery tickets.',//指注册的用户可在本站购买彩票，并且对所购买的彩票拥有完整的奖金获得权利。
      yongHuZiLiao: 'user information',//用户资料
      zhiYongHuTiGong: 'Refers to the personal information provided by the user during registration, including: user name, registered account password, bank card account number, user\'s real name, etc.',//指用户在注册时提供的个人信息，包括：用户名、注册帐户密码、银行卡帐号、用户真实姓名等。
      xieYiFuWuFanWei: 'Service scope of this agreement',//本协议服务范围
      tiGongGouCaiPingTai: 'Provide lottery platform',//提供购彩平台
      tiGongCaiPiaoXiangGuan: 'Provide lottery related information',//提供彩票相关资讯
      caiPiaoXinXiJiaoHu: 'Provide lottery information interaction platform',//提供彩票信息交互平台
      zaiXianYuFuZhiFu: 'Provide online prepaid payment settlement services.',//提供在线预付支付结算服务。
      wangLuoHeTongXin: 'The service scope of this agreement does not include the provision of computer terminals and their auxiliary equipment, network and communication resources to registered members',//本协议服务范围不包括向注册会员提供电脑终端及其附属设备、网络和通信等资源
      yongHuQuanLi: 'User rights',//用户权力
      zhangHuGuanLiQuan: 'Account management rights',//帐户管理权
      yongHuXiuGai: 'The user has the right to query user information at any time, and can modify information other than the user name and the user\'s real name.',//用户有权随时查询用户资料，并可对用户名、用户真实姓名以外的信息进行修改。
      mianFeiShiYongQuan: 'Free access',//免费使用权
      caiPiaoZiXun: 'Users have the right to use the 1516 lottery lottery betting system and get lottery information for free.',//用户有权免费使用1516彩票的彩票投注系统以及免费获得彩票资讯。
      caiPiaoChaXun: 'Lottery inquiry rights, network and communication resources',//彩票查询权、网络和通信等资源
      youQuanMianFei: 'After the user successfully purchases the lottery through the 1516 lottery, he has the right to check the status of the purchased lottery in the 1516 lottery for free.',//用户通过1516彩票购彩成功后，有权免费在1516彩票查询所购买的彩票的状态。
      jiangJinHuoDeQuan: 'Right to bonus',//奖金获得权
      ruoCaiPiaoZhongJiang: 'If a user succeeds in buying a lottery through the 1516 lottery, if the lottery wins, the user is entitled to the corresponding bonus.',//用户通过1516彩票购彩成功的，若彩票中奖，用户有权获得相应奖金。
      zhangHuHeChaQuan: 'Account verification rights',//帐户核查权
      yuEHeCha: 'Users can check the account balance at any time',//用户可以随时对帐户进行资金余额核查


      shenQingTiKuanQuan: 'Apply for withdrawal rights',//申请提款权
      keFuChuLi: 'Users can apply for withdrawal of their own balance at any time. 1516 lottery lottery will transfer the money that needs to be withdrawn from the user\'s prepayment to the user within 3 working days after checking the user\'s fund source. Registered bank account. The bank charges incurred by the user withdrawing and transferring funds shall be borne by the user. When the user\'s balance is less than the bank fee required for the transfer, please contact customer service in time',//用户在任何时间都可对自己的余额申请提款，1516彩票彩 票在核对用户资金来源正常的情况下，在收到提款请 求3个工作日内将用户预付款中需提取的款项转帐到 用户注册的银行账户上。用户提款转帐所产生的银行 费用由用户承担。 当用户余额小于转帐所需的银行费 用时，请及时联系客服处理
      yongHuYiWu: 'User obligations',//用户义务
      quanMianZunShou: 'Obligations to fully comply with this agreement',//全面遵守本协议的义务
      zunShouXieYi: 'Before registering as a 1516 lottery user, you must carefully read and understand the terms of this agreement. Once the registration is successful, you will be deemed to agree to all the terms of this agreement, and the user is obliged to fully abide by this agreement.',//在注册登记成为1516彩票用户之前，须认真阅读、理解本协议各条款，一经注册成功即视为同意本协议全部条款，用户有义务全面遵守本协议。
      ruShiTiGong: 'Obligation to provide user information truthfully',//如实提供用户资料义务
      weiBaoZhang: 'In order to protect the legitimate rights and interests of users and avoid the inconsistency of user registration information with the real situation when the prize is won, users are requested to provide user information in accordance with the principles of truthfulness, comprehensiveness and accuracy. The user shall be fully responsible for the failure to redeem or withdraw money due to untrue, incomplete, or inaccurate user information. The user shall be responsible for the bank charges in applying for withdrawal to the user\'s bank card.',//为保障用户的合法权益，避免在中奖时出现用户注册资料与真实情况不符导致兑奖不能等情况，请用户按照真实、全面、准确的原则提供用户资料。因用户资料不真实、不全面、不准确造成不能兑奖、不能提款等情况，由用户承担全部责任。在申请提款至用户银行卡的银行费用由用户承担。
      duiYingZhuCe: 'Corresponding registration obligations',//对应注册义务
      yongHuChengDan: 'After the user successfully purchases the lottery through the 1516 lottery, any form of repeated registration and multiple malicious registrations are strictly prohibited, and all consequences caused by this shall be borne by the user. At the same time, in order to ensure the security of users, users should correspond to a user\'s real name with a bank card account number. The user shall bear the adverse consequences caused by the failure of one-to-one correspondence between the bank card account number and the user\'s real name.',//用户通过1516彩票购彩成功后，严禁任何形式的重复注册及多次恶意注册，因此而造成的一切后果，由用户自行承担。同时，为保证用户的安全性，用户应以一个银行卡帐号对应一个用户真实姓名名，因银行卡帐号与用户真实姓名不能一一对应而产生的不利后果，由用户自行承担。
      yongHuMingYiWu: 'Obligation to keep username',//保持用户名义务
      buDeGengGai: 'In order to protect the security of user accounts, the user name, user real name, and bank card number cannot be changed once they have been registered and confirmed.',//为保护用户帐户的安全性，用户名、用户真实姓名、银行卡号一经注册确认后，不得再行更改。
      baoHuZiLiao: 'Obligation to protect account data',//保护帐户资料义务
      faLvZeRen: 'User account information includes user password, personal account number, and information required for user account operations. Users must keep their account information confidential to avoid account information being stolen or tampered with. Any loss and legal responsibility caused to the user due to the misuse or tampering of the account information caused by the user\'s poor protection shall be borne by the user.',//用户帐户资料包括用户密码、个人帐号以及用户帐 号操作所需的资料。用户务必对其帐户资料自行保密，以免帐号资料被盗用或篡改。因用户保护不周导致帐户资料被盗用或篡改而给用户造成的任何损失及法律责任由用户自行承担。
      zunShouWangLuoGuanLi: 'Observe the obligations of cybersecurity management',//遵守网络安全管理的义务
      yiWu: 'Users are not allowed to use the 1516 lottery to produce, copy and disseminate the following information:',//用户不得利用1516彩票制作,复制和传播下列信息：
      yiWuOne: '1. Inciting resistance or undermining the implementation of the Constitution, laws and administrative regulations.',//一、煽动抗拒、破坏宪法和法律、行政法规实施的.
      yiWuTwo: '2. Inciting to subvert state power and overthrow the socialist system.',//二、煽动颠覆国家政权,推翻社会主义制度的.
      yiWuThree: '3. Inciting division of the country and undermining national unity.',//三、煽动分裂国家、破坏国家统一的.
      yiWuFour: '4. Inciting ethnic hatred, ethnic discrimination, and undermining ethnic unity.',//四、煽动民族仇恨、民族歧视，破坏民族团结的.
      yiWuFive: '5. Fabricating or distorting facts, spreading rumors, and disrupting social order.',//五、捏造或者歪曲事实,散布谣言,扰乱社会秩序的.
      yiWuSix: '6. Propagating superstition, obscenity, pornography, gambling, violence, murder, terror, and abetting crime.',//六、宣扬迷信、淫秽、色情、赌博、暴力、凶杀、恐 怖、教唆犯罪的.
      yiWuSeven: '7. Openly insulting others or fabricating facts to slander others, or carrying out other malicious attacks.',//七、公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的.
      yiWuEight: '8. Damage to the credibility of state agencies.',//八、损害国家机关信誉的.
      yiWuNine: '9. Other violations of the Constitution, laws, administrative regulations, administrative rules, and local regulations.',//九、其他违反宪法、法律、行政法规、行政规章、地方性法规的行为.
      baoHuAnQuanYiWu: 'Obligation to protect website security',//保护网站安全的义务
      jinZhiRenHe: 'It is forbidden to conduct any sabotage on the 1516 lottery in any way.',//禁止以任何方式对1516彩票进行各种破坏行为。
      chengDanYiWu: 'Obligation to bear bank charges',//承担银行费用的义务
      zaiXianYongHuChengDan: 'The user shall be responsible for the bank charges in applying for withdrawal to the user\'s bank card.',//在申请提款至用户银行卡的银行费用由用户承担。
      YWYLcaiPiaoQuanLi: '1516 lottery powers',//1516彩票的权力
      guanLiQuanLi: 'The right to manage user accounts',//管理用户帐户的权利
      ruGuoYongHu: 'If the information provided by the user contains multiple malicious registration information in Article 4, paragraph 3, or the information listed in paragraph 7, 1516 Lottery reserves the right to freeze its user account, cancel its user account or restrict its use of all or part of the service content. Once it is discovered that the information produced, copied and disseminated by the user using the 1516 lottery is clearly one of the information listed in Article 3, paragraph 7, the 1516 lottery will immediately take measures such as blocking the information, issuing a warning, and closing the user account.',//如果用户提供的资料包含有第四条第3款多次恶意注 册信息或第7款所列信息，1516彩票保留冻结其用户 账户、注销其用户帐户或者限制其使用全部或部分服 务内容的权利。一经发现用户利用1516彩票制作、复 制和传播的信息明显属于第三条第7款所列信息之一 的，1516彩票将立即采取屏蔽信息、发出警告、直至 关闭用户帐户等措施。
      xiuGaiTiaoKuan: 'Right to modify the terms of this agreement',//修改本协议条款的权利
      xiuOne: '1516 Lottery has the right to modify the terms of the agreement when necessary. Once the terms of the agreement are changed, it will prompt or announce the revised content on the relevant page of 1516 Lottery. If you do not agree with the changed content, the user can take the initiative to cancel the service. If the user continues to enjoy the service, it is deemed to have accepted the changes in the terms of service. 1516 Lottery reserves the right to modify or discontinue the service at any time without any notice to the user. It mainly includes the following situations: 1. Increase or decrease of lottery types 1516 lottery lottery types are subject to the types that can be purchased in the current period. Long-term or temporary increase or decrease of lottery types does not require prior notification to users.',//1516彩票有权在必要时修改协议条款，协议条款一旦 发生变动，将会在1516彩票相关页面上提示或公告修 改内容。如果不同意所改动的内容，用户可以主动取 消获得的服务。如果用户继续享用服务，则视为接受 服务条款的变动。1516彩票保留随时修改或中断服务 而不需知照用户的权利。主要包括以下情况： 一、增加或减少彩票品种1516彩票的彩票品种以当期 可以实现购买的品种为准，长期或临时增加或减少彩 票品种均不需事先告知用户。
      xiuTwo: '2. The right to adjust the deadline for lottery sales. 1516 Lottery has the right to adjust the lottery ticket sales deadline according to the lottery type and current sales situation without prior notice to users.',//二、调整彩票销售截止时间的权利。1516彩票有权根 据彩票种类和当期销售情况调整彩票销售截止时间， 而不需事先告知用户。
      gouCaiQingQiu: 'User submits lottery purchase request to 1516 lottery',//用户向1516彩票提出购彩请求
      kuanXiangJinE: '1516 Lottery has the right to withdraw from its balance the amount of money required to request lottery purchases.',//1516彩票有权从其余额提取请求购彩所需的款项金额。
      quanLiYiWu: 'Rights and obligations of redeeming, receiving and distributing bonuses',//兑奖、领取奖金、分配奖金的权利和义务
      caiPiaoZhongJiang: 'In the case of lottery winning, the winning amount calculated by the 1516 lottery based on the winning ratio is directly transferred to the winning user.',//在彩票中奖情况下，由1516彩票根据中奖比例计算出 的中奖金额，直接汇入中奖用户。
      zhiZhiGongKuan: 'Right to stop lottery purchases with public funds',//制止公款购彩的权利
      guanLiJiGuan: '1516 Lottery has the right to refuse non-personal funds to buy lottery tickets through 1516 Lottery. Once it is found that money has been transferred from non-personal account funds to the user\'s prepaid account, 1516 Lottery has the right to take measures such as forcibly returning the money to the original account and terminating the agreement. The 1516 lottery will report to the relevant management agency.',//1516彩票有权拒绝非个人资金通过1516彩票购买彩 票，一旦发现有款项自非个人帐户资金转入用户预付 款帐户，1516彩票有权采取强行将款项退回原帐户、 终止协议等措施。1516彩票并将向有关管理机关报告。
      zhiZhiWeiMan: 'The right to stop minors under the age of 18 from buying lottery tickets',//制止未满18周岁的未成年人购买彩票的权利
      ruWeiChengNian: 'If a minor provides false user information and pretends to be an adult, all the lottery purchases made by the minor in the Lottery Lottery will be invalidated from the beginning. The losses caused to the 1516 Lottery and the consequences of the failure to receive the prize will be the responsibility of the minor. Adults and their legal representatives shall bear the responsibility.',//如未成年人提供虚假用户资料冒充成年人的，其在趣 彩彩票进行的一切彩票购买行为将自始无效，由此给 1516彩票及其本人造成的损失以及不能领奖的后果均 由该未成年人及其法定代理人承担。
      caiPiaoYiWu: '1516 Lottery Obligations',//1516彩票的义务
      yongHuBaoZhangYiWu: 'User account data protection obligations',//用户帐户资料保护义务
      zeRenDeQuanLi: '1516 lottery provides maximum security protection for user account information. When 1516 lottery users are suspected of embezzling other third-party payment channels (such as: UnionPay, WeChat, Alipay, etc.) account funds, or suspected of having their third-party payment channel accounts stolen, they should be requested by the suspected pirate or the third-party payment company. Under the premise that it will only use user information for suspected embezzlement and keep it confidential, 1516 Lottery will provide the requesting party with the user information of the suspected embezzlement. 1516 Lottery users agree to waive the right to pursue any liability to 1516 Lottery in this case.',//1516彩票对用户帐户资料提供最大限度的安全保护。 当1516彩票用户涉嫌盗用他人第三方支付渠道（如： 银联、微信、支付宝等）帐户资金，或涉嫌其第三方 支付渠道帐户被盗用的，应涉嫌被盗用人或第三方支 付公司的要求，在其承诺仅将用户资料用于涉嫌盗用 事件并予以保密的前提下，1516彩票将向请求方提供 涉嫌盗用人的用户资料。1516彩票用户同意放弃在此 情况下向1516彩票追究任何责任的权利。
      gongBuQingKuang: 'Obligation to announce winnings',//公布中奖情况的义务
      qingKuangWeiZhun: 'After the official lottery issuance and sales agency releases the winning results, the 1516 lottery tickets are subject to the results announced by the official lottery issuance and sales agency.',//在官方彩票发行和销售机构发布中奖结果后，1516彩票彩 票以官方彩票发行机构和销售机构公布的中奖情况为准。
      zhuanZhangYiWu: 'Transfer obligation',//转帐义务
      yinHangZhangHuShang: 'After reaching a certain amount of betting, users can apply for withdrawal of their own balance at any time. 1516 Lottery will check the user’s funds source and receive the withdrawal request within 3 working days. Transfer funds to the user\'s registered bank account',//在达到一定投注量情况下，用户在任何时间都可对自 己的余额申请提款，1516彩票在核对用户资金来源正 常的情况下，在收到提款请求3个工作日内将用户需 提取的款项转帐到用户注册的银行账户上
      xieYiChengLi: 'Agreement formation, change and termination',//协议成立、变更和终止
      chengLiOne: 'Failure to complete the lottery purchase due to network failures, exceeding the designated purchase time, insufficient amount, etc. The 1516 lottery will return the user\'s prepaid funds.',//因网络故障、超过指定购买时间、金额不足等原因，未能完成购彩的。1516彩票将返还用户预付资金。
      chengLiTwo: '1516 Lottery reserves the right to change the terms of this agreement without prior notice to the user.',//1516彩票有权对本协议条款进行变更而无需事先通知用户。
      chengLiThree: 'If any party fails to perform any of the obligations stipulated in this agreement, and fails to correct the error within 15 days of receiving the correction notice from the other party, it shall be deemed to have waived this agreement automatically and the agreement shall be terminated at the same time.',//任何一方未能履行本协议规定的任何义务，且在收到另一方发出更正通知15日内未能改正错误的，均被视为自动放弃本协议，协议同时终止。
      chengLiFour: 'Once suspected of buying lottery with public funds, suspected of buying lottery with minors and other circumstances prohibited by this agreement, 1516 Lottery has the right to terminate the agreement immediately.',//一经发现公款购彩嫌疑、未成年人购彩嫌疑等本协议禁止的情况，1516彩票有权立即终止协议。
      mianZeTiaoKuan: 'Disclaimer',//免责条款
      buYuChengDan: '1516 Lottery shall not bear any legal responsibility in the following circumstances:',//发生下列情况时，1516彩票不予承担任何法律责任：
      yongHuXieLou: 'User data leakage',//用户资料泄露
      yiQieHouGuo: 'Any personal information leakage and disputes arising from the disclosure of any personal information caused by the user\'s password to others or sharing the registered account with others, or the user\'s negligence. All consequences resulting from unauthorized use or modification of user information, unauthorized tampering or embezzlement of user passwords, personal account numbers or registration information, regardless of the reason.',//由于用户将密码告知他人或与他人共享注册帐户，或 由于用户的疏忽，由此导致的任何个人资料泄露，以 及由此产生的纠纷。 无论何种原因导致的用户资料未授权使用、修改，用 户密码、个人帐号或注册信息被未授权篡改、盗用而 产生的一切后果。
      buKeKangLi: 'Force majeure and unforeseen circumstances occur',//不可抗力及不可预见的情势发生
      buKeYuJian: 'Force majeure and unforeseen situations include: natural disasters, government actions, strikes, wars, etc.; hacker attacks, computer virus intrusion or attack, government control, reasons for lottery issuing and sales agencies, lottery ticket dispensers or service failures, network failures, Changes in national policies, changes in laws and regulations, etc. Caused by force majeure and unforeseen circumstances: temporary closure, leakage, loss, stolen, tampering of user information or lottery orders, lottery purchase failure, 1516 lottery failed to receive lottery order, etc., and disputes arising therefrom. This agreement cannot be performed due to force majeure and unforeseen circumstances.',//不可抗力和不可预见情势包括：自然灾害、政府行 为、罢工、战争等；黑客攻击、计算机病毒侵入或发 作、政府管制、彩票发行和销售机构的原因、彩票出 票机或服务的故障、网络故障、国家政策变化、法律 法规之变化等。因不可抗力和不可预见情势造成：暂 时性关闭，用户资料或购彩指令泄露、丢失、被盗 用、被篡改，购彩失败，1516彩票未能收到购彩指令 等，以及由此产生的纠纷。 因不可抗力和不可预见的情势造成本协议不能履行的。
      yongHuYuanYin: 'Loss caused by user or third party reasons',//用户原因或第三方原因造成损失
      youYuYongHu: 'Due to the user\'s own reasons, or violation of laws and regulations, and third-party reasons, the user is unable to use the 1516 lottery service or causes other losses.',//由于用户自身原因、或违反法律法规，以及第三方的 原因，造成用户无法使用1516彩票服务或产生其他损失的。
      yongHuGouCai: 'Losses incurred by users buying lottery',//用户购彩而产生的损失
      yongHuGenJu: 'The direct, indirect, accidental, special and subsequent damages incurred by the user in purchasing lottery in accordance with this agreement.',//用户根据本协议进行购彩而发生的直接、间接、偶 然、特殊及继起的损害。
      yongHuShiYong: 'Damage caused by users using links or downloading materials',//用户使用链接或下载资料产生的损害
      youYuShiYong: 'Due to the use of other websites linked to 1516 Lottery, or the use of information downloaded or obtained through 1516 Lottery, leakage of user information, damage to the user\'s computer system, etc., and any disputes and consequences arising therefrom, are caused.',//由于使用与1516彩票链接的其它网站，或者使用通过 1516彩票下载或取得的资料，造成用户资料泄露、用户 电脑系统损坏等情况及由此而导致的任何争议和后果。
      heTongZuCheng: 'Contract composition',//合同组成
      zuChengOne: '1516 Lottery homepage and other pages related to (including but not limited to) member registration process, change process, lottery process, member payment and settlement, related rewards, member services and other operational content rules and legal declarations are valid components of this agreement , Is an expansion of the interpretation of this agreement and has the same legal effect as this agreement.',//1516彩票主页以及其他页面有关（包括但不限于）会员注册流程、变更流程、购彩流程、会员支付与结算、相关奖励、会员服务等运营内容的细则以及法律声明均为本协议的有效组成部分，是对本协议的解释扩充，与本协议有着相同的法律效力。
      zuChengEr: 'Please refer to the "Legal Notices" for details on user information privacy protection, website prohibited behaviors, and website intellectual property protection.',//用户资料隐私保护、网站禁止行为、网站知识产权保护等约定详见《法律声明》。
      zhuYiShiXiang: 'Precautions',//注意事项
      zhuYiOne: 'Those under the age of 18 (underage) are prohibited from registering on this site. At the same time, students are not encouraged to buy lottery tickets, including college students.',//禁止未满18周岁(未成年)者在本站注册。同时 不提倡学生购买彩票，其中也包括在校大学生。
      zhuYiTwo: 'To ensure that your purchase application can be submitted successfully in time, you must have sufficient funds in your account before the current purchase application.',//为确保您的购买申请能及时成功提交，请您务必 在当期购买申请前有足够款项在您的账号。
      zhuYiThree: 'Please note when using the online payment platform: no matter what kind of online payment system is used, a certain handling fee will be charged.',//在使用网络支付平台时请注意：无论使何种网络 支付系统时都将收取一定的手续费。
      zhuYiFour: 'Please make sure that your email address is valid for long-term use. And always pay attention to check the mail of this site.',//请确认您的电子邮箱地址为长期使用之有效邮 箱。并随时留意查收本站的邮件。
      zhuYiFive: 'If you have any questions, please contact us in time.',//有任何疑问请及时与我们取得联系。
      zhuYiFiveTiShi: 'Reminder: buying lottery tickets are risky, betting online must be cautious',//提醒：购买彩票有风险，在线投注需谨慎
      keFuZhongXinReXian: 'Customer Service Center Hotline:',//客服中心热线：
      guanLiYuanXinXiang: 'Administrator mailbox:'//管理员信箱：
    },
    BScroll: {
      jiaZaiGengDuo: 'load more',//加载更多
      shiFangShuaXin: 'Release to refresh',//释放即可刷新
      meiYouGengDuo: 'No more data',//没有更多数据了
    },
    Introduce: {
      RHCWDL: 'How to become an agent?',//如何成为代理
      CWDLcontent: ['If you want to become an agent, please submit an application in the agent center, and you can become an agent after passing the review.', ' Contact customer service', ' if you have any questions.'],//如果你想成为代理，请在代理中心提交申请，通过审核后即可成为代理。如有疑问联系客服。
      RHZQYJ: 'How to earn commission?',//如何赚取佣金
      ZQYJcontent: 'Commission = (self-rebates-lower-level rebates) x bet amount / 100, if you rebate 13 yourself and lower-level rebates 10, you will get a 3% rebate commission from the lower-level bet. If you bet 1000 yuan at the lower level, you will get 30 yuan. Click to open an account at a lower level, you can view the rebate of yourself and the lower level, and you can also set the rebate for the lower level.',//佣金= (自身返点 - 下级返点） x 投注额／ 100 ，如果自身返点 13 ，下级返点 10 ，你将能获得下级投注金翻 3 ％的返点佣金。如下级投注 1000 元，你将会获得 30 元。点击下级开户，可查看自己及下级的返点，也可以为下级设置返点。
      RHWXJKH: 'How to open an account for subordinates?',//如何为下级开户
      XJKHcontent: 'Click to open an account, first set up a rebate for your subordinates. After the setting is successful, an invitation code and a QR code will be generated, and the invitation code or QR code will be sent to your subordinate to register. After successful registration, he will be your subordinate. If you set up an agent type account for the subordinate, then your subordinate can continue to develop the subordinate, no matter how many levels are developed, you can get commission; if you set the player type, then your subordinate can only bet, not If you develop the lower level, you will not see the agency center.',//点击下级开户，先为您的下级设置返点，设置成功后会生成一条邀请码和一条二维码，将邀请码或二维码发给您的下级注册，注册成功后他就是您的下级。如果您为下级设置的是代理类型的账号，那么您的下级就能继续发展下级，无论发展了几级，您都能获得佣金；如果设置的是玩家类型，那么您的下级只能投注，不能再发展下级，也看不到代理中心。
      RHZQGZ: 'How to earn salary?',//如何赚取工资？
      ZQGZcontent: 'Agency salary is a new set of agency settlement system, which has the advantages of easy promotion and motivating agency team.\n' +
        'After the end of each settlement period, the platform will pay wages based on the agent\'s performance. You can view the wage details in the agent center.\n' +
        'If you have any questions, please contact customer service.',
      //代理工资是一套全新的代理结算体系，有着易于推广、激发代理团队积极性等优势。
      // 每个结算周期结束后，平台会根据代理业绩发放工资，可以在代理中心查看工资详情。
      // 如有挂问，请联系客服。
      FDBT: 'Different rebates have different odds. Click on the rebate odds to view the rebate odds; the lower the rebate, the lower the odds. It is recommended to set the rebate for the lower level not too low.',//返点不同赔率也不同，点击返点赔率狡，可查看返点赔率；返点越低赔率就越低，建议为下级设置的返点不要过低。
    }
  }
}

export default en;
