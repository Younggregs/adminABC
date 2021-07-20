import { AUTH_URL } from './constants';
import getUsername from './persist';

export async function login(username, password) {


    var formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
  
  
    try {
      const res = await fetch(AUTH_URL, {
  
       body : formData,
       method: 'POST',
       credentials: 'same-origin',
       mode: 'cors',
  
      });
      const auth = await res.json();
      localStorage.setItem('auth', auth.token)
      getUsername(auth.token)

      return true

    } catch (e) {
      console.log(e);
    }

    return false
  
  }

  export default login
