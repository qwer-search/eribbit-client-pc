import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'


import cart from "./modules/cart";
import user from "./modules/user";
import category from "./modules/category";


export default createStore({
  modules: {
    cart, user, category
  },
  // 配置插件
  plugins: [
    createPersistedstate({
      // 本地储存名字
      key: 'eribbit-client-pc-store',
      // 指定需要储存的模块
      paths: ['user', 'cart']

    })
  ]

})
