import React from 'react'
import '../styles/Navbar.css'
import MainLogo from '../components/MainLogo'
import { ReactComponent as Settings } from '../assets/svg/Settings.svg';
import { ReactComponent as ArrowRight } from '../assets/svg/ArrowRight.svg';
import { ReactComponent as NavUser } from '../assets/svg/NavUser.svg';
import { ReactComponent as NavAbout } from '../assets/svg/NavAbout.svg';
import { ReactComponent as NavHelp } from '../assets/svg/NavHelp.svg';
import { ReactComponent as NavLogOut } from '../assets/svg/NavLogOut.svg';
import { ReactComponent as NavDirectory } from '../assets/svg/NavDirectory.svg';

const DashboardNavbar = (props) => {
    return (
        <div className="onepage-navbar-inner">
            <nav className="navbar container">
                <div className="nav">
                <input type="checkbox" id="nav-check" />
                    <div className="dash-inner w-100 in-mobile">
                        <div class="logo-btn d-flex justify-content-between align-items-center w-100">
                            <MainLogo />
                            <span className="dash-title">City Guide</span>
                            <div className="listing d-flex align-items-center">
                                <div className="list-drop" tabIndex="0">
                                    <Settings />
                                    <div className="popout-drop">
                                        <a href="/help"> <NavHelp className="mr-3" />Help<ArrowRight className="icon-right" /> </a>
                                        <a href="/faq"> <NavUser className="mr-3" />FAQs<ArrowRight className="icon-right" /> </a>
                                        <a href="/about"> <NavAbout className="mr-3" />About<ArrowRight className="icon-right" /> </a>
                                        <a href="/privacy"> <NavDirectory className="mr-3" />Privacy Policy<ArrowRight className="icon-right" /></a>
                                        <a href="/disclaimer"> <NavDirectory className="mr-3" />Disclaimer<ArrowRight className="icon-right" /> </a>
                                        <a href="/terms"> <NavDirectory className="mr-3" />Terms and Conditions<ArrowRight className="icon-right" /> </a>
                                        <a href="/contact"> <NavLogOut className="mr-3" />Contact<ArrowRight className="icon-right" /> </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
};

export default DashboardNavbar;