import React, { useState, useEffect } from 'react'
import '../../styles/Landing.css'
import { Link } from 'react-router-dom'
import MainLogo from '../../components/MainLogo'
import Grid from '@material-ui/core/Grid'
import userData from '../../promises/FetchUserData'
import { IMG_PATH_URL } from '../../constants'
import anon from '../../assets/imgs/user.png'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactToPdf from "react-to-pdf";
import ReactToPrint from 'react-to-print';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      backgroundColor: '#AFDFF3'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


export default function Contact () {
    const classes = useStyles();
    const [user, setUser] = useState({})
    const [check, setCheck] = useState(true)
    const ref = React.createRef();

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
                            <b>Update</b>
                        </Link>
                    </p>
                    </Grid>
                </div>

                <Grid>
                  <Card ref={ref} className={classes.root}>
                    <CardContent>
                      <Grid container justify="center" alignItems="center" direction="column">
                        <Typography style={{color: '#ff0000'}} variant="h5" component="h5">
                          MEMBERSHIP SLIP
                        </Typography>
                        <Typography variant="h5" component="h5">
                          ALL PROGRESSIVES CONGRESS
                        </Typography>
                        <Typography variant="subtitle1" component="subtitle1">
                          JUSTICE, PEACE AND UNITY
                        </Typography>
                      </Grid>
                      <Grid 
                        container
                        direction="row" 
                        style={{ marginTop: 10, flexDirection: 'row'}} 
                        spacing={2}>
                        <Grid 
                          container
                          style={{width: 150, height: 150, flex: 5, borderRadius: 75
                          }}>
                            <img 
                              src={user.image ? IMG_PATH_URL + user.image : anon} 
                              width="150" 
                              height="150" 
                              alt="Member" 
                              style={{resizeMode: 'cover', backgroundColor: '#228B22', borderRadius: 75}}
                            />
                        </Grid>
                        <Grid container style={{ marginTop: 10, flex: 7, flexDirection: 'column'}} >
                          <Typography variant="subtitle2" component="subtitle2">
                            Firstname: <span style={{fontWeight: 'normal'}}>{user.firstname}</span>
                          </Typography>
                          <Typography variant="subtitle2" component="subtitle2">
                            Middlename: <span style={{fontWeight: 'normal'}}>{user.middlename}</span>
                          </Typography>
                          <Typography variant="subtitle2" component="subtitle2">
                            Lastname: <span style={{fontWeight: 'normal'}}>{user.lastname}</span>
                          </Typography>
                          <Typography variant="subtitle2" component="subtitle2">
                            Reg No: <span style={{fontWeight: 'normal'}}>{user.registrationNumber}</span>
                          </Typography>
                          <Typography variant="subtitle2" component="subtitle2">
                            Gender: <span style={{fontWeight: 'normal'}}>{user.gender}</span>
                          </Typography>
                          <Typography variant="subtitle2" component="subtitle2">
                            LGA: <span style={{fontWeight: 'normal'}}>{user.lga}</span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <ReactToPrint
                        trigger={() => <Button>Print</Button>}
                        content={() => ref.current}
                      />
                      <ReactToPdf targetRef={ref} filename="div-blue.pdf">
                        {({toPdf}) => (
                          <Button onClick={toPdf} size="small">Download as PDF</Button>
                        )}
                      </ReactToPdf>
                    </CardActions>
                  </Card>
                </Grid>

                <div className="landing-container">
                        <Grid container justify="center" alignItems="center" direction="column">
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
