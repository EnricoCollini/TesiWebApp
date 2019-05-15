var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    location: String
});

module.exports = mongoose.model('Event', eventSchema);