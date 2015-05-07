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

timeclockApp.controller('KeypadCtrl', ['$scope', '$http', function ($scope, $http) {

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
		$http.get('/employee/bypin/' + $scope.input, {pin: $scope.input})
		.success(function(data, status, headers, config) {
			$scope.data.employee = data;
			if ($scope.data.employee.active) {
				$scope.changeView('employeecard.html');
			} else {
				alert('Employee is inactive');
			}
		})
		.error(function(data, status, headers, config) {
			alert(data.msg);
			$scope.input = '';
		});
	};
	
}]);


