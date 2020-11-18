import Tools from '../views/tools';
import Index from '../views/index';

export const routerConfig = [
      {path: '/', exact: true, name: '首页', component: Index },
      {path: '/index', exact: true, name: '首页', component: Index },
      {path: '/tools', exact: true, name: '工具', component: Tools }
]