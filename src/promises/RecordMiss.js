import { MISS_URL }  from '../constants'

async function recordMiss(email, from, to){

      var formData = new FormData()
      formData.append('email', email)
      formData.append('from', from)
      formData.append('to', to)

      try {
        const res = await fetch(MISS_URL, {
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

export default recordMiss