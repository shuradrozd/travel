const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
  .create({defaultLayout: 'main'});

const getFortune = require('./lib/fortune.js');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// work with static content
app.use(express.static(`${__dirname }/public`));
app.set('port', process.env.PORT || 3000);
// route to root page
app.get('/', (req, res) => {
  res.render('home');
});

// route to about page
app.get('/about', (req, res) => {
  res.render('about', {
    fortune: getFortune(),
    // pageTestScript: '../../public/qa/tests-global.js',
  } );
});

 app.disable('x-powered-by');
// page 404
app.use((req, res, next) => {
  res.status(404).render('404');
});

// page 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500');
});


// add check for test page
app.use((req, res, next) => {
  res.locals.showTests = app.get('env') !== 'production'
   && req.query.test === '1';
  next();
});


app.listen(app.get('port'), () => {
  console.log( `Express started on http://localhost:${
    app.get('port') }; press Ctrl-C to terminate.` );
});
