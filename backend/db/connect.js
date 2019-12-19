var mongoose = require('mongoose');
var config = require('../config/config')
module.exports = function(){
    
    var dbOptions = {useNewUrlParser: true, useUnifiedTopology: true, auto_reconnect: true};
    mongoose.connect(config.connection_string, dbOptions);

    var db = mongoose.connection;

    db.on('connecting', function () {
        console.log('connecting to MongoDB...');
    });

    db.on('error', function (error) {
        console.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
    });
    db.on('connected', function () {
        console.log('MongoDB connected!');
    });
    db.once('open', function () {
        console.log('MongoDB connection opened!');
    });
    db.on('reconnected', function () {
        console.log('MongoDB reconnected!');
    });
    db.on('disconnected', function () {
        console.log('MongoDB disconnected!');
        mongoose.connect(config.connection_string, dbOptions);
    });
}