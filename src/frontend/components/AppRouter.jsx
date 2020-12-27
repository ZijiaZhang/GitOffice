import React, {Component} from "react";
import {
    Route,
    Switch
} from "react-router-dom";
import {createBrowserHistory} from 'history';
import {Home} from "./Home";
import {RichTextEditor} from "./Editor/FileEditor/RichTextEditor";
import {LatexEditor} from "./Editor/FileEditor/LatexEditor";
import {Login} from "./Login";
import {Editor} from "./Editor/Editor";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducers from '../reducers';
export const history = createBrowserHistory();

class AppRouter extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Provider store={createStore(reducers)}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/RichText" component={RichTextEditor}/>
                    <Route path="/Latex" component={LatexEditor}/>
                    <Route path="/:owner/:repo" component={Editor} />
                </Switch>
            </Provider>
        );
    }
}

export default AppRouter;