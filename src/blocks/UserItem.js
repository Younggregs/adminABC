import React from 'react';
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


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  linksView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  links: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    width: 300,
    borderRadius: 5,
    border: '1px solid gray',
    margin: 10,
    padding: 5,
    flexDirection: 'row',
    display: 'flex'
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
  }
}));

export default function UserItem(props) {
  const classes = useStyles();

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
            <Grid container direction="column">
                    <p className={classes.linkText}>Name: {props.item.name}</p>
                    <p className={classes.linkText}>Phone: {props.item.phone}</p>
                    <p className={classes.linkText}>LGA: {props.item.lga}</p>
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