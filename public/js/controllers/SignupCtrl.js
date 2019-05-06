// app.controller("home", function ($rootScope, $scope, $location, $window, $localStorage) {
    angular.module("SignupCtrl",[]).controller("SignupController", function ($rootScope, $scope, $http, $location, $timeout, $window){
      console.log("signup ctrl");
        $('input#icon_telephone').characterCounter();
        $("#main").removeClass("home");
        $('#main').addClass("bgimg");
        $scope.formData = {};
        $scope.loc = $location.absUrl();
        $scope.formData.name;
        $scope.formData.rollno;
        $scope.formData.email;
        $scope.formData.mobile;
        $scope.formData.password;
        $scope.formData.confirm_password;
        $scope.formData.profile_image;
     
     
        $scope.createUser = function () {
            console.log("hello world")
            $('#subBtn').removeClass("scale-in");
            $('#subBtn').addClass("scale-out");
            $('#loader').css("visibility", "visible");

          let form_custom = new FormData();
          form_custom.append('name', $scope.formData.name);
          form_custom.append('rollno', $scope.formData.rollno);
          form_custom.append('email', $scope.formData.email);
          form_custom.append('mobile', $scope.formData.mobile);
          form_custom.append('profile_imageUrl', '')
          form_custom.append('password', $scope.formData.password);
          if (!(document.getElementById('profile_image').files[0] == undefined || null)) {
            form_custom.append('profile_image', document.getElementById('profile_image').files[0]);
          }
          console.log($scope.formData);
            $http.post('/createUser',form_custom, {
                transformRequest: angular.identity,
                      headers: {
                        'Content-Type': undefined
                      }
            })
            .success((data) => {
                console.log(data.mssg);
                if (!data.error) {
                          M.toast({
                            html: "User profile Created successfully !",
                            displayLength: 3000
                          });
                          $location.path('/login');
                        } else {
                          if (data.mssg.email == $scope.formData.email) {
                            $timeout(function () {
               
                              $scope.formData = {};
                              $scope.myForm.$setPristine();
                              $('#subBtn').removeClass("scale-out");
                              $('#subBtn').addClass("scale-in");
                              $('#loader').css("visibility", "hidden");
                              M.toast({
                                html: "An Account Already Exists With the entered email !",
                                displayLength: 3000
                              });
                            }, 3000);
                          }
               
                          if (data.mssg.rollno == $scope.formData.rollno) {
               
               
                            $timeout(function () {
                              // $location.path('/home');
                              $scope.formData = {};
                              $scope.myForm.$setPristine();
               
                              $('#subBtn').removeClass("scale-out");
                              $('#subBtn').addClass("scale-in");
                              $('#loader').css("visibility", "hidden");
                              M.toast({
                                html: "An Account Already Exists With the entered roll number !",
                                displayLength: 3000
                              });
                            }, 1000);
                          }
                        }
                        
                    
                     
            })
            .error ((data) => {
                console.log(data);
            });
          
        };
     
     
     
     
      
        });
    