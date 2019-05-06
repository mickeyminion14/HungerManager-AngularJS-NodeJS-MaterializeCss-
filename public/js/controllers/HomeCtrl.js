    angular.module("HomeCtrl",[])
    .controller("HomeController", function ($rootScope, $http, $scope, $location, $window, $localStorage){
        console.log("home ctrl");
        $rootScope.User_Hunger_Manager;
        // $rootScope.qrCode ;
        $rootScope.NavBarVisibilty = "true";
        $rootScope.MobileNavBarVisibilty = "true";  
        $rootScope.loggedIn_Hunger_Manager = $localStorage.loggedIn_Hunger_Manager || 'false';
        //  if($rootScope.loggedIn=="true") {}
        
        $rootScope.User_Hunger_Manager = $localStorage.User_Hunger_Manager || null;


        $scope.logout = function () {

            $rootScope.loggedIn_Hunger_Manager = 'false';
            M.toast({
              html: "Logged Out Successfully !"
            });
            $localStorage.loggedIn_Hunger_Manager= "false";
            $localStorage.User_Hunger_Manager = "";
            $rootScope.User_Hunger_Manager="";
            $location.path("/login");
        
          }
    });