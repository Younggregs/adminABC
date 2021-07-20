import React, { Component, Fragment } from 'react'
import DashboardNavbar from '../partials/DashboardNavbar'

export default class DashLayout extends Component {
    render() {
        return (
            <Fragment>
                <DashboardNavbar />
                    {this.props.children}
            </Fragment>
        )
    }
}