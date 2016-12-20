import React, { PropTypes } from 'react';
import { Form, Row, Col, Select, Input, Button } from 'antd';

const UserTreeSearchComp = ({
    onSearch,
    channel,
    version,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields
    }
}) => {
    //input基本布局
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    function handleSubmit(e) {
        e.preventDefault()
        validateFields((errors) => {
            if (!!errors) {
                return
            }
            const returnVals = getFieldsValue();
            
            console.log(returnVals);

           onSearch(returnVals);
        })
    }
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
        <div >
            <Form horizontal onSubmit={handleSubmit} >
                <Row >
                    <Col span={10} >
                        <Form.Item label="数据来源" {...formItemLayout} >
                            {getFieldDecorator('channel', {
                                initialValue: channel || ''
                            })(<Select>
                                {quChildren}
                            </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={10} >
                        <Form.Item label="版本号" {...formItemLayout} >
                            {getFieldDecorator('version', {
                                initialValue: version || ''
                            })(<Select>
                                {quChildren}
                            </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }} >
                        <Button type="primary"  htmlType="submit" style={{height:30}} >搜索</Button>&nbsp;
                      </Col>
                </Row>
            </Form>
        </div>
    )
}


UserTreeSearchComp.proptypes = {
    form: PropTypes.object.isRequired,
    onSearch: PropTypes.func,
    channel: PropTypes.string,
    version:PropTypes.string,

}
export default Form.create()(UserTreeSearchComp);
