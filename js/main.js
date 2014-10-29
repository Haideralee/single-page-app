angular.module('myApp',['ngRoute','ui.bootstrap'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/',{
                controller:'homeCrtl',
                templateUrl:'views/home.html'
            })
            .when('/about',{
                controller:'aboutCrtl',
                templateUrl:'views/about.html'
            })
            .when('/contact',{
                controller:'contactCrtl',
                templateUrl:'views/contact.html'
            })
            .when('/blog',{
                controller:'blogCrtl',
                templateUrl:'views/blog.html'
            })
            .when('/blog/post/:postID',{
                controller:'singlePostCrtl',
                templateUrl:'views/single-post.html'
            })
            .when('/blog/category/:catID',{
                controller:'categoryCrtl',
                templateUrl:'views/category.html'
            })
    }])
    .controller('homeCrtl', function($scope, homeFactory){
        homeFactory.getHomeData(function(getPageData) {
            $scope.pageData = getPageData;
        });
    })
    .controller('aboutCrtl', function($scope, aboutFactory){
        aboutFactory.getAboutData(function(getPageData){
            $scope.pageData = getPageData;
        });
    })
    .controller('contactCrtl', function($scope, serviceFactory){
        serviceFactory.getServiceData(function(getPageData){
            $scope.pageData = getPageData;
        });
    })
    .controller('blogCrtl', function($scope, blogFactory){
        blogFactory.getBlogData(function(getPageData){
            $scope.pageData = getPageData;
            $scope.posts = $scope.pageData[3].posts;
//            console.log($scope.posts);
            $scope.isCollapsed = false;

        });
    })
    .controller('singlePostCrtl', function($scope, $routeParams, singlePostFactory){
//        console.log($routeParams);
//        console.log($routeParams.postID);
        var current = $routeParams.postID;
//        console.log(current)
        singlePostFactory.getSinglePostData(function(getPageData){
            $scope.post = getPageData[3].posts[current - 1];
        });
    })
    .controller('categoryCrtl', function($scope, $routeParams, categoryFactory){
        var current = $routeParams.catID;
//        console.log(current);
        categoryFactory.getCategoryData(function(getPageData){
            var allPost = $scope.post = getPageData[3].posts;
            $scope.categories = [];
            for(var i = 0; allPost.length >=  i; i++ ){
                var cat = allPost[i];
                if(allPost[i].category == $routeParams.catID){
                    console.log(cat);
                    $scope.categories.push(cat);
                    console.log($scope.categories);

                }
            }
        });
    })
    .factory('homeFactory', function(dataService){
        return {
            getHomeData: function(callback) {
                dataService.getPerson('data/data.json')
                           .success(callback);
            }
        };
    })
    .factory('aboutFactory', function(dataService){
        return {
            getAboutData: function(aboutCrtlCallBack){
                var dfd = dataService.getPerson('data/data.json');
                dfd.success(aboutCrtlCallBack);
            }
        };
    })
    .factory('serviceFactory', function(dataService){
        return {
            getServiceData : function(serviceCrtlCallBack){
                dataService.getPerson('data/data.json')
                           .success(serviceCrtlCallBack);
            }
        };
    })
    .factory('blogFactory', function(dataService){
        return {
            getBlogData : function(blogCrtlCallBack){
               dataService.getPerson('data/data.json')
                          .success(blogCrtlCallBack);

            }
        };
    })
    .factory('singlePostFactory', function(dataService){
        return {
            getSinglePostData : function(callback){
                dataService.getPerson('data/data.json')
                    .success(callback);

            }
        };
    })
    .factory('categoryFactory', function(dataService){
        return {
            getCategoryData : function(callback){
                dataService.getPerson('data/data.json')
                    .success(callback);

            }
        };
    })
    .service('dataService', function($http){
       return {
           getPerson: function (url) {
               var http =  $http;
               var deferred = http.get(url);
//                console.log(deferred);
               return deferred;
//               deferred.success(callback);
           }
       };
    });