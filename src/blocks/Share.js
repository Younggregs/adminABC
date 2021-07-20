import React, {useEffect,useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {  ROOT_PATH_URL } from '../constants'
import { Alert } from '@material-ui/lab';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    PinterestShareButton,
    RedditShareButton,
    EmailShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    PinterestIcon,
    RedditIcon,
    LinkedinIcon,
    EmailIcon,
  } from 'react-share'
import Grid from '@material-ui/core/Grid'
import Button from '../components/Button'
import Buttonb from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ShareIcon from '@material-ui/icons/Share'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 5, 
    display: 'flex',
    flexDirection: 'column'
  },
  shareView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  shareButton: {
      margin: 5
  }
}));

export default function Share(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [share, setShare] = useState(false);
  const [guide, setGuide] = useState(false)
  const [check, setCheck] = useState(true)


  useEffect(() =>{
    const makeGuide = async (guideList) => {
    
      console.log('list', guideList)
      var guide = ''
      for(var item in guideList){
        guide = guide + '\n' + guideList[item].guide
      }
      setCheck(false)
      setGuide(guide)

      console.log('res', guide)

      return guide
    }

    if(check){
      makeGuide(props.guide)
    }
  })

  const copyText = (guide) => {
    console.log('guide', guide)
    if(guide.length > 0){
      return guide.slice(0, 50)
    }else{
      return guide
    }
  }
  
  


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const copyListener = async (link) => {
    setCopied({copied: true})
    //await registerShare(props.username, link)
  }

  const clickListener = async (link) => {
    //await registerShare(props.username, link)
  }





  return (
        <div className={classes.root}>

        <Grid className={classes.formBox}>
        <div>
        <ShareIcon onClick={handleClickOpen} style={{ color: '#000', cursor: 'pointer' }} />
        <Dialog fullWidth={true} maxWidth={'sm'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Share <span style={{color: '#1DA1F2'}}>{props.from} to {props.to}</span> guide</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Your guide around town
            </DialogContentText>
            <Alert severity="info" action={ 
                <CopyToClipboard text={guide}
                    onCopy={() => copyListener('Copied')}>
                        <Buttonb color="inherit" size="small">
                            {copied ? (
                                    <span>Copied</span>
                            ) : (
                                <span>COPY</span>
                            )}
                        </Buttonb>
                </CopyToClipboard>
            }><p style={{textAlign: 'left', whiteSpace: 'pre-wrap', fontSize: 15}}>{copyText(guide)}...</p></Alert>
            
            
            <Grid style={{ margin: 5 }}>
            <Button handleClick={() => setShare(!share)} title='Share as Link' />
                <Grid>
                {share ? (
                <Grid className={classes.shareView}>
                    <Grid className={classes.shareButton}>
                        <WhatsappShareButton onClick={() => clickListener('Whatsapp')} url={guide + '\n' + ROOT_PATH_URL}><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
                    </Grid>
                    <Grid className={classes.shareButton}>
                        <TwitterShareButton onClick={() => clickListener('Twitter')} url={guide + '\n' + ROOT_PATH_URL}><TwitterIcon size={32} round={true} /></TwitterShareButton>
                    </Grid>
                    <Grid className={classes.shareButton}>
                        <FacebookShareButton onClick={() => clickListener('Facebook')} url={guide + '\n' + ROOT_PATH_URL}><FacebookIcon size={32} round={true} /></FacebookShareButton>
                    </Grid>
                    <Grid className={classes.shareButton}>
                        <TelegramShareButton onClick={() => clickListener('Telegram')} url={guide + '\n' + ROOT_PATH_URL}><TelegramIcon size={32} round={true} /></TelegramShareButton>
                    </Grid>
                    <Grid className={classes.shareButton}>
                        <PinterestShareButton onClick={() => clickListener('Pinterest')} url={guide + '\n' + ROOT_PATH_URL}><PinterestIcon size={32} round={true} /></PinterestShareButton>
                    </Grid>
                    <Grid className={classes.shareButton}>
                        <RedditShareButton onClick={() => clickListener('Reddit')} url={guide + '\n' + ROOT_PATH_URL}><RedditIcon size={32} round={true} /></RedditShareButton>
                    </Grid>
                    <Grid className={classes.shareButton}>
                        <EmailShareButton onClick={() => clickListener('Email')} url={guide + '\n' + ROOT_PATH_URL}><EmailIcon size={32} round={true} /></EmailShareButton>
                    </Grid>
                    <Grid className={classes.shareButton}>
                        <LinkedinShareButton onClick={() => clickListener('Linkedin')} url={guide + '\n' + ROOT_PATH_URL}><LinkedinIcon size={32} round={true} /></LinkedinShareButton>
                    </Grid>
                </Grid>
                ) : (
                    <span></span>
                )}
            </Grid>

            </Grid>
            </DialogContent>
            <DialogActions>
            <Button handleClick={handleClose} title='close'/>
            </DialogActions>
        </Dialog>
        </div>

        </Grid>
    
    </div>
  );
}