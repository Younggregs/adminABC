import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import Dashboard from '../admin/Dashboard'
import Landing from '../auth/Landing'
import CircularProgress from '@material-ui/core/CircularProgress';
import isSuperUser from '../../promises/IsSuperUser'

function Fence(){

  const [status, setStatus] = useState(true)
  const [stop, setStop] = useState(true)
  const [issuper, setIssuper] = useState(false)

  useEffect( () => {
    const evaluate = async () => {
      const auth = await localStorage.getItem('auth')
      const superUser = await isSuperUser()
      console.log('super 19', superUser)
      setIssuper(superUser)
  
      console.log('super 19', superUser)
  
      if(auth === null || auth === '' || auth === false){setStatus(false)}
  
      setStop(false)
    }
  
    if(stop){
      evaluate()
    } 
  })

  


  return (
    <div>
      {stop ? (
          <CircularProgress />
      ) : (
        <div>
           {status ? (
             <div>
               <Dashboard super={issuper}/>
             </div>
            ) : (
              <Landing />
            )}
        </div>
      )}
    </div>
  );

}

export default Fence

