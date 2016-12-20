import React, { PropTypes } from 'react';
import { connect } from 'dva';
import NavComp from '../components/NavComp.js'
import styles from '../components/Common.less'
function App({children, location, dispatch}) {
  return (
    <div className={styles.layout}>
      <div className={styles.main}>
     <NavComp />
        <div className={styles.container}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  ); 
}
//数据类型只定义在page页与页面渲染组件，不存在model层及其其他模块定义
App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
