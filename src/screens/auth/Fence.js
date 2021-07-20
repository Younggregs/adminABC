import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import Dashboard from '../admin/Dashboard'
import Landing from '../auth/Landing'
import CircularProgress from '@material-ui/core/CircularProgress';

function Fence(){

  const [status, setStatus] = useState(true)
  const [stop, setStop] = useState(true)

  const evaluate = async () => {
    const auth = await localStorage.getItem('auth')

    if(auth === null || auth === '' || auth === false){setStatus(false)}

    setStop(false)
  }

  if(stop){
    evaluate()
  } 
  


  return (
    <div>
      {stop ? (
          <CircularProgress />
      ) : (
        <div>
           {status ? (
             <div>
               <Dashboard />
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

