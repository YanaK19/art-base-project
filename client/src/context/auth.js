import React, { createContext, useReducer } from "react";
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');

const initialState = {
    user: null,
    login: userData => {},
    logout: () => {}
};

const authInitialState = {
    user: null
}

if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
    } else {
        authInitialState.user = decodedToken;
    }
};

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT': 
            return {
                ...state,
                user: null
            }
        default: return state;
    }
};

const AuthProvider = props => {
    const [state, dispatch] = useReducer(authReducer, authInitialState);
    
    const login = userData => {
        console.log(userData);
        localStorage.setItem('token', userData.token);
        dispatch({ type: 'LOGIN', payload: userData });
    }

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT'});
    }

    return (
    <AuthContext.Provider 
        value={{ user: state.user, login, logout }}
        {...props}
    />
    )
}

export { AuthContext, AuthProvider };