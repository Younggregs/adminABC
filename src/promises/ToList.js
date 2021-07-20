import { TO_URL }  from '../constants'

async function toList(){
      try {
        const res = await fetch(TO_URL)
        const message = await res.json();
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default toList