import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import Grid from '@material-ui/core/Grid'
import Search from '../../assets/svg/search.svg';
import fetchGuide from '../../promises/FetchGuide'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import GuideView from '../../components/GuideView'
import SubmitEmail from '../../components/SubmitEmail'
import DestinationImage from '../../blocks/DestinationImage';
import locations from '../../promises/Locations'
import Lottie from 'react-lottie'
import * as animationData from '../../assets/animation/compass.json';
import * as animationDataB from '../../assets/animation/direction-arrows.json';
import * as animationDataC from '../../assets/animation/not-found.json';
import DashboardNavbar from '../../partials/DashboardNavbar'
import '../../styles/Home.css'
import Share from '../../blocks/Share'
import theme from '../../styles/Theme.css';


const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const defaultOptionsB = {
    loop: true,
    autoplay: true, 
    animationData: animationDataB.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const defaultOptionsC = {
    loop: true,
    autoplay: true, 
    animationData: animationDataC.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Dashboard extends Component {
    state = {
        userProfile: [
            {id: 1, from: 'Lamingo', to: 'Terminus', guide: `Take a Bus
            From Terminus take a Bus
            Heading towards: Lamingo
            Get Off at: Lamingo JUTH
            Price: #100
            
            
            Take Keke
            From Terminus take a Keke 
            Heading towards: Lamingo
            Get Off at: Lamingo JUTH
            Price: #100
            
            
            Walk to your destination` , total_travel_cost : 20, total_travel_time: 40,
            Img: `https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=750&amp;q=80`},
        ],
        guide: [],
        isLoading: false,
        success: false,
        loading: false,
        toggle: false,
        wedge: true,
        destination: 0,
        value: '',
        from: '',
        to: '',
        suggestions: [],
        locationlist: [],
        guideMerge: ''
    }

    async componentDidMount(){

        const locationlist = await locations()
        if(locations){
            if(locations.error_message){}
            else{ this.setState({locationlist}) }
        } 
    }
    
    async search(){

        this.setState({
            open: false, 
            openalert: true,
            loading: true,
            success: false,
            alertmsg: 'Sending request'
        })
        
        const guide = await fetchGuide(this.state.from, this.state.to)
        this.setState({toggle: true})

        if(guide.error_message){
            this.setState({
                alertmsg: guide.error_message,
                open: false, 
                openalert: true,
                loading: false,
                wedge: true,
            })
        }else{
            if(guide){
                this.setState({
                    success: true,
                    open: false, 
                    openalert: true,
                    loading: false,
                    wedge: true,
                    guide,
                    alertmsg: 'Completed',
                })
            }else{
                
            }  
        }
    }



    handleCloseAlert(event, reason){
        if (reason === 'clickaway') {
          return;
        }   
        this.setState({openalert: false})
    };
    
    
    handleClickOpen(){
        this.setState({open: true})
    };
    
    handleClose(){
        this.setState({open: false})
    };

    onChangeFrom = (event, { newValue }) => {
        this.setState({
          from: newValue
        });
    };

    onChangeTo = (event, { newValue }) => {
        this.setState({
          to: newValue
        });
    };
     
      // Autosuggest will call this function every time you need to update suggestions.
      // You already implemented this logic above, so just use it.
      onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value)
        });
      };
     
      // Autosuggest will call this function every time you need to clear suggestions.
      onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };

      // Teach Autosuggest how to calculate suggestions for any given input value.
      getSuggestions(value){
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const locationList = this.state.locationlist;
    
        return inputLength === 0 ? [] : locationList.filter(location =>
        location.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };




    render() {

        const manageWedge = (destination, guide) => {
            if(this.state.wedge){
                this.setState({destination, wedge: false})
            }
            //this.state.guideMerge =  this.state.guideMerge + '\n' + guide
            //console.log('guide', this.state.guideMerge)

        }

        const direction = this.state.guide.map(item => {
            return  (
                <div>
                    {manageWedge(item.destination, item.guide)}
                    <GuideView
                        from={this.state.from}
                        to={this.state.to}
                        guide={item.guide}
                        vehicle={item.vehicle}
                        total_travel_time={item.total_travel_time}
                        total_travel_cost={item.total_travel_cost}
                        image={item.profilePicture}
                        key={item.id}  
                    />
                </div>
            )
        })


        

        const { from, to, suggestions } = this.state;
 
        // Autosuggest will pass through all these props to the input.
        const inputPropsFrom = {
            placeholder: 'e.g Terminus',
            value: from,
            onChange: this.onChangeFrom
        };

        const inputPropsTo = {
            placeholder: 'e.g Rayfield',
            value: to,
            onChange: this.onChangeTo
        };

        // When suggestion is clicked, Autosuggest needs to populate the input
        // based on the clicked suggestion. Teach Autosuggest how to calculate the
        // input value for every given suggestion.
        const getSuggestionValue = suggestion => suggestion.name;
        
        // Use your imagination to render suggestions.
        const renderSuggestion = suggestion => (
            <div style={{padding: 5, width: 100, backgroundColor: '#00AEFF', color: '#fff'}}>
                {suggestion.name}
            </div>
        );

        const renderInputComponent = inputProps => (
            <div>
              <input class="message-box" {...inputProps} />
            </div>
          );
        
        return (
            <div>
                <DashboardNavbar />
            
            <div className="container">
                <div className="dash-profile">
                    <div className="profile-analytics">
                        <div>
                            {this.state.isLoading ? (
                                <p style={{textAlign: 'center'}}>Loading Pages...</p>
                            ) : (
                                <Grid container direction='column' justify='center' alignItems='center'> 
                                    <div className="create-new">
                                    {this.state.loading ? (
                                        <div>
                                        <Lottie options={defaultOptionsB}
                                            height={300}
                                            width={400}
                                        />
                                        <p>Preparing Guide</p>
                                        </div>
                                    ) : (
                                        <div>
                                            {this.state.toggle ? (
                                            <div>
                                                {this.state.success ? (
                                                <div>
                                                    <div className="d-flex justify-content-between align-item-center">
                                                        <p><h4>{this.state.from} to {this.state.to}</h4></p>
                                                        <div className="reference" tabIndex="0">
                                                            <Share from={this.state.from} to={this.state.to} guide={this.state.guide}/>
                                                        </div>
                                                    </div>
                                                    {direction}
                                                    <h5 style={{textAlign: 'center'}}>Destination images - <span style={{fontWeight: 'bold'}}>{this.state.to}</span></h5>
                                                    <DestinationImage id={this.state.destination} />
                                                    
                                                </div>
                                                ) : (
                                                <div>
                                                    <Lottie options={defaultOptionsC}
                                                        height={300}
                                                        width={400}
                                                    />
                                                    <div style={{margin: 10}}>
                                                        <p style={{textAlign: 'left', fontSize: 15}}>Location guide not found -  {this.state.from} to {this.state.to}</p><br />
                                                        <p style={{textAlign: 'left', fontSize: 15}}>You can try a bus stop or landmark</p>
                                                        <p style={{textAlign: 'left', fontSize: 15}}>Drop your email, and we'll send you an email when we add it, sorry and thank you.</p>
                                                        <SubmitEmail from={this.state.from} to={this.state.to}/>
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                            ) : (
                                            <Grid container direction='column' justify='center' alignItems='center'> 
                                                <Lottie options={defaultOptions}
                                                    height={300}
                                                    width={400}
                                                />
                                                <p>Where are you going to today?</p>
                                            </Grid>
                                            )}
                                            
                                        </div>
                                    )}
                                   
                                    <div className="message-container">
                                        <div class="message-text">From:</div>
                                        <Autosuggest
                                            theme={theme}
                                            suggestions={suggestions}
                                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                            getSuggestionValue={getSuggestionValue}
                                            renderSuggestion={renderSuggestion}
                                            renderInputComponent={renderInputComponent}
                                            inputProps={inputPropsFrom}
                                        />
                                        {/*<input 
                                            class='message-box' 
                                            type='text' 
                                            placeholder="e.g Terminus" 
                                            id="from"
                                        />*/}
                                        <div class="message-text">To:</div>
                                        <Autosuggest
                                            theme={theme}
                                            suggestions={suggestions}
                                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                            getSuggestionValue={getSuggestionValue}
                                            renderSuggestion={renderSuggestion}
                                            renderInputComponent={renderInputComponent}
                                            inputProps={inputPropsTo}
                                        />
                                        <div onClick={() => this.search()} class="search-box">
                                            <img 
                                                src={Search} 
                                                width="50px" 
                                                height="30px"
                                                alt="Search" 
                                            />
                                        </div>
                                        
                                    </div>
                                        
                                    </div>
                                </Grid>
                            )}
                        </div>
                    </div>
                </div>

                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={this.state.openalert} autoHideDuration={3000} onClose={() => this.handleCloseAlert()}>
                    <Alert onClose={() => this.handleCloseAlert()} severity="success">
                    {this.state.alertmsg}
                    </Alert>
                </Snackbar>

            </div>
        </div>
        )
    }
}
