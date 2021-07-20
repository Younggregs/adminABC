import { NEW_LOCATION_URL }  from '../constants'

async function locations(id){
      try {
        const res = await fetch(NEW_LOCATION_URL)
        const message = await res.json();
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default locations