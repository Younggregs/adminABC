import { GET_NAME_URL } from './constants';

export async function getUsername() {

    const auth = localStorage.getItem('auth')
    
    try {
      const res = await fetch(GET_NAME_URL, {

       method: 'GET',
       headers : {
        'Authorization' : 'Token ' + auth,
      },
  
      });
      const name = await res.json();
      localStorage.setItem('name', name)

    } catch (e) {
      console.log(e);
    }
  
  }

  export default getUsername
