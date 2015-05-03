var baseUrl = 'http://localhost/';
adminApp.constant( 'baseEmployeeUrl', baseUrl + 'employee/' );
adminApp.constant( 'baseTimeUrl', baseUrl + 'times/' );

adminApp.factory( 'resourceFactory', function ( $resource, baseTimeUrl ) {
	return {
		timeResource: $resource( baseTimeUrl + ':emp_id/:yyyymmdd', {emp_id: '@emp_id'},
			{
				get: { method : 'GET', url : baseTimeUrl + ':emp_id/:yyyymmdd' },
				save: { method : 'POST', url : baseTimeUrl + 'save/' }
			}
		)
	}
});
