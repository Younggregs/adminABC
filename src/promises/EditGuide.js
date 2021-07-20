import { EDIT_GUIDE_URL }  from '../constants'

async function editGuide(id, guide, ttc, ttt){

      var formData = new FormData()
      formData.append('guide', guide)
      formData.append('total_travel_cost', ttc)
      formData.append('total_travel_time', ttt)

      try {
        const res = await fetch(EDIT_GUIDE_URL + id + '/', {
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

export default editGuide