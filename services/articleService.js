var Article = require('../models/article').Article;

class ArticleService {
  constructor() {
  }

  getAllArticles(){
      return Article.find({}).exec();
  }

  getArticleById(articleId){
      return Article.findOne({'_id': articleId }).exec();
  }

  deleteArticle(articleId){
    return Article.findOne({'_id': articleId }).remove().exec();
  }

}

module.exports = ArticleService;
