angular.module('adminApp').controller('reportCtrl', function ($scope, resourceFactory, weekService) {

	var employeeResource = resourceFactory.employeeResource;
	var timeResource = resourceFactory.timeResource;
	
	$scope.activeEmployees = employeeResource.getActive();
	
	$scope.weekService = weekService;
	
	var offset = 0;
	weekService.getPayPeriod(new Date(), offset);
	
	$scope.periodClick = function (d) {
		offset += d;
		weekService.getPayPeriod(new Date(), offset);
		getPeriod();
	}
	
	$scope.employeeChanged = function () {
		getPeriod();
	}
	
	function getPeriod() {
		var _id = $scope.currentEmployee._id;
		$scope.payPeriod = timeResource.getRange({
			emp_id: _id,
			yyyymmdd0: weekService.yyyymmdd(weekService.data.periodStart),
			yyyymmdd1: weekService.yyyymmdd(weekService.data.periodEnd)
		});
	}
});
