import { WARD_URL }  from '../constants'

async function wardList(lga){
      try {
        const res = await fetch(WARD_URL + lga)
        const message = await res.json();
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default wardList