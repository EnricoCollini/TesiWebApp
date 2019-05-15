var Twit = require('twit');

var userController = {};


userController.getUsers = (req, risposta) => {
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

module.exports = userController;