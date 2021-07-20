import { GUIDE_URL }  from '../constants'

async function fetchGuide(from, to){

      var formData = new FormData()
      formData.append('from', from)
      formData.append('to', to)

      try {
        const res = await fetch(GUIDE_URL, {
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

export default fetchGuide