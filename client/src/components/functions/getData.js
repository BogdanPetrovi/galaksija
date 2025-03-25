import db from '../../api/backend'

async function getData ( senzor, mac ) {
  try {
    mac = mac.replace(/^"|"$/g, '');
    const result = await db.get(`/sensor-data?senzor=${senzor}&mac=${mac}`);
    return result;
  } catch (err) {
    console.log(err)
  }
}

export default getData