import React, { Component } from 'react'
import '../../styles/Landing.css'
import MainLogo from '../../components/MainLogo'

export default class About extends Component {

    render() {
        return (
            <>
                <div className="container">
                <MainLogo />
                    <div className="landing-container">
                        <h1>About City Guide</h1>
                        <p className="subtitle" style={{textAlign: 'left'}}>
                            City Guide... 
                        </p>
                    </div>
                </div>
               
            </>
        )
    }
}
