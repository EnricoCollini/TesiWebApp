var AYLIENTextAPI = require('aylien_textapi');

var aylienController = {};

aylienController.getSentiment = (req, risposta) => {
    var textapi = new AYLIENTextAPI({
        application_id: ,
        application_key: 
    });
    textapi.sentiment({ 'text': req }, function (error, response) {
        if (error === null) {
            risposta.send(response);
        }
    });
}

aylienController.getClassification = (req, resp) => {
    var textapi = new AYLIENTextAPI({
        application_id: ,
        application_key:
    });
    textapi.classify({ 'text': req }, function (error, response) {
        if (error === null) {
            text = "";
            for (var i = 0; i < resp.categories.length; i++) {
                text += "label" + resp.categories[i].label + "confidence: " + resp.categories[i].confidence;
            }
            risposta.send(text);
        }
    });
}

module.exports = aylienController;
