import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute"
import Home from "./components/Home.js";
import Notfound from "./components/Notfound.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js"

export default ({ childProps }) => 
    <Switch>
        <AppliedRoute path = "/" exact component = { Home } props = {childProps} />
        <AppliedRoute path = "/login" exact component = { Login } props = {childProps} />
        <AppliedRoute path = "" exact component = { Signup } props = {childProps} />
        <Route component = { Notfound } />
    </Switch>;