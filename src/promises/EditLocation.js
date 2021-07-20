import { EDIT_LOCATION_URL }  from '../constants'

async function editLocation(name, id){

      var formData = new FormData()
      formData.append('name', name)

      try {
        const res = await fetch(EDIT_LOCATION_URL + id + '/', {
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

export default editLocation