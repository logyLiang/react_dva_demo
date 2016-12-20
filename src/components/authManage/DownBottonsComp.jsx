import React, { PropTypes } from 'react'
import {Radio, Button, Row, Col, Form,Modal } from 'antd';
import styles from './list.less';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const TreeManageListComp =({
  onRadioButton,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  },
}) =>{
  function handleSubmit(e) {
    e.preventDefault()
    validateFields((errors) => {
      if (!!errors) {
        return
      }
       confirm({
         title: 'Want to delete these items?',
        content: 'some descriptions',
        onOk() {
           onRadioButton(getFieldsValue())
        },
        onCancel() {},
          });
    })
  }

  return (
    
      <div style={{ height: 40, bottom: 5, left: 0, position: 'fixed', background: '#eee none repeat scroll 0 0', border: '1px solid #a5bcf4', width: "100%", lineHeight: 3 }}>
        <Row>
          <Col span="1" />
          <Form inline onSubmit={handleSubmit} >
            <Form.Item >
              {getFieldDecorator('field', {
                initialValue: ''
              })(
                <RadioGroup>
                  <Radio value={1}>多个平级移动</Radio>
                  <Radio value={2}>整体平级移动</Radio>
                  <Radio value={3}>单个升级</Radio>
                  <Radio value={5}>单个降级</Radio>
                  <Radio value={6}>单个拉黑</Radio>
                  <Radio value={7}>整体拉黑</Radio>
                </RadioGroup>
                )}

            </Form.Item>
            <Button type="primary" htmlType="submit" >确定</Button>
          </Form>
        </Row>
      </div>
  )
}

TreeManageListComp.propTypes = {
  onRadioButton:PropTypes.func,
}

export default Form.create()(TreeManageListComp)
