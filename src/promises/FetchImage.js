import { IMAGE_URL }  from '../constants'

async function fetchImage(id){

      try {
        const res = await fetch(IMAGE_URL + id)
        const message = await res.json();
        return message

      } catch (e) {
        console.log(e);
      }
    
      return false
}

export default fetchImage