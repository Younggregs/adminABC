import { DELETE_GUIDE_URL }  from '../constants'

async function deleteGuide(id){
      try {
        const res = await fetch(DELETE_GUIDE_URL + id)
        const message = await res.json();
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default deleteGuide