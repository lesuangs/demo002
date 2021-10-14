const state = {
    imgSuffix: Math.ceil(Math.random() * 10000),
    // 初始版本
    navList: [
        {
            // name: i18n.t('lang.home'),
            name: 'lang.footer.home',
            link: '/',
            icon: {
                active: require('../../assets/img/nav_home_sel.png'),
                inactive: require('../../assets/img/nav_home_notsel.png')
            }
        },
        {
            name: 'lang.footer.Draw',
            link: '/Draw',
            icon: {
                active: require('../../assets/img/nav_lottery_sel.png'),
                inactive: require('../../assets/img/nav_lottery_notsel.png')
            }
        },
        {
            name: 'lang.footer.Lottery',
            link: '/Lottery',
            icon: {
                active: require("@/assets/themes/hjb/black/gou-cai.svg"),
                inactive: require("@/assets/themes/hjb/black/gou-cai.svg")
                /*active: require('../../assets/img/nav_buyingcolor_sel.png'),
                inactive: require('../../assets/img/nav_buyingcolor_sel.png')*/
            }
        },
        {
            name: 'lang.footer.betSlip',
            link: '/Note',
            icon: {
                active: require('../../assets/img/nav_notelist_sel.png'),
                inactive: require('../../assets/img/nav_notelist_notsel.png')
            }
        },
        {
            name: 'lang.footer.member',
            link: '/user',
            icon: {
                active: require('../../assets/img/nav_member_sel.png'),
                inactive: require('../../assets/img/nav_member_notsel.png')
            }
        }
    ],
    // 蓝色版本底部
    navListBlue: [
        {
            // name: i18n.t('lang.home'),
            name: 'lang.footer.home',
            link: '/',
            icon: {
                active: require('../../assets/img/blue/iconf-1s.svg'),
                inactive: require('../../assets/img/blue/iconf-1.svg')
            }
        },
        {
            name: 'lang.footer.Draw',
            link: '/Draw',
            icon: {
                active: require('../../assets/img/blue/iconf-2s.svg'),
                inactive: require('../../assets/img/blue/iconf-2.svg')
            }
        },
        {
            name: '',
            link: '/Lottery',
            icon: {
                active: require('../../assets/img/blue/oval.svg'),
                inactive: require('../../assets/img/blue/oval.svg')
            }
        },
        {
            name: 'lang.footer.betSlip',
            link: '/Note',
            icon: {
                active: require('../../assets/img/blue/iconf-3s.svg'),
                inactive: require('../../assets/img/blue/iconf-3.svg')
            }
        },
        {
            name: 'lang.footer.member',
            link: '/User',
            icon: {
                active: require('../../assets/img/blue/iconf-4s.svg'),
                inactive: require('../../assets/img/blue/iconf-4.svg')
            }
        }
    ],
    // 橙色版本底部
    navListOrange: [
        {
            // name: i18n.t('lang.home'),
            name: 'lang.footer.home',
            link: '/',
            icon: {
                active: require('../../assets/img/orange/iconf-1s.svg'),
                inactive: require('../../assets/img/orange/iconf-1.svg')
            }
        },
        {
            name: 'lang.footer.Draw',
            link: '/Draw',
            icon: {
                active: require('../../assets/img/orange/iconf-2s.svg'),
                inactive: require('../../assets/img/orange/iconf-2.svg')
            }
        },
        {
            name: '',
            link: '/Lottery',
            icon: {
                active: require('../../assets/img/orange/oval.svg'),
                inactive: require('../../assets/img/orange/oval.svg')
            }
        },
        {
            name: 'lang.footer.betSlip',
            link: '/Note',
            icon: {
                active: require('../../assets/img/orange/iconf-3s.svg'),
                inactive: require('../../assets/img/orange/iconf-3.svg')
            }
        },
        {
            name: 'lang.footer.member',
            link: '/User',
            icon: {
                active: require('../../assets/img/orange/iconf-4s.svg'),
                inactive: require('../../assets/img/orange/iconf-4.svg')
            }
        }
    ],
    lotteryGames: {}
}

const mutations = {
    SET_IMG_SUFFIX: (state, data) => {
        state.imgSuffix = data
    },
    SET_LOTTERY_GAMES: (state, data) => {
        state.lotteryGames = data
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
