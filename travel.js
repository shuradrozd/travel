var express = require('express');
var handlebars = require('express3-handlebars')
    .create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine','handlebars');
var app = express();
app.set('port', process.env.PORT || 3000);
// route to root page
app.get('/', function(req, res){
    res.type('text/plain');
    res.send('Travel Site');
});

//route to about page
app.get('/about', function(req, res){
    res.type('text/plain');
    res.send('About Travel Site');
});

//page 404
app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found')

});

// page 500
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');

});
app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});

