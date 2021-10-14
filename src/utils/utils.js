export default class utils {
    static checkPwd(v) {
        const reg = /^[_0-9a-z]{6,16}$/
        return reg.test(v)
    }

    static padLeadingZero(value) {
        return value > 9 ? value : `0${value}`
    }

    static dateFormat(t, style = 1) {
        const d = new Date()
        d.setTime(t)
        if (style === 2) {
            return `${d.getFullYear()}-${this.padLeadingZero(d.getMonth() + 1)}-${this.padLeadingZero(d.getDate())}`
        } else if (style === 3) {
            return `${d.getFullYear()}-${this.padLeadingZero(d.getMonth() + 1)}`
        }
        return `${d.getFullYear()}-${this.padLeadingZero(d.getMonth() + 1)}-${this.padLeadingZero(d.getDate())} ${d.getHours()}:${this.padLeadingZero(d.getMinutes())}:${this.padLeadingZero(d.getSeconds())}`
    }

    // 获取指定天的24:00时间戳
    static dayEndTime(t) {
        const d = new Date()
        if (t === undefined || t === null || t === '') {
            t = new Date()
        }
        d.setTime(Number(t) + 86400000) // 往前加一天
        const retD = new Date(d.getFullYear() + '/' + this.padLeadingZero(d.getMonth() + 1) + '/' + this.padLeadingZero(d.getDate()))
        return retD.getTime() - 1000
    }

    // 获取指定天的00:00时间戳
    static dayStartTime(t) {
        const d = new Date()
        if (t === undefined || t === null || t === '') {
            t = new Date()
        }
        d.setTime(Number(t))
        const retD = new Date(d.getFullYear() + '/' + this.padLeadingZero(d.getMonth() + 1) + '/' + this.padLeadingZero(d.getDate()))
        return retD.getTime()
    }

    // 时间格式化处理
    static formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
            }
        }
        return fmt
    }

    static formatAmount(number) {
        let newStr = "";
        let count = 0;
        let negative = number < 0;
        let str = number.toString().replace('-','');
        if (str.indexOf(".") === -1) {
            for (let i = str.length - 1; i >= 0; i--) {
            if (count % 3 === 0 && count !== 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
            }
            str = newStr + ".00"; //自动补小数点后两位
        } else {
            for (let i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 === 0 && count !== 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
        }
        if(negative) {
            str = '-'+str
        }
        // let arr = str.split('.');
        return str
    }

    static range(start, end) {
        return Array.apply(null, Array(end - start)).map((x, i) => i + start)
    }

    static getLotteryInfo(lotteryId) {
        let v = this.getLotteryById(lotteryId);
        if (v) {
            return v.code;
        }
    }

    static mapArr(ids, key) {
        let singleArr = Array.from({length: 11})
        let arr = singleArr.map((val, i) => {
            let num = ''
            i < 9 ? num = '0' + (i + 1) : num = i + 1 + '' // 号码模拟
            val = JSON.parse(JSON.stringify(ids))
            val.value = num
            val.alias = num
            return val
        })
        return arr
    }

    static getLotteryById(lotteryId) {
        let lotteryList = this.getSessionStorage('LotteryTypeList');
        for (let v of lotteryList) {
            if (v.id == lotteryId) {
                return v;
            }
        }
    }

    static getSessionStorage(key) {
        return JSON.parse(sessionStorage.getItem(key));
    }

    static setSessionStorage(key, obj) {
        return sessionStorage.setItem(key, JSON.stringify(obj));
    }

    static deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    static setActive(index, obj) {
        let deepCopy = this.deepCopy(obj);
        deepCopy.map(v => v.on = false);
        deepCopy[index].on = true;
        return deepCopy;
    }

    static trendGameMaps(e) {
        let t = ["ssc", "fc3d", "pk10", "k3", "11x5"];
        let obj = {
            tabs: [],
            trendChartColumns: []
        }
        if (t.includes(e.type)) {
            switch (e.type) {
                case 'ssc':
                    obj.tabs = ["万", "千", "百", "拾", "个"];
                    obj.trendChartColumns = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                    break;
                case 'fc3d':
                    obj.tabs = ["百", "拾", "个"];
                    obj.trendChartColumns = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                    break;
                case 'pk10':
                    obj.tabs = ["冠", "亚", "三", "四", "五", "六", "七", "八", "九", "十"];
                    obj.trendChartColumns = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
                    break;
                case '11x5':
                    obj.tabs = ["一", "二", "三", "四", "五"];
                    obj.trendChartColumns = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
                    break;
                case 'k3':
                    obj.tabs = ["一", "二", "三"];
                    obj.trendChartColumns = ["1", "2", "3", "4", "5", "6"];
                    break;
            }

            return obj;
        }
    }

    static getElementPostion(elementNode, retiveTop = 0) {
        let postion = {
            left: 0,
            top: 0,
            offsetWidth: elementNode.offsetWidth,
            offsetHeight: elementNode.offsetHeight
        }
        do {
            postion.left = postion.left + elementNode.offsetLeft;
            postion.top = postion.top + elementNode.offsetTop;
            elementNode = elementNode.parentElement;
        } while (elementNode)
        postion.top -= retiveTop;
        postion.left = postion.left + postion.offsetWidth / 2;
        return postion;
    }

    static setThemesData(data) {
        let key = 'themes';
        if (data) {
            this.setSessionStorage(key, data)
        }
    }

    static getThemesData() {
        let key = 'themes';
        return  this.getSessionStorage(key) || 'hjb-black';
    }
}
