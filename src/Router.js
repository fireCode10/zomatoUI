import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Home from './Components/home/home';
import Details from './Components/details/details';
import Filter from './Components/filter/filter';

function Router() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home}></Route>
            <Route path="/details" component={Details}></Route>
            <Route path="/filter" component={Filter}></Route>            
        </BrowserRouter>
    )
}

export default Router;