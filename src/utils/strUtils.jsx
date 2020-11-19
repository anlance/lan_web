
// 字符串判空
export function empty(str) {
      if (str == 'undefined' || !str || !/[^\s]/.test(str)) {
            return true;
      } else {
            return false;
      }
}
