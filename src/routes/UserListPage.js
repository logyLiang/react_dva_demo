import React, { PropTypes } from 'react';
import { connect } from 'dva';
import UserSearchComp from "../components/userList/userSearchComp";
import UserListComp from "../components/userList/UserListComp";
import UserModalComp from "../components/userList/UserModalComp";
import moment from 'moment';
function UserListPage({ location, dispatch, userModel }) {
  //获取参数
  const {
    loading, list, total, current, pagination,
    currentItem, modalVisible, modalType, name, address, status, startDate, endDate
  } = userModel;
  
  const userSearchProps = {
    name,
    address,  
    status,
    endDate,
    startDate,
    onSearch(fieldsValue) {
      console.log(fieldsValue);
      dispatch({
        type: 'userModel/query',
        payload: fieldsValue,
      })
    },
    
  };
  const userListProps = {
    dataSource: list,
    loading,
    pagination: pagination,
    onPageChange(pageNew) {
      const page = pageNew.current;
      const pageSize = pageNew.pageSize;
      dispatch({
        type: 'userModel/query',
        payload: {
          name, address, status, startDate, endDate,page,pageSize
        },
      })
    },
    
    onEditItem(item) {
      dispatch({
        type: 'userModel/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }
  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: `userModel/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'userModel/hideModal',
      })
    },
  }
   const UserModalGen = () =>
    <UserModalComp {...userModalProps} />
  return (
    <div>
      <UserSearchComp {...userSearchProps } />
      <UserListComp {...userListProps} />
      <UserModalGen />
    </div>
  );
}

function mapStateToProps({userModel}) {
  
  return { userModel};
}
UserListPage.propTypes = {
  userModel: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(mapStateToProps)(UserListPage);
