//// 3 вариант
var async = require('async');
var User = require('./models/user').User;
var Article = require('./models/article').Article;
var Tag = require('./models/tag').Tag;
var mongoose = require('./libs/mongoose');

// 1. drop db
// 2. create & save users
// 3. close connection

// запускаем функции друг за другом
async.series([
    open,
    dropDatabase,
    createUsers,
    close
], function(err, results) {
    if (err) {
        throw err;
    }
    console.log(results);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db; // уровень mongodb native driver
    db.dropDatabase(callback);
}

function createUsers(callback) {
    // 2. create & save users
    async.parallel([
        function(callback) {
            var vasya = new User({
                username: 'Вася',
                email: 'vasya@mail.ru',
                password: 'supervasya'
            });

            var tag = new Tag({
                value: 'tag1'
            });

            var vasyaArticle = new Article({
                title: 'Title',
                content: 'Content',
                tags: [tag.value],
                
            });


            vasya.save(function(err) {
                if (err) {
                    throw err;
                }
                callback(err, vasya);
            });
        },
        function(callback) {
            var petya = new User({
                username: 'Петя',
                email: 'petya@mail.ru',
                password: '123'
            });
            petya.save(function(err) {
                callback(err, petya);
            });
        },
        function(callback) {
            var admin = new User({
                username: 'admin',
                email: 'admin@mail.ru',
                password: 'admin'
            });
            admin.save(function(err) {
                callback(err, admin);
            });
        }
    ], callback);
}

function close(callback) {
    // 3. close connection
    mongoose.disconnect(callback);
}
