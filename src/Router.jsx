import React from "react";
import { Route, Switch } from "react-router";
import Auth from "./Auth";
import { SignIn, Reset, SignUp, ProductEdit, ProductList, MyPage, MyPageEdit } from "./templates";
import ProductDetail from "./templates/ProductDetail";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={Reset} />
      <Route exact path={"/signup"} component={SignUp} />
      
      <Auth>
        <Route exact path={"/user/mypage"} component={MyPage} />
        <Route exact path={"/user/mypage/edit"} component={MyPageEdit} />
        <Route exact path={"(/)?"} component={ProductList} />
        <Route exact path={"/product/:id"} component={ProductDetail} />
        <Route path={"/product/edit(/:id)?"} component={ProductEdit} />
      </Auth>
    </Switch>
  )
}

export default Router
