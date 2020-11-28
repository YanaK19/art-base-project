import { Route, Switch } from 'react-router-dom'
import Art from './pages/Art/Art'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import UploadArt from './pages/UploadArt/UploadArt'
import AuthRoute from './utils/AuthRoute'

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/art/:id' component={Art}/>
                <Route exact path='/upload' component={UploadArt}/>
                <AuthRoute exact path='/register' component={Register}/>
                <AuthRoute exact path='/login' component={Login}/>
            </Switch>
        </div>
    )
}

export default Routes;