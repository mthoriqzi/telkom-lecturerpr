import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Data from '../pages/Data'
import Cluster from '../pages/Cluster'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/Data' component={Data}/>
            <Route path='/cluster' component={Cluster}/>
        </Switch>
    )
}

export default Routes
