import { LOGIN_URL }  from '../constants'

async function login(username, password){

    var formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    try {
        const res = await fetch(LOGIN_URL, {
            body : formData,
            method: 'POST',
        })
        const message = await res.json();
        console.log('res', message)
        return message
              
    } catch (e) {
        console.log(e);
    }
}

export default login