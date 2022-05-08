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

        /**
         * 获取地图key
         */
        getMapKey: basicPrefix + '/user/webMap/getMapWebKey',

        /**
         * 获取PATH
         */
        getPath: basicPrefix +'/user/webMap/getLocationList',

    },

    // auth
    authUrl: {

        /**
         * 获取 token
         */
        getToken: authPrefix + '/token',
    }

};