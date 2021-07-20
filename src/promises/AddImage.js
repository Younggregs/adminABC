import { IMAGE_URL }  from '../constants'

async function addImage(image, id){

      var formData = new FormData()
      formData.append('image', image)

      try {
        const res = await fetch(IMAGE_URL + id + '/', {
            method: 'POST',
            body : formData,
        })
        const message = await res.json();
        return message

      } catch (e) {
        console.log(e);
      }
    
      return false
}

export default addImage