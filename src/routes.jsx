import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App from './components/App';
import CreatePage from './components/create/CreatePage';
import ReadPage from './components/read/ReadPage';


class RouteDef extends React.Component {
    render() {
        return (
        <BrowserRouter>
            <div>
                <Route exact path='/' component={App} />
                <Route exact path='/' component={ReadPage} />
                <Route path='/create' component={CreatePage} />
                <Route path='/home' render={() => <h1>Hello</h1>} />
            </div>
        </BrowserRouter>
        );
    }
}

export default RouteDef;