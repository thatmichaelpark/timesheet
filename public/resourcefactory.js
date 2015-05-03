var baseUrl = 'http://localhost/';
adminApp.constant( 'baseEmployeeUrl', baseUrl + 'employee/' );
adminApp.constant( 'baseTimeUrl', baseUrl + 'times/' );

adminApp.factory( 'resourceFactory', function ( $resource, baseTimeUrl ) {
	return {
		timeResource: $resource( baseTimeUrl + ':yyyymmdd', {/* emp_id: '@emp_id' */},
			{
				get: { method : 'GET', url : baseTimeUrl + ':emp_id/:yyyymmdd' },
				add: { method : 'POST', url : baseTimeUrl + 'add/:emp_id/:yyyymmdd' },
				save: { method : 'PUT', url : baseTimeUrl + 'update/:emp_id/:yyyymmdd' }
			}
		)
	}
});
