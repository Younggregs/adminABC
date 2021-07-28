import React from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import Logo from '../assets/imgs/MainLogo2.png'

const MainLogo = (props) => {
    return (
        <div className="nav-header">
            <Link to={ props.admin ? '/user': "/"}>
                <div>
                    <img src={Logo} width="160px" height="74px" alt="Logo" />
                </div>
            </Link>
        </div>
    )
}

export default MainLogo