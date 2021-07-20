import { SUPER_USER_URL }  from '../constants'

async function isSuperUser(){
    const auth = await localStorage.getItem('auth')

      try {
        const res = await fetch(SUPER_USER_URL, {
            headers : {
                'Authorization' : 'Token ' + auth,
            },
        })
        const message = await res.json();
        localStorage.setItem('isSuperUser', message)
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default isSuperUser