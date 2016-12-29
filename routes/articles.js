var express = require('express');
var router = express.Router();
var ArticleController = require('../controllers/articleController');
var passport = require('passport');

/* GET home page. */
router.get('/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/articles/create'
    }),
    function(req, res, next) {
        var controller = new ArticleController(req, res, next);
        controller.index();
    });

/* GET create new article. */
router.get('/articles/create', function(req, res, next) {
    var controller = new ArticleController(req, res, next);
    controller.createArticleView();
})

/* GET update article. */
router.get('/articles/update/:articleId', function(req, res, next) {
    var controller = new ArticleController(req, res, next);
    controller.createArticleView(req.params['articleId']);
})

/* GET article detail. */
router.get('/articles/:articleId', function(req, res, next) {
    var controller = new ArticleController(req, res, next);
    controller.details(req.params['articleId']);

    //res.send(req.params['articleId']);
})

/* POST create new article. */
router.post('/articles/create', function(req, res, next) {
    var controller = new ArticleController(req, res, next);
    controller.createArticleAction(req.body);
})

/* POST article update. */
router.post('/articles/update', function(req, res, next) {
    var controller = new ArticleController(req, res, next);
    controller.update(req.body);
})

/* DELETE article detail. */
router.delete('/articles/delete', function(req, res, next) {
    var controller = new ArticleController(req, res, next);
    controller.delete(req.body['articleId']);

    //console.log(req.params);
    //console.log(req.body);
    //console.log(req.query);
})

module.exports = router;
