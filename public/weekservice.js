angular.module('weekModule', ['resourceModule'])
.factory( 'weekService', ['resourceFactory', function(resourceFactory) {

	var week;
	var data = {};
	var emp_id;
	
	var timeResource = resourceFactory.timeResource;
	
	function getCurrentWeek(id) {
		emp_id = id;
		var today = new Date();
		var day = today.getDay() == 0 ? 6 : today.getDay() - 1;	// 0-6 Sun-Sat -> 0-6 Mon-Sun
		var startOfWeek = addDays(today, -day);
		week = [];
		for (var i=0; i<7; ++i) {
			var d = {
				emp_id: emp_id,
				yyyymmdd: yyyymmdd(addDays(startOfWeek, i))
			};
			d = timeResource.get( d );
			week.push(d);
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
		save: function (index) {
			timeResource.save(data.week[index]);
		},
		get: function (index) {
			data.week[index] = timeResource.get(data.week[index]);
		}
	}
	
	
}]);