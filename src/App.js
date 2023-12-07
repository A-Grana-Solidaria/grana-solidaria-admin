import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Dreamers from "./pages/dreamers/dreamers";
import SingleDreamer from "./pages/single-dreamer/single-dreamer";
import Companies from "./pages/companies/companies";
import Supporters from "./pages/supporters/supporters";
import SingleSupporter from "./pages/single-supporter/single-supporter";
import SingleCompany from "./pages/single-company/single-company";
import SingleAssociate from "./pages/single-associate/single-associate";

function App() {
  const PUBLIC_URL = process.env.PUBLIC_URL;
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={`${PUBLIC_URL}/`} component={Login} />
          <Route path={`${PUBLIC_URL}/sonhadores`} component={Dreamers} />
          <Route path={`${PUBLIC_URL}/sonhador/:id`} component={SingleDreamer} />
          <Route path={`${PUBLIC_URL}/apoiadores`} component={Supporters} />
          <Route path={`${PUBLIC_URL}/empresas`} component={Companies} />
          <Route path={`${PUBLIC_URL}/empresa/:id`} component={SingleCompany} />
          <Route path={`${PUBLIC_URL}/apoiador/:id`} component={SingleSupporter} />
          <Route path={`${PUBLIC_URL}/socioempresa/:id`} component={SingleAssociate} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
