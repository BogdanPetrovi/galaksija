import db from '../../api/backend'

const clear = async () => {
  await db.post('/clear-cookie')
  window.location.reload();
}

export default clear