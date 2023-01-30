export const convertTime = (dateCode) => {
    let newDate = new Date(dateCode * 1000)
    newDate = newDate.toLocaleTimeString()
    return newDate
}

export const convertDate = (dt) => {
    let locale = 'en-US'
    let converted = new Date(dt * 1000)
    return converted.toLocaleDateString(locale, {weekday: 'long'})
}

export const capitalizeNormal = (sentence) => {
    return sentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}
