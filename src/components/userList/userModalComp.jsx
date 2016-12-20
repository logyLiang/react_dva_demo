import React, { PropTypes } from 'react'
import { Form, Radio, Modal, Button, Row, Col } from 'antd'
import styles from "./modal.less";
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

const modal = ({
  visible,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {

  const modalOpts = {
    title: '用户详情',
    visible,
    footer: [<Button key="back" type="primary" size="large" onClick={onCancel}>确定</Button>],
    onCancel,
    width: 600,
    // wrapClassName: "vertical-center-modal"
  }

  return (
    <Modal  {...modalOpts}>
      <Form inline>
        <Row>
          <Col span="1" />
          <Col span="22"  >
            <div className={styles.modalReadOnly} >
              <dl >
                <dt>头像:</dt><dd><img src={item.avatar} /></dd>
                <dt>姓名：</dt><dd>{item.name}</dd>
                <dt>昵称：</dt><dd>{item.nickName}</dd>
                <dt>性别：</dt><dd>{item.phone}</dd>

                <dt>电话：</dt><dd>{item.phone}</dd>
                <dt>年龄：</dt><dd>{item.age}</dd>
                <dt>邮箱：</dt><dd>{item.name}</dd>
                <dt>住址：</dt><dd>{item.address}</dd>
                <dt>数据来源：</dt><dd>{item.address}</dd>
                <dt>用户区域：</dt><dd>{item.address}</dd>
              </dl>
            </div>
          </Col>
          <Col span="1" />
        </Row>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  //  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(modal)
