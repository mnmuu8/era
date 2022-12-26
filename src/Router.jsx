import React from "react";
import { Route, Switch } from "react-router";
import Auth from "./Auth";

import { SignIn, Reset, SignUp, ProductEdit, ProductList, MyPage, MyPageEdit, CartList, OrderConfirm, OrderHistory, FavoriteList, Home } from "./templates";
import ProductDetail from "./templates/ProductDetail";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={Reset} />
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/list"} component={ProductList} />
      <Route exact path={"(/)?"} component={Home} />
      
      <Auth>
        <Route exact path={"/user/mypage"} component={MyPage} />
        <Route exact path={"/user/mypage/edit"} component={MyPageEdit} />
        <Route exact path={"/product/:id"} component={ProductDetail} />
        <Route path={"/product/edit(/:id)?"} component={ProductEdit} />

        <Route exact path={"/order/confirm"} component={OrderConfirm} />
        <Route exact path={"/cart"} component={CartList} />
        <Route exact path={"/order/history"} component={OrderHistory} />
        <Route exact path={"/favorite"} component={FavoriteList} />
      </Auth>
    </Switch>
  )
}

export default Router
