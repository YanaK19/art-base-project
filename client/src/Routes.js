import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

export default () => {
    return (
        <div>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
            </Switch>
        </div>
    )
}