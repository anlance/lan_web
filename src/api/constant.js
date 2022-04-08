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
    baseURL: 'http://127.0.0.1:8080',
};