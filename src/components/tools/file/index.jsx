import React from 'react';
import { Upload, message, Row, Col, notification } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import service from "../../../api/http";
import { constant } from '../../../api/constant';
import MyFileList from "./list"

const { Dragger } = Upload;

const key = 'UPLOAD_PERCENT';

class MyUpLoadFile extends React.Component {

    constructor(props) {
        super(props);
        this.getList(1, 10);
    }

    state = {
        fileList: {
            records: [],
            size: 1,
            total: 1,
            current: 1
        },
        deletedFileList: {
            records: [],
            size: 1,
            total: 1,
            current: 1
        },
        percent: 0,
        pageSize: 10,
    }

    // 文件列表
    getFileList = (pageNum, pageSize) => {
        let url = constant.baseURL + '/basic/file/getFiles?pageNum=' + pageNum + '&pageSize=' + pageSize;
        service.get(url)
            .then(respose => {
                this.setState({
                    fileList: respose.data,
                })
            });
    };

    // 回收站
    getDeltedFileList = (pageNum, pageSize) => {
        let url = constant.baseURL + '/basic/file/getFiles?pageNum=' + pageNum + '&pageSize=' + pageSize + "&deleteFlag=0";
        service.get(url)
            .then(respose => {
                this.setState({
                    deletedFileList: respose.data,
                })
            });
    };

    // 获取所有文件
    getList = (pageNum, pageSize) => {
        this.getFileList(pageNum, pageSize);
        this.getDeltedFileList(pageNum, pageSize);
    }

    // 文件翻页
    onChange = (page) => {
        this.getFileList(page, this.state.pageSize);
    };

    // 回收站翻页
    onDeltedChange = (page) => {
        this.getDeltedFileList(page, this.state.pageSize);
    };

    onFileChange = (info) => {
        // 上传状态
        const { status } = info.file;
        // 上传进度
        const { percent } = info.file;
        console.log(`${parseFloat(percent.toFixed(2))}%`);
        this.setState({
            percent: percent,
        })
        if (status === 'uploading') {
            notification.open({
                key,
                message: `【${info.file.name}】正在上传中`,
                description: `上传进度【${parseFloat(percent.toFixed(2))}%】`,
                duration: 10,
            });
        }
        if (status === 'done') {
            notification.open({
                key,
                message: `【${info.file.name}】正在上传成功`,
                description: `上传进度【${parseFloat(percent.toFixed(2))}%】`,
                duration: 3,
            });
            this.getList(1, 10);
        } else if (status === 'error') {
            notification.open({
                key,
                message: `【${info.file.name}】正在上传失败 `,
                description: `上传进度【${parseFloat(percent.toFixed(2))}%】`,
                duration: 3,
            });
        }

    }

    uuid = () => {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
     
        var uuid = s.join("");
        return uuid;
    }



    customBigReq = (item) => {
        const size = item.file.size;
        const chunkSize = 1024 * 4;
        const maxChunk = Math.ceil(size / chunkSize);
        var uuid = this.uuid();
        for (var index = 0; index < maxChunk; index++) {
            const start = index * chunkSize;
            let end = start + chunkSize;
            if (size - end < 0) {
                end = size;
            }
            let file = item.file.slice(start, end);
            const formData = new FormData();
            // var arrayObj = new Array();
            // arrayObj.push(file);
            // let chunkFile = {
            //     'files': arrayObj,
            //     'chunkSize': file.size,
            //     'fileSize': size,
            //     'fileName': size,
            //     'fileMd5':  this.uuid(),
            //     'curIndex': index,
            //     'allIndex': maxChunk
            // }
            formData.append('files',file);
            formData.append('chunkSize',file.size);
            formData.append('fileSize',size);
            formData.append('fileName',item.file.name);
            formData.append('fileMd5',uuid);
            formData.append('curIndex',index);
            formData.append('allIndex',maxChunk);
            let url = constant.baseURL + '/basic/file/uploadChunkFile';
            fetch(url, {
                method: 'post',
                body: formData,
                credentials: 'include'
            }).then((response) => {
                message.success(`上传测试.`);
            }).catch((error) => {
                message.error(`上传测试失败.`);
            });
            this.sleep(3000);
        }
    }

    sleep = function(time) {
        var startTime = new Date().getTime() + parseInt(time, 10);
        while(new Date().getTime() < startTime) {}
    };

    render() {

        // 上传文件
        const props = {
            name: 'file',
            multiple: false,
            action: constant.baseURL + '/basic/file/uploadFile',
            showUploadList: false,
            getList: this.getList,
            customRequest: this.customBigReq
        };

        let fileProps = {
            header: "文件列表",
            type: 1,
            dataSource: this.state.fileList.records,
            pagination: { pageSize: this.state.fileList.size, total: this.state.fileList.total, current: this.state.fileList.current, onChange: this.onChange },
            getList: this.getList
        }

        let deltedFileProps = {
            header: "回收站",
            type: 0,
            dataSource: this.state.deletedFileList.records,
            pagination: { pageSize: this.state.deletedFileList.size, total: this.state.deletedFileList.total, current: this.state.deletedFileList.current, onChange: this.onDeltedChange },
            getList: this.getList
        }

        return (
            <div style={{ minHeight: '87vh', borderRadius: '1vh' }}>
                <Row style={{ padding: '20px' }}>
                    <Col span={8} ></Col>
                    <Col span={8} >
                        <Dragger {...props} style={{ borderRadius: '5px' }} onChange={this.onFileChange}>
                            <p className="ant-upload-drag-icon">
                                <CloudUploadOutlined />
                            </p>
                            <p className="ant-upload-text">点击或拖拽文件到此次进行上传</p>
                        </Dragger>
                    </Col>
                    <Col span={8} ></Col>
                </Row>
                <Row style={{ minHeight: '60vh', padding: '20px' }}>
                    <MyFileList data={fileProps} />
                    <Col span={2} />
                    <MyFileList data={deltedFileProps} />
                </Row>
            </div >
        )
    }
}



export default MyUpLoadFile;