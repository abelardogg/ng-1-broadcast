var app = angular.module('gameindustry',[]);

app.factory("nepsFactory", function($rootScope, $http){
  var hyperdimension = {};
  hyperdimension.cpus = [];

  /* get all CPUS */
  hyperdimension.getCpus = function(){
    if ( hyperdimension.cpus.length > 0 ) {
      /* the parameter sendingCpus is the name of the event for broadcast */
      $rootScope.$broadcast("sendingCpus");
    }
    else {
      $http.get("db/gameindustry.json")
      .then(
        function(data){
          hyperdimension.cpus = data;
          $rootScope.$broadcast("sendingCpus");
        }
      );
    }
  }

  /* get single CPU */
  hyperdimension.getCpu = function(id){
    for ( var i = 0 ; i < hyperdimension.cpus.length ; i ++ ){
      if ( hyperdimension.cpus[i].id == id ) {
        return hyperdimension.cpus[i];
      }
    }
  }

  return hyperdimension;

});

function callCpus($scope, $http, nepsFactory){
  $scope.$on("sendingCpus", function(){
    $scope.cpus = nepsFactory.cpus;
    console.log($scope.cpus);
  });
  $scope.cpus = [];
  nepsFactory.getCpus();
}

app.controller("cpuCtrl", callCpus);
