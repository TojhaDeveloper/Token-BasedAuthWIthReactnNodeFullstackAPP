import axios from 'axios';
import { browserHistory } from 'react-router';
const ROOT_URL = 'http://localhost:3090';
import { AUTH_USER,UNAUTH_USER, AUTH_ERROR } from './types';
export function SignInUser({ email, password }) {
    return function (dispatch) {

        //Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                //IF req is good
                //update app state
                dispatch({type : AUTH_USER});
                //save JWT token
                localStorage.setItem('token', response.data.token);
                //redirect to /feature route  
                browserHistory.push('/feature'); 
            })
            .catch(() => {
                //if request is bad
                //show error to the user 
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function authError(error){
    return {
        type : AUTH_ERROR,
        payload : error
    };
}

export function SignOutUser(){
    localStorage.removeItem('token');
    return {
        type : UNAUTH_USER
    };
}

