import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Login} from "./components/Login";
import "core-js/stable";
import "regenerator-runtime/runtime";

class Home extends React.Component{
    render() {
        return <a href="/login">Login</a>;
    }

}

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);



