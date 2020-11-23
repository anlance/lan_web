
// 字符串判空
export function empty(str) {
      if (str == 'undefined' || !str || !/[^\s]/.test(str)) {
            return true;
      } else {
            return false;
      }
}

// 是否是JSON字符串
export function isJSONStr(str) {
      if (typeof str == 'string') {
          try {
              var obj=JSON.parse(str);
              if(typeof obj == 'object' && obj ){
                  return true;
              }else{
                  return false;
              }
          } catch(e) {
              return false;
          }
      }
  }