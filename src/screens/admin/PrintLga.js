import React, { useState, useEffect } from 'react'
import '../../styles/Landing.css'
import { Link } from 'react-router-dom'
import MainLogo from '../../components/MainLogo'
import Grid from '@material-ui/core/Grid'
import UserItem from '../../blocks/UserItem'
import userData from '../../promises/FetchUserData'
import filterByLga from '../../promises/FilterByLga'
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
  });


export default function PrintLga () {
    const classes = useStyles();
    const [user, setUser] = useState({})
    const [check, setCheck] = useState(true)
    const [lgas, setLgas] = React.useState([])
    const [lga, setLga] = React.useState()
    const [lgafilter, setLgafilter] = React.useState([])
    const [loading, setLoading] = useState(false)
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
    };


    const submit = async () => {

        setLoading(true)
            const lgafilter = await filterByLga(lga)
            console.log('lgas', lgafilter)
            setLgafilter(lgafilter)
        setLoading(false)
  
    }
    

        return (
            <>
            <div className="container">
                <div className="landing-container">
                    <MainLogo admin={true}/>
                    <Grid container justify="center" alignItems="center" direction="column">
                        <h1>LGA Print Slips</h1>
                    </Grid>
                </div>

                <Card style={{marginBottom: 10}}>
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
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container style={{justifyContent: 'center', alignItems: 'center'}}>
                            <ReactToPrint
                                trigger={() => <Button>Print All</Button>}
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
                        <b>Results [{lgafilter.length}]</b>
                    </Grid>
                
                    <Grid style={{marginTop: 10}} ref={ref}>
                        {lgafilter.map(item =>
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
