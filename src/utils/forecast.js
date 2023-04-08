const request = require('request');

const getWeather = ({lat, lon}, callback) => {
  lat = formatCoordinates(lat);
  lon = formatCoordinates(lon);
  
  const url = `https://api.weatherapi.com/v1/current.json?key=11dfddb59d32444890e185014231503&q=${lon},${lat}`;

  request({url, json: true}, (err, {body}) => {
    if (err) {
      callback('Something went wrong with connection.', undefined);
    } else if (body.error) {
      console.log(body, undefined)
    } else {
      callback(undefined, 
      {
        temp_c: body.current.temp_c,
        feelslike_c: body.current.feelslike_c
      });
    }
  })
}

function formatCoordinates(str) {
  let data = str.split(".")
  return `${data[0]}.${data[1].substring(0, 4)}`;

}

module.exports = getWeather;