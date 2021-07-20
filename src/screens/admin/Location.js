import React, {useState} from 'react';
import newLocation from '../../promises/NewLocation'
import LocationItem from '../../blocks/LocationItem'
import locationUsers from '../../promises/LocationUsers'
import CancelIcon from '@material-ui/icons/Cancel'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import InnerNavbar from '../../partials/InnerNavbar'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { ReactComponent as Burger } from '../../assets/svg/Burger.svg';
import '../../styles/Home.css'


export default function Location() {
  const [error, setError] = useState('')
  const [list, setList] = useState([]);
  const [check, setCheck] = useState(true)
  const [name, setName] = useState();

  const handleChangeName = (event) => {
    setName(event.target.value);
};

  const fetchLocations = async () => {

    const res = await locationUsers()
    setCheck(false)
    if(res){
      if(res.error_message){
        setError(res.error_message)
      }else{
        setList(res)
      }
      
   }else{
    setError('Empty list, start adding locations now')
   }
    
  }


  if(check){
    fetchLocations()
  }
  
  const handleSave = async() => {

   setError('')
   const res = await newLocation(name)
   if(res){
      if(res.error_message){
        setError(res.error_message)
      }else{
        setList(res)
      }
      
   }else{
    setError('Oops something broke, refresh and try again')
   }

   setName('')

}


  return (
    <div>
      <div style={{ margin: 0, marginBottom: 200}}>
        <InnerNavbar location={true}/> 
      </div>
        <Box>
            <h3 style={{color: 'gray', textAlign: 'center', margin: 10}}>Users by Locations</h3>
        </Box> 

       

        <Grid>
          <Box>
            <h4 style={{color: 'gray', textAlign: 'center', margin: 10}}>LGAs ({list.length})</h4>
          </Box> 

          {list.map(item =>
          <Grid container direction="column" justify="center" alignItems="center">
            <LocationItem item={item} />
          </Grid>
          )} 
        
        </Grid>
        
    </div>
  );
}