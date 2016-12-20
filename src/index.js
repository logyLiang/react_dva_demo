import './index.html';
import './index.css';
import dva from 'dva';
// 1. Initialize
const app = dva();

app.model(require("./models/userModel"));

app.model(require("./models/userTreeModel"));

app.model(require("./models/userMng1"));

app.model(require("./models/treeManageModel"));

app.model(require("./models/app"));

// 2. Plugins
//app.use({});

// 3. Model
//app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
