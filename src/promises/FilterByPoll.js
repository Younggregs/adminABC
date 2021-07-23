import { POLL_FILTER_URL }  from '../constants'

async function filterByPoll(pollingUnit){

      var formData = new FormData()
      formData.append('pollingUnit', pollingUnit)

      try {
        const res = await fetch(POLL_FILTER_URL, {
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

export default filterByPoll