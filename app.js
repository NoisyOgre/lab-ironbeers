const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
//Promises
//Promises are JavaScript objects that might jave or not a value in the near future
//Traditional way to consume promises
// app.get('/beers', (req, res) => {
//   punkAPI.getBeers().then(beers => {
//     console.log(beers);
//     res.render('beers', { beers });
//   });
// });

// Modern way to consume promises
app.get('/beers', async (req, res) => {
  const beers = await punkAPI.getBeers();
  console.log(beers);
  res.render('beers', { beers });
});

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom().then(response => {
    console.log(response);
    res.render('random-beers', { response });
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
