import { LGA_URL }  from '../constants'

async function lgaList(){
      try {
        const res = await fetch(LGA_URL)
        const message = await res.json();
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default lgaList