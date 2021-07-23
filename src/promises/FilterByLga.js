import { LGA_FILTER_URL }  from '../constants'

async function filterByLga(lga){

      var formData = new FormData()
      formData.append('lga', lga)

      try {
        const res = await fetch(LGA_FILTER_URL, {
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

export default filterByLga