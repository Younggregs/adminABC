import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AdminItem from '../../blocks/AdminItem'
import Button1 from '../../components/Button'
import Button from '@material-ui/core/Button'
import newAdmin from '../../promises/NewAdmin'
import adminList from '../../promises/AdminList'
import lgaList from '../../promises/LgaList'
import wardList from '../../promises/WardList'
import pollingUnitList from '../../promises/PollingUnitList'
import InnerNavbar from '../../partials/InnerNavbar'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import '../../styles/Home.css'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { capitalize } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  editView:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: 5
  },
  msgView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    display: 'flex',
    margin: 5
  },
  titleBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    width: '100%',
    padding: 10,
    margin: 10, 
    textAlign: 'center'
  },
  signatureBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
    padding: 10,
    margin: 10, 
    textAlign: 'center'
  },
  linkStyle: {
      padding: 5,
      fontSize: 12,
  },
  formField: {
    marginBottom: 20
  },
  titleCase: {
    textTransform: 'capitalize'
  }
}));

export default function Print(props) {
    const classes = useStyles();
    const [error, setError] = useState('')
    const [errorA, setErrorA] = useState('')
    const [list, setList] = useState([]);
    const [check, setCheck] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [wards, setWards] = React.useState([]);
    const [pollingUnits, setPollingUnits] = React.useState([]);
    const [ward, setWard] = React.useState();
    const [pollingUnit, setPollingUnit] = useState([]);
    const [email, setEmail] = useState();
    const [gender, setGender] = React.useState();
    const [hasVotersCard, setHasVotersCard] = React.useState();
    const [loadward, setLoadward] = React.useState(false)
    const [loadpolls, setLoadpolls] = React.useState(false)
    const [lgas, setLgas] = React.useState([])
    const [lga, setLga] = React.useState()
    const [phoneError, setPhoneError] = React.useState([])
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')

    const onPhoneChanged = (e) => {
      setPhone(e.target.value)
      setPhoneError(false)
    }
    const onPasswordChanged = e => setPassword(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)

    const _handleKeyDownSubmit = (e) => {
      if (e.key === 'Enter') {
        handleSave()
      }
    } 

    const handleChangeLga = async (event) => {
        setLga(event.target.value);

        setLoadward(true)
        const res = await wardList(event.target.value)
        setWards(res)
        setLoadward(false)
    };

    const handleChangeWard = async (event) => {
      setWard(event.target.value);

      setLoadpolls(true)
      const res = await pollingUnitList(event.target.value)
      setPollingUnits(res)
      setLoadpolls(false)

    };

    const handleChangePollingUnit = async (event) => {
      setPollingUnit(event.target.value);
    };

    const handleChangeGender = async (event) => {
      setGender(event.target.value);
    };

    const handleChangeVotersCard = async (event) => {
      setHasVotersCard(event.target.value);
    };
    
    const handleClickOpen = () => {
    setOpen(true);
    };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
  
    const fetchGuides = async () => {
  
      const res = await adminList()
      const lgas = await lgaList()
      setCheck(false)
      setLgas(lgas)
    
      if(res){
        if(res.error_message){
          setErrorA(res.error_message)
        }else{
          setList(res)
        }
        
     }else{
      setError('Empty list, start adding guides now')
     }
      
    }

    if(check){
      fetchGuides()
    }
    
    const handleSave = async() => {
  
        setPhoneError(false)
        if (canSave) {
          
          if(verifyPhone(phone)){

            setError('')
            setList([])
            const res = await newAdmin(name, phone, password, lga, ward, pollingUnit, gender, email, hasVotersCard)
            if(res){
                if(res.error_message){
                  setError(res.error_message)
                }else{
                  setList(res)
                  setOpen(false)
                }
                
            }else{
              setError('Oops something broke, refresh and try again')
            }

          }else{
            setPhoneError(true)
          }
          

      }else{
        setError('All required fields must be filled')
      }
    
    }

    const canSave = [name, phone, password, lga, ward, pollingUnit, gender, hasVotersCard].every(Boolean)

    const verifyPhone = (value) => {
      
      let v = isNaN(value)
      if(isNaN(value)){
       return false
      }
      
      return value.match(/\d/g).length === 11;

    }


    const handleClickLga = () => {
      window.location.assign('/printlga')
    }

    const handleClickWard = () => {
      window.location.assign('/printward')
    }

    const handleClickPoll = () => {
      window.location.assign('/printpoll')
    }


  return (
    <div>
      <div style={{ margin: 0, marginBottom: 200}}>
        <InnerNavbar print={true}/> 
      </div>
        <Box>
            <h3 style={{color: 'gray', textAlign: 'center', margin: 10}}>Manage Printing</h3>
        </Box> 

        <Grid className="new-location" direction="column" justify="center" alignItems="center">
          <Grid style={{width: 300, marginBottom: 10}} direction="column" justify="center" alignItems="center">
            <Button1 handleClick={handleClickLga} style={{width: 250}} title="Print by LGA"/>
          </Grid>
          <Grid style={{width: 300, marginBottom: 10}} direction="column" justify="center" alignItems="center">
            <Button1 handleClick={handleClickWard} style={{width: 250}} title="Print by Ward"/>
          </Grid>
          <Grid style={{width: 300, marginBottom: 10}} direction="column" justify="center" alignItems="center">
            <Button1 handleClick={handleClickPoll} style={{width: 250}} title="Print by Polling Unit"/>
          </Grid>
        </Grid>
        
    </div>
  );
}