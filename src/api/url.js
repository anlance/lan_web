const basicPrefix = "/basic";
const authPrefix = "/auth";

export const URL = {



    // basic
    basicUrl: {

        // 获取盐值
        getSalt: basicPrefix + '/user/getSalt',

    },

    // auth
    authUrl: {

        // 获取 token
        getToken: authPrefix + '/token',
    }

};