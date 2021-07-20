import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserItem from '../../blocks/UserItem'
import Button1 from '../../components/Button'
import Button from '@material-ui/core/Button'
import newUser from '../../promises/NewUser'
import userList from '../../promises/UserList'
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

export default function User(props) {
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
    const [lgas, setLgas] = React.useState([])
    const [lga, setLga] = React.useState()
    const [phoneError, setPhoneError] = React.useState([])
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')


  
    useEffect(() => {
      const fetchGuides = async () => {
  
        const res = await userList()
        const lgas = await lgaList()
        setCheck(false)
        setLgas(lgas)
  
        console.log('lgas', lgas)
      
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
    })
    
    
    const handleSave = async() => {
  
    if (canSave) {

      if(verifyPhone(phone)){

        setError('')
        setList([])
        const res = await newUser(name, phone, password, lga, ward, pollingUnit, gender, email, hasVotersCard)
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

  return (
    <div>
      <div style={{ margin: 0, marginBottom: 200}}>
        <InnerNavbar user={true}/> 
      </div>
        <Box>
            <h3 style={{color: 'gray', textAlign: 'center', margin: 10}}>Manage Members</h3>
        </Box> 

        <Grid>
          <Box>
            <h4 style={{color: 'gray', textAlign: 'center', margin: 10}}>Members ({list.length})</h4>
          </Box> 

          <Grid container direction="column" justify="center" alignItems="center">
            <p style={{textAlign: 'center', color: '#ff0000'}}>{errorA}</p>
          </Grid>

          {list.map(item =>
          <Grid container direction="column" justify="center" alignItems="center">
            <UserItem item={item}/>
          </Grid>
          )} 
        
        </Grid>
        
    </div>
  );
}