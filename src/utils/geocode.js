const request = require('request');

const getGeocode = (adress, callback) =>{
  const url = `https://us1.locationiq.com/v1/search?key=pk.c15a1573fe0fadc83224cb99ea506d05&q=${adress}&format=json`;

  request({url, json: true}, (err, {body}) => {
    if (err) {
      callback('Something went wrong with connection.', undefined);
    } else if (body.error) {
      callback(body ,undefined);
    } else {
      callback(undefined, {
        lon: body[0].lon,
        lat: body[0].lat,
        location: body[0].display_name
      });
    }
  })
}

module.exports = getGeocode;
