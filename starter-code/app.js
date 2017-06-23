// THE SETUP //
////////////////////////////////////////////
const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.static('public'));

app.set('layout', 'layout.ejs');
app.set('views', __dirname + '/views');
app.set('view engine' , 'ejs');

// EXAMPLE //
/////////////////////////////////////////////
client.getRandomJoke().then((jokeInfo) => {
  console.log('RANDOM JOKE!');
  console.log(jokeInfo);

  console.log('');
  console.log('jokeInfo.value ->');
  console.log(jokeInfo.value);
});

// ROUTES //
/////////////////////////////////////////////

// Homepage
app.get('/', (req, res, nxt) => {
    res.render('index.ejs');
});

// Random joke
app.get('/random', (req, res, nxt) => {

  client.getRandomJoke().then((jokeInfo) => {
    console.log(jokeInfo.value);
    const joke = jokeInfo.value;
      res.render('random.ejs', {
        jokeText: joke
      });
  });
});

// Categories
app.get('/categories', (req, res, nxt) => {
  client.getJokeCategories().then((categories) => {
    console.log(categories);
    const cat = categories;
      res.render('categories.ejs', {
        catText: cat
      });
  });
});

// Joke By Category
app.get('/catjoke', (req, res, nxt) => {
  const cat = req.query.cat;
  client.getRandomJoke(cat).then((joke) => {
    console.log(joke);
    const haha = joke.value;
      res.render('joke-by-category.ejs', {
        funnyThing: haha
      });
  });
});


///////////////////////////////////////////////

app.listen(3000, () => {
  console.log('App listening on port 3000.');
});
