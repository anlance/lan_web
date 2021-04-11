import React from 'react';
import { message, Button, Col, List, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { constant } from '../../../api/constant';




class MyFileList extends React.Component {

    constructor(props) {
        super(props);
    }

    // 下载文件
    handleDownload = (record) => {
        const downloadUrl = constant.baseURL + '/basic/file/downloadFile/' + record.id; // 接口请求地址
        fetch(downloadUrl, {
            method: 'get',
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }).then((response) => {
            response.blob().then(blob => {
                const aLink = document.createElement('a');
                document.body.appendChild(aLink);
                aLink.style.display = 'none';
                const objectUrl = window.URL.createObjectURL(blob);
                aLink.href = objectUrl;
                aLink.download = `${record.name}`;
                aLink.click();
                document.body.removeChild(aLink);
            });
        }).catch((error) => {
            message.error(`${record.name} 下载失败.`);
        });
    };

    // 删除文件
    deletedFile = (record) => {
        const url = constant.baseURL + '/basic/file/deleteFile/' + record.id;
        fetch(url, {
            method: 'delete',
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }).then((response) => {
            message.success(`${record.name} 删除成功.`);
            this.props.data.getList(this.props.data.pagination.current, this.props.data.pagination.pageSize);
        }).catch((error) => {
            message.error(`${record.name} 删除失败.`);
        });
    }

    // 复原文件
    recoveryFile = (record) => {
        const url = constant.baseURL + '/basic/file/recoveryFile/' + record.id;
        fetch(url, {
            method: 'put',
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }).then((response) => {
            message.success(`${record.name} 移出回收站成功.`);
            this.props.data.getList(this.props.data.pagination.current, this.props.data.pagination.pageSize);
        }).catch((error) => {
            message.error(`${record.name} 移出回收站失败.`);
        });
    }

    // 彻底删除文件
    deleteFileReal = (record) => {
        const url = constant.baseURL + '/basic/file/deleteFileReal/' + record.id;
        fetch(url, {
            method: 'delete',
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }).then((response) => {
            message.success(`${record.name} 彻底删除成功.`);
            this.props.data.getList(this.props.data.pagination.current, this.props.data.pagination.pageSize);
            // this.props.data.getList();
        }).catch((error) => {
            message.error(`${record.name} 彻底删除失败.`);
        });
    }


    render() {
        return (
            <Col span={11}>
                <List
                    bordered
                    header={this.props.data.header}
                    dataSource={this.props.data.dataSource}
                    pagination={this.props.data.pagination}
                    renderItem={item => (
                        <List.Item>
                            [<Typography.Text mark style={{ textAlign: 'left' }}>{item.type}</Typography.Text>]
                            {item.name}
                            {this.props.data.type == 1 ?
                                <span>
                                    <Button key={item.id+'1'} style={{ marginLeft: '10px' }} type="primary" icon={<DownloadOutlined />} onClick={() => this.handleDownload(item)} size='small' />
                                    <Button key={item.id+'2'} style={{ marginLeft: '10px' }} type="dashed" danger onClick={() => this.deletedFile(item)} size='small' >
                                        删除
                                </Button>
                                </span>
                                : <span>
                                    <Button key={item.id+'3'} style={{ marginLeft: '10px' }} type="default" onClick={() => this.recoveryFile(item)} size='small' >
                                        移出回收站
                                </Button>
                                    <Button key={item.id+'4'} style={{ marginLeft: '10px' }} type="primary" danger onClick={() => this.deleteFileReal(item)} size='small'>
                                        彻底删除
                                </Button>
                                </span>
                            }

                        </List.Item>
                    )}
                />
            </Col>
        )
    }
}



export default MyFileList;