import React, {useState} from 'react';
import newLocation from '../../promises/NewLocation'
import UserItem from '../../blocks/UserItem'
import searchByName from '../../promises/SearchByName'
import CancelIcon from '@material-ui/icons/Cancel'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import InnerNavbar from '../../partials/InnerNavbar'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button1 from '../../components/Button'
import { ReactComponent as Burger } from '../../assets/svg/Burger.svg';
import '../../styles/Home.css'


export default function Location() {
  const [error, setError] = useState('')
  const [list, setList] = useState([]);
  const [check, setCheck] = useState(true)
  const [name, setName] = useState();
  const [loading, setLoading] = useState();

  const handleChangeName = (event) => {
    setName(event.target.value);
};
  
  const submit = async() => {

   setLoading(true)
   setError('')
   const res = await searchByName(name)
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
   setLoading(false)

}


  return (
    <div>
      <div style={{ margin: 0, marginBottom: 200}}>
        <InnerNavbar location={true}/> 
      </div>
        <Box>
            <h3 style={{color: 'gray', textAlign: 'center', margin: 10}}>Search</h3>
        </Box> 

        <Grid container style={{ width: '100%', justifyContent:"center", alignItems: 'center', flexDirection: 'column'}}>
          <Grid>  
              <TextField 
              id="name" 
              label="Enter name" 
              onChange={handleChangeName}
              style={{width: 300}}/>
          </Grid>
        

        <div style={{ width: 300}} className="mt-4 mb-3">
            <Button1 handleClick={() => submit()} title={loading ? "Processing..." : "Continue"} />
        </div>

        </Grid>

       

        <Grid>
          <Box>
            <h4 style={{color: 'gray', textAlign: 'center', margin: 10}}>Results ({list.length})</h4>
          </Box> 

          {list.map(item =>
          <Grid container direction="column" justify="center" alignItems="center">
            <UserItem item={item} />
          </Grid>
          )} 
        
        </Grid>
        
    </div>
  );
}