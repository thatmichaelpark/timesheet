var adminApp = angular.module('adminApp', ['resourceModule', 'weekModule', 'ngResource', 'ngRoute']);

adminApp.controller('AdminCtrl', ['$scope', '$location', 'resourceFactory', 'weekService',
						function ($scope, $location, resourceFactory, weekService) {

	var employeeResource = resourceFactory.employeeResource;
	
	var timeResource = resourceFactory.timeResource;

	$scope.getEmployees = function () {
		$scope.employees = employeeResource.query()
		$scope.employees.$promise.then(function (employees) {
			employees.forEach(function (employee) {
				var today = new Date();
				var d = {
					emp_id: employee._id,
					yyyymmdd: weekService.yyyymmdd(today)
				};
				employee.data = timeResource.get( d );
				employee.data.$promise.then(function (x) {
					if (x.times.length) {
						var t, t0, t1;
						t0 = new Date(x.times[0]);
						t1 = x.times[1] ? new Date(x.times[1]) : new Date();
						t = t1.getTime() - t0.getTime();
						if (x.times.length >= 2) {
							t0 = new Date(x.times[2]);
							t1 = x.times[3] ? new Date(x.times[3]) : new Date();
							t += t1.getTime() - t0.getTime();
						}
						employee.data.currentHours = (t / 1000 / 60 / 60).toFixed(2);
					} else {
						employee.data.currentHours = '';
					}
				});
			});
		});
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

	$scope.dailyClick = function () {
		$location.path('/daily');
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
	$routeProvider.when('/daily', { templateUrl: '/daily.html' } );
	$routeProvider.when('/reports', { templateUrl: '/reports.html' } );
	$routeProvider.otherwise( { templateUrl: '/main.html' } );
});
	