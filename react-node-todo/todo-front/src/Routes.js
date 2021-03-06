import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute"
import UserDashboard from "./user/UserDashboard"

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>

                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
