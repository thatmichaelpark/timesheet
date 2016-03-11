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
		data.weeklyTotal = 0;
		
		var j = -day + offset * 7;
		for (var i=0; i<7; ++i) {
			var d = {
				emp_id: emp_id,
				yyyymmdd: yyyymmdd(addDays(startOfWeek, i))
			};
			d = timeResource.get( d );
			week.push(d);
			
			if (j == 0) {	// today
				d.$promise.then(function (x) {
					todaysEntry = x;
					if (todaysEntry.times.length < 4) {
						data.canClockIn = !(data.canClockOut = (todaysEntry.times.length & 1) !== 0);
					} else {
						data.canClockIn = data.canClockOut = false;
					}
					x.dailyTotal = computeDailyTotal(x.times, true);
				});
			} else {
				d.$promise.then(function (x) {
					x.dailyTotal = computeDailyTotal(x.times, false);
				});
			}
			++j;
		}
		data.week = week;

		function computeDailyTotal(times, today) {
			if (times.length < 2 && !today) {
				return null;
			}
			var t0 = new Date(times[0]);
			var t1 = times[1] ? new Date(times[1]) : new Date();
			var total = t1.getTime() - t0.getTime();
			if (times.length > 2) {
				t0 = new Date(times[2]);
				t1 = times[3] ? new Date(times[3]) : new Date();
				total += t1.getTime() - t0.getTime();
			}
			data.weeklyTotal += total / 1000 / 60 / 60;
			return total / 1000 / 60 / 60;
		}
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
		now.setSeconds(0, 0);
		todaysEntry.times.push(now);
		todaysEntry.$save();
		data.canClockIn = data.canClockOut = false;
	}
	
	function getPayPeriod(now, offset) {
		var start, end;
		var midStart = 16;					// [1..midStart-1], [midStart..eom]
		if (now.getMonth() == 1) {	// February is short
			midStart = 15;
		}
		if (now.getDate() < midStart) {
			start = new Date(now.getFullYear(), now.getMonth(), 1);
			end = new Date(now.getFullYear(), now.getMonth(), midStart - 1);
		} else {
			start = new Date(now.getFullYear(), now.getMonth(), midStart);
			end = new Date(now.getFullYear(), now.getMonth()+1, 0);
		}
		if (offset === 0) {
			data.periodStart = start;
			data.periodEnd = end;
		} else if (offset < 0) {
			getPayPeriod(addDays(start, -1), offset+1);
		} else {	// offset > 0
			getPayPeriod(addDays(end, 1), offset-1);
		}
	}
	
	return {
		data: data,
		getCurrentWeek: getCurrentWeek,
		clockIt: clockIt,
		yyyymmdd: yyyymmdd,
		addDays: addDays,
		getPayPeriod: getPayPeriod
	}
	
	
}]);