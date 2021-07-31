import React, { useState, useEffect, forwardRef } from 'react'
import '../../styles/Landing.css'
import { Link } from 'react-router-dom'
import MainLogo from '../../components/MainLogo'
import Grid from '@material-ui/core/Grid'
import userData from '../../promises/FetchUserData'
import filterByWard from '../../promises/FilterByWard'
import { IMG_PATH_URL } from '../../constants'
import anon from '../../assets/imgs/user.png'
import wardList from '../../promises/WardList'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ReactToPdf from "react-to-pdf";
import ReactToPrint from 'react-to-print';
import lgaList from '../../promises/LgaList'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import MaterialTable from "material-table";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const columns = [
    { title: "S/N", field: "id", type: "numeric" },
    { title: "Firstname", field: "firstname" },
    { title: "Middlename", field: "middlename" },
    { title: "Lastname", field: "lastname" },
    { title: "Reg No", field: "registrationNumber" },
    { title: "LGA", field: "lga" },
    { title: "Ward", field: "ward" },
    { title: "PU", field: "pollingUnit" },
  ]



const options = {
    exportButton: true
};

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


export default function WardFilter () {
    const classes = useStyles();
    const [user, setUser] = useState({})
    const [check, setCheck] = useState(true)
    const [lgas, setLgas] = React.useState([])
    const [lga, setLga] = React.useState()
    const [wardfilter, setWardfilter] = React.useState([])
    const [ward, setWard] = React.useState();
    const [wards, setWards] = React.useState([]);
    const [loading, setLoading] = useState(false)
    const [loadward, setLoadward] = React.useState(false)
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
        setWard(event.target.value);
  
      };


    const submit = async () => {

        setLoading(true)
            const wardfilter = await filterByWard(ward)
            console.log('wards', wardfilter)
            setWardfilter(wardfilter)
        setLoading(false)
  
    }
    

        return (
            <>
            <div className="container">
                <div className="landing-container">
                    <MainLogo admin={true}/>
                    <Grid container justify="center" alignItems="center" direction="column">
                        <h1>Ward Table Filter</h1>
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
                </Card>

                

                <div style={{textTransform: 'capitalize'}}>
                    <MaterialTable
                        columns={columns}
                        icons={tableIcons}
                        data={wardfilter}
                        options={options}
                        title="Ward List"
                        isLoading={loading}
                        options={{
                            paging:true,
                            pageSize:5,       // make initial page size
                            emptyRowsWhenPaging: true,   //to make page size fix in case of less data rows
                            pageSizeOptions:[50,100,500,1000, 5000],    // rows selection options
                          }}
                    />
                </div>
                

                <div className="landing-container">
                    <Grid container justify="center" alignItems="center" direction="column">
                    <p className="subtitle" style={{textAlign: 'left'}}>
                        <Link to='/admin'>
                            <b>Go Back</b>
                        </Link>
                    </p>
                    </Grid>
                </div>
                
              </div>
            </>
        )
}
