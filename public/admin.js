var adminApp = angular.module('adminApp', ['resourceModule', 'weekModule', 'ngResource', 'ngRoute']);

adminApp.controller('AdminCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

	$scope.getEmployees = function () {
		$http.get('/employee/')
		.success(function(data, status, headers, config) {
			$scope.employees = data;
		})
		.error(function(data, status, headers, config) {
			alert(data.msg);
		});
	};
	$scope.getEmployee = function (id) {
		$http.get('/employee/'+id)
		.success(function(data, status, headers, config) {
			$scope.employee = data;
		})
		.error(function(data, status, headers, config) {
			alert(data);
		});
	};
	
	$scope.getEmployees();
	
	$scope.employeeClick = function(id) {
		$scope.getEmployee(id);
		$location.path('/edit/' + id );
	}
	
	$scope.addClick = function() {
		$scope.employee = { name: '', pin: '', active: true };
		$location.path('/add');
	}

	$scope.reportsClick = function () {
		$location.path('/reports');
	}
	
	$scope.mainClick = function () {
		$scope.getEmployees();
		$location.path('/main');
	}
	
}]);


adminApp.controller('AddCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

	$scope.okClick = function () {
		$http.post('/employee/add', $scope.employee)
		.success(function(data, status, headers, config) {
			console.log(data);
		})
		.error(function(data, status, headers, config) {
			alert(data);
		});
		$scope.getEmployees();
		$location.path('/main');
	}
	
	$scope.cancelClick = function () {
		$location.path('/main');
	}
}]);

adminApp.directive('focus', function($timeout, $rootScope) {
	return {
		restrict: 'A',
		link: function($scope, $element, attrs) {
			$element[0].focus();
		}
	}
});

adminApp.config(function ($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);
	
	$routeProvider.when('/main', { templateUrl: '/main.html' } );
	$routeProvider.when('/edit/:emp_id', { templateUrl: '/edit.html' } );
	$routeProvider.when('/add', { templateUrl: '/add.html' } );
	$routeProvider.when('/reports', { templateUrl: '/reports.html' } );
	$routeProvider.otherwise( { templateUrl: '/main.html' } );
});
	