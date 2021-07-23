import { WARD_FILTER_URL }  from '../constants'

async function filterByWard(ward){

      var formData = new FormData()
      formData.append('ward', ward)

      try {
        const res = await fetch(WARD_FILTER_URL, {
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

export default filterByWard