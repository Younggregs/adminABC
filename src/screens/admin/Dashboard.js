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
import Logo from '../../assets/imgs/MainLogo2.png'
import { QRCode } from 'react-qrcode-logo';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import isSuperUser from '../../promises/IsSuperUser'


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      backgroundColor: '#AFDFF3'
    },
    table: {
      minWidth: 650,
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


export default function Dashboard(props) {
    const classes = useStyles();
    const [user, setUser] = useState({})
    const [check, setCheck] = useState(true)
    const [qrdata, setQrdata] = useState("")
    const [issuper, setIssuper] = useState(false)
    const ref = React.createRef();

    console.log('props', props.super)

    useEffect( () => {
        const fetchUserData = async () => {
            const res = await userData()
            console.log('res', res)
            let i = 'Name: ' + res.lastname.charAt(0).toUpperCase() + res.lastname.slice(1) + ' ' 
                + res.middlename.charAt(0).toUpperCase() + res.middlename.slice(1) + ' ' 
                + res.firstname.charAt(0).toUpperCase() + res.firstname.slice(1) + '\n'
            i = i + 'Reg No: ' + res.registrationNumber + '\n'
            // i = i + 'Internal ID: ' + res.internalId + '\n'
            i = i + 'Gender: ' + res.gender + '\n'
            i = i + 'Age: ' + res.age + '\n'
            i = i + 'LGA: ' + res.lga + '\n'
            i = i + 'Ward: ' + res.ward.charAt(0).toUpperCase() + res.ward.slice(1) + '\n'
            i = i + 'Polling Unit: ' + res.pollingUnit.charAt(0).toUpperCase() + res.pollingUnit.slice(1) + '\n'
            setQrdata(i)
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
                  <Grid style={{ width: '100%', padding: 10, border: '5px solid #AFDFF3', background: '#228B22', borderRadius: 10}} container direction="row" justify={ props.super ? "space-between" : "center"} alignItems="center">
                    <Grid>
                      <MainLogo />
                    </Grid>
                    {props.super && (
                    <Grid>
                        <p className="subtitle" style={{textAlign: 'right'}}>
                          <Link to='/user' style={{color: '#fff'}}>
                              <b>Continue as Admin</b>
                          </Link>
                      </p>
                    </Grid>
                    )}
                  </Grid>
                    
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
                          style={{flex: 4, marginTop: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                          <p>Passport</p>
                          <img 
                              src={user.image ? IMG_PATH_URL + user.image : anon} 
                              width="170" 
                              height="170" 
                              alt="Member" 
                              style={{resizeMode: 'cover', border: '1px solid #999'}}
                          />
                        </Grid>
                        <Grid style={{ marginTop: 10, margin: 10, flex: 6, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textTransform: 'capitalize'}} >
                        <TableContainer component={Paper}>
                          <Table aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Firstname:</TableCell>
                                <TableCell align="right">{user.firstname}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableHead>
                              <TableRow>
                                <TableCell>Middlename:</TableCell>
                                <TableCell align="right">{user.middlename}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableHead>
                              <TableRow>
                                <TableCell>Lastname:</TableCell>
                                <TableCell align="right">{user.lastname}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableHead>
                              <TableRow>
                                <TableCell>Registration Number:</TableCell>
                                <TableCell align="right">{user.registrationNumber}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableHead>
                              <TableRow>
                                <TableCell>Gender:</TableCell>
                                <TableCell align="right">{user.gender}</TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>
                        </TableContainer>
                        </Grid>
                        {/* <Grid container style={{ marginTop: 10, flex: 7, flexDirection: 'column'}} >
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
                        </Grid> */}
                        <Grid container style={{flex: 4, marginTop: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                          <p>QR code</p>
                          <QRCode value={qrdata} logoImage={Logo} logoWidth={50}/>,
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
