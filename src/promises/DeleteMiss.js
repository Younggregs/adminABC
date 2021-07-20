import { DELETE_MISS_URL }  from '../constants'

async function deleteMiss(id){
      try {
        const res = await fetch(DELETE_MISS_URL + id)
        const message = await res.json();
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default deleteMiss