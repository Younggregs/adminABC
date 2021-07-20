import { LOCATION_URL }  from '../constants'

async function locationUsers(){
      try {
        const res = await fetch(LOCATION_URL)
        const message = await res.json();
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default locationUsers