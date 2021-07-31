const parseId = (id) => {
    let idBuffer = id.split('-')

    let regNo = idBuffer[4]
    regNo = regNo.toString().padStart(6, "0")

    let parsedId = idBuffer[0] + '-' + idBuffer[1] + '-' + idBuffer[2] + '-' + idBuffer[3] + '-' + regNo

    return parsedId
}

export default parseId