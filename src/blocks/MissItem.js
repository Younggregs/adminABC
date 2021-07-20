import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ReactComponent as Bin } from '../assets/svg/Bin.svg';
import deleteMiss from '../promises/DeleteMiss'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 5
  },
  dpContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '40vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  dp: {
    height: 150,
    width: 200,
    margin: 10,
    backgroundColor: 'whitesmoke',
    display: 'flex',
    flexDirection: 'column',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  dp2: {
    height: 150,
    width: 200,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  uploadView: {
    direction: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 5,
    backgroundColor: '#000',
    borderRadius: 10
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
    color:  '#595ecd',
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

export default function LocationItem(props) {
  const classes = useStyles();

  const [openalert, setOpenalert] = useState(false);
  const [opendelete, setOpendelete] = useState(false);
  const [alertmsg, setAlertmsg] = useState();
  const [deleted, setDeleted] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenalert(false);
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


const handleDelete = async () => {

  setOpendelete(false)
  setOpenalert(true)
  setAlertmsg('Deleting Missed Location Guide')

  const message = await deleteMiss(props.item.id)

  setOpenalert(true)
  if(message.error_message){
    setAlertmsg(message.error_message)
  }else{
    setDeleted(true)
    setAlertmsg('Missed location guide deleted succesfully')
  }

}


return (
    <div className={classes.root}>

    <Grid container>
        {deleted ? (
            <Grid />
        ) : (
        <Grid className={classes.linksView}>
        <Grid className={classes.links}>
            <Grid className={classes.linkText}>{props.item.fromA} to {props.item.toB}</Grid>
            
            
            <Grid className={classes.iconButton}>
            <Button onClick={handleClickOpenDelete}>
                  <Bin />
            </Button>
            <Dialog fullWidth={true} maxWidth={'sm'} open={opendelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-delete">
                <DialogTitle id="form-dialog-title">Are you sure you want to delete this Missed Location Guide? {props.item.name}</DialogTitle>
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
          </Grid>
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