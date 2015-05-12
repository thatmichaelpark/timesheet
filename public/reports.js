angular.module('adminApp').controller('reportCtrl', function ($scope, $filter, resourceFactory, weekService) {

	var employeeResource = resourceFactory.employeeResource;
	var timeResource = resourceFactory.timeResource;
	
	$scope.activeEmployees = employeeResource.getActive();
	
	$scope.weekService = weekService;
	
	var offset = 0;
	weekService.getPayPeriod(new Date(), offset);
	
	$scope.periodClick = function (d) {
		offset += d;
		weekService.getPayPeriod(new Date(), offset);
		getPeriod();
	}
	
	$scope.employeeChanged = function () {
		getPeriod();
	}
	
	function getPeriod() {
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
			
			function dailyTotal(pp) {
				var times = pp.times;
				if (times.length === 0) {
					return 0;
				}
				if (times.length & 1) {	// odd?
					throw 'No clock-out on ' + $filter('date')(pp.date);
				}
				var t1 = new Date(times[1]).getTime() - new Date(times[0]).getTime();
				if (t1 < 0) {
					throw 'Clock-out before clock-in on ' + $filter('date')(pp.date);
				}
				var t2 = new Date(times[3]).getTime() - new Date(times[2]).getTime();
				if (t2 < 0) {
					throw 'Clock-out before clock-in on ' + $filter('date')(pp.date);
				}
				return (t1 + t2) / 1000 / 60 / 60;
			}
 		});
	}
});
