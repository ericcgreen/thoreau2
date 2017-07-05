angular
  .module("thoreauApp", [
    "ui.router",
    "ngSanitize",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$urlRouterProvider",
    RouterFunction
  ])
  .factory("ThoreauFactory", [
    "$resource",
    ThoreauFactoryFunction
  ])
  .controller("articlesIndexCtrl", [
    "$state",
    "ThoreauFactory",
    ArticlesIndexControllerFunction
  ])
  .controller("articlesNewCtrl", [
    "$state",
    "ThoreauFactory",
    ArticlesNewControllerFunction
  ])
  .controller("articlesShowCtrl", [
    "$scope",
    "$stateParams",
    "$state",
    "$sce",
    "ThoreauFactory",
    ArticlesShowControllerFunction
  ])

  function RouterFunction($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("welcome", {
        url: "/",
        templateUrl: "js/ng-views/welcome.html"
      })
      .state("articlesIndex", {
        url: "/articles",
        templateUrl: "js/ng-views/articles/index.html",
        controller: "articlesIndexCtrl",
        controllerAs: "vm"
      })
      .state("articlesNew", {
        url: "/articles/new",
        templateUrl: "js/ng-views/articles/new.html",
        controller: "articlesNewCtrl",
        controllerAs: "vm"
      })
      .state("articlesShow", {
        url: "/articles/:post_title",
        templateUrl: "js/ng-views/articles/show.html",
        controller: "articlesShowCtrl",
        controllerAs: "vm"
      })
      //activated when a state transition is made and if an invalid url is entered, redirect to the articles list
      $urlRouterProvider.otherwise("/")
  }

  function ThoreauFactoryFunction($resource) {
    return $resource("api/articles/:post_title", {}, {
      // definte and require update method
      update: {method: "PUT"}
    })
  }

  function ArticlesIndexControllerFunction($state, ThoreauFactory) {
    // query the API with RESTful methods
    this.articles = ThoreauFactory.query()
  }

  function ArticlesNewControllerFunction($state, ThoreauFactory) {
    this.newArticle = new ThoreauFactory()
    this.create = function() {
      this.newArticle.$save().then(function(article) {
        $state.go("articlesShow", {post_title: article.post_title})
      })
    }
  }

  function ArticlesShowControllerFunction($scope, $stateParams, $state,  $sce, ThoreauFactory) {
    this.article = ThoreauFactory.get({post_title: $stateParams.post_title})
    this.update = function() {
      this.article.$update({post_title:$stateParams.post_title}, (article) => {
        $state.go("articlesShow", {post_title: article.post_title})
      })
    }
    this.delete = function() {
      this.article.$delete({post_title:$stateParams.post_title}).then(function() {
        $state.go("articlesIndex")
      })
    }
    var html = this.article.post_content
      this.deliberatelyTrustDangerousSnippet = function() {
        $sanitize(html)
          return $sce.trustAsHtml(html);
      }
  }
