import React, { PropTypes } from 'react';
import { Tree, Row, Col } from 'antd';
import styles from '../detailCommon.less';
const TreeNode = Tree.TreeNode;
const UserTreeDetailComp = ({
    item,
}) => {
    // const dataStatu = (item != "" && item != null);
    // console.log(dataStatu);
    return (
        <div className={styles.modalReadOnly} >
            <Row className={styles.titleRow} >
                <h3>基本信息：</h3>
            </Row>
            {/* {dataStatu
                ?*/}
            <Row>
                <Col span="1" />
                <Col span="22"  >

                    <div  >
                        <dl >
                            <Row>
                                <dt>头像：</dt><dd><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAElBMVEWAefJ1dXV3dpR2dYR+eOJ6d7PJbCUEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQElEQVRYhe3LsQ0AEQBAUY0BjCAWkFjg9p/qGpWGhkS8V/8fAgBnlDb4pktOgy1LF1NdTS0Wi8VisVgeWwBu8QNH3xMKeimk0wAAAABJRU5ErkJggg==" /></dd>
                            </Row>
                            <Row>
                                <dt>姓名：</dt><dd>{item.name}</dd>

                            </Row>
                            <Row>
                                <dt>昵称：</dt><dd>{item.nickName}</dd>
                            </Row>
                            <Row>
                                <dt>性别：</dt><dd>{item.isMale}</dd>
                            </Row>
                            <Row>
                                <dt>电话：</dt><dd>{item.phone}</dd>
                            </Row>
                            <Row>
                                <dt>年龄：</dt><dd>{item.age}</dd>
                            </Row>
                            <Row>
                                <dt>邮箱：</dt><dd>{item.name}</dd>
                            </Row>
                            <Row>
                                <dt>住址：</dt><dd>dsdsdf</dd>
                            </Row>
                            <Row>
                                <dt>数据来源：</dt><dd>{item.address}</dd>
                            </Row>
                            <Row>
                                <dt>用户区域：</dt><dd>{item.address}</dd>
                            </Row>
                        </dl>
                    </div>
                </Col>
                <Col span="1" />
            </Row>
            {/* :"数据为空"
            }*/}
        </div>
    )
}


UserTreeDetailComp.proptypes = {
    item: PropTypes.object,

}
export default UserTreeDetailComp;
