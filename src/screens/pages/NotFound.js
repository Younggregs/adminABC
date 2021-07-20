import React from 'react'
import '../../styles/Auth.css'
import MainLogo from '../../components/MainLogo'

export default function NotFound() {
    return (
        <div className="auth-background">
            <div className="auth-container">
                <MainLogo />
                <h3>Page does not exist - 404</h3>
            </div>
        </div>
    )
}