import MyQrCode from '../../components/tools/qrcode';
import MyJsonViewer from '../../components/tools/jsonViewer';
import MyMoment from '../../components/tools/moment';
import MyEncode from '../../components/tools/code';
import { fgColors } from './list';


let qrCodeFgColor = fgColors[Math.floor((Math.random() * fgColors.length))];

export const toolEnumList = (data,settings,format) => [{
        'key': 0,
        'type': 'QRCODE',
        'placeHolder': '输入需要生成二维码的源数据',
        'name': '二维码生成',
        'view': <div className="emptyDiv"><MyQrCode qrUrl={data} fgColor={qrCodeFgColor} /></div>,
        'settings': undefined
    },
    {
        'key': 1,
        'type': 'JSON',
        'placeHolder': '输入需要解析成JSON的源数据',
        'name': 'JSON 格式化',
        'view': <div style={{ textAlign: 'left', height: '35vh' }}><MyJsonViewer jsonSrc={data} /></div>,
        'settings': undefined
    },
    {
        'key': 2,
        'type': 'MOMENT',
        'placeHolder': '输入时间戳或者时间',
        'name': '时间转换',
        'view': <div className="emptyDiv"><MyMoment time={data} format={format} /></div>,
        'settings': {settings}
    },
    {
        'key': 3,
        'type': 'ENCODE',
        'placeHolder': '输入需要进行转换的中文',
        'name': '中文转Unicode',
        'view': <div className="emptyDiv"><MyEncode str={data} /></div>,
        'settings': undefined
    },
    {
        'key': 4,
        'type': 'COLOR',
        'placeHolder': '输入颜色格式',
        'name': '颜色选择与转换',
        'view': <div className="emptyDiv"><MyEncode str={data} /></div>,
        'settings': undefined
    },
];