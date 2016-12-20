export default {
  namespace: 'userTreeModel',
  state: {
    treeDataList: [],
    childDataList: [],
    channel: '',
    version: '',
    item: '',

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/userTreePage') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { put }) {
      console.log("payload");
      console.log(payload);

      yield put({
        type: 'querySuccess',
        payload: {
          treeDataList: [
            { name: "pNode 011", key: '0-0' },
            { name: 'pNode 02', key: '0-1' },
            { name: 'pNode 03', key: '0-2', isLeaf: true },
          ],
        },
      })
    },
    *queryByKey({ payload }, { put, select, call }) {
      yield put({ type: 'showLoading' });
      //根据key获取下级叶子节点数据

      const arr = [];
      const key = payload;
      for (let i = 0; i < 5; i++) {
        if (i % 2 === 0) {
          arr.push({ name: `myself ${key}-${i}`, key: `${key}-${i}` });
        } else {
          arr.push({ name: `myself ${key}-${i}`, key: `${key}-${i}`, isLeaf: true });
        }

      }

      //获取老节点数据
      const treeData = yield select(({ userTreeModel }) => userTreeModel.treeDataList);
      const curKey = payload;
      const child = arr;
      //将新老数据进行合并
      const newDataList = getNewTreeData(treeData, curKey, child);

      yield put({
        type: 'querySuccess',
        payload: {
          treeDataList: newDataList
        },
      })
    },


  },

  reducers: {

    querySuccess(state, action) {
      return { ...state, ...action.payload }
    },

  },

}
//将老节点数据与新节点数据合并
function getNewTreeData(treeData, curKey, child) {
  console.log("curKey");
  console.log(curKey);

  const loop = (data) => {
    console.log("item.key");
    // if (level < 1 || curKey.length - 3 > level * 2) return;
    data.forEach((item) => {
      console.log(item.key);
      console.log(curKey.indexOf(item.key));
      if (curKey.indexOf(item.key) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };
  loop(treeData);
  const returnData = setLeaf(treeData, curKey);
  return returnData;
}
function setLeaf(treeData, curKey) {
  const loopLeaf = (data) => {

    // const l = lev - 1;
    data.forEach((item) => {
      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
        curKey.indexOf(item.key) !== 0) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children);
      }
    });
  };
  loopLeaf(treeData);
  return treeData;
}