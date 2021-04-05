import React from 'react';
import { Upload, message, Button, Row, Col, List, Typography } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import service from "../../../api/http";

const { Dragger } = Upload;

// 上传文件
const props = {
  name: 'file',
  multiple: false,
  action: 'http://127.0.0.1:8080/basic/file/uploadFile',
  showUploadList: false,
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};





// 回收站



class MyUpLoadFile extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    fileList: {
      records:[],
      size: 1,
      total:1,
      current:1
    },
    deletedFileList: [],
}

  // 文件列表
  getFileList = (pageNum, pageSize) => {
    let url = 'http://127.0.0.1:8080/basic/file/getFiles?pageNum='+pageNum+'&pageSize='+pageSize;
    service.get(url)
      .then(respose => {
        this.setState({
          fileList: respose.data,
        })
        console.log(this.state.fileList);
      });
  };

  onChange = (page) => {
    console.log(page+"-------");
    this.getFileList(page, 1);
  };

  // 下载文件
  handleDownload =(record)=>{
    const downloadUrl = 'http://127.0.0.1:8080/basic/file/downloadFile/' + record.id; // 接口请求地址
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
        aLink.style.display='none';
        const objectUrl = window.URL.createObjectURL(blob);
        aLink.href = objectUrl;
        aLink.download = `${record.name}`;
        aLink.click();
        document.body.removeChild(aLink);
      });
    }).catch((error) => {
      console.log('文件下载失败', error);
      message.error(`${record.name} file download failed.`);
    });
  };


  render() {

    let col =
      <Col span={11} >
        <List
          bordered
          header="faker"
          dataSource={this.state.fileList.records}
          pagination={{pageSize:this.state.fileList.size, total:this.state.fileList.total, current:this.state.fileList.current, onChange:this.onChange}}
          renderItem={item => (
            <List.Item>
              [<Typography.Text mark style={{textAlign:'left'}}>{item.type}</Typography.Text>] {item.name}  <Button key={item.id} onClick={()=>this.handleDownload(item)}>下载</Button>
            </List.Item>
          )}
        />
      </Col>;

    return (
      <div style={{ minHeight: '87vh', borderRadius: '1vh' }}>
        <Row style={{ padding: '20px' }}>
          <Col span={8} ></Col>
          <Col span={8} >
            <Dragger {...props} style={{ borderRadius: '5px' }}>
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
            <Button onClick={()=>this.getFileList(1,1)}>123</Button>
          </Col>
          <Col span={8} ></Col>
        </Row>
        <Row style={{ minHeight: '60vh', padding: '20px' }}>
          {col}
          <Col span={2}></Col>
          {col}
        </Row>
      </div >
    )
  }
}



export default MyUpLoadFile;