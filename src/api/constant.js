let judegeSec = () => {
    let ishttps = 'https:' == document.location.protocol ? true: false;
    var url = window.location.host;
      if(ishttps){
        return true;
   }else{
        return false;
   }
}

export const constant = {
    // baseURL: judegeSec()? 'https://anlan.club':'http://anlan.club',
    // baseURL: 'http://182.254.215.204/',
    baseURL: 'http://192.168.0.111:8080/',
};