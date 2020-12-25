import React, {Component} from "react";
import {
    Route,
    Switch
} from "react-router-dom";
import {createBrowserHistory} from 'history';
import {Home} from "./Home";
import {RichTextEditor} from "./FileEditor/RichTextEditor";
import {LatexEditor} from "./FileEditor/LatexEditor";
import {Login} from "./Login";

export const history = createBrowserHistory();

class AppRouter extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/RichText" component={RichTextEditor}/>
                <Route path="/Latex" component={LatexEditor}/>
            </Switch>
        );
    }
}

export default AppRouter;