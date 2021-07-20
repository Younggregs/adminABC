import { DELETE_LOCATION_URL }  from '../constants'

async function deleteLocation(id){
      try {
        const res = await fetch(DELETE_LOCATION_URL + id)
        const message = await res.json();
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default deleteLocation