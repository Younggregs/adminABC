import { TOTAL_MEMBERS_URL }  from '../constants'

async function memberCount(){
      try {
        const res = await fetch(TOTAL_MEMBERS_URL)
        const message = await res.json();
        return message

      } catch (e) {
        console.log(e);
      }
    
      return false
}

export default memberCount