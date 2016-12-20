import React, { PropTypes } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import TreeManageListComp from '../components/authManage/TreeManageListComp';
import DownBottonsComp from '../components/authManage/DownBottonsComp';
import TreeManageSearchComp from '../components/authManage/TreeManageSearchComp';

function TreeManagePage({dispatch, treeManageModel}) {


  const {dataList, loading, selectedRowKeys} = treeManageModel;

  const listData = {
    dataList, loading, selectedRowKeys,
    //checkbox选取行
    onSelectRows(selectedRowKeys, selectedRows) {
      console.log("rows");
      console.log(selectedRowKeys, selectedRows);
      dispatch({
        type: 'treeManageModel/selectedRowKeys',
        payload: selectedRowKeys,
      });
    },
    onExpand(key) {
      console.log(key);
      dispatch({
        type: 'treeManageModel/queryByKey',
        payload: key,
      });
    },
  }
  const downBottons = {
    onRadioButton(fieldsValue) {
      console.log(fieldsValue);
      const val = fieldsValue.field;
      dispatch({
        type: 'treeManageModel/radioConfirmFunc',
        payload: val,
      });
    }
  }
  return (
    <div >
      <TreeManageSearchComp />
      <TreeManageListComp {...listData} />
      <DownBottonsComp {...downBottons}/>
    </div>
  );
}

function mapStateToProps({treeManageModel}) {
  return { treeManageModel };
}
TreeManagePage.prototype = {
  userMng2: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(mapStateToProps)(TreeManagePage);
