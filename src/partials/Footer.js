import React from 'react'
import '../styles/Footer.css'
import MainLogo from '../assets/imgs/MainLogo2.png'
import { ReactComponent as Facebook } from '../assets/svg/PFacebook.svg';
import { ReactComponent as Twitter } from '../assets/svg/PTwitter.svg';
import { ReactComponent as Instagram } from '../assets/svg/PInstagram.svg';

const Footer = () => {
    return (
        <>
        <div className="footers container">
            <div className="footers-content">
                <a href="/#"><img src={MainLogo} width="160px" height="74px" alt="Logo" /></a>
                <div className="footer-links">
                    <div className="">
                        <h5>Quick Links</h5>
                        <ul>
                            <li><a href="/#">About</a></li>
                            <li><a href="/#">FAQs</a></li>
                            {/* <li><a href="/#">FAQ</a></li> */}
                        </ul>
                    </div>
                    
                    <div className="">
                        <h5>Legal Stuff</h5>
                        <ul>
                            <li><a href="/#">Privacy Policy</a></li>
                            <li><a href="/#">Terms of Service</a></li>
                            {/*
                            <li><a href="/#">Disclaimer</a></li>
                            <li><a href="/#">Financing</a></li>
                            */}  
                        </ul>
                    </div>
                    {/*
                    <div className="">
                        <h5>Socials</h5>
                        <ul>
                            <li><a href="/#"><Facebook className="mr-2 mb-1" /> Facebook</a></li>
                            <li><a href="/#"><Twitter className="mr-2 mb-1" /> Twitter</a></li>
                            <li><a href="/#"><Instagram className="mr-2 mb-1" /> Instagram</a></li>
                        </ul>
                    </div>
                    */}
                </div>
            </div>
        </div>
        {/* Mobile footer begins here */}
        <div className="mobile-footer">
            <div className="">
                <h5>Quick Links</h5>
                <ul>
                    <li><a href="/#">About</a></li>
                    <li><a href="/#">FAQs</a></li>
                    <li><a href="/#">Privacy Policy</a></li>
                    <li><a href="/#">Terms and Conditions</a></li>
                </ul>
            </div>
        </div>
        </>
    );
};

export default Footer;