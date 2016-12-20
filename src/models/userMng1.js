
export default {
  namespace: 'userTree',
  state: {
    treeDataList: [],
    childDataList: [],
    info:'',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/userMng1') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },

  },
  effects: {
    *query({ payload }, {call, put }) {
      yield put({
        type: 'querySuccess',
        payload: {
          treeDataList: [
            { name: "pNode 01", key: '0-0' },
            { name: 'pNode 02', key: '0-1' },
            { name: 'pNode 03', key: '0-2', isLeaf: true },
          ],
        },
      })

    },
    *queryByKey({ playload }, {call, put }) {
      console.log("playload");
      console.log(playload);

    },
  }, reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload }
    },
  },

}
