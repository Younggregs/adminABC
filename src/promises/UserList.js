import { USER_URL }  from '../constants'

async function userList(){
      try {
        const res = await fetch(USER_URL)
        const message = await res.json();
        return message
      } catch (e) {
        console.log(e);
      }
      return false
}

export default userList