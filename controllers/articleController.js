var ArticleService = require('../services/articleService');

var getDetailsUrl = function(protocol, host, articleId) {
    return protocol + '://' + host + '/articles/' + articleId;
};

var getDeleteUrl = function(protocol, host) {
    return protocol + '://' + host + '/articles/delete';
};

var getUpdateUrl = function(protocol, host) {
    return protocol + '://' + host + '/articles/update';
};

class ArticleController {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.articleService = new ArticleService();
    }

    index() {
        var currentRes = this.res;
        var currentReq = this.req;
        var currentRenderView = this.renderView;

        this.articleService.getAllArticles().then(
            function(articles) {

                for (var i = 0; i < articles.length; i++) {
                    articles[i].detailArticleUrl = getDetailsUrl(currentReq.protocol, currentReq.headers.host, articles[i]._id);
                    articles[i].deleteArticleUrl = getDeleteUrl(currentReq.protocol, currentReq.headers.host);
                    articles[i].updateArticleUrl = getUpdateUrl(currentReq.protocol, currentReq.headers.host);
                }

                var renderData = {
                    articles: articles
                }

                currentRenderView(currentRes, 'articles', renderData);
            },
            function(err) {
                throw err;
            }
        );
    }

    details(articleId) {
        var currentRes = this.res;
        var currentReq = this.req;
        var currentRenderView = this.renderView;

        this.articleService.getArticleById(articleId).then(
            function(article) {

                var renderData = {
                    article: article
                }

                currentRenderView(currentRes, 'articleDetails', renderData);
            },
            function(err) {
                throw err;
            }
        );
    }

    delete(articleId) {
        var currentRes = this.res;        

        this.articleService.deleteArticle(articleId).then(
            function(article) {
                currentRes.send(article);
            },
            function(err) {
                throw err;
            }
        );
    }

    renderView(res, templateName, data) {
        res.render(templateName, data);
    }
}

module.exports = ArticleController;
