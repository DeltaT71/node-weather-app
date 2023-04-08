const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getGeocode = require('./utils/geocode');
const getForecast = require('./utils/forecast');

const app = express();
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'me'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'me'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Help message',
    name: 'me'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address){
    return res.send({
       error: 'You must provide an address.'
       });
  }
  
  getGeocode(address, (geoErr, geoRes) => {
    if (geoErr){
      return res.send(geoErr);
    } 
    getForecast(geoRes, (weatherErr, weatherRes) => {
      if (weatherErr) {
      return res.send(weatherErr);
      }
        res.send({
          forecast: `The current temp is ${weatherRes.temp_c} but it feels like ${weatherRes.feelslike_c}.`,
          location: geoRes.location,
          address
        })
     })
  })
});

app.get('/help/*', (req, res) => {
  res.render('notFound',{
    title: '404 Page not found',
    errorMessage: 'Help page does not exist.',
    name: 'me'
  })
});

app.get('/*', (req, res) => {
  res.render('notFound',{
    title: '404 page not found',
    errorMessage: 'Page does not exist.',
    name: 'me'
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
});