var Twit = require('twit');

var twitterController = {};


twitterController.getUsers = (req, risposta) => {
    //data = twit.get()

    var T = new Twit({
        consumer_key: ,
        consumer_secret: ,
        access_token: ,
        access_token_secret: ,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true,     // optional - requires SSL certificates to be valid.
    })

    //  search twitter for all tweets containing the word #hashtag
    T.get('users/search', { q: req, count: 20 }, (err, data, response) => {
        risposta.send(data);
    })

}

twitterController.getUser = (req, risposta) => {
    //data = twit.get()

    var T = new Twit({
               consumer_key: ,
        consumer_secret: ,
        access_token: ,
        access_token_secret: ,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true,     // optional - requires SSL certificates to be valid.
    })

    //  search twitter for all tweets containing the word #hashtag
    T.get('users/lookup', { user_id: req }, (err, data, response) => {
        risposta.send(data);
    })

}

twitterController.getFollowers = (req, risposta) => {
    //data = twit.get()

    var T = new Twit({
               consumer_key: ,
        consumer_secret: ,
        access_token: ,
        access_token_secret: ,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true,     // optional - requires SSL certificates to be valid.
    })

    //  search twitter for all tweets containing the word #hashtag
    T.get('followers/ids', { user_id: req }, (err, data, response) => {
        risposta.send(data);
    })

}

twitterController.getGeo = (req, risposta) => {
    //data = twit.get()

    var T = new Twit({
            consumer_key: ,
        consumer_secret: ,
        access_token: ,
        access_token_secret: ,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true,     // optional - requires SSL certificates to be valid.
    })

    //  search twitter for all tweets containing the word #hashtag
    T.get('geo/search', { query: req }, (err, data, response) => {
        risposta.send(data);
    })

}




twitterController.getTweets = (query, risposta) => {
    //data = twit.get()

    var T = new Twit({
               consumer_key: ,
        consumer_secret: ,
        access_token: ,
        access_token_secret: ,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true,     // optional - requires SSL certificates to be valid.
    })

    //  search twitter for all tweets containing the word #hashtag
    T.get('search/tweets', { q: query, count: 100 }, (err, data, response) => {
        risposta.send(data);
    })

}

twitterController.getUserTweets = (query, risposta) => {
    //data = twit.get()

    var T = new Twit({
                consumer_key: ,
        consumer_secret: ,
        access_token: ,
        access_token_secret: ,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true,     // optional - requires SSL certificates to be valid.
    })

    //  search twitter for all tweets containing the word #hashtag
    T.get('statuses/user_timeline', { user_id: query, count: 100 }, (err, data, response) => {
        risposta.send(data);
    })

}

module.exports = twitterController;