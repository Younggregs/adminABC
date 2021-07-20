import React from 'react'
import smute from '../assets/imgs/smute.png'
import { ReactComponent as PFacebook } from '../assets/svg/PFacebook.svg';
import { ReactComponent as PInstagram } from '../assets/svg/PInstagram.svg';
import { ReactComponent as PTwitter } from '../assets/svg/PTwitter.svg';
import '../styles/Components.css'

export default function profileDetails(props) {
    return (
        <div className="landing-profile">
            <h3>{props.user}</h3>
            <div className="social-icons">
                <PTwitter />
                <PInstagram />
                <PFacebook />
            </div>
            <p>Hi, My name is Akinnibosun (Smute) Segun, 
            I’m a UI/UX Designer, and welcome to my Onepage</p>
            <img src={smute} alt="person" />
            <p className="profile-title">Just Catching Cruisee..</p>
        </div>
    )
}
