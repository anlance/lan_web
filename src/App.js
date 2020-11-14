import './App.css';
import logo from './logo.svg';
import { Divider, Layout } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
const { Sider, Content } = Layout;


function App() {
  return (
    <div className="App">
      <Layout>
        
        <Content style={{height: '94vh'}}>
          <div className="Bg">
          <Header style={{height:'8vh'}}/>
          </div>
          <div style={{height:'50%'}}>2</div>
        </Content>
        <Footer tyle={{height:'8vh'}}/>
      </Layout>
    </div>
  );
}

export default App;
