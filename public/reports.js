angular.module('adminApp').controller('reportCtrl', function ($scope, resourceFactory) {

	$scope.activeEmployees = resourceFactory.employeeResource.getActive();

});
