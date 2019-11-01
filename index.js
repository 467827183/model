import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import  App from './src'
const app = document.getElementById('app');
const content = (
    <Router>
        <App/>
    </Router>
);
ReactDOM.render(content, app);