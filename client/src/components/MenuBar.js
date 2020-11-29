import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/auth'

const MenuBar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav>
            { user 
            ? (
            <ul>
                <li>
                    <NavLink to="/" exact className="nav-link" activeStyle={{color: 'red'}}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/upload" className="nav-link" activeStyle={{color: 'red'}}>Upload</NavLink>
                </li>
                <li>
                    <NavLink to="/portfolio" className="nav-link" activeStyle={{color: 'red'}}>Portfolio</NavLink>
                </li>
                <li>
                    <div>
                        {
                        user.img && (<img src={"/" + user.img.path} 
                            alt={user.img.filename}
                            style={{width: '10%'}} />
                        )}
                        {user.username}
                    </div>
                </li>
                <NavLink onClick={logout} to="/login" className="nav-link" activeStyle={{color: 'red'}}>Logout</NavLink>
            </ul>
            )
            : (
            <ul>
                <li>
                    <NavLink to="/" exact className="nav-link" activeStyle={{color: 'red'}}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/art" className="nav-link" activeStyle={{color: 'red'}}>Art</NavLink>
                </li>
                <li>
                    <NavLink to="/register" className="nav-link" activeStyle={{color: 'red'}}>Register</NavLink>
                </li>
                <li>
                    <NavLink to="/login" className="nav-link" activeStyle={{color: 'red'}}>Login</NavLink>
                </li>
            </ul>
            )}
        </nav>
    )
}

export default MenuBar
