import React from 'react';
import { Upload, message, Row, Col, } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import service from "../../../api/http";
import { constant } from '../../../api/constant';
import MyFileList from "./list"

const { Dragger } = Upload;


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
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            this.getList(1, 10);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        
    }

    render() {

        // 上传文件
        const props = {
            name: 'file',
            multiple: false,
            action: constant.baseURL + '/basic/file/uploadFile',
            showUploadList: false,
            getList: this.getList
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