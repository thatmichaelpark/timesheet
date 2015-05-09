angular.module('listApp', ['resourceModule', 'ngResource'])
.controller('ListCtrl', function ($scope, resourceFactory) {

	function refresh() {
		$scope.times = resourceFactory.timeResource.query();
	}
	
	refresh();
	
	$scope.refreshClick = refresh;

})
.controller('sortCtrl', function ($scope) {

	$scope.predicate = 'date';
	$scope.sortBy = function (s) {
		$scope.predicate = s;
	}
});