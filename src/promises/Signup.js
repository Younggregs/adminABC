import { SIGNUP_URL }  from '../constants'

async function signup(firstname, middlename, lastname, age, votercard, phone, password, lga, ward, pollingUnit, gender, memberType, registrationNumber){

    var formData = new FormData()
    formData.append('phone', phone)
    formData.append('password', password)
    formData.append('firstname', firstname)
    formData.append('middlename', middlename)
    formData.append('lastname', lastname)
    formData.append('age', age)
    formData.append('votercard', votercard)
    formData.append('lga', lga)
    formData.append('pollingUnit', pollingUnit)
    formData.append('ward', ward)
    formData.append('gender', gender)
    formData.append('isOldMember', memberType)
    formData.append('registrationNumber', registrationNumber)

    try {
        const res = await fetch(SIGNUP_URL, {
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