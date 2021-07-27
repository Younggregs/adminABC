import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { ReactComponent as Pen } from '../assets/svg/Pen.svg';
import { ReactComponent as Bin } from '../assets/svg/Bin.svg';
import TextField from '@material-ui/core/TextField'
import editGuide from '../promises/EditGuide'
import deleteGuide from '../promises/DeleteGuide'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactToPdf from "react-to-pdf";
import ReactToPrint from 'react-to-print';
import { IMG_PATH_URL } from '../constants'
import anon from '../assets/imgs/user.png'
import MainLogo from '../assets/imgs/MainLogo2.png'
import { QRCode } from 'react-qrcode-logo';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootb: {
    backgroundColor: '#AFDFF3'
  },
  linksView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  links: {
    marginBottom: 10,
  },
  linkText: {
    flex: 8,
    padding: 5, 
    fontSize: 15,
    fontWeight: 'bold',
    color:  '#000',
  },
  iconButton: {
    height: 35,
    width: 35,
    margin: 2,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex'
  },
  avatar: {
    backgroundColor: 'white',
    colore: 'white',
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    margin: 10, 
    display: 'flex',
    flexDirection: 'column'
  },
  formField: {
    margin: 5
  },
  signatureBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    width: '100%',
    padding: 10,
    margin: 10, 
    textAlign: 'center'
  },
  logoI: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 23
  },
  logoII: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 23
  },
  linkStyle: {
      padding: 5,
      fontSize: 12,
  },
  titleCase: {
    textTransform: 'capitalize'
  }
}));

export default function UserItem(props) {
  const classes = useStyles();
  const ref = React.createRef();

  const [guide, setGuide] = React.useState(props.item.guide);
  const [ttc, setTtc] = React.useState(props.item.total_travel_cost);
  const [ttt, setTtt] = React.useState(props.item.total_travel_time);
  const [openalert, setOpenalert] = React.useState(false);
  const [openedit, setOpenedit] = React.useState(false);
  const [opendelete, setOpendelete] = React.useState(false);
  const [alertmsg, setAlertmsg] = React.useState();
  const [deleted, setDeleted] = React.useState(false);
  const [edited, setEdited] = React.useState(false);
  const [brick, setBrick] = React.useState({});
  const [check, setCheck] = React.useState(true)
  const [qrdata, setQrdata] = React.useState("")

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenalert(false);
  };


  const handleClickOpenEdit = () => {
    setOpenedit(true);
  };

  const handleCloseEdit = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenedit(false);
  };


  const handleClickOpenDelete = () => {
    setOpendelete(true);
  };

  const handleCloseDelete = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpendelete(false);
  };

  const handleChangeGuide = (event) => {
    setGuide(event.target.value);
  };

  const handleChangeTtc = (event) => {
    setTtc(event.target.value);
  };

  const handleChangeTtt = (event) => {
    setTtt(event.target.value);
  };



const handleEdit = async (id) => {

  setOpenedit(false)
  setOpenalert(true)
  setAlertmsg('Submitting Guide')

  const message = await editGuide(id, guide, ttc, ttt)
  setOpenalert(true)
  if(message.error_message){
    setAlertmsg(message.error_message)
  }else{
    setEdited(true);
    setBrick(message);
    setAlertmsg('Guide edited succesfully')
    //setLink(message)
  }
        
}

const handleDelete = async (id) => {

  setOpendelete(false)
  setOpenalert(true)
  setAlertmsg('Deleting Guide')

  const message = await deleteGuide(id)

  setOpenalert(true)
  if(message.error_message){
    setAlertmsg(message.error_message)
  }else{
    setDeleted(true)
    setAlertmsg('Guide deleted succesfully')
  }

}


useEffect( () => {
  const fetchUserData = async () => {
      console.log('res', props.item)
      let i = 'Name: ' + props.item.lastname.charAt(0).toUpperCase() + props.item.lastname.slice(1) + ' ' 
            + props.item.middlename.charAt(0).toUpperCase() + props.item.middlename.slice(1) + ' ' 
            + props.item.firstname.charAt(0).toUpperCase() + props.item.firstname.slice(1) + '\n'
      i = i + 'Reg No: ' + props.item.registrationNumber + '\n'
      i = i + 'Gender: ' + props.item.gender + '\n'
      i = i + 'Age: ' + props.item.age + '\n'
      i = i + 'LGA: ' + props.item.lga + '\n'
      i = i + 'Ward: ' + props.item.ward.charAt(0).toUpperCase() + props.item.ward.slice(1) + '\n'
      i = i + 'Polling Unit: ' + props.item.pollingUnit.charAt(0).toUpperCase() + props.item.pollingUnit.slice(1) + '\n'
      setQrdata(i)
      setCheck(false)
  }

  if(check){
    fetchUserData()
  }
})




return (
    <div className={classes.root}>

    <Grid container>
        {deleted ? (
            <Grid />
        ) : (
        <Grid>
            {edited ? (
                <Grid className={classes.linksView}>
                <Grid className={classes.links}>
                
                <Grid className={classes.linkText}>
                    <p>{props.item.from} to {props.item.to}</p>
                    <p>Vehicle: {props.item.vehicle}</p>
                </Grid>
                <Grid className={classes.iconButton}>
                <Button onClick={handleClickOpenEdit}>
                    <Pen />
                </Button>
                  <Dialog fullWidth={true} maxWidth={'sm'} open={openedit} onClose={handleCloseEdit} aria-labelledby="form-dialog-edit">
                      <DialogTitle id="form-dialog-title">Edit Guide</DialogTitle>
                      <DialogContent>
                      <DialogContentText>
                          It's all about the network.
                      </DialogContentText>
    
                      <Grid className={classes.formField}>  
                          <TextField 
                            autoFocus 
                            id="guide" 
                            label="Guide" 
                            multiline        
                            rows={4}
                            cols={100}
                            style={{width: 300}}
                            defaultValue={brick.guide} 
                            onChange={handleChangeGuide} 
                            required fullWidth/>
                      </Grid>

                      <Grid className={classes.formField}>  
                          <TextField id="ttt" label="Total Travel Time" defaultValue={brick.total_travel_time} onChange={handleChangeTtt} required fullWidth/>
                      </Grid>

                      <Grid className={classes.formField}>  
                          <TextField id="ttc" label="Total Travel Cost" defaultValue={brick.total_travel_cost} onChange={handleChangeTtc} required fullWidth/>
                      </Grid>
    
                      </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseEdit} color="primary">
                          Cancel
                      </Button>
                      <Button onClick={() => handleEdit(brick.id)} color="primary">
                          Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
                <Grid className={classes.iconButton}>
                <Button onClick={handleClickOpenDelete}>
                      <Bin />
                </Button>
                <Dialog fullWidth={true} maxWidth={'sm'} open={opendelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-delete">
                    <DialogTitle id="form-dialog-title">Are you sure you want to delete this Guide? {brick.name}</DialogTitle>
                    <DialogActions>
                      <Button onClick={handleCloseDelete} color="primary">
                          Cancel
                      </Button>
                      <Button onClick={() => handleDelete(brick.id)} color="primary">
                          Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>

            ): (

          <Grid className={classes.linksView}>
            <Grid className={classes.links}>
            <Grid>
              <Card ref={ref} className={classes.rootb}>
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
                          src={props.item.image ? IMG_PATH_URL + props.item.image : anon} 
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
                                <TableCell align="right">{props.item.firstname}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableHead>
                              <TableRow>
                                <TableCell>Middlename:</TableCell>
                                <TableCell align="right">{props.item.middlename}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableHead>
                              <TableRow>
                                <TableCell>Lastname:</TableCell>
                                <TableCell align="right">{props.item.lastname}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableHead>
                              <TableRow>
                                <TableCell>Registration Number:</TableCell>
                                <TableCell align="right">{props.item.registrationNumber}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableHead>
                              <TableRow>
                                <TableCell>Gender:</TableCell>
                                <TableCell align="right">{props.item.gender}</TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>
                        </TableContainer>
                    </Grid>
                    <Grid container style={{flex: 4, marginTop: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                      <p>QR code</p>
                      <QRCode value={qrdata} logoImage={MainLogo} logoWidth={50}/>,
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
            {/*
            <Grid className={classes.iconButton}>
            <Button onClick={handleClickOpenEdit}>
                  <Pen />
            </Button>
              <Dialog fullWidth={true} maxWidth={'sm'} open={openedit} onClose={handleCloseEdit} aria-labelledby="form-dialog-edit">
                  <DialogTitle id="form-dialog-title">Edit Guide</DialogTitle>
                  <DialogContent>
                  <DialogContentText>
                      It's all about the network.
                  </DialogContentText>

                  <Grid className={classes.formField}>  
                      <TextField 
                        autoFocus 
                        id="guide" 
                        label="Guide"
                        multiline        
                        rows={4}
                        cols={20}
                        defaultValue={props.item.guide} 
                        onChange={handleChangeGuide} 
                        required 
                        fullWidth/>
                  </Grid>

                  <Grid className={classes.formField}>  
                      <TextField id="ttt" label="Total Travel Time" defaultValue={props.item.total_travel_time} onChange={handleChangeTtt} required fullWidth/>
                  </Grid>

                  <Grid className={classes.formField}>  
                      <TextField id="ttc" label="Total Travel Cost" defaultValue={props.item.total_travel_cost} onChange={handleChangeTtc} required fullWidth/>
                  </Grid>

                  </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseEdit} color="primary">
                      Cancel
                  </Button>
                  <Button onClick={() => handleEdit(props.item.id)} color="primary">
                      Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid className={classes.iconButton}>
            <Button onClick={handleClickOpenDelete}>
                  <Bin />
            </Button>
            <Dialog fullWidth={true} maxWidth={'sm'} open={opendelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-delete">
                <DialogTitle id="form-dialog-title">Are you sure you want to delete this Guide? {props.item.name}</DialogTitle>
                <DialogActions>
                  <Button onClick={handleCloseDelete} color="primary">
                      Cancel
                  </Button>
                  <Button onClick={() => handleDelete(props.item.id)} color="primary">
                      Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            */}
          </Grid>
        </Grid>

            )}
        </Grid>

        )}

        

    </Grid>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openalert} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success">
          {alertmsg}
        </Alert>
      </Snackbar>
      
    </div>
  );
}