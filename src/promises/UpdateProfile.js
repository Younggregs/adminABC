import { UPDATE_URL }  from '../constants'

async function updateProfile(image){
    var formData = new FormData()
    console.log('img', image)
    formData.append('profilePicture', image)
    
    const auth = localStorage.getItem('auth') 
    try {
        const res = await fetch(UPDATE_URL, {
        method: 'POST',
        body : formData,
        headers : {
          'Authorization' : 'Token ' + auth,
          },
        })
        const message = await res.json();
        return message

      } catch (e) {
        console.log(e);
      }

    return false
}

export default updateProfile