import React, { PropTypes } from 'react';
import { Tree, Row, Col, Spin } from 'antd';
import styles from './UserTreeComp.less';
const TreeNode = Tree.TreeNode;
const UserTreeComp = ({
  treeDataList,
  onSelect,
  onLoadData,
}) => {
  function handelOnLoadData(TreeNode) {
    const selectkey = TreeNode.props.eventKey;
    //    onLoadData(selectkey);
    return new Promise((resolve) => {
      setTimeout(() => {
        onLoadData(selectkey);
        resolve();
      }, 500);
    });
  }
  function handelOnSelect(key) {
    onSelect(key);
  }
  //将treeDataList的数据递归组装成标签
  const loop = data => data.map((item) => {
    const tagTitle = <Row><Col span='14'>{item.name}</Col><Col span='8'>备用合计处</Col></Row>;
    if (item.children) {
      return <TreeNode title={tagTitle} key={item.key}>{loop(item.children)}</TreeNode>;
    }
    return <TreeNode title={tagTitle} key={item.key} isLeaf={item.isLeaf} />;
  });
  const treeNodes = loop(treeDataList);
  return (
    <div className={styles.treeDiv}>

      <Row className={styles.titleRow}>
        <h3>发展关系：</h3>
      </Row>
        <Tree onSelect={handelOnSelect} loadData={handelOnLoadData} >
          {treeNodes}
        </Tree>
    </div>
  )
}


UserTreeComp.proptypes = {
  treeDataList: PropTypes.array,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  onSelect: PropTypes.func,
  onLoadData: PropTypes.func,
}
export default UserTreeComp;
