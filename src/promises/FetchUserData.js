import { USERDATA_URL }  from '../constants'

async function fetchUserData(){

    const auth = await localStorage.getItem('auth')

    try {
    const res = await fetch(USERDATA_URL, {
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

export default fetchUserData