var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js');
var url = require('url');

var handlebars = require('express3-handlebars')
    .create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);

app.use(express.static(__dirname + '/public'));
app.set('view engine','handlebars');
app.set('port', process.env.PORT || 3000);
// route to root page
app.get('/', function(req, res){
    res.render('home');
});

//route to about page
app.get('/about', function(req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    } );
});

//page 404
app.use(function(req, res, next){
   res.status(404);
   res.render('404');

});

// page 500
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');

});

app.use(function(req,res, next){
   res.locals.showTests = app.get('env') !== 'production'
   && req.query.test == '1';
   next();
});



app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});

