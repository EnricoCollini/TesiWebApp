var express = require('express');
var twitterController = require('./controller/twitterController');
var port = process.env.PORT || 8080;
var aylienController = require('./controller/aylienController');
var bodyParser = require('body-parser');
var clustering = require('density-clustering');

var app = express();

app.use(function (query, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/tweets/:query', function (richiesta, risposta) {
    twitterController.getTweets(richiesta.params.query, risposta);
});

app.get('/sentiment/:query', function (richiesta, risposta) {
    aylienController.getSentiment(richiesta.params.query, risposta);
});

app.get('/classification/:query', function (richiesta, risposta) {
    aylienController.getClassification(richiesta.params.query, risposta);
});



app.get('/search/:req', function (richiesta, risposta) {
    twitterController.getUsers(richiesta.params.req, risposta);
});

app.get('/lookup/:req', function (richiesta, risposta) {
    twitterController.getUser(richiesta.params.req, risposta);
});

app.get('/ids/:req', function (richiesta, risposta) {
    twitterController.getFollowers(richiesta.params.req, risposta);
});

app.get('/geo/:req', function (richiesta, risposta) {
    twitterController.getGeo(richiesta.params.req, risposta);
});

app.get('/userTweets/:req', function (richiesta, risposta) {
    twitterController.getUserTweets(richiesta.params.req, risposta);
});

app.post('/loadPolygons', function (req, res) {

    const geoArray = req.body.data;

    var dbscan = new clustering.DBSCAN();
    // parameters: 5 - neighborhood radius, 2 - number of points in neighborhood to form a cluster
    var clusters = dbscan.run(geoArray, 0.5, 2);

    res.send({ data: clusters, noise: dbscan.noise });
});

//metto in ascolto il server(porta 3000)
app.listen(port, function () {
    console.log('Example app listening on port' + port);
});
