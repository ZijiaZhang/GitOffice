import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRouter from './components/AppRouter';
import {BrowserRouter} from "react-router-dom";
import "core-js/stable";
import "regenerator-runtime/runtime";

ReactDOM.render(
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>,
    document.getElementById('root')
);