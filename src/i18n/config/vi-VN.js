const vi = {
  // '彩票下注':'彩票下注',
  lang: {
    common: {
      auditDetails: 'Kiểm tra chi tiết',
      agentDescription: 'Đặc vụ',
      Balance: 'dư',
      AccountBalance: 'Tài khoản',
      yuan: '￥',
      noData: 'Không có dữ liệu',
      determine: 'xác nhận',
      refreshSuccessfully: 'Cập nhật thành công',
      combinationRule: 'Số f / letter / nhấn combination between 6-16',
      loginTimedOut: 'Không đăng ký, xin hãy ký.',
      serverBusy: 'Máy chủ bận',
      ziYuanBuCunZai: 'Tài nguyên không tồn tại',
      requestError: 'Lỗi yêu cầu',
      duanWangLa: 'Cắt đứt rồi.',
      verificationCode: 'Mật khẩu',
      pleaseEnterVerificationCode: 'Hãy nhập mật mã kiểm tra.',
      noRecords: 'Không ghi âm',
      remark: 'nhận',
      to: 'Được',// 日期选项器的‘到’
      starTime: 'giờ khởi chạy',
      endTime: 'Hết giờ',
      search: 'tìm',
      query: 'truy',
      title: 'Tựa',
      website: 'bục',
      converting: 'Chuyển...',
      returning: 'Quay...',//归还中
      successfulReturn: 'Thành công trở về',
      openSoon: 'Nó sẽ được mở sớm thôi.',
      nextStep: 'bước kế tiếp',
      lastStep: 'Bước cuối',
      copy: 'Rõ',
      buttonTextConfirm: 'xác nhận',
      ifCallService: 'Nếu có thắc mắc gì xin liên lạc',
      submitIng: 'Đang đệ trình dữ liệu…',
      submited:'Dữ liệu đệ trình',
      di: 'Thứ ba',
      issueText: 'giai đoạn',
      openPrizeSoon: 'Sắp có giải thưởng rồi.',
      loading: 'Name...',
      deadline: 'cuối',
      submit: 'Gởi',
      drawing: 'Vẽ tranh....',
      blocking: 'Đóng đề nghị...',
      contactService: 'Liên lạc với khách hàng',
      btn:['đóng', 'Xoá', 'Hủy', 'xác nhận', 'Nhà', 'Vâng'],
      datetimeData: ['Ngày sinh nhật'],
      del_tips: ['Dữ liệu đã xóa không khôi phục được, xác nhận xóa? ',' đã xóa thành công '],
      edit_tips: ['Sửa đổi thành công', 'Gửi thành công', 'Thao tác thành công', 'Lỗi yêu cầu', 'Sửa đổi thành công, cần đăng nhập lại!'],
      add_tips:["thêm thành công", "thêm lỗi"],
      error_alert:['phản ứng thất bại, xin vui lòng thử lại sau! '],
    },
    trend:{
      trendChart:'biểu đồ xu hướng',
      issue_text:'Số lần thử lại',
      K3_tabs:['tổng giá trị','đứng đầu','đứng thứ hai','đứng thứ ba'],
      k3_title_sum:["số khoảng thời gian", "số điện thoại", "giá trị tổng", "kích cỡ", "đơn và gấp đôi"],
      ssc_tabs:['Mười nghìn địa điểm', "Ngàn địa điểm", "Trăm địa điểm", "Mười địa điểm", "Một địa điểm",],
      eleven5_tabs:["thứ nhất", "thứ hai", "thứ tư", "thứ năm"],
      pk10_tabs:["Nhà vô địch", "chạy lên", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy", "thứ tám", "số chín", "Tenth"],
      fc3d_tabs:['trăm','mười','cá nhân'],
      common_title:["số tiết","số xổ số"],
      k3_title_position:["khoảng thời gian", "tổng số"],
      refresh: 'Cập nhật',
      select: 'Chọn xổ số',
      goToLoddy:'Đi đặt cược đi',
      chart:'biểu đồ xu hướng'

    },
    threeGame:{
      tips:['Bạn có chắc muốn bỏ trò chơi hiện thời không?？'],
      title:['nhắc'],
    },
    apply_agency:{
      agency:['Hiện tại có','con người trở thành điệp viên'],
      money:['Lương nhận hàng ngày','giàu'],
      btn:['Vào đi'],
    },
    ranking: {
      title: 'Thắng giải thưởng',
      navList:["người chiến thắng mới nhất", "Xếp hạng ngày hôm qua"],
      in: 'Trong {game}',
    },
    state: {
      processing: 'Chấp nhận',//受理中
      pending: 'Không chấp nhận',//待处理
      solved: 'chấm', //已解决
      paidIn: 'Trả vào',//已入款
      canceled: 'Dừng',//已取消，已注销
      notSet: 'Chưa đặt',//未设置
      yesSet: 'Nó đã được đặt. Nhấn vào để sửa đổi mật khẩu của quỹ',//已设置
      changeLoginPwd:'Nhấn Sửa mật khẩu đăng nhập',
      copySuccess: 'Chép thành công',
      copyError: 'Lỗi sao chép',
      addSuccess: 'Thêm thành công',
      draw: 'Heju',
      win: 'Trúng xổ số',
      noWin: 'Không chiến thắng',
      noPrize:'Không có giải thưởng',
      openWin: 'Vẽ tranh',
      loading: 'Đang tải',
      alreadyDraw:'Vẽ tranh',
      cancelOrder:'Hủy đơn hàng',
      deleted:'đã xóa',
      close: 'Đóng cửa',
      unpaid: 'Được trả tiền',

    },
    register:{
      accountType:['Loại người dùng', 'Thành viên', 'Người đại diện'],
      userNickname:['Biệt hiệu của người dùng', 'Vui lòng nhập biệt hiệu của người dùng', 'Biệt hiệu bao gồm 2-15 ký tự, chữ cái hoặc số Trung Quốc'],
      loginAccount:['Số tài khoản đăng nhập', 'Vui lòng nhập số tài khoản đăng nhập', 'Số tài khoản bắt đầu bằng một chữ cái và bao gồm 6-10 chữ cái và số hoặc dấu gạch dưới'],
      actualName:['Tên thật', 'Vui lòng nhập tên thật của bạn', 'Tên thật có từ 2 đến 20 ký tự Trung Quốc'],
      memberPhone:['Số điện thoại thành viên', 'Vui lòng nhập số điện thoại thành viên', 'Số điện thoại có 11 chữ số'],
      userPwd:['Mật khẩu đăng nhập', 'Vui lòng nhập mật khẩu', 'Mật khẩu bao gồm 6-12 chữ cái và số hoặc dấu gạch dưới, không phải số thuần túy'],
      oldPwd:['Mật khẩu cũ', 'Vui lòng nhập mật khẩu cũ', 'Mật khẩu có ít nhất 6 chữ số'],
      confirmPwd:['Xác nhận mật khẩu', 'Vui lòng nhập lại mật khẩu', 'Hai mật khẩu không nhất quán'],
      changeNewPwd:['Mật khẩu mới', 'Vui lòng nhập mật khẩu mới'],
      changeRePwd:['Xác nhận mật khẩu mới', 'Vui lòng nhập lại mật khẩu mới'],
      hasValue:['Tài khoản đã tồn tại'],

    },
    lotteryTips: {
      title: 'Luật chơi',//'玩法规则',
      playTipsTitle: 'Mẹo chơi',//'玩法提示',
      playTipsDesc: 'Không có mô tả',//'暂无说明',
      winInstructionTitle: 'Hướng dẫn giành chiến thắng',//'中奖说明',
      winInstructionDesc: 'Không có mô tả',//'暂无说明',
      exampleTitle: 'thí dụ',//'范例',
      exampleDesc: 'Không có mô tả',//'暂无说明',
    },
    lotterySort: {
      all: 'Tất cả',// 全部
      markSixLottery: 'Mark Six',// 六合彩
      fc3d: 'Màu tần số thấp',
      ssLottery: 'Màu thời gian',
      pK10: 'PK10',//PK拾
      Xuan5: '11 trên 5',
      happyLottery: 'Màu hạnh phúc',
      kuai3: 'Nhanh 3',
      pcDanDan: 'Trứng PC',
      ffssc: 'Chia sẻ thời gian',
      ffpk10: 'Nhận điểm PK',
      fflhc: 'Mark Six',
      ffccs1: 'Xổ số chia sẻ lần 1',
      ffpk101: 'Xổ số chia sẻ lần 1',
      fflhc1: 'Xổ số chia sẻ lần 1',
    },
    lottery: {
      buyLottery: 'Đi mua xổ số',
      trend: 'Khuynh hướng',
      play: 'Cách chơi',//'玩法',
      collect: 'Yêu thích',
      collected: 'thu thập',
      toast: ['Chức năng chưa được mở'],
      randomAndTips: ['Lắc máy để chọn', 'Mẹo chơi'],
      odds: 'Tỷ lệ cược',
      balance: 'Thăng bằng',
      simplexOption: ['Xóa số trùng lặp', 'Rỗng'],
      simplexTips_1: ['Không đủ', 'Số chữ số phải được thêm vào trước', ', nếu số là', ', giá trị đầu vào phải là'],
      simplexTips_2: ['Vui lòng sử dụng khoảng trắng giữa mỗi số đặt cược', 'tách biệt'],
      simplexTips_3: ['Chương trình sẽ tự động lọc ra các số bất hợp pháp. Bạn cũng có thể nhấp vào nút ',' để định dạng nội dung đầu vào. '],
      nav: ['Biểu đồ biểu đồ', 'Các lượt rút thăm gần đây', 'Bản ghi mua sắm', 'Cách chơi', 'Đường đi', 'Rồng dài'],
      issueInfo: ['Th', 'khoảng cách', 'dấu chấm'],
      historyTitle: ['Kỳ', 'Số bản vẽ'],
      K3_total: 'Tổng giá trị',
      bottom: {
        info: ['Tổng cộng', 'Tổng ghi chú', 'Nhân dân tệ', 'Đặt cược một lần có thể sinh lời'],
        tools: ['Hết', 'Thêm danh sách đặt cược', 'Cá cược đang chờ xử lý', 'Đặt cược một cú nhấp chuột'],
        multiple: ['Ghi chú đơn', 'Nhân dân tệ', 'Nhân dân tệ / Ghi chú', 'Đôi'],
        queue: {
          title: 'Cài đặt đặt cược',
          info: ['Hoàn trả', 'Số lần đặt cược', 'Ghi chú', 'Tổng số tiền', 'Nhân dân tệ', 'Nếu bạn trúng xổ số, có thể thắng một cược tối đa'],
          btn: ['Hủy', 'OK']
        }
      },
      dialog: {
        title: 'Lời khuyên',
        warning: [
          'Vui lòng đăng nhập trước, sau đó đặt cược!',
          'xổ số, xin vui lòng chờ đợi',
          'Số dư không đủ, vui lòng nạp tiền! ',
          'Cá cược thành công! ',
          'Yêu cầu đã hết thời gian chờ, vui lòng đặt cược lại',
          'Cá cược ...',
          'Không có phiếu cược, vui lòng đặt cược trước',
          'Thay đổi chu kỳ màu',
          'Có một lệnh cá cược đang chờ xử lý, có nên hủy đặt cược hay không',
          'hãy nhập đúng số lần đầu tiên'
        ]
      },
      orderList: {
        title: 'Phiếu cược',
        countDown: ['', 'Thời hạn cá cược định kỳ'],
        random: ['Máy chọn một nốt nhạc', "Máy chọn năm nốt nhạc", "Số theo dõi thông minh"],
        info: ['Tổng cộng', 'tổng số tiền ghi chú', 'nhân dân tệ', 'tổng số', 'số dư khả dụng'],
      },
      ssc:{
        tips:['Bạn đã chọn', 'Vị trí, hệ thống sẽ tự động kết hợp vị trí theo vị trí', 'Phương án']
      }
    },
    user: {
      withdraw: 'rút lui',
      Recharge: 'Nạp điện',
      transfer: 'Giao dịch',
      accountDetails: 'Chi tiết tài khoản',
      rechargeRecord: 'Bản ghi nạp tiền',
      withdrawalsRecord: 'Bản ghi rút tiền',
      quotaConversion: 'Chuyển đổi hạn ngạch',
      orderInquiry: 'Theo dõi đơn hàng',
      myCollection: 'bộ sưu tập của tôi',
      myDiscountCoupon: 'phiếu giảm giá của tôi',
      contactCustomerService: 'liên hệ với dịch vụ khách hàng',
      helpAndFeedback: 'Giúp đỡ và phản hồi',
      securityCenter: 'Trung tâm bảo vệ',
      bonusDetails: 'Chi tiết tiền thưởng',
      language:'语言 / Language / Ngôn ngữ',
      joinAgent: 'Tham gia đại lý',
      tryItForFree: 'Dùng thử miễn phí',
      notVIP: 'Bạn đang sử dụng tài khoản demo và không thể xem được',
      howVip: 'Làm thế nào để trở thành một VIP',
      cancel: 'hủy bỏ',
      myTeam: 'Nhóm của tôi (trung tâm đại lý)',
      balanceJin: 'Thăng bằng',
      hello: 'hello,xin chào',
      languageSelected: 'Vui lòng chọn ngôn ngữ',
      balance: 'Thăng bằng',
      setFundPwd:'Vui lòng đặt mật khẩu quỹ trước',
    },
    header: {
      topUpType: 'Loại nạp tiền',
      topUp:'Nạp điện',
      Withdrawal: 'Rút tiền',
      walletTransfer: 'Chuyển đổi ví',
      physicalEducation: 'giáo dục thể chất',
      electronic: 'điện tử',
      ApplicationAgent: 'Đăng ký đại lý',
      SetFundPassword: 'Đặt mật khẩu quỹ',
      modifyFundPassword: 'Thay đổi mật khẩu quỹ',
      StationLetter: 'Trạm thư',
      historicalBet: 'Đặt cược lịch sử',
      couponDescription: 'Mô tả phiếu thưởng',
      Promotions: 'Khuyến mại',
      download: 'Tải xuống ứng dụng'
    },
    footer: {
      home: 'Trang Chủ',
      Draw: 'Vẽ tranh',
      betSlip: 'Phiếu cược',
      find: 'Tìm thấy',
      member: 'của tôi',
      Lottery: 'Mua',


    },
    feedback: {
      title: 'Phản hồi của khách hàng',
      radioBug: 'Lỗi chương trình',
      radioBet: 'Cược liên quan',
      radioOther: 'gợi ý khác',
      placeContentCon: 'Vui lòng nhập nội dung bạn muốn khiếu nại hoặc sửa chữa',
      addImg: 'thêm hình ảnh',
      addPhone: 'Vui lòng nhập thông tin liên hệ của bạn (email hoặc điện thoại di động)',
      labelContact: 'chi tiết liên hệ',

    },
    loginContent: {
      login: 'đăng nhập',
      member: 'thành viên',//会员
      loginTitle:'Đăng nhập thành viên',
      loginNow: 'đăng nhập ngay lập tức',
      quickRegister: 'đăng kí nhanh',
      register: 'đã đăng ký',
      lottery: 'Vé số',
      registerNow: 'Đăng ký ngay',
      retrievePassword: 'Lấy lại mật khẩu',
      PLZenterUserName: 'Vui lòng nhập tên người dùng',
      PLZenterPWD: 'Xin vui lòng nhập mật khẩu',
      enterUserName: 'Vui lòng nhập tên người dùng',
      enterPassword: 'Xin vui lòng nhập mật khẩu',
      pleaseEnterVerificationCode: 'vui lòng nhập mã xác nhận',
      loginSuccessful: 'đăng nhập thành công',
      emptyPassword: 'mật khẩu không được để trống',
      passwordRule: 'Vui lòng nhập độ dài mật khẩu từ 6-16, kết hợp giữa số + chữ cái',
      differentPassword: 'Hai mật khẩu mới không nhất quán',
      loginAgain: 'Sửa đổi thành công, vui lòng đăng nhập lại',
      noLogin: 'Bạn không đăng nhập',
      loginIn:'Đăng nhập…',
      loginInErr:'Đã hết thời gian đăng nhập, vui lòng đợi một lúc và thử lại！',
      loginTimeout:'Đã hết thời gian đăng nhập, vui lòng đăng nhập lại',
    },
    registerContent: {
      accountNumber: 'số tài khoản',
      verificationCode: 'Mã xác nhận',
      invitationCode: 'Mã mời',
      pleaseConfirmYourPassword: 'Vui lòng xác nhận mật khẩu của bạn',
      pleaseEnterTheInvitationCode: 'Vui lòng nhập mã mời',
      accountAlreadyExists: 'Tài khoản đã tồn tại',
      alreadyHaveAnAccount: 'Bạn co săn san để tạo một tai khoản',
      signInNow: 'đăng nhập ngay lập tức',
      agreedTreaties: 'Đăng ký có nghĩa là bạn đã đồng ý với các hiệp ước mở đầu',
      openAgreement: 'Thỏa thuận mở tài khoản',


      shuRuGuiZe: 'Số tài khoản bao gồm 6-10 chữ cái, số hoặc dấu gạch dưới',
      pwdRule: 'Mật khẩu bao gồm 6-12 chữ cái và số hoặc dấu gạch dưới, không phải số thuần túy',
      password: ['Mật khẩu', 'vui lòng nhập mật khẩu'],
      confirmPassword: ['Xác nhận mật khẩu', 'Vui lòng nhập lại mật khẩu', 'Nhập mật khẩu không nhất quán'],
      Account: ['Tài khoản', 'Vui lòng nhập số tài khoản'],
      vCode:['Mã xác minh', 'Vui lòng nhập mã xác minh', 'Không được để trống mã xác minh'],
      tips:['Đã đăng ký thành công, sẽ đăng nhập sớm'],
      error_tips:['đăng ký thất bại'],


      realName: ['Tên thật ',' hãy nhập tên thật ',' tên thật đã tồn tại'],
      emailInfo: ['hộp thư ',' hãy nhập vào hộp thư'],
      phoneInfo: ['số điện thoại di động ',' xin vui lòng nhập số điện thoại di động ',' số điện thoại đã tồn tại'],
      phonePromotion: ['mã quảng cáo điện thoại di động ',' hãy nhập mã quảng cáo điện thoại di động'],
      qqNumber: ['QQ',' xin vui lòng nhập số QQ'],
      weChat: ['ứng dụng'],
      bornInfo: ['sinh nhật ',' hãy chọn ngày sinh nhật ',' hãy nhập captcha'],



    },
    withDraw: {
      tiXianTongGuo: 'Sau khi rút tiền thành công, số tiền rút của bạn dự kiến ​​sẽ đến chậm nhất trong vòng 24 giờ, nếu không đến được, vui lòng liên hệ với bộ phận chăm sóc khách hàng',
      mingRiTiKuna: 'Số lần rút tiền hôm nay đã vượt quá giới hạn, vui lòng đăng ký rút tiền vào ngày mai！',
      damabuzu: 'Số tiền mã hóa hiện tại không đủ, vui lòng đăng ký rút tiền sau khi đủ số tiền mã hóa!',
      withdrawalInstructions: 'Hướng dẫn rút tiền',
      pleaseEnterWithDrawAmount: 'Vui lòng nhập số tiền rút (nếu có thắc mắc vui lòng liên hệ',
      onlineService: 'dịch vụ trực tuyến',
      WithdrawalAmount: 'Số tiền rút',
      WithdrawalPassword: 'Mật khẩu rút tiền',
      endOf: 'Số đuôi',
      debitCard: 'Thẻ ghi nợ',
      wish: 'Xin chúc mừng, đơn rút tiền của bạn đã được gửi thành công',//
      wait: 'Xếp hàng, chờ xác nhận dịch vụ khách hàng',//正在排队，等待客服确认
      succWith: 'Rút tiền thành công',//提现成功
      withDrawDetail:'Chi tiết rút tiền',
      detailLabel:['Số đơn hàng', 'Số tiền mặt', 'Phí xử lý', 'Rút tiền thực tế', 'Trạng thái rút tiền', 'Thời gian đặt hàng', 'Ghi chú'],
      tips:['Mật khẩu quỹ đã được đặt, bạn có muốn buộc thẻ không?'],
      succReq: 'Rút tiền được gửi thành công!',//提款提交成功！
      withdrawRecords: 'Bản ghi rút tiền', //提现记录
    },
    recharge: {
      PaymentConfirmation: 'Số tiền nạp của một số kênh thanh toán ngẫu nhiên 1 số thập phân, vui lòng xác nhận khi thanh toán',
      PleaseSelectRechargeType: 'Vui lòng chọn hình thức nạp tiền',
      RechargeType: 'Loại nạp tiền',
      attention: 'Ghi chú',//attention
      companyIncome: 'Tiền gửi Công ty-Chuyển khoản Ngân hàng Trực tuyến',//Company income - online bank transfer
      selectAccount: 'Chọn tài khoản nhận bạn muốn chuyển, sau khi chuyển xong bạn làm theo các bước trên trang, hệ thống sẽ đến trong vòng 3 phút。',
      onlinePay: 'Ngân hàng trực tuyến-Thanh toán trực tuyến',//Online banking - online payment
      paymentMethod: 'Ví QQ / Ví UnionPay / WeChat / Ví JD-Quét mã QR để thanh toán, vui lòng làm theo các bước trên trang để hoàn tất thao tác, sau khi thanh toán thành công, không cần qua CSKH, hệ thống sẽ tự động đến tài khoản。',
      wallet: 'Ví QQ / Ví JD',//QQ Wallet / Jingdong Wallet
      onePayment: 'Thanh toán bằng một cú nhấp chuột: hiện chỉ hỗ trợ phiên bản ứng dụng và phiên bản web di động.',//One click payment: at present, it only supports app version and mobile web version.
      ifCallService: 'cho bất kỳ câu hỏi xin vui lòng liên hệ với dịch vụ trực tuyến.',//If you have any questions, please contact online customer service.

    },
    setting: {
      Universal: 'phổ cập',
      setting: 'Thiết lập',
      versionCheck: 'Kiểm tra phiên bản',
      currentVersion: 'Phiên bản hiện tại là',
      aboutUs: 'về chúng tôi',
      clearCache: 'xóa bộ nhớ cache',
      dropOut: 'rơi ra ngoài',
      logining:'Thoát…',
      cacheCleared: 'Đã xóa bộ nhớ cache',
      IKnow: 'tôi biết',
      loginErr:'Đã hết thời gian thoát, vui lòng đợi một lúc và thử lại'
    },
    bankPay: {
      rechargeType: 'Loại nạp tiền',
      bankTransfer: 'Chuyển khoản ngân hàng',
      inputMoney: 'Vui lòng chọn số tiền nạp',
      selectWay: 'Chọn phương thức nạp tiền (nếu có thắc mắc vui lòng liên hệ {onlineService})',
      onlineService: 'dịch vụ trực tuyến',
      receivingBank: 'Ngân hàng thụ hưởng',
      receivingNumber: 'Nhận tài khoản',
      receivingName: 'Người nhận tiền',
      receivingBranch: 'Mở tài khoản',
      accountInfo: 'Nhận thông tin tài khoản',
      depositorAccountInfo: 'Thông tin tài khoản người gửi tiền',
      depositTime: 'Thời gian gửi tiền',
      depositMoney: 'Số tiền đặt cọc',
      depositName: 'Tên người gửi tiền',
      paid: 'Tôi đã trả tiền',
      enterDepositName: 'Vui lòng nhập tên của người gửi tiền',
      enterRemark: 'Vui lòng nhập nhận xét',
      remark_check:['Định dạng của thông tin nhận xét không chính xác!'],
      selectBank: 'Vui lòng chọn một thẻ ngân hàng',
      payMaintain: 'Bảo trì, xin vui lòng sử dụng các khoản thanh toán khác để nạp tiền',
      rechargeMethod: 'Phương thức nạp tiền',
      rechargeExplain: 'Hướng dẫn nạp tiền',
      firstStep: 'Xin chúc mừng, đơn đăng ký nạp tiền của bạn đã được gửi thành công',
      success: 'gửi thành công',
      rechargeMoney: 'Số tiền nạp',
      lineUp: 'Đã xếp hàng chờ dịch vụ khách hàng xác nhận',
      rechargeSuccess: 'Nạp tiền thành công',
      thirdStep: 'Sau khi nạp tiền thành công, số dư của bạn sẽ được cập nhật trong vòng 3 phút, vui lòng kiểm tra sau, nếu không cập nhật kịp thời, vui lòng lập tức',
      havePaid: 'Đã thanh toán, tôi muốn có vận đơn',


    },
    aliPay: {
      service: 'dịch vụ trực tuyến',
      selectWay: 'Chọn phương thức nạp tiền (nếu có thắc mắc vui lòng liên hệ {service})',
      screenPay: 'Vui lòng chụp ảnh màn hình và quét mã để thanh toán',//Please take a screen shot and scan the code to pay
      rechargeSteps: 'Các bước nạp tiền',
      keepPage: 'Lưu ảnh chụp màn hình của trang này',
      pressSame: 'Nhấn đồng thời',//Press at the same time
      powerKey: 'Nút nguồn',//Power key
      homeKey: 'Nút Home',//Home key
      screenshot: 'Có thể chụp ảnh màn hình',//Screenshot
      volumeDownKey: 'Phím giảm âm lượng',//Volume down key
      and: 'với',//and
      openAlipay: 'Mở Alipay',//Open Alipay
      selectSweep: 'Chọn chức năng quét Alipay',//Select Alipay sweep function
      clickScan: 'Nhấp vào album trong chức năng quét để mở và chọn ảnh chụp màn hình đã lưu trước đó',//Click the album in the scan function to open and select the previously saved screenshot
      inputAmount: 'Nhập số tiền nạp',//Input recharge amount
      sameOrder: 'Phải phù hợp với số lượng đặt hàng',//It should be consistent with the order amount
      addNote: 'Thêm ghi chú',//Add notes
      returnApp: 'Sau khi thanh toán thành công, hãy quay lại Ứng dụng và nhấp vào',//After successful payment, return to app and click
      havePaid: 'Đã thanh toán, tôi muốn có vận đơn',

      minimumAmount: 'Số tiền nạp tối thiểu là',//The minimum recharge amount is
      maximumAmount: 'Số tiền nạp tối đa là',//The maximum recharge amount is
      submitOrder: 'Xác nhận để gửi đơn đặt hàng?',//Are you sure to submit the order
      goPage: 'Chuyển đến trang nạp tiền một cách nhanh chóng',//Go to the recharge page
    },
    wechat:{
      tips:['Các bước nạp tiền', '1, lưu ảnh chụp màn hình của trang này', 'Iphone: nhấn cùng lúc', 'nút nguồn', 'và', 'Nút Home', 'có thể chụp ảnh màn hình', 'Android: nhấn đồng thời ',' Nút nguồn ',' và ',' nút giảm âm lượng ',' có thể chụp ảnh màn hình ',' 2, mở WeChat, chuyển sang khám phá ',' 3, chọn chức năng quét ',' 4, trong chức năng quét. Nhấp vào album, mở và chọn ảnh chụp màn hình đã lưu trước đó ',' 5.Nhập số tiền nạp vào ',' phải phù hợp với số tiền đặt hàng ',' 6, thêm ghi chú: ',' kaka999 ',' 7, quay lại APP sau khi thanh toán thành công và nhấp vào ',' Đã thanh toán, tôi muốn có vận đơn '],
    },
    RechargeData: {
      All: 'Tất cả',
      Accepting: 'Chấp nhận',
      noAccept: 'Không được chấp nhận',
      topUpSuccessfully: 'Nạp tiền thành công',
      rechargeFailed: 'Nạp tiền không thành công',
      topUpMode: 'Chế độ nạp tiền',
      paymentTypes: 'Phương thức thanh toán',
      rechargeStatus: 'Trạng thái nạp tiền',
      rechargeAmount: 'Số tiền nạp',
      discountedPrice: 'Giá chiết khấu',
      totalRechargeAmount: 'Tổng số tiền nạp',
      offerType: 'Loại phiếu mua hàng',
      orderTime: 'Thời gian phục vụ',
      cancellationTime: 'Thời gian hủy',
      depositTime: 'Thời gian gửi tiền',
      orderNo: 'số thứ tự',
      rechargeDetail: 'Chi tiết nạp tiền',
      SupportedAmount: 'Số tiền nạp là số tiền cố định và số tiền này không thể sửa đổi. Chỉ hỗ trợ số tiền nạp ở trên và số tiền là 100,00 ~ 99999,00',
      giveBack: 'Tổng số dư tài khoản sẽ trở lại',
      changeSuccess: 'Chuyển đổi thành công',
      inputMoney: 'Vui lòng nhập số tiền',
      orderModel:['Chuyển khoản và chuyển tiền', 'Thanh toán trực tuyến', 'Nạp tiền thủ công', 'Nạp tiền thủ công (nạp tiền bất thường)'],
      rechargeType:['Không có loại giảm giá'],
    },
    totalData: {
      accepting: 'Chấp nhận',
      paidOut: 'Đã thanh toán',
      cancelled: 'Đã hủy',
      refuseToPay: 'Từ chối trả',

    },
    BalanceChange: {
      ConversionAmount: 'Số tiền chuyển đổi',
      ConversionRecord: 'Bản ghi chuyển đổi',
      bettingRecord: 'kỷ lục cá cược',
      platformTransferOut: 'Chuyển nền tảng ra ngoài',
      platformTransfer: 'Chuyển giao nền tảng',
      ChooseOutPlatform: 'Chọn nền tảng chuyển',
      ChoosePlatform: 'Chọn nền tảng chuyển',
      pleaseEnterAmount: 'Vui lòng nhập một số nguyên',
      confirmConversion: 'Xác định chuyển đổi',
      oneClickTotal: 'Tổng một cú nhấp chuột',
      returnToPlatform: 'Tổng số dư tài khoản sẽ trở lại nền tảng xổ số 1516',
      noRecords: 'Không có hồ sơ',
      changeDetails: 'Chi tiết chuyển đổi',
      autoChange:['Chuyển khoản tự động'],
      tips:['Số tiền chuyển ra', 'Số tiền chuyển vào', 'Số dư không đủ'],
      refresh: 'Làm mới'
    },
    myCoupon: {
      unused: 'Không sử dụng',
      used: 'Đã sử dụng',
      expired: 'hết hạn',
      no: 'Không',
      coupon: 'phiếu mua hàng',
      emptyUnused: 'Không có phiếu giảm giá chưa sử dụng',
      emptyUsed: 'Không có phiếu giảm giá đã sử dụng',
      emptyExpired: 'Không có phiếu giảm giá đã hết hạn',
    },
    SecurityCenter: {
      myBankCard: 'Thẻ ngân hàng của tôi',
      loginPassword: 'mật khẩu đăng nhập',
      fundPassword: 'Mật khẩu quỹ',
      confirmPassword:'Xác nhận mật khẩu',
      oldPwd:'Mật khẩu cũ',
      unboundCard: 'Thẻ ngân hàng không ràng buộc',
      simplePwd:'Mật khẩu quá đơn giản, vui lòng đặt lại!',
      differentPwd:'Hai mật khẩu không nhất quán',
      modifiedSuccessfully:'Đã sửa đổi thành công',
    },
    surplusFund: {
      title: 'Thăng bằng',// 余额生金
      yesterdayEarnings: 'Thu nhập của ngày hôm qua',//昨日收益
      totalAmout: 'Tổng số tiền có thể rút',//可提现总金额
      income: 'Thu nhập tích lũy',//累计收益
      minAmout: 'Số tiền tối thiểu',//最小金额
      maxAmout: 'Số tiền tối đa',//最大金额
      dailyReturn: 'Tỷ suất lợi nhuận hàng ngày',//日收益率
      annualIncome: 'Ước tính 10.000 bản sao thu nhập hàng năm',//预计万份年收益
      monthlyIncome: 'Ước tính 10.000 bản thu nhập hàng tháng',//预计万份月收益
      detailTitle: 'Cơ cấu thu nhập',//

    },
    changePassword: {
      changePassword: 'Sửa đổi mật khẩu đăng nhập',
      oldPassword: 'Mật khẩu cũ',
      enterNewPwd: 'Vui lòng nhập mật khẩu mới',
      confirmNewPassword: 'Xác nhận mật khẩu mới',
      passwordRules: 'Quy tắc mật khẩu',
      miMaGuiZe: 'Mật khẩu bao gồm 6-12 chữ cái và số hoặc dấu gạch dưới, không phải số thuần túy',
      oldPwdRule:'Định dạng mật khẩu cũ không chính xác',
    },
    setFundsPassword: {
      originalPassword: 'mật khẩu ban đầu'
    },
    myBankInfo: {
      title: 'Ràng buộc thẻ ngân hàng',
      cardholder: 'chủ thẻ',
      bankName: 'tên ngân hàng',
      bankCardNumber: 'Số thẻ ngân hàng',
      accountOpeningAddress: 'Địa chỉ mở tài khoản',
      UpdateTime: 'Cập nhật thời gian',
      selectBank: 'Vui lòng chọn một ngân hàng',
      inputBranch: 'Vui lòng nhập địa chỉ chi nhánh mở tài khoản',
      cardRule: 'Vui lòng nhập số thẻ 16-19 chữ số',
      noModification: 'Không thể sửa đổi sau khi ràng buộc',
      inputPeopleName: 'Vui lòng nhập tên chủ thẻ',
      inputBankName: 'Vui lòng chọn tên ngân hàng',
      inputBankNo: 'Vui lòng nhập số thẻ ngân hàng',
      inputBranchInfo: 'Xin vui lòng điền vào thông tin chi nhánh',
      cardNoRule: 'Độ dài của số thẻ ngân hàng phải từ 16-19 chữ số',
      info: 'Thẻ ngân hàng có thể bị ràng buộc lên đến 5',
      tipsTitle: 'Lời khuyên',
      tipsContent: 'Nếu bạn cần phải sửa đổi hoặc xóa thẻ ngân hàng, xin vui lòng liên hệ{service}',
      service: 'Trả lời',
      addBankCard: ['thêm thẻ ngân hàng ',' thẻ ngân hàng mới'],
      bank_tips:['xin vui lòng thêm thông tin thẻ ngân hàng, rút tiền, cảm ơn bạn'],

    },
    lotteryNote: {
      detailTitle: 'chi tiết đơn hàng',
      di: 'Đầu tiên',
      issueText: 'giai đoạn',
      abnormalOrder: 'Thứ tự bất thường',
      winning: 'Trúng xổ số',
      noWin: 'Đừng trúng số, hãy tiếp tục',
      rescinded: 'Cược đã bị hủy',
      lotteryNumber: 'Trúng số',
      betNumber: 'Số cá cược',
      orderNo: 'Số đặt cược',
      betTime: 'Thời gian đặt cược',
      playName: 'Tên trò chơi',
      betMoney: 'Số tiền đặt cược',
      betRebate: 'Giảm giá cược',
      betOdds: 'Tỷ lệ cá cược',
      revoke: 'Thu hồi',
      moreShot: 'Đặt cược khác',
      ifRevoke: 'Bạn có chắc chắn hủy đặt cược này không??',
      CancellationSuccessful: 'Hủy thành công',
      cancelOrder: 'Hủy đơn hàng',
      allBets: "Tất cả các đơn đặt hàng",
      hasWon: 'Đã thắng',
      noDraw: 'Không có giải thưởng',

      orderCancelled: 'Đơn đặt hàng đã bị hủy',
      bets: 'Cá cược',
    },
    DatePicker: {
      chooseTimePeriod: 'Chọn khoảng thời gian',
      yesterday: 'hôm qua',
      nearlyWeek: 'Gần một tuần',
      nearlyMonth: 'Gần một tháng',
      ymd:['Năm','Tháng','Ngày'],//'年','月','日'
    },
    HelpCenter: {
      rulesOfPlay: 'Luật chơi',
      introduceLottery: 'Giới thiệu màu sắc',
      detailedSettings: 'Cài đặt chi tiết',
      Feedback: 'Phản hồi',
      customerFeedback: 'Phản hồi của khách hàng',
      numLottery: 'Màu kỹ thuật số',
      sportLottery: 'Xổ số thể thao',
      openingTime: 'Thời gian vẽ',
      playIntroduce: 'Giới thiệu trò chơi',
    },
    NoteHistory: {
      data: 'ngày',
      betAmount: 'Số tiền đặt cược',
      AmountWinningLosing: 'Số tiền thắng hoặc thua',
    },
    LotteryPicker: {
      customFilter: 'Bộ lọc tùy chỉnh',
      Reset: 'Cài lại',
      lotteryType: 'Loại màu',
      chooseLottery: 'Chọn màu',
    },
    auditDetails: {
      PreferentialDeduction: 'Đánh giá ưu đãi + xét duyệt thường xuyên, tổng cộng được khấu trừ',
      theWithdrawalTime: 'Thời gian rút tiền là',
      sinceTotalValidBet: 'Kể từ lần gửi tiền đầu tiên sau khi rút tiền, tổng số tiền cược hợp lệ',
      allValidBets: 'Tất cả các cược hợp lệ',
      Withdrawable: 'Có thể rút tiền',
      noWithdrawal: 'Không rút tiền',
      deposit: 'tiền gửi',
      Discount: 'Giảm giá',
      withdrawalVolume: 'Việc rút tiền cần đạt đến khối lượng cá cược',
      betAmountReached: 'Số tiền đặt cược đạt được',
      Start: 'Khởi đầu',
      End: 'kết thúc',
      status: 'trạng thái',
    },
    CouponExplain: {
      ObtainingCoupons: 'Nhận phiếu thưởng',
      huodong: 'Có được thông qua các hoạt động, đăng nhập, bồi thường dịch vụ khách hàng, v.v. (do hệ thống tự động thêm vào, không cần trao đổi);',
      couponUse: 'Sử dụng phiếu giảm giá',
      meizhanag: 'Mỗi phiếu chỉ có thể được sử dụng một lần, không đổi, không trả lại, không quy đổi thành tiền mặt, không rút tiền mặt và chỉ có thể sử dụng trên nền tảng này;',
      chongzhi: 'Phiếu nạp tiền là mệnh giá của phiếu quà tặng, phiếu cá cược là mệnh giá của phiếu miễn giảm;',
      zhudan: 'Số tiền đặt cược phải lớn hơn mệnh giá của phiếu thưởng khi sử dụng phiếu thưởng không giới hạn để đặt cược hoặc nạp tiền..',
      danbi: 'Chỉ được sử dụng một phiếu giảm giá cho một đơn hàng, không thể sử dụng đồng thời nhiều phiếu giảm giá, sau khi phiếu được sử dụng hết, số tiền chênh lệch sẽ không được đổi, trả;',
      baokuo: 'Phiếu giảm giá (bao gồm phiếu giảm giá của người dùng mới) không được khấu trừ từ người khác, và chỉ có thể được trừ theo điểm sử dụng của phiếu. Phiếu giảm giá không được sử dụng cho các màu đặc biệt, khác với các chương trình giảm giá khác;',
      meizhanger: 'Để biết điều kiện sử dụng của từng phiếu, vui lòng tham khảo hướng dẫn của phiếu tương ứng;',
      qingzai: 'Vui lòng sử dụng phiếu giảm giá trong thời hạn hiệu lực Các phiếu thưởng không sử dụng sẽ tự động mất hiệu lực sau khi hết hạn;',
      touzhuhuo: 'Trong quá trình đặt cược hoặc nạp tiền, hệ thống tự động hiển thị các phiếu có sẵn, bạn chỉ cần chọn và xác nhận đặt cược hoặc nạp tiền;',
      shixiao: 'Phiếu thưởng đã hết hạn',
      shiyongshijian: 'Phiếu thưởng hết hạn sau khi hết hạn,',
      dingdan: 'Đối với đơn hàng có sử dụng phiếu mua hàng, nếu đã sử dụng phiếu giảm giá sẽ không được hoàn lại, sau khi hủy đơn hàng sẽ không được hoàn lại tiền;',
      yanjing: 'Nghiêm cấm bán hoặc chuyển nhượng phiếu giảm giá, nếu tìm thấy và xác minh, phiếu giảm giá sẽ bị vô hiệu;',
      shuadan: 'Phiếu đã được sử dụng để quẹt đơn hàng và vi phạm, sau khi được phát hiện và xác nhận, phiếu sẽ mất giá trị;',
      ruxu: 'Để biết thêm thông tin, vui lòng liên hệ với dịch vụ khách hàng trực tuyến',
    },
    Customerserve: {
      fullDayServe: 'Dịch vụ đường dây nóng 24 giờ',
      advisory: 'tham mưu',
      QQCustomerService: 'Dịch vụ khách hàng QQ',
      copy: 'sao chép',
      weChatCustomerService: 'Dịch vụ khách hàng WeChat',
      copySuccessfully: 'Sao chép thành công',
    },
    AboutUs: {
      abusOne: '1516 Xổ số Châu Á Edition là một công ty trò chơi được đăng ký hợp pháp ở Quần đảo Virgin thuộc Anh và nắm giữ Đặc khu Kinh tế Cagayan của chính phủ Philippines First Cagayan leisure and Resort Corporation Giấy phép cá cược thể thao và sòng bạc trực tuyến do họ cấp và giám sát. Một sự hiện diện mạnh mẽ tại thị trường Châu Á, một đội ngũ quản lý có nhiều năm kinh nghiệm trong ngành và một nền tảng vững chắc. Vui lòng tìm trang web chính thức duy nhất của xổ số 1516 phiên bản châu Á：1516.com',
      abusTwo: 'Xổ số 1516 là tổ chức hợp pháp đầu tư trực tuyến xổ số thể thao chuyên nghiệp đầu tiên ở Châu Á. Nó cam kết tạo ra một nền tảng xổ số một cửa thuận tiện, nhanh chóng và ổn định cho người dùng. Đây là công ty tiên phong trong lĩnh vực bán hàng xổ số thể thao trên Internet xổ số 1516!',
      abusThree: 'Xổ số 1516 cung cấp tải xuống APP trên điện thoại di động, kết hợp với thiết bị đầu cuối PC và WAP, vượt qua những ràng buộc về không gian và thời gian, 24 giờ một ngày, thuận tiện và nhanh chóng, đồng thời trải nghiệm niềm vui xổ số mọi lúc, mọi nơi!',
      abusFour: 'Cá cược trực tuyến của công ty chúng tôi là tuyệt đối an toàn. Số tài khoản và chi tiết đăng nhập của bạn là duy nhất dành cho bạn, đảm bảo rằng không ai ngoại trừ bạn có thể sử dụng tài khoản của mình. Tiền và dữ liệu cá nhân của khách hàng là yếu tố quan trọng hàng đầu của công ty. Công ty áp dụng công nghệ mã hóa cao cấp nhất và hệ thống quản lý bảo mật nghiêm túc để đảm bảo rằng sự an toàn của khách hàng là sự bảo vệ hoàn hảo nhất. điều kiện.! Bạn có thể yên tâm chơi ở công ty chúng tôi.',
      abusFive: 'Trước khi tham gia trò chơi của chúng tôi, hãy đảm bảo rằng bạn trên 18 tuổi;',
      abusSix:'Mỗi người dùng chỉ có thể có một tài khoản duy nhất tương ứng. Nếu chúng tôi phát hiện bất kỳ người dùng nào có hành vi gian lận hoặc các phương thức cá cược khác thường, chúng tôi sẽ ngay lập tức đóng và hủy tài khoản, đồng thời có quyền phong tỏa lợi nhuận tài khoản và tiền gốc cá cược.',
      abusSeven: 'Bất kỳ người dùng nào dưới 18 tuổi mở tài khoản trong xổ số 1516 sẽ bị đóng băng và tài khoản sẽ bị hủy. Cờ bạc chỉ là một hình thức giải trí, tiêu khiển, nhắc nhở các em không nên nghiện game quá mức để gây ảnh hưởng xấu đến kinh tế, sự nghiệp, gia đình và xã hội. Chúng tôi đặc biệt khuyến nghị tất cả khách hàng đối mặt với hành vi cờ bạc một cách chính xác và có tâm lý chơi game đúng đắn. Để bảo vệ quyền lợi của khách hàng, chúng tôi cung cấp chế độ tự đóng băng tài khoản và giới hạn số tiền cá cược tối đa, khi khách hàng đăng ký tài khoản có thể bị phong tỏa hoặc giới hạn số tiền cá cược.',
      abusEight: 'Nếu bạn có bất kỳ câu hỏi nào, vui lòng truy cập dịch vụ khách hàng trực tuyến của chúng tôi, chúng tôi sẽ có dịch vụ khách hàng trực tuyến để trả lời câu hỏi của bạn một cách kiên nhẫn. Cảm ơn bạn!',
    },
    tryItForFree: {
      shiWanShiJian: 'Tài khoản demo chỉ để người chơi làm quen với trò chơi. Không được phép nạp và rút tiền, không được tham gia các hoạt động ưu đãi, thời gian có hiệu lực là',
      qrHours: '72 giờ',
      temporarily: 'Hiện không chơi',
      GoTry: 'Hãy thử nó',
      pleaseLogFirst: 'Vui lòng đăng nhập để xem',
    },
    Promotions: {
      ActivityTime: 'Thời gian hoạt động',
      seeDetails: 'xem chi tiết',
    },
    findPwd: {
      forgetPassword: 'Quên mật khẩu',
      zhaoHuiMiMa: 'Vui lòng nhập chính xác số tài khoản và mật khẩu rút tiền của bạn để đảm bảo lấy lại được mật khẩu!',
      memberAccount: 'tài khoản thành viên',
      enterMemberAccount: 'Vui lòng nhập tài khoản thành viên',
      withdrawalsPassword: 'Mật khẩu rút tiền',
      enterWithdrawalsPassword: 'Vui lòng nhập mật khẩu rút tiền',
    },
    NoteHistoryDel: {
      historyRecord: 'kỷ lục lịch sử',
    },
    Popup: {
      ChooseTransactionType: 'Chọn loại giao dịch',
    },
    AccountDetail: {
      fundTransfer: 'Chuyển khoản nạp tiền',
      onlinePayment: 'Thanh toán trực tuyến',
      lotteryBetting: 'Cá cược xổ số',
      lotteryPayouts: 'Thanh toán xổ số',
      userWithdrawal: 'Người dùng rút tiền',
      cancellationRebate: 'Hoàn phí hủy bỏ',
      withdrawalFailed: 'Rút tiền không thành công',
      commissionRebate: 'Chiết khấu hoa hồng (cổ tức)',
      backgroundTransfer: 'Chuyển nền',
      backgroundTransferOut: 'Chuyển nền ra ngoài',
      //Register注册送彩
      agentRebate: 'Giảm giá đại lý',
      manualDeposit: 'Tiền gửi thủ công',
      giveRebate: 'Giảm giá',
      activityOffers: 'Ưu đãi Hoạt động',
      rebateNumber: 'Hoàn trả theo số',
      systemReward: 'Phần thưởng hệ thống',
      agentDailySalary: 'Lương hàng ngày của đại lý',
      agencySupport: 'Hỗ trợ đại lý',
      otherRecharge: 'Nạp tiền khác',
      playAndRebate: 'Chơi và giảm giá',
      writeRebate: 'Giảm giá xóa sổ',
      manuallyProposed: 'Đề xuất thủ công',
      numberDeduction: 'Khấu trừ số',
      discountDeduction: 'Khấu trừ chiết khấu',
      otherDeductions: 'Các khoản khấu trừ khác',
      reversalAward: 'Phần thưởng đảo ngược',
      transferIn: 'Chuyển giao',
      transferOut: 'Chuyển ra ngoài',
      sportsBetting: 'Cá cược thể thao',
      sportsSettlement: 'Giải quyết thể thao',
      refundRegulations: 'Hoàn trả tiền gốc vi phạm quy định',
      reSettlement: 'Tái định cư',
      cancelOrder: 'hủy đơn hàng',
      realRebate: 'Giảm giá thực tế',
      rebateRebate: 'Tái chế người thật giảm giá',
      transactionType: 'Loại giao dịch',
      orderNum: 'số thứ tự',
      issueNum: 'Vấn đề',
      money: 'Số tiền liên quan',
      dealTime: 'giờ giao dịch',
      remarks: 'Nhận xét',
      changeMoney: 'Số tiền chuyển đổi',
    },
    ExplainWithDraw: {
      Reminder: 'Lời khuyên',
      queRenTiKuanYiZhi: 'Xác nhận tính chính xác của thông tin ngân hàng đã nộp tại thời điểm rút tiền. Phải đảm bảo rằng tên người dùng thẻ ngân hàng nhất quán với tên thật của người dùng đã được gửi trong quá trình đăng ký.',
      danBiTiKuan: 'Số tiền tối thiểu cho một lần rút tiền là',
      ziJinAnQuan: 'Để đảm bảo an toàn cho quỹ tài khoản, số tiền rút của thành viên bị giới hạn mỗi ngày',
      ciShu: 'tần số',
      meiRiJinE: 'Số tiền giới hạn hàng ngày',
      maximumLimit: 'Giới hạn tối đa',
      meiRiShouXuFei: 'Phí xử lý được miễn 3 lần một ngày, và phí xử lý sẽ được khấu trừ trên 3 lần.',
      shiRenMinBi: 'Phí RMB',
      shiFouManZuDaMa: 'Cho dù nó đáp ứng các yêu cầu rút tiền và mã hóa, vui lòng kiểm tra chi tiết kiểm toán',
      dangQianDingDan: 'Tổng số đơn đặt hàng hiện có',
      bi: 'Mỗi',
      shangShu24XiaoShi: 'Lưu ý: Hàng ngày ở trên đề cập đến "trong vòng 24 giờ"',
      tiKuan:'Số tiền rút',
      calc:'Phép tính',
    },
    BonusInfo: {
      fiveStars: 'Năm ngôi sao',
      fanDianBFB: 'Hoàn trả 13.00%',
      fuShi: 'Song công',
      peiLvOne: 'Tỷ lệ cược 98000.000',
      danShi: 'Độc thân',
      zuHe: 'sự phối hợp',
      zuXuanYEL: 'Lựa chọn nhóm 120',
      YRLpeiLV: 'Tỷ lệ cược 816.666',
      zuXuanLS: 'Lựa chọn nhóm 60',
      LSpeiLV: 'Tỷ lệ cược 1633.333',
      plJBL: 'Tỷ lệ 98000.000, 9800.000, 980.000, 98.000, 9.800'
    },
    ChangeBalance: {
      mainPlatformBalance: 'Số dư nền tảng chính'
    },
    daiLiZhongXin: {
      agencyCenter: 'Trung tâm đại lý',
      agentDescription: 'Mô tả đại lý',
      teamOverview: 'Tổng quan về đội',
      userList: 'Danh sách người dùng',
      registrationManagement: 'Quản lý đăng ký',
      promotionRegistration: 'Đăng ký khuyến mãi',
      UserName: 'tên tài khoản',
      lotteryRebates: 'Giảm giá xổ số',
      accountBalance: 'Số dư tài khoản',
      teamSize: 'Số đội',
      teamBalance: 'Tổng số dư của nhóm',//Total team balance
      yesterdaysCommission: 'Hoa hồng của ngày hôm qua',//Yesterday's commission
      cumulativeCommission: 'Hoa hồng tích lũy',//Cumulative commission
      rule:['Mã khuyến mãi gồm 3-10 chữ cái hoặc số'],
      type:['Đại lý', 'Thành viên'],
    },
    teamOverview: {
      totalNumberTeam: 'Tổng số đội',//Total number of team
      numberRegisteredPeople: 'Số người đăng ký trong thời hạn',//Number of registered people
      numberTopUps: 'Số lần nạp tiền',//Number of top-ups
      numberFirstCharge: 'Số lần sạc đầu tiên',//Number of first charge
      netProfit: 'Lợi nhuận ròng',//Net profit
      netPrefitIs: 'Lợi nhuận ròng = thắng hoặc thua trong trò chơi + chiết khấu + tổng đại lý',//Net profit = game win or loss + discount + agent total
      depositAndWithdrawal: 'Gửi và rút tiền',//Deposit and withdrawal
      rechargeOffer: 'Ưu đãi nạp tiền',//Recharge offer
      otherOffers: 'Các ưu đãi khác',//Other offers
      betAmount: 'Số tiền đặt cược',//Bet amount
      rebateAmount: 'Số tiền hoàn lại',//Rebate amount
      agentTotal: 'Tổng đại lý',//Agent total
      agencyDividend: 'Cổ tức đại lý',//Agency dividend
    },
    UserList: {
      enterUserName: 'Vui lòng nhập tên người dùng',
      UserName: 'tên tài khoản',
      userType: 'Các loại',
      registrationTime: 'Thời gian đăng ký',
      onlineStatus: 'trạng thái',
      lastLoginTime: 'lần đăng nhập cuối cùng',
      rebateLevel: 'Mức bồi hoàn',
      status: 'trạng thái',
      Pending: 'Đang chờ xem xét',
      Enable: 'Kích hoạt',
      Deactivate: 'Hủy kích hoạt',
      proxy: 'Ủy quyền',
      trialMember: 'Thành viên thử nghiệm',
      Online: 'Trực tuyến',
      Offline: 'Ngoại tuyến',
      member:'thành viên',
    },
    EnrollmentManagement: {
      /*     accountType:['用户类型','会员','代理'],
           userNickname:['用户昵称','请输入用户昵称','昵称由2-15个汉字、字母或数字组成'],
           loginAccount:['登录账号','请输入登录账号','帐号以字母开头，由4-12位字母、数字或下划线组成'],
           actualName:['真实姓名','请输入真实姓名','真实姓名为2-15位汉字或数字'],
           memberPhone:['会员电话','请输入会员电话','电话为11位数字'],
           userPwd:['登录密码','请输入密码','密码由6-12位字母、数字或下划线组成'],
           confirmPwd:['确认密码','请再次输入密码','两次密码不一致'],*/
      bonusSettings: 'Cài đặt tiền thưởng',
      openAccountNow: 'Mở tài khoản ngay bây giờ',
      accountAlready: 'Tài khoản đã tồn tại, vui lòng nhập lại',
      realName: 'Tên thật đã tồn tại, vui lòng nhập lại！',
      dianHuaYiCunZai: 'Điện thoại đã tồn tại, vui lòng nhập lại！',
      xinZengChengGong: 'Thêm thành công',
      userType: 'kiểu người dùng',
      messageThree: 'Tên thật có 2-15 ký tự hoặc số Trung Quốc',
      thePhoneDigits: 'Điện thoại có 11 chữ số',
      enterPwdAgine: 'Nhập lại mật khẩu',
      user: 'người dùng',

    },
    promotionRegistration: {
      addPromotion: 'Khuyến mãi mới',
      promotionChannelConnection: 'Liên kết kênh quảng cáo',
      promotionCode: 'Mã khuyến mãi',
      promotionPage: 'Trang khuyến mãi',
      promotionGoal: 'Mục tiêu thăng tiến',
      bonus: 'Tặng kem',
      bonusSetting: 'Cài đặt tiền thưởng',
      Views: 'Lượt xem',
      registeredNumber: 'Số người đã đăng ký',
      releaseTime: 'thời gian phát hành',
      operating: 'điều hành',
      newPromotionCode: 'Mã khuyến mãi mới',
      edit: 'biên tập',
      Details: 'Chi tiết',
      QRcode: 'mã QR',
      kaiShiShiJian: 'Thời gian bắt đầu không được lớn hơn thời gian kết thúc',
      webConnection: 'Liên kết web',
      wechatConnection: 'Liên kết WeChat',//微信链接
      errorWeChat: 'Liên kết khuyến mãi WeChat không bình thường, vui lòng liên hệ bộ phận chăm sóc khách hàng', //微信推广链接异常，请与客服人员联系！
    },
    index: {
      popularLottery: 'Xổ số phổ biến',
      boardGame: 'Trò chơi trên bàn cờ',
      liveVideo: 'Video trực tiếp',
      electronicGames: 'Trò chơi điện tử',
      sportsGames: 'trò chơi thể thao',
      dengLuHou: 'Vui lòng đăng nhập trước khi tiến hành nạp tiền',
      dengLuJinRu: 'Vui lòng đăng nhập trước khi vào trò chơi',
      depositRecharge: 'Nạp tiền',
      xiZhong: 'Trúng xổ số',
      reMenQiPai: 'Cờ vua và bài phổ biến',
      zuiXinZhongJiangBang: ['Danh sách chiến thắng mới nhất', 'Danh sách khác'],
      moreGames: 'thêm những trò chơi khác',
      quGames: 'Xem tất cả xổ số',
      moreLottery:'Xổ số khác',
      openWin:'Bốc thăm xổ số',
      otherGame:'các trò chơi khác',
      userCenter:'Trung tâm thành viên'
    },
    NoticeList: {
      announcement: 'sự thông báo',//announcement
    },
    reg: {
      preface: 'lời nói đầu',//preface
      huanYingShiYong: 'Chào mừng bạn đến sử dụng dịch vụ nền tảng xổ số 1516 do xổ số 1516 cung cấp!',//Welcome to use 1516 lottery platform services provided by 1516 lottery!
      benXieYiShiNinYu: 'Thỏa thuận này là thỏa thuận giữa bạn và công ty xổ số 1516 về việc bạn sử dụng dịch vụ nền tảng xổ số 1516. Để sử dụng dịch vụ nền tảng xổ số 1516, bạn nên đọc và tuân theo "Thỏa thuận mở tài khoản xổ số 1516" và các quy tắc khác. Vui lòng đọc kỹ và hiểu đầy đủ nội dung của từng điều khoản, đặc biệt là các điều khoản miễn trừ hoặc giới hạn trách nhiệm và thỏa thuận riêng về việc mở hoặc sử dụng một dịch vụ nào đó, và chọn chấp nhận hoặc không. Trừ khi bạn đã đọc và chấp nhận tất cả các điều khoản của thỏa thuận này, bạn không có quyền sử dụng các dịch vụ nền tảng xổ số 1516. Việc tải xuống, cài đặt, sử dụng, đăng nhập và các hành động khác của bạn sẽ được coi là đã đọc và đồng ý với các ràng buộc của thỏa thuận này. Bạn đảm bảo rằng bạn đủ 18 tuổi trở lên khi sử dụng dịch vụ này và có đầy đủ năng lực hành vi dân sự.',//This agreement is an agreement between you and 1516 Lottery Company regarding your use of 1516 Lottery Platform Services. To use 1516 Lottery Platform services, you should read and abide by the "1516 Lottery Account Opening Agreement" and other rules. Please read carefully and fully understand the content of each clause, especially the clauses for exemption or limitation of liability, and the separate agreement for opening or using a certain service, and choose to accept or not. Unless you have read and accepted all the terms of this agreement, you have no right to use 1516 lottery platform services. Your download, installation, use, login and other actions are deemed to have read and agreed to the constraints of this agreement. You guarantee that you are at least 18 years old when you use this service and have full capacity for civil conduct.
      xiangGuanDingYi: 'Các định nghĩa liên quan',//Related definitions
      zhiZaiYWYL: 'Đề cập đến các thành viên đã đăng ký tham gia xổ số 1516 và được công nhận bởi xổ số 1516 và đủ điều kiện để hưởng dịch vụ xổ số 1516.',//Refers to registered members who have registered in the 1516 lottery and are recognized by the 1516 lottery and are eligible to enjoy the 1516 lottery service.
      gouCai: 'Mua xổ số',//Buy lottery
      zhiZhuCeDeYongHu: 'Có nghĩa là người dùng đã đăng ký có thể mua vé số trên trang này và có toàn quyền thưởng đối với vé số đã mua.',//It means that registered users can purchase lottery tickets on this site and have full bonus rights to the purchased lottery tickets.
      yongHuZiLiao: 'Thông tin người dùng',//user information
      zhiYongHuTiGong: 'Đề cập đến thông tin cá nhân mà người dùng cung cấp trong quá trình đăng ký, bao gồm: tên người dùng, mật khẩu tài khoản đã đăng ký, số tài khoản thẻ ngân hàng, tên thật của người dùng, v.v.',//Refers to the personal information provided by the user during registration, including: user name, registered account password, bank card account number, user's real name, etc.
      xieYiFuWuFanWei: 'Phạm vi dịch vụ của Thỏa thuận này',//Service scope of this agreement
      tiGongGouCaiPingTai: 'Cung cấp nền tảng xổ số',//Provide lottery platform
      tiGongCaiPiaoXiangGuan: 'Cung cấp thông tin liên quan đến xổ số',//Provide lottery related information
      caiPiaoXinXiJiaoHu: 'Cung cấp nền tảng tương tác thông tin xổ số',//Provide lottery information interaction platform
      zaiXianYuFuZhiFu: 'Cung cấp dịch vụ quyết toán thanh toán trả trước trực tuyến.',//Provide online prepaid payment settlement services.
      wangLuoHeTongXin: 'Phạm vi dịch vụ của thỏa thuận này không bao gồm việc cung cấp thiết bị đầu cuối máy tính và thiết bị phụ trợ, mạng và tài nguyên truyền thông cho các thành viên đã đăng ký',//The service scope of this agreement does not include the provision of computer terminals and their auxiliary equipment, network and communication resources to registered members
      yongHuQuanLi: 'Quyền của người sử dụng',//User rights
      zhangHuGuanLiQuan: 'Quyền quản lý tài khoản',//Account management rights
      yongHuXiuGai: 'Người dùng có quyền truy vấn thông tin người dùng bất cứ lúc nào và có thể sửa đổi thông tin khác với tên người dùng và tên thật của người dùng.',//The user has the right to query user information at any time, and can modify information other than the user name and the user's real name.
      mianFeiShiYongQuan: 'Kết nối miễn phí',//Free access
      caiPiaoZiXun: 'Người dùng có quyền sử dụng hệ thống cá cược xổ số 1516 miễn phí và lấy thông tin xổ số miễn phí.',//Users have the right to use the 1516 lottery lottery betting system and get lottery information for free.
      caiPiaoChaXun: 'Quyền truy vấn xổ số, tài nguyên mạng và truyền thông',//Lottery inquiry rights, network and communication resources
      youQuanMianFei: 'Sau khi người dùng mua vé số 1516 thành công, người dùng được quyền kiểm tra tình trạng của vé số đã mua trong chương trình xổ số 1516 miễn phí.',//After the user successfully purchases the lottery through the 1516 lottery, he has the right to check the status of the purchased lottery in the 1516 lottery for free.
      jiangJinHuoDeQuan: 'Quyền thưởng',//Right to bonus
      ruoCaiPiaoZhongJiang: 'Nếu người dùng mua xổ số thành công thông qua xổ số 1516, nếu trúng số thì người dùng được nhận tiền thưởng tương ứng.',//If a user succeeds in buying a lottery through the 1516 lottery, if the lottery wins, the user is entitled to the corresponding bonus.
      zhangHuHeChaQuan: 'Quyền xác minh tài khoản',//Account verification rights
      yuEHeCha: 'Người dùng có thể kiểm tra số dư tài khoản bất kỳ lúc nào',//Users can check the account balance at any time


      shenQingTiKuanQuan: 'Đăng ký quyền rút tiền',
      keFuChuLi: 'Người dùng có thể đăng ký rút số dư của mình bất kỳ lúc nào. Xổ số xổ số kiến ​​thiết 1516 sẽ chuyển số tiền cần rút từ khoản thanh toán trước của người dùng cho người dùng trong vòng 3 ngày làm việc kể từ khi nhận được yêu cầu rút tiền với điều kiện nguồn tiền của người dùng là bình thường. Tài khoản ngân hàng đã đăng ký. Các khoản phí ngân hàng phát sinh khi người dùng rút và chuyển tiền sẽ do người dùng chịu. Khi số dư của người dùng nhỏ hơn phí ngân hàng yêu cầu để chuyển khoản, vui lòng liên hệ với bộ phận dịch vụ khách hàng kịp thời',
      yongHuYiWu: 'Nghĩa vụ của Người dùng',
      quanMianZunShou: 'Nghĩa vụ tuân thủ đầy đủ thỏa thuận này',
      zunShouXieYi: 'Trước khi đăng ký làm người dùng xổ số 1516, bạn phải đọc kỹ và hiểu các điều khoản của thỏa thuận này. Khi đăng ký thành công, bạn sẽ được coi là đồng ý với tất cả các điều khoản của thỏa thuận này và người dùng có nghĩa vụ tuân thủ đầy đủ điều này hợp đồng.',
      ruShiTiGong: 'Nghĩa vụ cung cấp thông tin người dùng một cách trung thực',
      weiBaoZhang: 'Để bảo vệ quyền, lợi ích hợp pháp của người dùng và tránh việc thông tin đăng ký của người dùng không trùng khớp với thực tế khi trúng thưởng, đề nghị người dùng cung cấp thông tin người dùng theo nguyên tắc trung thực, toàn diện và chính xác. Người dùng phải hoàn toàn chịu trách nhiệm về việc không đổi được giải thưởng hoặc rút tiền do thông tin người dùng không trung thực, không đầy đủ và không chính xác. Người dùng phải chịu trách nhiệm về các khoản phí ngân hàng khi đăng ký rút tiền vào thẻ ngân hàng của người dùng.',
      duiYingZhuCe: 'Các nghĩa vụ đăng ký tương ứng',
      yongHuChengDan: 'Sau khi người dùng mua xổ số thành công thông qua xổ số 1516, nghiêm cấm mọi hình thức đăng ký lặp lại và đăng ký nhiều lần độc hại, mọi hậu quả do việc này gây ra sẽ do người dùng chịu. Đồng thời, để đảm bảo an toàn cho người dùng, người dùng nên trùng tên thật của người dùng với số tài khoản thẻ ngân hàng. số tài khoản thẻ và tên thật của người dùng.',
      yongHuMingYiWu: 'Nghĩa vụ giữ tên người dùng',
      buDeGengGai: 'Để bảo vệ tính bảo mật của tài khoản người dùng, không thể thay đổi tên người dùng, tên thật của người dùng và số thẻ ngân hàng sau khi đã đăng ký và xác nhận.',
      baoHuZiLiao: 'Nghĩa vụ bảo vệ dữ liệu tài khoản',
      faLvZeRen: 'Thông tin tài khoản người dùng bao gồm mật khẩu người dùng, số tài khoản cá nhân và thông tin cần thiết cho hoạt động của tài khoản người dùng. Người dùng phải bảo mật thông tin tài khoản của mình để tránh thông tin tài khoản bị đánh cắp hoặc giả mạo. Mọi tổn thất và trách nhiệm pháp lý gây ra cho người dùng do người dùng bảo vệ thông tin tài khoản không đúng cách gây ra bởi hành vi trộm cắp hoặc giả mạo sẽ do người dùng chịu.',
      zunShouWangLuoGuanLi: 'Tuân thủ các nghĩa vụ của quản lý an ninh mạng',
      yiWu: 'Người dùng không được phép sử dụng xổ số 1516 để sản xuất, sao chép và phổ biến các thông tin sau:',
      yiWuOne: '一、Kích động chống đối hoặc phá hoại việc thi hành Hiến pháp, pháp luật và các quy định hành chính.',
      yiWuTwo: '二、Kích động lật đổ quyền lực nhà nước, lật đổ hệ thống xã hội chủ nghĩa.',
      yiWuThree: '三、Kích động chia rẽ đất nước, phá hoại đoàn kết dân tộc.',
      yiWuFour: '四、Kích động hận thù dân tộc, kỳ thị dân tộc và phá hoại đoàn kết dân tộc.',
      yiWuFive: '五、Bịa đặt hoặc xuyên tạc sự thật, tung tin đồn và gây rối trật tự xã hội.',
      yiWuSix: ' 六、Quảng bá mê tín dị đoan, tục tĩu, khiêu dâm, cờ bạc, bạo lực, giết người, khủng bố, tiếp tay cho tội phạm.',
      yiWuSeven: '七、Công khai lăng mạ người khác hoặc bịa đặt sự thật để vu khống người khác hoặc thực hiện các cuộc tấn công ác ý khác.',
      yiWuEight: '八、Thiệt hại đến uy tín của các cơ quan nhà nước.',
      yiWuNine: '九、Các vi phạm khác đối với Hiến pháp, pháp luật, quy định hành chính, quy tắc hành chính và các quy định của địa phương.',
      baoHuAnQuanYiWu: 'Nghĩa vụ bảo vệ an ninh trang web',
      jinZhiRenHe: 'Nghiêm cấm mọi hành vi phá hoại xổ số 1516 dưới bất kỳ hình thức nào。',
      chengDanYiWu: 'Nghĩa vụ chịu phí ngân hàng',
      zaiXianYongHuChengDan: 'Người dùng sẽ chịu phí ngân hàng khi đăng ký rút tiền vào thẻ ngân hàng của người dùng。',
      YWYLcaiPiaoQuanLi: '1516 quyền hạn xổ số',
      guanLiQuanLi: 'Quyền quản lý tài khoản người dùng',
      ruGuoYongHu: 'Nếu thông tin do người dùng cung cấp chứa nhiều thông tin đăng ký độc hại trong Điều 4, đoạn 3 hoặc thông tin được liệt kê trong đoạn 7, 1516 Xổ số có quyền đóng băng tài khoản người dùng, hủy tài khoản người dùng hoặc hạn chế sử dụng toàn bộ hoặc một phần của nội dung dịch vụ. Một khi phát hiện thấy thông tin do người sử dụng xổ số 1516 sản xuất, sao chép và phổ biến rõ ràng là một trong những thông tin được liệt kê tại điều 3 khoản 7, xổ số 1516 sẽ ngay lập tức áp dụng các biện pháp như khóa thông tin, đưa ra cảnh báo, và đóng tài khoản người dùng.',
      xiuGaiTiaoKuan: 'Quyền sửa đổi các điều khoản của thỏa thuận này',
      xiuOne: 'Xổ số 1516 có quyền sửa đổi các điều khoản của thỏa thuận khi cần thiết, một khi các điều khoản của thỏa thuận được thay đổi, nó sẽ nhắc nhở hoặc thông báo nội dung sửa đổi trên trang liên quan của Xổ số 1516. Nếu không đồng ý với nội dung thay đổi, người dùng có thể chủ động hủy dịch vụ. Nếu người dùng tiếp tục sử dụng dịch vụ, được coi là đã chấp nhận các thay đổi trong điều khoản dịch vụ. Xổ số 1516 có quyền sửa đổi hoặc ngừng dịch vụ bất cứ lúc nào mà không cần thông báo cho người dùng. Nó chủ yếu bao gồm các tình huống sau: 1. Tăng hoặc giảm loại hình xổ số 1516 Loại xổ số xổ số tùy thuộc vào loại hình có thể mua được trong kỳ hiện tại. Việc tăng giảm loại hình xổ số lâu dài hoặc tạm thời không cần thông báo trước. người dùng.',
      xiuTwo: ' 二、Quyền điều chỉnh thời hạn bán vé số. Xổ số 1516 có quyền điều chỉnh thời hạn bán vé xổ số theo loại hình xổ số và tình hình bán hàng hiện tại mà không cần thông báo trước cho người sử dụng.',
      gouCaiQingQiu: 'Người dùng gửi yêu cầu mua xổ số đến xổ số 1516',
      kuanXiangJinE: '1516 Xổ số có quyền rút từ số dư của nó số tiền cần thiết để yêu cầu xổ số。',
      quanLiYiWu: 'Quyền và nghĩa vụ quy đổi, nhận và phân phối tiền thưởng',
      caiPiaoZhongJiang: 'Trong trường hợp trúng thưởng xổ số, số tiền trúng thưởng do xổ số 1516 tính toán dựa trên tỷ lệ trúng thưởng được chuyển trực tiếp cho người dùng trúng thưởng.',
      zhiZhiGongKuan: 'Quyền ngừng mua xổ số bằng công quỹ',
      guanLiJiGuan: 'Xổ số 1516 có quyền từ chối các quỹ phi cá nhân để mua vé số thông qua Xổ số 1516. Khi phát hiện rằng các khoản tiền đã được chuyển từ quỹ tài khoản phi cá nhân sang tài khoản trả trước của người dùng, Xổ số 1516 có quyền thực hiện các biện pháp như buộc trả lại tiền vào tài khoản ban đầu và chấm dứt thỏa thuận. Xổ số 1516 sẽ báo cáo cơ quan quản lý liên quan.',
      zhiZhiWeiMan: 'Quyền ngăn cản trẻ vị thành niên dưới 18 tuổi mua vé số',
      ruWeiChengNian: 'Nếu trẻ vị thành niên cung cấp thông tin người dùng sai và giả danh người lớn, tất cả các giao dịch xổ số do trẻ vị thành niên thực hiện sẽ bị vô hiệu ngay từ đầu. giải thưởng đều do trẻ vị thành niên gây ra. Người lớn và người đại diện hợp pháp của họ sẽ chịu trách nhiệm.',
      caiPiaoYiWu: 'Chương 1516 xổ số nghĩa vụ',
      yongHuBaoZhangYiWu: 'Nghĩa vụ bảo vệ dữ liệu tài khoản người dùng',
      zeRenDeQuanLi: 'Xổ số 1516 bảo vệ an toàn tối đa thông tin tài khoản người dùng. Khi người dùng xổ số 1516 bị nghi ngờ biển thủ các kênh thanh toán của bên thứ ba khác (chẳng hạn như UnionPay, WeChat, Alipay, v.v.) tiền tài khoản hoặc tài khoản kênh thanh toán của bên thứ ba của họ bị nghi ngờ là bị biển thủ, họ sẽ bị nghi ngờ cá nhân hoặc công ty thanh toán của bên thứ ba. Theo tiền đề rằng nó sẽ chỉ sử dụng thông tin người dùng cho hành vi bị nghi ngờ tham ô và giữ bí mật, Xổ số 1516 sẽ cung cấp cho bên yêu cầu thông tin người dùng bị nghi ngờ tham ô. Người sử dụng Xổ số 1516 đồng ý từ bỏ quyền giữ Xổ số 1516 chịu trách nhiệm trong trường hợp này.',
      gongBuQingKuang: 'Nghĩa vụ thông báo tiền thắng',
      qingKuangWeiZhun: 'Sau khi đại lý phát hành và bán vé số chính thức công bố kết quả trúng thưởng, 1516 vé số này sẽ được áp dụng kết quả trúng thưởng do đại lý phát hành và bán vé số chính thức công bố.',
      zhuanZhangYiWu: 'Nghĩa vụ chuyển giao',
      yinHangZhangHuShang: 'Sau khi đạt đến một số tiền cá cược nhất định, người dùng có thể đăng ký rút số dư của chính mình bất kỳ lúc nào. 1516 Xổ số sẽ kiểm tra nguồn tiền của người dùng và nhận yêu cầu rút tiền trong vòng 3 ngày làm việc. Chuyển tiền vào tài khoản ngân hàng đã đăng ký của người dùng',
      xieYiChengLi: 'Thỏa thuận hình thành, thay đổi và chấm dứt',
      chengLiOne: 'Không thể hoàn thành việc mua vé số do lỗi mạng, vượt quá thời gian mua được chỉ định, không đủ số lượng, v.v. Xổ số 1516 sẽ trả lại số tiền trả trước của người dùng.',
      chengLiTwo: 'Xổ số 1516 có quyền thay đổi các điều khoản của thỏa thuận này mà không cần thông báo trước cho người dùng.',
      chengLiThree: 'Nếu một trong hai bên không thực hiện bất kỳ nghĩa vụ nào được quy định trong thỏa thuận này và không sửa lỗi trong vòng 15 ngày kể từ ngày nhận được thông báo sửa chữa từ bên kia, thì sẽ được coi là đã tự động từ bỏ thỏa thuận này và thỏa thuận sẽ bị chấm dứt đồng thời.',
      chengLiFour: 'Khi bị nghi ngờ mua xổ số bằng công quỹ, nghi ngờ mua xổ số với trẻ vị thành niên và các trường hợp khác bị cấm bởi thỏa thuận này, Xổ số 1516 có quyền chấm dứt thỏa thuận ngay lập tức.',
      mianZeTiaoKuan: 'Tuyên bố từ chối trách nhiệm',
      buYuChengDan: 'Xổ số 1516 sẽ không chịu bất kỳ trách nhiệm pháp lý nào trong các trường hợp sau:',
      yongHuXieLou: 'Rò rỉ dữ liệu người dùng',
      yiQieHouGuo: 'Bất kỳ sự rò rỉ và tranh chấp thông tin cá nhân nào phát sinh từ việc tiết lộ bất kỳ thông tin cá nhân nào do mật khẩu của người dùng gây ra cho người khác hoặc chia sẻ tài khoản đã đăng ký với người khác, hoặc sự sơ suất của người dùng. Mọi hậu quả phát sinh từ việc sử dụng trái phép hoặc sửa đổi thông tin người dùng, giả mạo hoặc biển thủ trái phép mật khẩu người dùng, số tài khoản cá nhân hoặc thông tin đăng ký, bất kể lý do là gì.',
      buKeKangLi: 'Những trường hợp bất khả kháng và bất khả kháng xảy ra',
      buKeYuJian: 'Các tình huống bất khả kháng và không lường trước được bao gồm: thiên tai, hành động của chính phủ, đình công, chiến tranh, v.v ...; các cuộc tấn công của hacker, sự xâm nhập hoặc tấn công của vi rút máy tính, sự kiểm soát của chính phủ, lý do đại lý phát hành và bán vé số, máy rút vé số hoặc lỗi dịch vụ, lỗi mạng, Thay đổi chính sách quốc gia, thay đổi luật và quy định, v.v. Gây ra bởi các trường hợp bất khả kháng và không lường trước được: đóng cửa tạm thời, rò rỉ, mất mát, bị đánh cắp, giả mạo thông tin người dùng hoặc lệnh xổ số, mua xổ số không thành công, xổ số 1516 không nhận được lệnh xổ số, v.v. và các tranh chấp phát sinh từ đó. Thỏa thuận này không thể được thực hiện do những trường hợp bất khả kháng và không lường trước được.',
      yongHuYuanYin: 'Tổn thất do người dùng hoặc lý do của bên thứ ba',
      youYuYongHu: 'Vì lý do riêng của người dùng hoặc vi phạm luật và quy định và lý do của bên thứ ba, người dùng không thể sử dụng dịch vụ xổ số 1516 hoặc gây ra các tổn thất khác.',
      yongHuGouCai: 'Tổn thất do người dùng mua xổ số',
      yongHuGenJu: 'Những thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt và các thiệt hại tiếp theo mà người sử dụng phải gánh chịu khi mua xổ số theo thỏa thuận này.',
      yongHuShiYong: 'Thiệt hại do người dùng sử dụng liên kết hoặc tải xuống tài liệu gây ra',
      youYuShiYong: 'Do việc sử dụng các trang web khác được liên kết với Xổ số 1516, hoặc việc sử dụng thông tin được tải xuống hoặc lấy thông qua Xổ số 1516, làm rò rỉ thông tin người dùng, làm hỏng hệ thống máy tính của người dùng, v.v. và bất kỳ tranh chấp và hậu quả nào phát sinh từ đó gây ra.',
      heTongZuCheng: 'Thành phần hợp đồng',
      zuChengOne: '1516 Trang chủ Xổ số và các trang khác liên quan đến (bao gồm nhưng không giới hạn) quy trình đăng ký thành viên, quy trình thay đổi, quy trình xổ số, thanh toán và quyết toán thành viên, phần thưởng liên quan, dịch vụ thành viên và các quy tắc nội dung hoạt động khác và khai báo pháp lý là các thành phần hợp lệ của thỏa thuận này, Là sự mở rộng cách giải thích của thỏa thuận này, và có hiệu lực pháp lý tương tự như thỏa thuận này.',
      zuChengEr: 'Vui lòng tham khảo "Thông báo pháp lý" để biết chi tiết về bảo vệ quyền riêng tư dữ liệu người dùng, các điều cấm đối với trang web và bảo vệ quyền sở hữu trí tuệ của trang web.',
      zhuYiShiXiang: 'Các biện pháp phòng ngừa',
      zhuYiOne: 'Không được phép đăng ký trên trang này đối với những người dưới 18 tuổi (chưa đủ tuổi). Đồng thời, không khuyến khích sinh viên mua vé số, kể cả sinh viên đại học.',
      zhuYiTwo: 'Để đảm bảo rằng đơn đăng ký mua hàng của bạn có thể được gửi thành công kịp thời, bạn phải có đủ tiền trong tài khoản của mình trước đơn đăng ký mua hàng hiện tại.',
      zhuYiThree: 'Xin lưu ý khi sử dụng nền tảng thanh toán trực tuyến: bất kể loại hệ thống thanh toán trực tuyến nào được sử dụng, sẽ phải trả một khoản phí xử lý nhất định.',
      zhuYiFour: 'Hãy đảm bảo rằng địa chỉ email của bạn có giá trị sử dụng lâu dài. Và luôn chú ý kiểm tra thư của trang web này.',
      zhuYiFive: 'Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ với chúng tôi kịp thời。',
      zhuYiFiveTiShi: 'Nhắc nhở: Mua vé số có rủi ro, cá cược qua mạng phải thận trọng',
      keFuZhongXinReXian: 'Đường dây nóng dịch vụ khách hàng：',
      guanLiYuanXinXiang: 'Hộp thư quản trị viên：'
    },
    BScroll: {
      jiaZaiGengDuo: 'tải thêm',
      shiFangShuaXin: 'Phát hành để làm mới',
      meiYouGengDuo: 'Không có thêm dữ liệu'
    },
    Introduce: {
      RHCWDL: 'Làm thế nào để trở thành một đại lý？',//如何成为代理
      CWDLcontent: 'Nếu bạn muốn trở thành đại lý, vui lòng gửi đơn đăng ký tại trung tâm đại lý. Sau khi vượt qua bài đánh giá, bạn có thể trở thành đại lý. Nếu bạn có bất kỳ câu hỏi nào',//If you want to become an agent, please submit an application in the agent center, and you can become an agent after passing the review. Contact customer service if you have any questions.
      contactCustomerService: 'liên hệ với dịch vụ khách hàng。',
      RHZQYJ: 'Cách kiếm tiền hoa hồng？',//How to earn commission
      ZQYJcontent: 'Hoa hồng = (tự hoàn trả-mức hoàn trả cấp thấp hơn) x số tiền đặt cược / 100, nếu bạn tự hoàn trả 13 và hoàn trả cấp thấp hơn 10, bạn sẽ nhận được 3% số tiền đặt cược cấp thấp hơn và nếu đặt cược cấp thấp hơn 1.000 nhân dân tệ, bạn sẽ nhận được 30 nhân dân tệ, Nhấp để mở tài khoản ở cấp thấp hơn, bạn có thể xem mức giảm giá của bản thân và cấp thấp hơn, đồng thời bạn cũng có thể đặt mức giảm giá cho cấp thấp hơn.',//Commission = (self-rebates-lower-level rebates) x bet amount / 100, if you rebate 13 yourself and lower-level rebates 10, you will get a 3% rebate commission from the lower-level bet. If you bet 1000 yuan at the lower level, you will get 30 yuan. Click to open an account at a lower level, you can view the rebate of yourself and the lower level, and you can also set the rebate for the lower level.
      RHWXJKH: 'Cách mở tài khoản cho cấp dưới?',//如何为下级开户
      XJKHcontent:'Nhấp để mở tài khoản ở cấp dưới, trước tiên hãy thiết lập một khoản giảm giá cho cấp dưới của bạn. Sau khi thiết lập thành công, một mã mời và mã QR sẽ được tạo và mã mời hoặc mã QR sẽ được gửi đến cấp dưới của bạn để Sau khi đăng ký thành công, họ sẽ là cấp dưới của bạn. Nếu bạn thiết lập một tài khoản loại đại lý cho cấp dưới của mình, thì cấp dưới của bạn có thể tiếp tục phát triển cấp dưới của họ, bất kể bạn phát triển bao nhiêu cấp, bạn đều có thể nhận được hoa hồng; nếu bạn thiết lập loại người chơi, thì cấp dưới của bạn chỉ có thể đặt cược, không Cho dù bạn phát triển cấp dưới như thế nào, bạn cũng không thể nhìn thấy trung tâm đại lý.',
      RHZQGZ: 'Làm thế nào để kiếm được tiền lương?',//如何赚取工资？
      ZQGZcontent: 'Lương đại lý là một tập hợp mới của hệ thống quyết toán đại lý, có ưu điểm là dễ dàng thăng tiến và tạo động lực cho đội ngũ đại lý. Sau khi kết thúc mỗi giai đoạn thanh toán, nền tảng sẽ trả lương dựa trên hiệu suất của đại lý và bạn có thể xem chi tiết tiền lương trong trung tâm đại lý. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận chăm sóc khách hàng.',
      Reminder: 'Lời khuyên',
      FDBT: 'Các khoản giảm giá khác nhau có tỷ lệ cược khác nhau. Hãy nhấp vào bảng trả thưởng để xem tỷ lệ giảm giá. Tỷ lệ giảm giá càng thấp, tỷ lệ cược càng thấp. Khuyến nghị rằng khoản giảm giá được đặt cho mức thấp hơn không nên quá thấp.',//Different rebates have different odds. Click on the rebate odds to view the rebate odds; the lower the rebate, the lower the odds. It is recommended to set the rebate for the lower level not too low.
    }
  }
}
export default vi;
