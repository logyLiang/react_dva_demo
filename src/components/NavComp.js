import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './NavComp.less';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
//默认被选择的key
const defaultSelectedKeys = ["userListPage"];
//导航信息
function Nav() {
  return (
    <div  >
      <Menu className={styles.nav} mode="horizontal" defaultSelectedKeys={defaultSelectedKeys} >
        <SubMenu title={<span><Icon type="user"  />用户管理</span>}>
          <Menu.Item key="userListPage">
            <Link to="/userListPage">用户基础信息</Link>
          </Menu.Item>
          <Menu.Item key="org" >
            <Link to="/userTreePage">用户发展关系</Link>
          </Menu.Item>
         
        </SubMenu>
        <SubMenu title={<span><Icon type="home" />组织授权</span>}>

         <Menu.Item key="userMng2" >
            <Link to="/treeManagePage">树形管理</Link>
          </Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>

        </SubMenu>
      </Menu>
    </div>
  );
}
export default Nav;
