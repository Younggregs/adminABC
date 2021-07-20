import React, { useState, useEffect } from 'react'
import '../../styles/Landing.css'
import { Link } from 'react-router-dom'
import MainLogo from '../../components/MainLogo'
import Grid from '@material-ui/core/Grid'
import userData from '../../promises/FetchUserData'
import { IMG_PATH_URL } from '../../constants'
import anon from '../../assets/imgs/user.png'

export default function Contact () {
    const [user, setUser] = useState({})
    const [check, setCheck] = useState(true)

    useEffect( () => {
        const fetchUserData = async () => {
            const res = await userData()
            console.log('res', res)
            setCheck(false)
            setUser(res)
        }
    
        if(check){
        fetchUserData()
        }
    })
    

        return (
            <>
                <div className="container">
                
                    <div className="landing-container">
                        <MainLogo />
                        <Grid container justify="center" alignItems="center" direction="column">
                        <h1>Official Member Portal</h1>
                        <p className="subtitle" style={{textAlign: 'left'}}>
                            <Link to='/update'>
                                Update
                            </Link>
                        </p>
                            <Grid 
                                style={{width: 150, height: 150, 
                                backgroundColor: '#228B22', borderRadius: 75
                                }}>
                                    <img 
                                        src={user.image ? IMG_PATH_URL + user.image : anon} 
                                        width="150" 
                                        height="150" 
                                        alt="Member" 
                                        style={{resizeMode: 'cover', borderRadius: 75}}
                                    />
                            </Grid>
                            <Grid 
                                container
                                alignItems="center"
                                justify="center"
                                direction="row"
                                style={{
                                    width: 350, 
                                    minHeight: 250, 
                                    backgroundColor: '#fffff9', 
                                    borderRadius: 15,
                                    borderColor: '#228B22',
                                    borderWidth: 2,
                                    borderLeftWidth: 30,
                                    borderStyle: 'solid',
                                    color: '#fff', 
                                    padding: 10
                                }}>
                                    <p style={{color: '#000', fontSize: 15, fontWeight: 'normal'}}>
                                        <span style={{fontWeight: 'bold'}}>Name:</span> {user.name} <br />
                                        <span style={{fontWeight: 'bold'}}>Registration Number:</span> <br />
                                        {user.registrationNumber} <br />
                                        <span style={{fontWeight: 'bold'}}>Senatorial Zone:</span> <br />
                                        {user.senatorialzone} <br />
                                        <span style={{fontWeight: 'bold'}}>LGA:</span> {user.lga} <br />
                                        <span style={{fontWeight: 'bold'}}>Ward:</span> <span style={{textTransform: 'capitalize'}}>{user.ward}</span> <br />
                                        <span style={{fontWeight: 'bold'}}>Polling Unit:</span> <span style={{textTransform: 'capitalize'}}>{user.pollingUnit}</span><br />
                                        <span style={{fontWeight: 'bold'}}>Gender:</span> {user.gender}
                                    </p>
                            </Grid>
                        <p className="subtitle" style={{textAlign: 'left'}}>
                            <Link to='/logout'>
                                <b>Logout</b>
                            </Link>
                        </p>
                        </Grid>
                    </div>
                    
                    
                </div>
               
            </>
        )
}
