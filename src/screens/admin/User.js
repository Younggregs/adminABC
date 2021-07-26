import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import lgaList from '../../promises/LgaList'
import wardList from '../../promises/WardList'
import pollingUnitList from '../../promises/PollingUnitList'
import UserItem from '../../blocks/UserItem'
import Button1 from '../../components/Button'
import Button from '@material-ui/core/Button'
import newUser from '../../promises/NewUser'
import userList from '../../promises/UserList'
import InnerNavbar from '../../partials/InnerNavbar'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import signup from '../../promises/Signup'
import '../../styles/Home.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'rgb(224, 245, 228)'
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
  titleCase: {
    textTransform: 'capitalize'
  },
  formField: {
    background: '#FFFFF9',
    margin: 10,
    padding: 5,
    borderRadius: 5
  }
}));

export default function User(props) {
    const classes = useStyles();
    const [error, setError] = useState('')
    const [errorA, setErrorA] = useState('')
    const [list, setList] = useState([]);
    const [check, setCheck] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [lastname, setLastname] = useState('')
    const [age, setAge] = useState('')
    const [votercard, setVotercard] = useState('')
    const [lgas, setLgas] = React.useState([])
    const [lga, setLga] = React.useState()
    const [loadward, setLoadward] = React.useState(false)
    const [loadpolls, setLoadpolls] = React.useState(false)
    const [wards, setWards] = React.useState([]);
    const [pollingUnits, setPollingUnits] = React.useState([]);
    const [ward, setWard] = React.useState();
    const [pollingUnit, setPollingUnit] = useState([]);
    const [gender, setGender] = React.useState();
    const [memberType, setMemberType] = React.useState();
    const [phone, setPhone] = useState('')
    const [registrationNumber, setRegistrationNumber] = useState('')

    const onPhoneChanged = (e) => {
      setPhone(e.target.value)
    }
    const onRegistrationNumberChanged = (e) => {
        setRegistrationNumber(e.target.value)
      }

    const onPasswordChanged = e => setPassword(e.target.value)
    const onFirstnameChanged = e => setFirstname(e.target.value)
    const onMiddlenameChanged = e => setMiddlename(e.target.value)
    const onLastnameChanged = e => setLastname(e.target.value)
    const onAgeChanged = e => setAge(e.target.value)
    const onVotercardChanged = e => setVotercard(e.target.value)

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

    const handleChangeMemberType = async (event) => {
      setMemberType(event.target.value);
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
  
      const res = await userList()
      setCheck(false)
    
      if(res){
        if(res.error_message){
          setErrorA(res.error_message)
        }else{
          setList(res)
        }
        
     }else{
      setError('')
     }
      
    }

    if(check){
      fetchGuides()
    }
    
    const handleSave = async() => {
  
    if (canSave) {

        setError('')
        setList([])
        //console.log('res', name, phone, password, lga, pollingUnit, gender, memberType, registrationNumber)
        const res = await signup(firstname, middlename, lastname, age, votercard, phone, password, lga, ward, pollingUnit, gender, memberType, registrationNumber)
        if(res){
            if(res.error_message){
              setError(res.error_message)
            }else{
              const r = await userList()
              setList(r)
              setOpen(false)
            }
            
        }else{
          setError('Oops something broke, refresh and try again')
        }

    }else{
      setError('All required fields must be filled')
    }
  
  }

  const canSave = [firstname, middlename, lastname, age, votercard, phone, password].every(Boolean)

  useEffect(() => {
    const fetchGuides = async () => {

      const lgas = await lgaList()
      setCheck(false)
      setLgas(lgas)
      
    }

    if(check){
      fetchGuides()
    }
  })
  

  return (
    <div style={{background: 'rgb(224, 245, 228)', minHeight: '100vh'}}>
      <div style={{ margin: 0, paddingBottom: 200}}>
        <InnerNavbar user={true}/> 
      </div>
        <Box style={{background: 'rgb(224, 245, 228)'}}>
            <h3 style={{textAlign: 'center', margin: 10}}>Manage members</h3>
        </Box> 

        <Grid className="new-location" direction="column" justify="center" alignItems="center">
        
        <Grid style={{width: 300, height: '100%'}} direction="column" justify="center" alignItems="center">
          <Button1 handleClick={handleClickOpen} style={{width: 250}} title="Add New Members"/>
          <Dialog fullWidth={true} maxWidth={'sm'} open={open} onClose={handleClose} aria-labelledby="form-dialog-edit">
            <DialogTitle id="form-dialog-title">Add new member</DialogTitle>
            <DialogContent className={classes.root}>
            <DialogContentText>
              All Progressives Congress Portal
            </DialogContentText>

            <Grid className={classes.formField}>
              {lgas.length <= '0' ? (
                  <p>Fetching LGAs... </p>
              ) : (
                  <FormControl className={classes.formControl}>
                  <InputLabel required id="from">Select LGA</InputLabel>
                  <Select
                      labelId="lga"
                      id="lga"
                      style={{minWidth: 300}}
                      required
                      value={lga}
                      onChange={handleChangeLga}
                  >
                  {lgas.map(item =>
                      <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                  )}
                  </Select>
              </FormControl>
              )}
            </Grid>

            <Grid className={classes.formField}>
                {loadward ? (
                    <p>Fetching wards... </p>
                ) : (
                    <FormControl className={classes.formControl}>
                    <InputLabel required id="from">Select Ward</InputLabel>
                    <Select
                    labelId="ward"
                    id="ward"
                    style={{minWidth: 300}}
                    required
                    value={ward}
                    onChange={handleChangeWard}
                    >
                    {wards.map(item =>
                    <MenuItem key={item.id} value={item.id} className={classes.titleCase}><span className={classes.titleCase}>{item.name}</span></MenuItem>
                    )}
                    </Select>
                </FormControl>
                )}
                
                </Grid>

                <Grid className={classes.formField}>
                {loadpolls ? (
                    <p>Fetching Polling Units... </p>
                    ) : (
                    <FormControl className={classes.formControl}>
                        <InputLabel required id="from">Select Polling Units</InputLabel>
                        <Select
                        labelId="pollingUnit"
                        id="pollingUnit"
                        style={{minWidth: 300}}
                        required
                        value={pollingUnit}
                        onChange={handleChangePollingUnit}
                        >
                        {pollingUnits.map(item =>
                        <MenuItem key={item.id} value={item.id} className={classes.titleCase}><span className={classes.titleCase}>{item.name}</span></MenuItem>
                        )}
                        </Select>
                    </FormControl>
                    )}
                </Grid>

                <Grid className={classes.formField}>
                <FormControl className={classes.formControl}>
                    <InputLabel required id="from">Gender</InputLabel>
                    <Select
                    labelId="gender"
                    id="gender"
                    style={{minWidth: 300}}
                    required
                    value={gender}
                    onChange={handleChangeGender}
                    >
                    <MenuItem key='1' value='Male'>Male</MenuItem>
                    <MenuItem key='2' value='Female'>Female</MenuItem>
                    </Select>
                </FormControl>
                </Grid>

                <Grid className={classes.formField}>
                <FormControl className={classes.formControl}>
                    <InputLabel required id="from">Select member type</InputLabel>
                    <Select
                    labelId="memberType"
                    id="memberType"
                    style={{minWidth: 300}}
                    required
                    value={memberType}
                    onChange={handleChangeMemberType}
                    >
                        <MenuItem key='1' value={0}>New member</MenuItem>
                        <MenuItem key='1' value={1}>Old member</MenuItem>
                    </Select>
                </FormControl>
                </Grid>

                {memberType === 1 && (
                    <Grid className={classes.formField}>  
                        <TextField 
                        id="registrationNumber" 
                        label="Registration Number" 
                        placeholder="eg. PL/PKN/13/12108"
                        onChange={onRegistrationNumberChanged}
                        required 
                        style={{width: 300}}/>
                        {/* <p style={{color: '#ff0000'}}>{phoneError && "Invalid Phone Number"}</p> */}
                    </Grid>
                )}

                <Grid className={classes.formField}>  
                    <TextField 
                    id="firstname" 
                    label="First Name" 
                    onChange={onFirstnameChanged}
                    required 
                    style={{width: 300}}/>
                </Grid>

                <Grid className={classes.formField}>  
                    <TextField 
                    id="middlename" 
                    label="Middle Name" 
                    onChange={onMiddlenameChanged}
                    required 
                    style={{width: 300}}/>
                </Grid>

                <Grid className={classes.formField}>  
                    <TextField 
                    id="lastname" 
                    label="Last Name" 
                    onChange={onLastnameChanged}
                    required 
                    style={{width: 300}}/>
                </Grid>

                <Grid className={classes.formField}>  
                    <TextField 
                    id="age" 
                    label="Age" 
                    onChange={onAgeChanged}
                    required 
                    style={{width: 300}}/>
                </Grid>

                <Grid className={classes.formField}>  
                    <TextField 
                    id="votercard" 
                    label="Voter Card Number" 
                    onChange={onVotercardChanged}
                    required 
                    style={{width: 300}}/>
                </Grid>


            <Grid className={classes.formField}>  
                <TextField 
                id="phone" 
                label="Phone" 
                onChange={onPhoneChanged}
                required fullWidth/>
            </Grid>

            <Grid className={classes.formField}>  
                <TextField 
                  id="password" 
                  label="Password" 
                  onChange={onPasswordChanged}
                  required fullWidth/>
            </Grid>

            <p style={{color: '#ff0000'}}>{error}</p>

          </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={() => handleSave()} disabled={!canSave} color="primary">
                Submit
            </Button>
        </DialogActions>
        </Dialog>
        </Grid>
        </Grid>

        <Grid>
          <Box>
            <h4 style={{textAlign: 'center', margin: 10}}>Users ({list.length})</h4>
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