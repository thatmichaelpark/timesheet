angular.module('weekModule', ['resourceModule'])
.factory( 'weekService', ['resourceFactory', function(resourceFactory) {

	var week;
	var data = {};
	var emp_id;
	
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
				d.$promise.then(function (x) {console.log(x);
					data.canCheckIn = false;
					data.canCheckOut = false;
					if (x.out2 !== '') {
						// nada
					} else if (x.in2 !== '') {
						data.canCheckOut = true;
					} else if (x.out1 !== '') {
						data.canCheckIn = true;
					} else if (x.in1 !== '') {
						data.canCheckOut = true;
					} else {
						data.canCheckIn = true;
					}
				});;;
			}
			++j;
		}
		data.week = week;
	}
	
	function yyyymmdd(d) {
		return d.getFullYear() + twoDigit(d.getMonth()+1) + twoDigit(d.getDate());
		
		function twoDigit(n) {
			return (n < 10 ? '0' : '') + n;
		}
	}
	function addDays(date, days) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
	}

	return {
		data: data,
		getCurrentWeek: getCurrentWeek,
	}
	
	
}]);