import {Button, Col, Input, Radio, Row, Space} from "antd";
import "./styles.scss"
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Success from "./Success";

function RequestForm() {
    const [token, setToken] = useState(null)
    const [positions, setPositions] = useState([])
    const [positionId, setPositionId] = useState(1)
    const [success, setSuccess] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        file: null
    })

    const hiddenFileInput = useRef(null)

    useEffect(() => {
        axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`)
            .then(response => response.data)
            .then(data => {
                setPositions(data.positions)
            })

        axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
            .then(response => response.data)
            .then(data => setToken(data.token))

    }, [])

    const handleSignUp = () => {
        const bodyFormData = new FormData()

        bodyFormData.append('name', formData.name)
        bodyFormData.append('email', formData.email)
        bodyFormData.append('phone', formData.phone)
        bodyFormData.append('position_id', positionId)
        bodyFormData.append('photo', formData.file)

        axios({
            method: "post",
            url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users',
            data: bodyFormData,
            headers: {
                "Token": token,
                "Content-Type": "multipart/form-data"
            },
        })
            .then( (response) => {
                console.log('response', response);
                setSuccess(true)
            })
            .catch((response) => {
                console.log('error', response);
            });
    }

    const handleChangeInput = (e, name) => {
        const value = e.target.value

        setFormData({
            ...formData,
            [name]: value
        })

        console.log(formData);
    }

    const handleChangePosition = (e) => {
        setPositionId(e.target.value)
    }

    const handleChangeFile = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0]
        })

    }

    const handleUpload = () => {
        hiddenFileInput.current.click();
    }

    return(
        <div style={{ display: !success ? 'block': 'none'}}>
            <h1>Working with POST request</h1>
            <Row>
                <Col span={24}>
                    <form>
                        <Row>
                            <Col span={24}>
                                <Input placeholder="Your name"
                                       className="input-data"
                                       onChange={e => handleChangeInput(e, 'name')}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Input placeholder="Email"
                                       className="input-data"
                                       type="email"
                                       onChange={e => handleChangeInput(e, 'email')}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Input placeholder="Phone"
                                       className="input-phone"
                                       type="phone"
                                       onChange={e => handleChangeInput(e, 'phone')}
                                />
                                <span>+38 (XXX) XXX - XX - XX</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Radio.Group className="radio-group" onChange={handleChangePosition} value={positionId}>
                                    <Space direction="vertical">
                                        {
                                            positions.map((position, positionIndex) => {
                                                return (
                                                    <Radio value={position.id} key={`positionIndex-${positionIndex}`}>{position.name}</Radio>
                                                )
                                            })
                                        }
                                    </Space>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col span={24} className="upload">
                                        <Button className="upload-button" onClick={handleUpload}>Upload</Button>
                                        <Input
                                            placeholder="Upload your photo"
                                            size="large"
                                            value={formData.file ? formData.file.name : ''}
                                        />
                                        <input type="file"
                                               ref={hiddenFileInput}
                                               className="input-file"
                                               onChange={handleChangeFile}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} className="signup">
                                <Button className={["core-button", "w-120", "active"].join(" ")}
                                        onClick={handleSignUp}>Sign Up</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
            <Success visible={success}/>
        </div>
    )
}

export default RequestForm