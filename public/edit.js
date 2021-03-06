adminApp.controller('EditCtrl', ['$scope', '$location', '$route', '$routeParams', 'weekService',
	function ($scope, $location, $route, $routeParams, weekService) {

	var offset = 0;	// #weeks offset

	$scope.$on('$routeChangeSuccess', function () {
		if ($location.path().indexOf('/edit/') == 0) {
			$scope.emp_id = $routeParams['emp_id'];
			$scope.getEmployee($scope.emp_id);
			weekService.getCurrentWeek($scope.emp_id, offset);
		}
	});
	$scope.weekService = weekService;
	
	$scope.canLeavePage = true;
	var pendingEdits = 0;
	$scope.bumpPendingEdits = function (n) {
		pendingEdits += n;
		$scope.canLeavePage = pendingEdits === 0;
	}

	$scope.addWeek = function (d) {
		offset += d;
		weekService.getCurrentWeek($scope.emp_id, offset);
	}

}]);

adminApp.controller('EmployeeEditCtrl', ['$scope', '$location', function ($scope, $location) {

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
		$scope.employee.$update();
		$scope.editing = false;
		$scope.bumpPendingEdits(-1);
	}
	
	$scope.cancelClick = function () {
		$scope.employee.$get();
		$scope.editing = false;
		$scope.bumpPendingEdits(-1);
	}
}]);

adminApp.controller('TimeEditCtrl', ['$scope', function ($scope) {
}]);

adminApp.controller('EditableCtrl', ['$scope', '$filter', function ($scope, $filter) {

	var editing = false;
	
	$scope.editing = function () {
		return editing;
	}
	
	$scope.editClick = function (day) {
		editing = true;
		$scope.bumpPendingEdits(1);
		$scope.times = [];
		for (var i=0; i<day.times.length; ++i) {
			$scope.times.push($filter('date')(day.times[i], 'h:mma'));
		}
	}
	
	$scope.okClick = function (day) {
		try {
			blah(day);
			var _id = day._id;						// $save is going to delete ._id
													//  so save _id (might be undefined if new)
			day.$save().then(function(data) {		// create or update
				if (angular.isDefined(data._id)) {	// data._id is defined after a create
					day._id = data._id;
				} else {							// data._id is undefined after an update
					day._id = _id;					//  so restore the old _id.
				}
			}, function(error) {
				console.log('error');
				console.log(error);
			});
			editing = false;
			$scope.bumpPendingEdits(-1);
		} catch (e) {
			alert(e);
		}
	}

	function blah(day) {
		var done = false;
		for (var i=0; i<4; ++i) {
			if (!$scope.times[i]) {	// entry is blank
				done = true;
			} else {				// t is non-blank
				if (done) {
					throw "unexpected non-blank item " + i;
				}
			}
		}
		for (var i=4; --i>=0; ){
			if (!$scope.times[i]) {	// entry is blank
				$scope.times.splice(i, 1);
			}
		}
		day.times = [];
		for (var i=0; i<$scope.times.length; ++i) {
			var r = validateTime($scope.times[i]);
			var d = new Date(day.date);
			// d is the Date of the day in question. Needed so that we can create 
			// from the parsed time a Date representing that time on this day.
			d.setHours(r.h);
			d.setMinutes(r.m);
			day.times.push(d);
		}
	}

	function validateTime(t) {
		var result;
		var h;
		var m;
		if (result = /^\s*(\d?\d):?(\d\d)?\s*(([aApP])[mM]?)?\s*$/.exec(t)) {
			h = Number(result[1]);
			m = Number(result[2] || 0);
			ap = result[4] ? result[4].toUpperCase() : null;
			if (h >= 24) {
				throw t + ": invalid hours"
			} else if (ap && h >= 13) {
				throw t + ": invalid hours"
			} else if (m >= 60) {
				throw t + ": invalid minutes"
			}
		} else {
			throw t + ' is not a valid time';
		}
		if (ap === 'P' && h !== 12) {
			h += 12;
		} else if (ap === 'A' && h === 12) {
			h = 0;
		} else {
			if (h < 8 && !ap) {
				h += 12;
			}
		}
		return { h: h, m: m };
	}
	
	$scope.cancelClick = function (day) {
		day.$get();
		editing = false;
		$scope.bumpPendingEdits(-1);
	}
	
}]);
