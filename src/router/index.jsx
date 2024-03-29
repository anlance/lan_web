import Tools from '../views/tools';
import Index from '../views/index';
import Files from '../views/files';
import AMap from '../views/aMap';



export const routerConfig = [
      {path: '/', exact: true, name: '首页', component: Index },
      {path: '/index', exact: true, name: '首页', component: Index },
      {path: '/tools', exact: true, name: '工具', component: Tools },
      {path: '/files', exact: true, name: '文件中转站', component: Files },
      {path: '/aMap', exact: true, name: '地图', component: AMap }
]