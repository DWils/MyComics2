import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NotFound from './NotFound';
import AddComics from './AddComics';
import * as serviceWorker from './serviceWorker';
import Subscribe from './Subscribe'

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

const Root = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/addcomics' component={AddComics} />
            <Route exact path='/subscribe' component={Subscribe} />
            
            <Route component={NotFound} />
        </Switch>
    </Router>
);


ReactDOM.render(<Root />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();