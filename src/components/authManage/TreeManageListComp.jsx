import React, { PropTypes } from 'react'
import { Table, Popconfirm} from 'antd';
import styles from './list.less';
const TreeManageListComp = ({
  loading,
  dataList,
  onExpand,
  selectedRowKeys,
  onSelectRows,
  
}) => {
  const columns = [{
    title: '用户姓名',
    dataIndex: 'name',
    key: 'name',
    // width: '40%',
  }, {
    title: '等级',
    dataIndex: 'age',
    key: 'age',
    // width: '30%',
  }, {
    title: '代码',
    dataIndex: 'address',
    key: 'address',
    // width: '30%',
  }, {
    title: '手机号码',
    dataIndex: 'address',
    key: 'address1',
    // width: '30%',
  }, , {
    title: '微信',
    dataIndex: 'address',
    key: 'address11',
    // width: '30%',
  }, {
    title: '注册时间',
    dataIndex: 'address',
    key: 'address111',
    // width: '30%',
  }, {
    title: '状态',
    dataIndex: 'address',
    key: 'address1113',
    // width: '30%',
  }, {
    title: '操作',
    key: 'operation',
    width: 100,
    render: (text, record) => (
      <p>
        <a onClick={() => onEditItem(record)} style={{ marginRight: 4 }} >查看</a>
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];
  const handleOnExpand = (expanded, record) => {
    setTimeout(function () {
      onExpand(record.key);
    }, 1000);

  };

  const handleRowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onSelectRows(selectedRowKeys, selectedRows);

    },
  };
  return (

    <div className={styles.list}>
      <Table rowSelection={handleRowSelection} columns={columns} dataSource={dataList} onExpand={handleOnExpand} pagination={false} loading={loading} />
    </div>

  )
}

TreeManageListComp.propTypes = {
  dataList: PropTypes.array,
  loading: PropTypes.any,
  selectedRowKeys: PropTypes.array,
  onSelectRows: PropTypes.func,
}

export default TreeManageListComp
