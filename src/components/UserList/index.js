import {Button, Col, Row} from "antd";
import axios from "axios";
import "./styles.scss"
import {useEffect, useState} from "react";

function UserList() {
    const [usersRows, setUsersRows] = useState({
        small: [],
        middle: [],
        large: []
    })
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`)
            .then(request => request.data)
            .then(data => {

                const rows = {...usersRows}

                let rowIndex = 0;
                let rowMiddleIndex = 0;

                for (let i = 0; i < data.users.length; i++) {
                    if (i % 3 === 0) {
                        rows.large.push([data.users[i]])
                        rowIndex = rows.large.length - 1

                    } else {
                        rows.large[rowIndex].push(data.users[i])
                    }

                    if ( i % 2 === 0) {
                        rows.middle.push([data.users[i]])
                        rowMiddleIndex = rows.middle.length - 1

                    } else {
                        rows.middle[rowMiddleIndex].push(data.users[i])
                    }
                }

                rows.small = [...data.users]

                setUsersRows(rows)
            })
    }, [page])

    const handleShowMore = () => {
        setPage(page + 1)
    }

    return (
        <>
            <h1>Working with GET request</h1>
            {usersRows.large.map((row, rowIndex) => {
                return (
                    <Row className="cads-row large" key={`lg-row-${rowIndex}`}>
                        {
                            row.map((cellItem, cellIndex) => {
                                return (
                                    <Col span={8} key={`lg-cell-${rowIndex}-${cellIndex}`}>
                                        <div className="user-card">
                                            <img src={cellItem.photo} alt=""/>
                                            <div className="username">
                                                {cellItem.name}
                                            </div>
                                            <div className="info">
                                                {cellItem.position}
                                                <div>{cellItem.email}</div>
                                                <div>{cellItem.phone}</div>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                )
            })}

            {usersRows.middle.map((row, rowIndex) => {
                return (
                    <Row className="cads-row middle" key={`md-row-${rowIndex}`}>
                        {
                            row.map((cellItem, cellIndex) => {
                                return (
                                    <Col span={12} key={`md-cell-${rowIndex}-${cellIndex}`}>
                                        <div className="user-card">
                                            <img src={cellItem.photo} alt=""/>
                                            <div className="username">
                                                {cellItem.name}
                                            </div>
                                            <div className="info">
                                                {cellItem.position}
                                                <div>{cellItem.email}</div>
                                                <div>{cellItem.phone}</div>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                )
            })}

            {usersRows.small.map((item, rowIndex) => {
                return (
                    <Row className="cads-row small" key={`sm-row-${rowIndex}`}>
                        <Col span={24}>
                            <div className="user-card">
                                <img src={item.photo} alt=""/>
                                <div className="username">
                                    {item.name}
                                </div>
                                <div className="info">
                                    {item.position}
                                    <div>{item.email}</div>
                                    <div>{item.phone}</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                )
            })}

            <Row>
                <Col span={24} className="show-more">
                    <Button className="core-button active" onClick={handleShowMore}>Show More</Button>
                </Col>
            </Row>
        </>
    )
}

export default UserList