angular.module('timeclockApp').controller('EmployeeCardCtrl', function ($scope, $timeout, weekService, resourceFactory) {

	var promise;
	
	$scope.clockIt = function () {
		weekService.clockIt();
		$timeout.cancel(promise);
		promise = $timeout($scope.okClick, 10000);
	}

	$scope.okClick = function () {
		$timeout.cancel(promise);
		console.log('ok');
		$scope.changeView('keypad.html');
	}

	promise = $timeout($scope.okClick, 15000);

	$scope.weekService = weekService;
	
	var offset = 0;
	weekService.getCurrentWeek($scope.data.employee._id, offset);

	$scope.addWeek = function (d) {
		$timeout.cancel(promise);
		promise = $timeout($scope.okClick, 10000);
		offset += d;
		weekService.getCurrentWeek($scope.data.employee._id, offset);
	}
});