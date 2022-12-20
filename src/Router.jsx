import React from "react";
import { Route, Switch } from "react-router";
import Auth from "./Auth";
import { SignIn, SignUp, Home } from "./templates";

const Router = () => {
  return (
    <Switch>
      <Auth>
        <Route exact path={"/"} component={Home} />
      </Auth>

      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signup"} component={SignUp} />
    </Switch>
  )
}

export default Router
