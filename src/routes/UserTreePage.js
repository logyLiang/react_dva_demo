import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import UserTreeComp from '../components/userRelation/UserTreeComp'
import UserTreeSearchComp from '../components/userRelation/UserTreeSearchComp'
import UserTreeDetailComp from '../components/userRelation/UserTreeDetailComp'
function UserTreePage({ location, dispatch, userTreeModel }) {

  const {treeDataList, childDataList, channel, version, item} = userTreeModel;

  //tree 搜索初始数据
  const treeSearch = {
    channel,
    version,
    item,
    onSearch(getFieldsValue) {
      console.log(getFieldsValue);
      dispatch({
        type: 'userTreeModel/query',
        payload: getFieldsValue,
      });
    }
  }
  //tree模块初始数据
  const treeDatas = {
    treeDataList,
    onSelect(info) {
      const key = info[0]
      // dispatch({
      //   type: 'userTreeModel/queryByKey',
      //   payload: key,
      // });
    },
    //下拉按钮触发事件
    onLoadData(selectkey) {
      dispatch({
        type: 'userTreeModel/queryByKey',
        payload: selectkey,
      });
    },
  }
  const treeInfo = {
    item,
  }
  return (
    <div >
      <Row>
        <Col span="11"  >
          <UserTreeSearchComp {...treeSearch} />
        </Col>
      </Row>
      <Row>
        <Col span="11"  >
          <UserTreeComp {...treeDatas} />
        </Col>
        
        <Col span="13" >
          <UserTreeDetailComp {...treeInfo} />
        </Col>
      </Row>
    </div>
  );
}
UserTreePage.propTypes = {
  userTree: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}
function mapStateToProps({userTreeModel}) {
  return { userTreeModel };
}
export default connect(mapStateToProps)(UserTreePage);
