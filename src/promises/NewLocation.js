import { NEW_LOCATION_URL }  from '../constants'

async function newLocation(name){

      var formData = new FormData()
      formData.append('name', name)

      try {
        const res = await fetch(NEW_LOCATION_URL, {
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

export default newLocation