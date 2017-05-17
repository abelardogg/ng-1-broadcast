var app = angular.module('gameindustry',[]);

/* Like a controller, give a name to yout factory and pass a function */
app.factory("nepsFactory", function($rootScope, $http){

  /* define an object, this will let you call methods on your controller */
  var hyperdimension = {};

  /* create an array to store your data from the GET methods */
  hyperdimension.cpus = [];

  /* get all CPUS */
  hyperdimension.getCpus = function(){
    /* check if you have any content on your array */
    if ( hyperdimension.cpus.length > 0 ) {
      /* the parameter sendingCpus is the name of the event for broadcast, this will trigger the listeners */
      $rootScope.$broadcast("sendingCpus");
    }
    /* if you don't have nothing on your array you will fill it with the result of the GET method */
    else {
      $http.get("db/gameindustry.json")
      .then(
        /* if your recive the DB data successfully the this function will executed */
        /* the result of the endpoint will be assigned to the 'data' variable declared on the function arguments */
        function(data){
          /* remember the array that you have declared above? well here you pass it the value of the argument 'data' */
          hyperdimension.cpus = data;
          /* the parameter sendingCpus is the name of the event for broadcast, this will trigger the listeners */
          $rootScope.$broadcast("sendingCpus");
        },
        /* if for any reason you couldn't receive the data, this function will be triggered */
        function(){
          console.log("something went wrong pal!\nRemember to always have your console open while you are testing");
        }
      );
    }
  }

// TODO:
  /* get single CPU (this function is still under consturction, sorry m8!!!) */
  hyperdimension.getCpu = function(id){
    for ( var i = 0 ; i < hyperdimension.cpus.length ; i ++ ){
      if ( hyperdimension.cpus[i].id == id ) {
        return hyperdimension.cpus[i];
      }
    }
  }

/* Don't forget return the object or you will get a "method not defined" error */
return hyperdimension;

});

/* controllers functions */

/* this function will be pased to the controller for the index controller later */
/* you need to declare the dependencies that you will use, also you have to declare your factory, use the name that you have given (nepsFactory in this case) */
function callCpus($scope, $http, nepsFactory){
/* this kind of guys are the listeners, you have to give them the $broadcast event who you want to use, and give a function */
  $scope.$on("sendingCpus", function(){
    /* here the listener going to assign the $broadcast data to your new variable on this $scope */
    $scope.cpus = nepsFactory.cpus.data;/* DON'T FORGET THE DATA!!! */
  });

  /* this is a simple declaration, it's supposed to be declared before the listener do something */
  $scope.cpus = [];
  /* this triggers the function that contains the event for listener */
  nepsFactory.getCpus();
}

/* finally we assign the function to the controller for the data bind between the view and controller */
app.controller("cpuCtrl", callCpus);
