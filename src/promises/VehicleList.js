import { VEHICLE_URL }  from '../constants'

async function vehicleList(){
      try {
        const res = await fetch(VEHICLE_URL)
        const message = await res.json();
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default vehicleList