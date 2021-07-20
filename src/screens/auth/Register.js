import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom'
import MainLogo from '../../assets/imgs/MainLogo2.png'
import lgaList from '../../promises/LgaList'
import wardList from '../../promises/WardList'
import pollingUnitList from '../../promises/PollingUnitList'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import '../../styles/Auth.css'
import Button from '../../components/Button'
import signup from '../../promises/Signup'
import signin from '../../store'
import isSuperUser from '../../promises/IsSuperUser'
import Grid from '@material-ui/core/Grid'


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
      marginBottom: 15,
      marginTop: 15,
      width: '100%'
    },
    formField2: {
        marginBottom: 20,
        marginTop: 20,
        width: 300
      },
    titleCase: {
      textTransform: 'capitalize'
    }
  }));


export default function Login() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState('')
    const [flowershower, setFlowershower] = useState(false)
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)
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
    const [memberType, setMemberType] = React.useState();
    const [loadward, setLoadward] = React.useState(false)
    const [loadpolls, setLoadpolls] = React.useState(false)
    const [lgas, setLgas] = React.useState([])
    const [lga, setLga] = React.useState()
    const [phoneError, setPhoneError] = React.useState([])
    const [name, setName] = useState('')
    const [registrationNumber, setRegistrationNumber] = useState('')

    const onPhoneChanged = (e) => {
      setPhone(e.target.value)
      setPhoneError(false)
    }
    const onRegistrationNumberChanged = (e) => {
        setRegistrationNumber(e.target.value)
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
    
    
    const handleSave = async() => {
  
        setPhoneError(false)
        if (canSave) {
          
          if(verifyPhone(phone)){

            setError('')
            setList([])
            // const res = await newAdmin(name, phone, password, lga, ward, pollingUnit, gender, email, hasVotersCard)
            // if(res){
            //     if(res.error_message){
            //       setError(res.error_message)
            //     }else{
            //       setList(res)
            //       setOpen(false)
            //     }
                
            // }else{
            //   setError('Oops something broke, refresh and try again')
            // }

          }else{
            setPhoneError(true)
          }
          

      }else{
        setError('All required fields must be filled')
      }
    
    }

    const canSave = [name, phone, password, lga, ward, pollingUnit, gender, memberType].every(Boolean)

    const verifyPhone = (value) => {
      
      let v = isNaN(value)
      if(isNaN(value)){
       return false
      }
      
      return value.match(/\d/g).length === 11;

    }
    

    // const onPhoneChanged = e => setPhone(e.target.value)
    // const onPasswordChanged = e => setPassword(e.target.value)

    // const _handleKeyDownSubmit = (e) => {
    //     if (e.key === 'Enter') {
    //       submit()
    //     }
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const submit = async () => {

        setLoading(true)
        // console.log('res', name, phone, password, lga, ward, pollingUnit, gender, memberType, registrationNumber)
        const message = await signup(name, phone, password, lga, pollingUnit, gender, memberType, registrationNumber)
        console.log('message', message)
        if(message.code){
            setFlowershower(true)
            const res = await signin(phone, password)
            if(res){
               
                setSuccess(true)
            } 
        }else if(message.error_message){
            setErr(true)
            setError(message.error_message)
        }else{
            setErr(true)
            setError('Sorry something broke, could not complete the process')
        }

        setLoading(false)
  
    }

    return (
        <div className="auth-background">
            <div className="auth-container">
                <h1 style={{ color: '#228B22', fontWeight: 'bold'}}>All Progressive Congress</h1>
                <br /><br />
                <div>
                    <a href="/#"><img src={MainLogo} width="160px" height="74px" alt="Logo" /></a>
                </div>
                <p>Register to be a member</p>
                <Grid container justifyContent="center" alignItems="center">
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
                    <TextField 
                    id="name" 
                    label="Full Name" 
                    onChange={onNameChanged}
                    required 
                    style={{width: 300}}/>
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
                    id="phone" 
                    label="Phone" 
                    placeholder="eg. 08109599597"
                    inputProps={{ maxLength: 11 }}
                    onChange={onPhoneChanged}
                    required 
                    style={{width: 300}}/>
                    {/* <p style={{color: '#ff0000'}}>{phoneError && "Invalid Phone Number"}</p> */}
                </Grid>

                <Grid className={classes.formField}>  
                    <TextField 
                    id="password" 
                    label="Password" 
                    type="password"
                    onChange={onPasswordChanged}
                    onKeyDown={(e) => _handleKeyDownSubmit(e)} 
                    required 
                    style={{width: 300}}
                    />
                </Grid>
                
                    
                {success ? (
                    <Redirect to={'/dashboard'} />
                ) : (
                <div />
                )}

                {err ? (
                <div>
                    <p style={{color: 'red', fontSize: 15}}>{error}</p>
                </div>
                ) : (
                <div />
                )}
            </Grid>
            <div>
                <p className="already"><Link to="/login" className="sign">Already a member? Login here.</Link></p>
            </div>
            <div className="mt-4 mb-3">
                <Button handleClick={() => submit()} title={loading ? "Processing..." : "Continue"} />
            </div>
                

            </div>
        </div>
    )
}