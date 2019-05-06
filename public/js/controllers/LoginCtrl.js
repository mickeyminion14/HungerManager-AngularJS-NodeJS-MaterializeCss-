// app.controller("home", function ($rootScope, $scope, $location, $window, $localStorage) {
    angular.module("LoginCtrl",[]).controller("LoginController", function ($rootScope, $location, $scope, $timeout, $http, $window, $localStorage){
      console.log("login ctrl");
    $localStorage.User_Hunger_Manager;
    $localStorage.loggedIn_Hunger_Manager;
    $scope.formData = {};
    $scope.formData.rollno;
    $scope.formData.password;
    $scope.loc = $location.absUrl();
 
    $rootScope.User_Hunger_Manager = $localStorage.User_Hunger_Manager || null;
    console.log($localStorage.User_Hunger_Manager);
 
    $rootScope.validateLogin = function () {
        console.log($scope.formData);
      $("#subBtn").removeClass("scale-in");
      $('#subBtn').addClass("scale-out");
      $('#loader').css("visibility", "visible");
 
      $http.post('/validateLogin', $scope.formData)
        .success(function (data) {
          console.log(data);
          if (data.ok == 1) {
            M.toast({
              html: ' Login Sucessfull. ',
              displayLength: 3000
            });
            $rootScope.User_Hunger_Manager = data;
            $rootScope.loggedIn_Hunger_Manager = 'true';
            $localStorage.loggedIn_Hunger_Manager = $rootScope.loggedIn_Hunger_Manager;
            $localStorage.User_Hunger_Manager = $rootScope.User_Hunger_Manager;
            $location.path('/profile');

          } 
          else {
            $rootScope.loggedIn_Hunger_Manager = 'false';
            $localStorage.loggedIn_Hunger_Manager = $rootScope.loggedIn_Hunger_Manager;
            $timeout(function () {

              // $location.path('/404');
              $scope.formData = {};
              $scope.myForm.$setPristine();
              $('#subBtn').removeClass("scale-out");
              $('#subBtn').addClass("scale-in");
              $('#loader').css("visibility", "hidden");
              M.toast({
                html: ' PASSWORD OR ROLL NO INCORRECT ',
                displayLength: 3000
              })
            }, 3000);
          }
 
 
        })
        .error(function (data) {
          console.log('Error: ' + data);
        });
 
    }
});
    