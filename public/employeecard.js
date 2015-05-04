angular.module('timeclockApp').controller('EmployeeCardCtrl', function ($scope, weekService, resourceFactory) {

	$scope.cancelClick = function () {
		$scope.changeView('keypad.html');
	}

	$scope.weekService = weekService;
	
	var offset = 0;
	weekService.getCurrentWeek($scope.data.employee._id, offset);

	var timeResource = resourceFactory.timeResource;
	
	$scope.addWeek = function (d) {
		offset += d;
		weekService.getCurrentWeek($scope.data.employee._id, offset);
	}
	
	$scope.clockedIn = true;
	$scope.clockedOut = false;
});