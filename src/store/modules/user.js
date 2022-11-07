// 用户模块


export default {
    namespaced: true,
    state() {
        return {
            // 用户信息
            profile: {
                id: '',//ID
                avatar: '',//头像
                nickname: '',//昵称
                account: '',//账号
                mobile: '',//手机号
                token: ''//Token

            }

        }

    },
    mutations: {
        // 修改用户信息,payload就是用户信息对象
        setUser(state, payload) {
            state.profile = payload
        }
    }

}