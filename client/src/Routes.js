import { Route, Switch } from 'react-router-dom'
import Art from './pages/Art/Art'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/art' component={Art}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
            </Switch>
        </div>
    )
}

export default Routes;