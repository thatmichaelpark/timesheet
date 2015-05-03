adminApp.controller('EditCtrl', ['$scope', '$location', '$route', '$routeParams', function ($scope, $location, $route, $routeParams) {

	$scope.$on('$routeChangeSuccess', function () {
		if ($location.path().indexOf('/edit/') == 0) {
			$scope.emp_id = $routeParams['emp_id'];
			$scope.getEmployee($scope.emp_id);
			console.log($scope.emp_id);;;
		}
	});
	
	$scope.canLeavePage = true;
	var pendingEdits = 0;
	$scope.bumpPendingEdits = function (n) {
		pendingEdits += n;
		$scope.canLeavePage = pendingEdits === 0;
	}
}]);

adminApp.controller('EmployeeEditCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

	$scope.mainClick = function () {
		$scope.getEmployees();
		$location.path('/main');
	}
	
	$scope.editing = false;
	
	$scope.editClick = function () {
		$scope.editing = true;
		$scope.bumpPendingEdits(1);
	}
	
	$scope.okClick = function () {
		$http.put('/employee/update/'+$scope.employee._id, $scope.employee)
		.success(function(data, status, headers, config) {
			console.log(data);
		})
		.error(function(data, status, headers, config) {
			alert(data);
		});

		$scope.editing = false;
		$scope.bumpPendingEdits(-1);
	}
	
	$scope.cancelClick = function () {
		$scope.getEmployee($scope.employee._id);
		$scope.editing = false;
		$scope.bumpPendingEdits(-1);
	}
}]);

adminApp.controller('TimeEditCtrl', ['$scope', 'weekService', function ($scope, weekService) {
	weekService.getCurrentWeek($scope.emp_id);
	$scope.data = weekService.data;
}]);

adminApp.controller('EditableCtrl', ['$scope', function ($scope) {

	var editing = false;
	
	$scope.editing = function () {
		return editing;
	}
	
	$scope.editClick = function () {
		editing = true;
		$scope.bumpPendingEdits(1);
	}
	
	$scope.okClick = function () {
		editing = false;
		$scope.bumpPendingEdits(-1);
	}
	
	$scope.cancelClick = function () {
		editing = false;
		$scope.bumpPendingEdits(-1);
	}
	
}]);
