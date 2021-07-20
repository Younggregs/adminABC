import React, { Component } from 'react'
import '../../styles/Landing.css'
import MainLogo from '../../components/MainLogo'


export default class Privacy extends Component {

    render() {
        return (
            <>
                <div className="container">
                <MainLogo />
                    <div className="landing-container">
                        <h1>Privacy Policy</h1>
                    <div className="subtitle" style={{textAlign: 'left'}}>
                    
                    </div>
                    </div>
                </div>
               
            </>
        )
    }
}
