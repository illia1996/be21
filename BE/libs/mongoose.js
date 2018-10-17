var mongoose = require('mongoose');
var log = require('./log')(module);
var config = require('./config');

mongoose.connect(config.get('mongoose:uri'), {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback() {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

var Hero = new Schema({
    id:{type:Number, required:true},
    name: {type: String, required: true},
    modified: {type: Date, default: Date.now}
});

var HeroModel = mongoose.model('Hero', Hero);

module.exports.HeroModel = HeroModel;
