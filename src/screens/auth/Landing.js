import React, { Component } from 'react'
import '../../styles/Landing.css'
import Button from '../../components/Button'
import ProfileDetails from '../../components/profileDetails'
import MainLogo from '../../assets/imgs/MainLogo2.png'
import { ReactComponent as Thunder } from '../../assets/svg/thunder.svg';
import Analyse from '../../assets/imgs/analyse.png'
import Personalize from '../../assets/imgs/personalize.png'
import portal from '../../assets/imgs/portal.png'
import old from '../../assets/imgs/old.png'
import news from '../../assets/imgs/new.png'
import TertiaryButton from '../../components/tertiaryButton'
import CarousalContent from '../../components/CarousalContent'
import Footer from '../../partials/Footer'
import '../../styles/Landing.css'

export default class Landing extends Component {
    handleClick = () => {
        window.location.assign('/register')
    }
    render() {
        return (
            <>
                <div className="container">
                    <div className="landing-container">
                    <div>
                        <a href="/#"><img src={MainLogo} width="160px" height="74px" alt="Logo" /></a>
                    </div>
                        <h1>All Progressive Congress <br /> APC</h1>
                        <p className="subtitle">
                            Change is inevitable. We must learn to accept, 
                            understand and leverage change for our growth! 
                            This is our vision. Join the ruling party now!
                        </p>
                        <div className="create mb-4 mt-4">
                            <Button 
                            handleClick={this.handleClick}
                            title="Register/Login" />
                        </div>
                        <p className="save mb-5">
                            Be part of the movement, be a member, make a difference.
                            </p>

                    </div>
                        {/* Features begins here */}
                        <div className="page-features">
                            <h2>Features</h2>
                            <div className="mt-5 feature-details">
                                <img src={old} alt="analyse" />
                                <div className="col-md-5">
                                    <h4>Older Members</h4>
                                    <p>Older members fill the form. They select the “Old member” radio button. 
                                        The user is asked to enter his/her registration number, 
                                        if the registration is in the portal database, the user is onboarded 
                                        with his prior/older registration details.</p>
                                </div>
                            </div>
                            <div className="mt-5 feature-details">
                                <div className="col-md-5">
                                    <h4>New Members</h4>
                                    <p>
                                        New members fill the form. They select the “New member” radio button. 
                                        In this case, a new registration number is created in this case, 
                                        and the user is onboarded to the portal.
                                    </p>
                                </div>
                                <img src={news} alt="analyse" />
                            </div>
                            <div className="mt-5 feature-details">
                            <img src={portal} alt="analyse" />
                                <div className="col-md-5">
                                    <h4>Portal</h4>
                                    <p>
                                        You would be onboarded to your modern and minimalistic official members portal.
                                        You can edit your profile, then you are officially a member of the All Progressive Congress.
                                    </p>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="explore-more-container">
                    <div className="container text-center">
                        <h3>Be part of the winning party!</h3>
                        <p>
                            Register here to be member of the 
                            <br />All Progressives Congress. <br />
                            Join us in making our fatherland a better place.
                        </p>
                        <div className="third-btn">
                            <TertiaryButton 
                            handleClick={this.handleClick}
                            title="Register" />
                        </div>
                    </div>
                </div>
                {/* Testimonial begins here */}
                <div className="container">
                    <div className="testimonial-container">
                        <CarousalContent />
                    </div>
                </div>

                {/* Footer begins here */}
                <div className="container">
                        <Footer />
                </div>
            </>
        )
    }
}
