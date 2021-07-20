import { POLLING_UNIT_URL }  from '../constants'

async function pollingUnitList(ward){
      try {
        const res = await fetch(POLLING_UNIT_URL + ward)
        const message = await res.json();
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default pollingUnitList