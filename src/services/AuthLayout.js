import React, { Component, Fragment } from 'react';
import '../styles/Auth.css';

export default class AuthLayout extends Component {
    render() {
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        )
    }
}
