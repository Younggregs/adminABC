import { ADMIN_URL }  from '../constants'

async function adminList(){
      try {
        const res = await fetch(ADMIN_URL)
        const message = await res.json();
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default adminList