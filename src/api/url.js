const basicPrefix = "/basic";
const authPrefix = "/auth";

export const URL = {



    // basic
    basicUrl: {

        /**
         * 获取盐值
         */
        getSalt: basicPrefix + '/user/getSalt',

        /**
         * 获取菜单
         */
        listMenu: basicPrefix + '/menu/list',

    },

    // auth
    authUrl: {

        /**
         * 获取 token
         */
        getToken: authPrefix + '/token',
    }

};