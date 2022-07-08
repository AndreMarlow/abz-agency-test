import "./App.scss"
import {Col, Row, Layout, Button} from 'antd'
import Logo from "./assets/images/Logo.svg"
import RequestForm from "./components/RequestForm"
import UserList from "./components/UserList";
const {Header, Content} = Layout;


function App() {
    return (
        <Layout>
            <Header className="header">
                <div className="menu">
                    <Row>
                        <Col span={18}>
                            <img src={Logo} alt="React Logo"/>
                        </Col>
                        <Col span={6}>
                            <div className="menu-buttons">
                                <Button className="core-button active w-100">Users</Button>
                                <Button className="core-button active w-100">Sign up</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Header>
            <Content className="container">
                <Row>
                    <Col span={24} className="title">
                        <div className="title-content">
                            <h1>Test assignment for front-end developer</h1>
                            <div className="text">What defines a good front-end developer is one that has skilled
                                knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll
                                be building web interfaces with accessibility in mind. They should also be excited to
                                learn, as the world of Front-End Development keeps evolving.
                            </div>
                            <Button className="core-button active w-100">Sign Up</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="content">
                        <UserList/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="request-form">
                        <RequestForm/>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default App;
