import { ADMIN_SIGNUP_URL }  from '../constants'

async function signup(name, phone, password, lga, pollingUnit, gender, memberType, registrationNumber){

    var formData = new FormData()
    formData.append('phone', phone)
    formData.append('password', password)
    formData.append('name', name)
    formData.append('lga', lga)
    formData.append('pollingUnit', pollingUnit)
    formData.append('gender', gender)
    formData.append('isOldMember', memberType)
    formData.append('registrationNumber', registrationNumber)

    try {
        const res = await fetch(ADMIN_SIGNUP_URL, {
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

export default signup