import { MISS_URL }  from '../constants'

async function fetchMisses(){

      try {
        const res = await fetch(MISS_URL)
        const message = await res.json();
        return message

      } catch (e) {
        console.log(e);
      }
    
      return false
}

export default fetchMisses