import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import Home from "./components/home";
import Tasks from "./components/tasks/tasks";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/index.html">
                    <Redirect to="/" />
                </Route>
                <Route exact path="/" component={Home} />
                <Route exact path="/tasks" component={Tasks} />
                <Route path="/tasks/*">
                    <Redirect to="/tasks" />
                </Route>
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        );
    }
}

export default App;
