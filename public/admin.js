var adminApp = angular.module('adminApp', ['resourceModule', 'weekModule', 'ngResource', 'ngRoute']);

adminApp.controller('AdminCtrl', ['$scope', '$location', 'resourceFactory', 
						function ($scope, $location, resourceFactory) {

	var employeeResource = resourceFactory.employeeResource;
	
	$scope.getEmployees = function () {
		$scope.employees = employeeResource.query();
	};

	$scope.getEmployee = function (id) {
		$scope.employee = employeeResource.get({_id: id});
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


adminApp.controller('AddCtrl', ['$scope', 'resourceFactory', '$location',
						function ($scope, resourceFactory, $location) {

	$scope.okClick = function () {
		resourceFactory.employeeResource.add($scope.employee);
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
	