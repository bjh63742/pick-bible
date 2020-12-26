import React from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Admin from "../routes/Admin";
import Home from "../routes/Home";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/soorim/admin" exact component={Admin} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};
