var express = require('express');
var router = express.Router();
var ArticleController = require('../controllers/articleController');

/* GET home page. */
router.get('/', function(req, res, next) {

    var controller = new ArticleController(req, res, next);
    controller.index();
});

/* GET article detail. */
router.get('/articles/:articleId', function (req, res, next) {
  var controller = new ArticleController(req, res, next);
  controller.details(req.params['articleId']);

  //res.send(req.params['articleId']);
})

/* DELETE article detail. */
router.delete('/articles/delete', function (req, res, next) {
   var controller = new ArticleController(req, res, next);
   controller.delete(req.body['articleId']);

  //console.log(req.params);
  //console.log(req.body);
  //console.log(req.query);
})

module.exports = router;
