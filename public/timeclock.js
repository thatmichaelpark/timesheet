var timeclockApp = angular.module('timeclockApp', []);

timeclockApp.controller('KeypadCtrl', ['$scope', '$http', function ($scope, $http) {

	$scope.input = 'howdy';

	$scope.digit = function(digit) {
		$scope.input += digit;
	};
	
	$scope.bksp = function() {
		if ($scope.input.length > 0) {
			$scope.input = $scope.input.slice(0, -1);
		}
	};

	$scope.enter = function() {
		$http.get('/employee/' + $scope.input, {code: $scope.input})
		.success(function(data, status, headers, config) {
			alert(data.name);
		})
		.error(function(data, status, headers, config) {
			alert(data.msg);
		});
		var date = new Date('Sat Jan 18 2015 20:27:21 GMT-0700 (Pacific Daylight Time)');
		console.log(JSON.stringify(date));
		console.log(date.toString());
		var d = JSON.parse('"2015-01-19T00:27:21.000Z"');
		console.log(new Date(d));
	};
	
}]);


