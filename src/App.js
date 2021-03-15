import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboad from "./pages/Dashboard";
import Error from "./pages/Error";
import OAuthGithub from "./pages/OAuthGithub";

const App = () => {
  return (
    <AuthContext>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/github">
            <OAuthGithub />
          </Route>
          <Route exact path="/">
            <Dashboad />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </AuthContext>
  );
};

export default App;
