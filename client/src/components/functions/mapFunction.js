import moment from 'moment'

function mapFunc(arr, info, isTime, isMoisture) {
  if(isTime){
    const result = arr.map(element => (
      moment(element.vreme).format('HH:mm')
    ))
    return result
  }
  if(isMoisture) {
    const result = arr.map(element => (
      element[info]
    ))
    return result
  }
  const result = arr.reverse().map(element => (
    element[info]
  ))
  return result
}

export default mapFunc