import { DELETE_IMAGE_URL }  from '../constants'

async function deleteImage(id){
      try {
        const res = await fetch(DELETE_IMAGE_URL + id)
        const message = await res.json();
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default deleteImage