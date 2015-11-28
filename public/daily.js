angular.module('adminApp').controller('dailyCtrl', function ($scope, $filter, resourceFactory, weekService) {

	var employeeResource = resourceFactory.employeeResource;
	var timeResource = resourceFactory.timeResource;

	
	$scope.today = new Date();
	getDailyActivity($scope.today);
	
	$scope.dayClick = function (d) {
		$scope.today = weekService.addDays($scope.today, d);
		getDailyActivity($scope.today);
	}
	
	function getDailyActivity(d) {
		$scope.dailyRecords = [];
		$scope.dailyTotal = 0;
		$scope.activeEmployees = employeeResource.getActive();
		$scope.activeEmployees.$promise.then(function () {
			for (var i=0; i<$scope.activeEmployees.length; ++i) {
				var d = {
					emp_id: $scope.activeEmployees[i]._id,
					yyyymmdd: weekService.yyyymmdd($scope.today)
				};
				(function (name) {
					timeResource.get( d ).$promise.then( function (data) {
						var dt = dailyTotal(name, data.times);
						$scope.dailyRecords.push({name: name, times: data.times, dailyHours: dt});
						if ($scope.dailyTotal !== null && dt !== null) {
							$scope.dailyTotal += dt;
						} else {
							$scope.dailyTotal = null;
						}
					});
				})($scope.activeEmployees[i].name);
			}
		});

		function dailyTotal(name, times) {
			if (times.length === 0) {
				return 0;
			}
			if (times.length & 1) {	// odd?
				alert(name + ': No clock-out');
				return null;
			}
			var t1 = new Date(times[1]).getTime() - new Date(times[0]).getTime();
			if (t1 < 0) {
				alert(name + ': Clock-out before clock-in');
				return null;
			}
			var t2 = 0;
			if (times.length ===4 ) {
				var t2 = new Date(times[3]).getTime() - new Date(times[2]).getTime();
				if (t2 < 0) {
					alert(name + ': Clock-out before clock-in');
				return null;
				}
			}
			return (t1 + t2) / 1000 / 60 / 60;
		}

		return;;;
		var _id = $scope.currentEmployee._id;
		$scope.payPeriod = timeResource.getRange({
			emp_id: _id,
			yyyymmdd0: weekService.yyyymmdd(weekService.data.periodStart),
			yyyymmdd1: weekService.yyyymmdd(weekService.data.periodEnd)
		});
		$scope.payPeriod.$promise.then(function () {
			$scope.periodTotal = 0;
			try {
				for (var i=0; i<$scope.payPeriod.length; ++i) {
					var t = dailyTotal($scope.payPeriod[i]);
					$scope.payPeriod[i].dailyTotal = t;
					$scope.periodTotal += t;
				}
			} catch (e) {
				alert(e);
			}
			
 		});
	}
});
