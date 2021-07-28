import React, { useState, useEffect } from 'react'
import '../../styles/Landing.css'
import { Link } from 'react-router-dom'
import MainLogo from '../../components/MainLogo'
import Grid from '@material-ui/core/Grid'
import userData from '../../promises/FetchUserData'
import UserItem from '../../blocks/UserItem'
import filterByPoll from '../../promises/FilterByPoll'
import { IMG_PATH_URL } from '../../constants'
import anon from '../../assets/imgs/user.png'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactToPdf from "react-to-pdf";
import ReactToPrint from 'react-to-print';
import lgaList from '../../promises/LgaList'
import wardList from '../../promises/WardList'
import pollingUnitList from '../../promises/PollingUnitList'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstname', headerName: 'First name', width: 130 },
  { field: 'middlename', headerName: 'Middle name', width: 130 },
  { field: 'lastname', headerName: 'Last name', width: 130 },
  { field: 'registrationNumber', headerName: 'Reg No', width: 130 },
  { field: 'lga', headerName: 'lga', width: 130 },
  { field: 'ward', headerName: 'ward', width: 130 },
  {
    field: 'pollingUnit',
    headerName: 'Polling Unit',
    width: 90,
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      backgroundColor: '#AFDFF3'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    titleCase: {
        textTransform: 'capitalize'
      },
  });


export default function PrintPoll () {
    const classes = useStyles();
    const [user, setUser] = useState({})
    const [check, setCheck] = useState(true)
    const [lgas, setLgas] = React.useState([])
    const [lga, setLga] = React.useState()
    const [pollfilter, setPollfilter] = React.useState([])
    const [ward, setWard] = React.useState();
    const [wards, setWards] = React.useState([]);
    const [loading, setLoading] = useState(false)
    const [loadward, setLoadward] = React.useState(false)
    const [pollingUnits, setPollingUnits] = React.useState([]);
    const [pollingUnit, setPollingUnit] = useState([]);
    const [loadpolls, setLoadpolls] = React.useState(false)
    const ref = React.createRef();

    useEffect( () => {
        const fetchUserData = async () => {
            const res = await userData()
            console.log('res', res)
            setCheck(false)
            setUser(res)
        }
    
        if(check){
        fetchUserData()
        }
    })

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

    const handleChangeLga = async (event) => {
        setLga(event.target.value);

        setLoadward(true)
        const res = await wardList(event.target.value)
        setWards(res)
        setLoadward(false)
    };

    const handleChangeWard = async (event) => {
        setLoadpolls(true)
        const res = await pollingUnitList(event.target.value)
        setPollingUnits(res)
        setLoadpolls(false)

    };

    const handleChangePollingUnit = async (event) => {
      setPollingUnit(event.target.value);
    };



    const submit = async () => {

        setLoading(true)
            const pollfilter = await filterByPoll(pollingUnit)
            console.log('lgas', pollfilter)
            setPollfilter(pollfilter)
        setLoading(false)
  
    }
    

        return (
            <>
            <div className="container">
                <div className="landing-container">
                    <MainLogo admin={true}/>
                    <Grid container justify="center" alignItems="center" direction="column">
                        <h1>Polling Units Print Slips</h1>
                    </Grid>
                </div>

                <Card>
                    <CardContent>
                        <Grid style={{justifyContent: 'center', alignItems: 'center'}} direction="column" container>
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
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container style={{justifyContent: 'center', alignItems: 'center'}}>
                            <ReactToPrint
                                trigger={() => <Button>Print</Button>}
                                content={() => ref.current}
                            />
                            <ReactToPdf targetRef={ref} filename="div-blue.pdf">
                                {({toPdf}) => (
                                <Button onClick={toPdf} size="small">Download as PDF</Button>
                                )}
                            </ReactToPdf>
                        </Grid>
                        <Grid container style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Button onClick={() => submit()} variant="contained" color="primary">{loading ? 'Fetching...' : 'Filter'}</Button>
                        </Grid>
                    </CardActions>

                    <Grid container direction="column" justify="center" alignItems="center">
                        <b>Results [{pollfilter.length}]</b>
                    </Grid>

                    <Grid style={{marginTop: 10}} ref={ref}>
                        {pollfilter.map(item =>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <UserItem item={item}/>
                        </Grid>
                        )} 
                    </Grid>

                </Card>

                <div className="landing-container">
                    <Grid container justify="center" alignItems="center" direction="column">
                    <p className="subtitle" style={{textAlign: 'left'}}>
                        <Link to='/print'>
                            <b>Go Back</b>
                        </Link>
                    </p>
                    </Grid>
                </div>
                
              </div>
            </>
        )
}
