import {Col, Row} from "antd";
import SuccessImage from "./../../assets/images/success-image.svg"

const Success = (props) => {

    return (
        <div style={{ display: props.visible ? 'block' : 'none'}}>
            <h1>User successfully registered</h1>
            <Row>
                <Col span={24} className="success-image">
                    <img src={SuccessImage} alt=""/>
                </Col>
            </Row>
        </div>
    )
}

export default Success