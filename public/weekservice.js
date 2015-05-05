angular.module('weekModule', ['resourceModule'])
.factory( 'weekService', ['resourceFactory', function(resourceFactory) {

	var week;
	var data = {};
	var emp_id;
	var todaysEntry;
	
	var timeResource = resourceFactory.timeResource;
	
	function getCurrentWeek(id, offset) {
		emp_id = id;
		var today = new Date();
		var day = today.getDay() == 0 ? 6 : today.getDay() - 1;	// 0-6 Sun-Sat -> 0-6 Mon-Sun
		var startOfWeek = addDays(today, -day + offset * 7);
		week = [];
		var j = -day + offset * 7;
		for (var i=0; i<7; ++i) {
			var d = {
				emp_id: emp_id,
				yyyymmdd: yyyymmdd(addDays(startOfWeek, i))
			};
			d = timeResource.get( d );
			week.push(d);
			
			if (j == 0) {
				d.$promise.then(function (x) {
					todaysEntry = x;
					if (todaysEntry.times.length < 4) {
						data.canClockIn = !(data.canClockOut = (todaysEntry.times.length & 1) !== 0);
					} else {
						data.canClockIn = data.canClockOut = false;
					}
				});;;
			}
			++j;
		}
		data.week = week;
	}
	
	function yyyymmdd(d) {
		return d.getFullYear() + twoDigit(d.getMonth()+1) + twoDigit(d.getDate());
		
	}
	function twoDigit(n) {
		return (n < 10 ? '0' : '') + n;
	}
	function addDays(date, days) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
	}

	function clockIt() {
		var now = new Date(Date.now() + 30 * 1000);	// add 30s to round to nearest minute
		todaysEntry.times.push(twoDigit(now.getHours())+':'+twoDigit(now.getMinutes()));
		todaysEntry.$save();
		data.canClockIn = data.canClockOut = false;
	}
	
	return {
		data: data,
		getCurrentWeek: getCurrentWeek,
		clockIt: clockIt
	}
	
	
}]);