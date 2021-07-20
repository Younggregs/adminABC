import React, {useState} from 'react';
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
            <h3 style={{color: 'gray', textAlign: 'center', margin: 10}}>Manage users</h3>
        </Box> 

        <Grid className="new-location" direction="column" justify="center" alignItems="center">
        
        <Grid style={{width: 300}} direction="column" justify="center" alignItems="center">
          <Button1 handleClick={handleClickOpen} style={{width: 250}} title="Add New User"/>
          <Dialog fullWidth={true} maxWidth={'sm'} open={open} onClose={handleClose} aria-labelledby="form-dialog-edit">
            <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Obuntu, i am because we are.
            </DialogContentText>

            <Grid className={classes.formField}>
              {lgas.length <= '0' ? (
                <p>Fetching LGAs... </p>
              ) : (
                <FormControl className={classes.formControl}>
                  <InputLabel required id="from">LGA</InputLabel>
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
                <InputLabel required id="from">Ward</InputLabel>
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
                    <InputLabel required id="from">Polling Units</InputLabel>
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
                <TextField 
                id="name" 
                label="Full Name" 
                onChange={onNameChanged}
                required fullWidth/>
            </Grid>

            <Grid className={classes.formField}>  
                <TextField 
                  id="email" 
                  label="Email" 
                  helperText="Email is not required"
                  onChange={onEmailChanged}
                  fullWidth/>
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
                <InputLabel required id="from">Does user have a voter card?</InputLabel>
                <Select
                  labelId="voterCard"
                  id="voterCard"
                  style={{minWidth: 300}}
                  required
                  value={hasVotersCard}
                  onChange={handleChangeVotersCard}
                >
                  <MenuItem key='1' value={1}>Yes</MenuItem>
                  <MenuItem key='1' value={0}>No</MenuItem>
                </Select>
            </FormControl>
            </Grid>

            <Grid className={classes.formField}>  
                <TextField 
                id="phone" 
                label="Phone" 
                placeholder="eg. 08109599597"
                inputProps={{ maxLength: 11 }}
                onChange={onPhoneChanged}
                required fullWidth/>
                <p style={{color: '#ff0000'}}>{phoneError && "Invalid Phone Number"}</p>
            </Grid>

            <Grid className={classes.formField}>  
                <TextField  
                  id="password" 
                  label="Password" 
                  type="password"
                  onChange={onPasswordChanged}
                  onKeyDown={(e) => _handleKeyDownSubmit(e)} 
                  required fullWidth
                  />
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
            <h4 style={{color: 'gray', textAlign: 'center', margin: 10}}>Users ({list.length})</h4>
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