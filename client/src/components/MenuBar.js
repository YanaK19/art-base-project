import React from 'react'
import { /* Link, */ NavLink } from 'react-router-dom'

const MenuBar = () => {
    return (
        <nav>
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
        </nav>
    )
}

export default MenuBar
