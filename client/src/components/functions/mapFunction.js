import moment from 'moment'

function mapFunc(arr, info, isTime) {
  if(isTime){
    const result = arr.reverse().map(element => (
      moment(element.vreme).format('HH:mm')
    ))
    return result
  }
  const result = arr.reverse().map(element => (
    element[info]
  ))
  return result
}

export default mapFunc