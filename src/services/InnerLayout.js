import React, { Component, Fragment } from 'react'
import InnerNavbar from '../partials/InnerNavbar'
// import Footer from '../partials/Footer'

export default class InnerLayout extends Component {
    render() {
        return (
            <Fragment>
                <InnerNavbar />
                    {this.props.children}
                {/* <Footer/> */}
            </Fragment>
        )
    }
}