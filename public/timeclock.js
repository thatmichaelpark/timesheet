var timeclockApp = angular.module('timeclockApp', ['weekModule']);

timeclockApp.controller('TimeclockCtrl', ['$scope', '$interval', function ($scope, $interval) {
	
	$scope.view = "keypad.html";
	$scope.data = {};
	$scope.time = new Date();

	$scope.changeView = function (v) {
		$scope.view = v;
	}
	
	$interval(function () {
		$scope.time = new Date();
	}, 1000);
}]);

timeclockApp.controller('KeypadCtrl', ['$scope', 'resourceFactory', function ($scope, resourceFactory) {

	$scope.input = '';

	$scope.digit = function(digit) {
		$scope.input += digit;
	};
	
	$scope.bksp = function() {
		if ($scope.input.length > 0) {
			$scope.input = $scope.input.slice(0, -1);
		}
	};

	$scope.enter = function() {
		$scope.data.employee = resourceFactory.employeeResource.getbypin({pin: $scope.input});
		$scope.data.employee.$promise.then(function (x) {
			if ($scope.data.employee.active) {
				$scope.changeView('employeecard.html');
			} else {
				alert('Employee is inactive');
				$scope.input = '';
			}
		});
	};
	
}]);


