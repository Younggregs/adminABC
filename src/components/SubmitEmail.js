import React, { Component } from 'react'
import SendIcon from '@material-ui/icons/Send'
import recordMiss from '../promises/RecordMiss'
import CircularProgress from '@material-ui/core/CircularProgress'

export default class CopyLink extends Component {
    state = {
        email: '',
        copied: false,
        error: '',
        success: false,
        isLoading: false
      };

    async submit(){

        this.setState({ success: false, error : '', isLoading: true})
        const res = await recordMiss(this.state.email, this.props.from, this.props.to)
        if(res){
            if(res.error_message){
                this.setState({error: res.error_message})
            }else if(res.code){
                this.setState({success: true})
            }
        }else{
            this.setState({error: 'Could not complete request, refresh and try again'})
        }

        this.setState({isLoading: false})
    }

    render() {
        return (
            <div>
                <div className="copy-clipboard">
                    <div className="for-copy">
                        <input style={{paddingLeft: 15, fontSize: 18}} placeholder='Enter email'
                        onChange={({target: {email}}) => this.setState({email})} />
                        
                        {this.state.isLoading ? (
                            <button><CircularProgress /></button>
                        ) : (
                            <button onClick={() => this.submit()}><SendIcon style={{color: '#fff'}}/></button>
                        )}
                        
                    </div>
                    
                </div>
                {this.state.success ? <span style={{color: '#00AEFF',fontWeight: 'bold'}} 
                className="copied">Submitted and received succesfully.</span> : null}
                
                <p><span style={{color: '#ff0000', textAlign: 'center'}}>{this.state.error}</span></p>
            </div>
        )
    }
}
