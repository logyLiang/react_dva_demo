import React, { PropTypes } from 'react';
import { Router, Route ,IndexRedirect} from 'dva/router';

import UserListPage from "./routes/UserListPage.js";

import App from "./routes/App.js";

import UserTreePage from "./routes/UserTreePage.js";

import TreeManagePage from "./routes/TreeManagePage.js";
export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App} >
        <IndexRedirect to="/userListPage" />
        <Route path="/userListPage" component={UserListPage} />
        <Route path="/userTreePage" component={UserTreePage} />
        <Route path="/treeManagePage" component={TreeManagePage} />
      </Route>
    </Router>
  );
}
