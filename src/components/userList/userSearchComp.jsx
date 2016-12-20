import React, { PropTypes } from 'react'
import { Form, Input, Button, Select, Row, Col, DatePicker,Cascader } from 'antd'
import styles from './search.less'

const search = ({
  address,
  name,
  status,
  startDate,
  endDate,
  onSearch,
  onAdd,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields
  }
}) => {
  function handleSubmit(e) {
    e.preventDefault()
    validateFields((errors) => {
      if (!!errors) {
        return
      }
      const returnVals = getFieldsValue();
      returnVals.startDate = (returnVals.startDate == null ? '' : returnVals.startDate.format("YYYY-MM-DD"));
      returnVals.endDate = (returnVals.endDate == null ? '' : returnVals.endDate.format("YYYY-MM-DD"));
      console.log(returnVals);

      onSearch(returnVals);
    })
  }
  function handelClearForm(e) {
    resetFields();
  }
  //input基本布局
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'zhejiang',
    label: '全部',
    
  },{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];


  //模拟组装select数据
  const quChildren = [];
  quChildren.push(
    <Select.Option value="" key="" >全部</Select.Option>

  );
  quChildren.push(
    <Select.Option value="1" key="1" >微信</Select.Option>
  );
  quChildren.push(
    <Select.Option value="2" key="2" >APP</Select.Option>
  );
  quChildren.push(
    <Select.Option value="3" key="3" >活动</Select.Option>
  );

  
  return (
    <div className={styles.normal}>
      <div className={styles.search}>
        <Form horizontal onSubmit={handleSubmit} className={styles.serachForm} >

          <Row >
            <Col span={7} >
              <Form.Item label="用户名" {...formItemLayout} >
                {getFieldDecorator('address', {
                  initialValue: address || ''
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={7} >
              <Form.Item label="用户姓名" {...formItemLayout} >
                {getFieldDecorator('name', {
                  initialValue: name || ''
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={7} >
              <Form.Item label="手机号" {...formItemLayout} >
                {getFieldDecorator('name', {
                  initialValue: name || ''
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={7} >
              <Form.Item label="用户状态" {...formItemLayout} >
                {getFieldDecorator('status', {
                  initialValue: status || ''
                })(<Select>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="1" >启动</Select.Option>
                  <Select.Option value="2">停用</Select.Option>
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={7} >
              <Form.Item label="加入时间" labelCol={{ span: 8 }}  >
                <Col span="7">
                  <Form.Item   >
                    {getFieldDecorator('startDate', {
                      initialValue: startDate || null
                    })(<DatePicker />)}
                  </Form.Item>
                </Col>
                <Col span="2">
                  <p className="ant-form-split">至</p>
                </Col>
                <Col span="7">
                  <Form.Item   >
                    {getFieldDecorator('endDate', {
                      initialValue: endDate || null
                    })(<DatePicker />)}
                  </Form.Item>
                </Col>
              </Form.Item>
            </Col>
            <Col span={7} >
              <Form.Item label="授权来源" {...formItemLayout} >
                {getFieldDecorator('dataFrom', {
                })(<Select>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="1" >微信</Select.Option>
                  <Select.Option value="2">APP</Select.Option>
                </Select>)}
              </Form.Item>
            </Col>
          </Row>
          <Row >
            <Col span={14} >
              <Form.Item label="区域查询" labelCol={{ span: 4 }} >
                <Col span="20">
                  <Form.Item   >
                    {getFieldDecorator('sheng', {
                    })(  <Cascader options={options}  placeholder="Please select" />)}
                  </Form.Item>
                </Col>
               { /*<Col span="1">
                  <p className="ant-form-split"></p>
                </Col>
                <Col span="6">
                  <Form.Item   >
                    {getFieldDecorator('shi', {
                    })(<Select>
                      <Select.Option value="">全部</Select.Option>
                      <Select.Option value="1" >微信</Select.Option>
                      <Select.Option value="2">APP</Select.Option>
                    </Select>)}
                  </Form.Item>
                </Col>
                <Col span="1">
                  <p className="ant-form-split"></p>
                </Col>
                <Col span="6">
                  <Form.Item   >
                    {getFieldDecorator('qu', {
                    })(<Select>
                    {quChildren}
                    </Select>)}
                  </Form.Item>
                </Col>*/}
              </Form.Item>

            </Col>
            <Col span={7} style={{ textAlign: 'right' }} >
              <Button type="primary" icon="search" htmlType="submit">搜索</Button>&nbsp;
              <Button icon="rollback" onClick={handelClearForm} >重置</Button>
            </Col>

          </Row>
        </Form>
      </div>
    </div>
  )
}

search.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
  status: PropTypes.string,
  endDate: PropTypes.string,
  startDate: PropTypes.string,

}

export default Form.create()(search)
