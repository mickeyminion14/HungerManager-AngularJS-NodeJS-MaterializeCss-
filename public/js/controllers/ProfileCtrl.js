angular.module("ProfileCtrl",[]).controller("ProfileController", function ($rootScope, $scope, $localStorage, $location){
  console.log("profile ctrl");
    $("#main").removeClass("home");
    $('#main').addClass("bgimg");
    $('.materialboxed').materialbox();
    $rootScope.NavBarVisibilty = "true";
    $rootScope.MobileNavBarVisibilty = "true";  
    $rootScope.cartObj;
    $rootScope.total;
    $localStorage.User_Hunger_Manager;
    $rootScope.User_Hunger_Manager = $localStorage.User_Hunger_Manager || null;
    $rootScope.Hunger_Manager_loggedIn;
    $rootScope.qrCode = $localStorage.qrCode || "false";
    $rootScope.locationQr = $localStorage.locationQr || null ;

    console.log($rootScope.locationQr);
   
  });
  