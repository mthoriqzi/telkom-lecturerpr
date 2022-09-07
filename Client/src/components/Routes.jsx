import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Data from '../pages/Data'
import Cluster from '../pages/Cluster'
import Login from '../pages/Login'
import Individu from '../pages/Individu'

const Routes = ({token}) => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            {/* <Route path='/Login' exact component={Login}/> */}
            <Route path='/Data' render={props => <Data token={token} />}/>
            <Route path='/cluster' component={Cluster}/>
            <Route path='/User/:id' component={Individu}/>
        </Switch>
    )
}

export default Routes
