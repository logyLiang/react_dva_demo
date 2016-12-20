import { message } from 'antd';
export default {
  namespace: 'treeManageModel',
  state: {
    dataList: [],
    loading: false,
    selectedRowKeys: [],
  },
  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false }
    },
    showLoading(state) {
      return { ...state, loading: true }
    },
  },
  effects: {
    *queryByKey({ payload }, { put, select, call }) {
      console.log("payload");
      console.log(payload);
      yield put({ type: 'showLoading' });
      //根据key获取下级叶子节点数据

      const arr = [];
      const key = payload;
      for (let i = 1; i < 5; i++) {
        arr.push({ name: `` + new Date().getTime(), key: new Date().getTime() + i, age: 88, address: '中南海', children: [] });
      }
      //获取老节点数据
      const treeData = yield select(({ treeManageModel }) => treeManageModel.dataList);
      const curKey = payload;
      const child = arr;
      //将新老数据进行合并
      const newDataList = getNewTreeData(treeData, curKey, child);

      yield put({
        type: 'querySuccess',
        payload: {
          dataList: newDataList
        },
      })
    },
    *query({payload}, {put}) {
      yield put({ type: 'showLoading' });
      const data = [{
        key: 1,
        name: '三个字.',
        age: 60,
        address: '15001237262',
        children: [],
      }, {
        key: 2,
        name: '凑四个字',
        age: 32,
        address: '15001237262',
        children: [],
      }];
      yield put({
        type: 'querySuccess',
        payload: {
          dataList: data,
        },
      })
    },
    *selectedRowKeys({payload}, {put}) {
      console.log("lskdj");
      yield put({
        type: 'querySuccess',
        payload: {
          selectedRowKeys: payload
        },
      })
    },
    *radioConfirmFunc({payload}, {put, select}) {
      //获取老节点数据
      const keys = yield select(({ treeManageModel }) => treeManageModel.selectedRowKeys);
      if (keys.length === 0) {
        message.info("请至少选择一条记录");
        return;
      }
      const vals = payload;
      if (vals === "") {
        message.warning("请选择一个操作项！");
        return;
      }
      console.log("#######");
      console.log(keys);
      console.log(vals);
      console.log("#######");
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/treeManagePage') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },

  },
}
//将老节点数据与新节点数据合并
function getNewTreeData(treeData, curKey, child) {


  const loop = (data) => {
    // if (level < 1 || curKey.length - 3 > level * 2) return;
    data.forEach((item) => {
      // console.log("item.key");
      // console.log(item.key);
      //一级父节点数据展开直接put进去
      if (curKey == item.key) {
        item.children = child;
      } else {
        // if (item.children.length != 0) {
        loop(item.children);
        // } else {

        // }
      }
    });
  };
  loop(treeData);
  console.log("treeData");
  console.log(treeData);
  //const returnData = setLeaf(treeData, curKey);
  return treeData;
}
function setLeaf(treeData, curKey) {
  const loopLeaf = (data) => {

    // const l = lev - 1;
    data.forEach((item) => {
      // if (item.key > curKey) {
      //   return;
      // }
      if (item.children) {
        loopLeaf(item.children);
      }
    });
  };
  loopLeaf(treeData);
  return treeData;
}