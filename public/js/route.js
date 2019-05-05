var app = angular.module("HungerManagerApp", [ 'ngRoute','ngStorage', 'BookMealCtrl', 'HomeCtrl', 'LoginCtrl',  'SignupCtrl', 'ProfileCtrl']);
app.config(function ($routeProvider) {
  // body...
  $routeProvider
    .when("/login", {
        templateUrl: "./views/login.html",
        controller: "LoginController"
    })
    .when("/signup", {
        templateUrl: "./views/signup.html",
        controller: "SignupController"
    })
    .when("/home", {
        templateUrl: "./views/home.html",
        controller: "HomeController"
    })
    .when("/profile", {
        templateUrl: "./views/profile.html",
        controller: "ProfileController"
    }) 
    .when("/bookmeal", {
        templateUrl: "./views/bookmeal.html",
        controller: "BookMealController"
    }) 


 });
