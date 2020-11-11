const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// const randomBeer = PunkAPI.getRandom()

// randomBeer.then(beer => {
//   alert(beer[0].name)
// })

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, "/views/partials"))

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req, res, next) => {
  punkAPI
  .getBeers()
  .then(beers => {
    res.render("beers", {beers});
  })
  .catch(error => console.log(error));
})

// app.get("/beers", (req, res, next) => {
//   punkAPI
//   .getBeer(id)
//   .then(beers => {
//     req.params.id
//     res.render("beers", {beers});
//   })
//   .catch(error => console.log(error));
// })

app.get("/random-beer", (req, res, next) => {
  punkAPI
  .getRandom()
  .then(randomBeers => {
    res.render("random-beer", {randomBeers});
    console.log(randomBeers)
  })
  .catch(error => console.log(error));
})

app.listen(3001, () => console.log('🏃‍ on port 3001'));
