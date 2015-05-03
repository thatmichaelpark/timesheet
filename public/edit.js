adminApp.controller('EditCtrl', ['$scope', '$location', '$route', '$routeParams', 'weekService',
	function ($scope, $location, $route, $routeParams, weekService) {

	$scope.$on('$routeChangeSuccess', function () {
		if ($location.path().indexOf('/edit/') == 0) {
			$scope.emp_id = $routeParams['emp_id'];
			$scope.getEmployee($scope.emp_id);
			weekService.getCurrentWeek($scope.emp_id);;;
		}
	});
	$scope.weekService = weekService;
	
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

adminApp.controller('TimeEditCtrl', ['$scope', function ($scope) {

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
	
	$scope.okClick = function (index) {
		$scope.weekService.save(index);;;
		editing = false;
		$scope.bumpPendingEdits(-1);
	}
	
	$scope.cancelClick = function (index) {
		$scope.weekService.get(index);
		editing = false;
		$scope.bumpPendingEdits(-1);
	}
	
}]);
