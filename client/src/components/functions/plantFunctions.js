import db from '../../api/backend'

const getStyle = (percentage, color) => ({
  height: `${percentage}%`,
  width: '100%',
  borderRadius: '0.375rem',
  backgroundColor: color === 'green' ? '#046A1D' : 
                  color === 'blue' ? '#3E80FC' : 
                  '#CB1BAB'
});

const getTemperatureHeight = (value) => {
  if(value > 15){
    if(value < 25){
      const diff = (value - 15) * 10;
      return diff
    }
    else {
      return 100;
    }
  } else {
    return 0;
  }
}

const getBackgroundColor = (color) => (
  color === 'green' ? '#01370E' :
  color === 'blue' ? '#263E6A' :
  '#782068'
);

const water = async () => {
  try {
    const result = await db.post('/water-the-plant', {message: '11'})
    if(result.status === 200){
      console.log('Uspesno zaliveno')
    } else {
      console.log('Nije uspesno zaliveno')
    }
  } catch (err) {
    console.log(err)
  }
}

export {getStyle, getTemperatureHeight, getBackgroundColor, water}