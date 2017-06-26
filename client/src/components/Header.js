import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            //show signout link
            return (<li className="nav-item">
                <Link className="nav-link" to="/signout">Sign Out</Link>
            </li>);
        } else {
            //show sign in / singup link
            return ([<li className="nav-item" key={1}>
                <Link to="/signin" className="nav-link">Sign In</Link>
            </li>
                ,
            <li className="nav-item" key={2}>
                <Link to="/signup" className="nav-link">Sign Up</Link>
            </li>]);
        }
    }
    render() {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand">Redux Auth</Link>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

function MapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(MapStateToProps)(Header);