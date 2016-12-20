import React, { PropTypes } from 'react'
import { Cascader, Row, Col, Form } from 'antd';
import styles from './search.less'
const TreeManageSearchComp = ({
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields
    },
}) => {
    const options = [{
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [{
                value: 'xihu',
                label: 'West Lake',
            }],
        }],
    }, {
        value: 'beijing',
        label: 'beijing',
        children: [{
            value: '',
            label: '全部',
        }, {
            value: 'beijing',
            label: 'beijing',
            children: [{
                value: 'haidian',
                label: '海淀',
            }, {
                value: 'tongzhou',
                label: '通州',
            }, {
                value: 'chaoyang',
                label: '朝阳',
            }, {
                value: 'daxing',
                label: '大兴',
            }],
        },],
    }];
    const defaultKey = [];
    // defaultKey.push(options[0].value);
    // console.log(defaultKey);
    function onChange(value) {
        console.log(value);
    }
    return (
        <div className={styles.normal} >
            <Form className={styles.serachForm}>
                <Row>
                    <Col span={8} offset={1} >
                        <Form.Item label="区域选择：" labelCol={{ span: 8 }} >
                            <Col span="16" >
                                <Form.Item  >
                                    {getFieldDecorator('org', {
                                        initialValue: defaultKey
                                    })(<Cascader 
                                        showSearch
                                        onChange={onChange} 
                                        options={options} 
                                        placeholder="请选择组织机构" />)}
                                </Form.Item>
                            </Col>
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1} >
                        <Form.Item label="合伙人：" labelCol={{ span: 8 }} >
                            <Col span="16" >
                                <Form.Item  >
                                    {getFieldDecorator('person', {
                                        initialValue: defaultKey
                                    })(<Cascader
                                        onChange={onChange}
                                        options={options}
                                        placeholder="合伙人选择" 
                                        showSearch
                                        />)}
                                </Form.Item>
                            </Col>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div >

    )
}

TreeManageSearchComp.propTypes = {
    form: PropTypes.object,
}

export default Form.create()(TreeManageSearchComp)
