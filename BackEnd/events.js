var Product = require('../twitterBack/models/event');
var mongoose = require('mongoose');

var product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: "Festa",
    location: "casetta"
});
product.save().then(result => {
    console.log(result);
}).cath(err => console.log(err));
