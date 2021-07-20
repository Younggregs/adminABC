import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { IMG_PATH_URL } from '../constants'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid'
import fetchImage from '../promises/FetchImage'


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
    height: 250,
    width: 300,
    backgroundColor: 'whitesmoke',
    display: 'flex',
    flexDirection: 'column',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  dp2: {
    height: 250,
    width: 300,
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

export default function LinkItem(props) {
  const classes = useStyles();

  const [openalert, setOpenalert] = useState(false);
  const [alertmsg, setAlertmsg] = useState();
  const [display, setDisplay] = useState([]);
  const [check, setCheck] = useState(true)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchLocationImages = async () => {
  
      setOpenalert(true)
      setAlertmsg('Fetching location images')
  
      const res = await fetchImage(props.id)
      setCheck(false)
      if(res){
        if(res.error_message){
          setOpenalert(true)
          setAlertmsg(res.error_message)
        }else{
          setDisplay(res)
          makeImages(res)
          setOpenalert(true)
          setAlertmsg('Loaded list successfully')
        }
        
     }else{
      setOpenalert(true)
      setAlertmsg('Empty list, addlocations images')
     }
      
    }
  
  
    if(check){
      fetchLocationImages()
    }
  
  })

  const makeImages = (list) =>{
    var images = []
    for (var item in list){
      images.push(IMG_PATH_URL + list[item].image)
    }
    setImages(images)
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenalert(false);
  };



return (
    <div className={classes.root}>

        <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="column" 
        >

        <div>
        {/* <Button title="View Destination Images" handleClick={() => setIsOpen(true)} /> */}
 
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
            onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
          />
        )}
      </div>

        {display.map(item =>
            <Grid
                className={classes.dp2}
                container
                justify="center"
                alignItems="center"
                direction="column" 
            >
            <Grid className={classes.box}>
                <Grid item xs={12} className={classes.dpContainer}>
                    
                <Grid 
                    className={classes.dp} 
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                    onClick={() => setIsOpen(true)}
                    style={{ backgroundImage: `url(${IMG_PATH_URL + item.image})` }}
                    >
                </Grid>

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