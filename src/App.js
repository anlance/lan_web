import './App.css';
import logo from './logo.svg';
import { Divider, Layout } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import MyHeatMap from './components/chart/HeatMap'
const { Sider, Content } = Layout;


function App() {
  return (
    <div className="App">
      <Layout>
        <Content>
          <div className="Bg" style={{ height: '100vh' }}>
            <Header />
            <div style={{ minHeight: '60vh' }}>
              <div style={{ minHeight: '60vh' }}>
                {/* <MyHeatMap /> */}
              </div>
              <div style={{ minHeight: '10vh' }}>
                <Footer />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
