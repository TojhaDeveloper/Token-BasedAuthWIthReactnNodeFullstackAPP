import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignUp extends Component {
    render() {
        const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;
        return (<form>
            <fieldset className="form-group">
                <label>Email : </label>
                <input className="form-control" {...email} placeholder="Type Your Email" />
                 {email.touched && email.error && (<div className="error">{email.error}</div>)}
            </fieldset>
            <fieldset className="form-group">
                <label>Password : </label>
                <input type="password" {...password} className="form-control" placeholder="Enter Password" />
                {password.touched && password.error && (<div className="error">{password.error}</div>)}
            </fieldset>
            <fieldset className="form-group">
                <label>Confirm Password : </label>
                <input type="password" {...passwordConfirm} className="form-control" />
                 {passwordConfirm.touched && passwordConfirm.error && (<div className="error">{passwordConfirm.error}</div>)}
            </fieldset>
            <button className="btn btn-primary" action="submit">Sign Up!</button>
        </form>);
    }
}

function validate(formProps){
    const errors = {};
    if(!formProps.email){
        errors.email = "Must provide an email";
    }

    if(!formProps.password){
        errors.password = " Please enter password";
    }

    if(!formProps.passwordConfirm){
        errors.passwordConfirm=" Please provide an password confirmation";
    }

    if(formProps.password != formProps.passwordConfirm){
        errors.password = "Passwords must match";
    }
    return errors;
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
})(SignUp);