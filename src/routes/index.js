import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from '../component/core/header';
import { Employee } from "../component/employee";
import { AddEditEmployee } from "../component/employee/addEdit";

const Routes = () => {
    return (
        <>
            <Header />
            <Router>
                <Switch>
                    <Route path="/" exact component={Employee} />
                    <Route path="/add-edit" exact component={AddEditEmployee} />
                    <Route path="/add-edit/:id" exact component={AddEditEmployee} />
                </Switch>
            </Router>
        </>
    )

}

export default Routes;