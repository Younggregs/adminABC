import React, {useState} from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import Logo from '../assets/imgs/MainLogo2.png'
// import CopyLink from '../components/CopyLink'

const InnerNavbar = (props) => {

    const [stop, setStop] = useState(true)
    const [superUser, setSuperUser] = useState(false)

    const isSuper = async () => {
        var superUser = await localStorage.getItem('isSuperUser')
        if(superUser == 'true'){ setSuperUser(true) }else{ setSuperUser(false)}
        setStop(false)
    }

    if(stop){
        isSuper()
    } 
    

    return (
        <div className="onepage-navbar-inner">
            <nav className="navbar container">
                <div className="nav">
                <input type="checkbox" id="nav-check" />
                    <div className="logo-btn">
                        <div className="nav-header">
                            <Link to="/user">
                                <div>
                                    <a href="/#"><img src={Logo} width="160px" height="74px" alt="Logo" /></a>
                                </div>
                            </Link>
                        </div>
                        <div className="mobile-navbar">
                            <Link to='/logout'>
                                <b>Log out</b>
                            </Link>
                        </div>
                    </div>
                        <div className="flip-header">
                            <div className="nav-links link-inner">
                                <div className="inner-header">
                                    <ul>
                                        {/* {superUser && (
                                            <li className="col-md-4">
                                            <Link 
                                                className={props.admin ? ("active") : ("")} 
                                                to='/admin'
                                                style={{textDecoration: 'none'}}
                                            >
                                                Admins
                                            </Link>
                                        </li>
                                        )} */}
                                        <li className="col-md-3">
                                            <Link 
                                                className={props.user ? ("active") : ("")} 
                                                to='/user'
                                                style={{textDecoration: 'none'}}
                                            >
                                                Members
                                            </Link>
                                        </li>
                                        <li className="col-md-3">
                                            <Link 
                                                className={props.location ? ("active") : ("")} 
                                                to='/location'
                                                style={{textDecoration: 'none'}}
                                            >
                                                Search
                                            </Link>
                                        </li>
                                        <li className="col-md-3">
                                            <Link 
                                                className={props.print ? ("active") : ("")} 
                                                to='/print'
                                                style={{textDecoration: 'none'}}
                                            >
                                                Print
                                            </Link>
                                        </li>
                                        <li className="col-md-3">
                                            <Link 
                                                className={props.admin ? ("active") : ("")} 
                                                to='/admin'
                                                style={{textDecoration: 'none'}}
                                            >
                                                Report
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <ul>
                                    <li>
                                        <Link 
                                            to='/logout'>
                                            <b>Logout</b>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    {/* <CopyLink /> */}
                </div>
            </nav>
        </div>
    )
};

export default InnerNavbar;