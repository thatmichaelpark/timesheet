angular.module('adminApp').controller('reportCtrl', function ($scope, resourceFactory, weekService) {

	var employeeResource = resourceFactory.employeeResource;
	var timeResource = resourceFactory.timeResource;
	
	$scope.activeEmployees = employeeResource.getActive();
	$scope.activeEmployees.$promise.then(function () {
		var _id = $scope.activeEmployees[0]._id;
		var d0 = new Date('2015-05-01');
		var d1 = new Date('2015-05-16');
		timeResource.getRange({
			emp_id: _id,
			yyyymmdd0: weekService.yyyymmdd(d0),
			yyyymmdd1: weekService.yyyymmdd(d1)
		});
	})
	
	$scope.weekService = weekService;
	
	var offset = 0;
	weekService.getPayPeriod(new Date(), offset);
	
	$scope.periodClick = function (d) {
		offset += d;
		weekService.getPayPeriod(new Date(), offset);
	}
});
