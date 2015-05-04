var baseUrl = 'http://localhost/';
angular.module('resourceModule', ['ngResource'])
.constant( 'baseEmployeeUrl', baseUrl + 'employee/' )
.constant( 'baseTimeUrl', baseUrl + 'times/' )

.factory( 'resourceFactory', function ( $resource, baseTimeUrl ) {
	return {
		timeResource: $resource( baseTimeUrl, {},
			{
				get: { method : 'GET', url : baseTimeUrl + ':emp_id/:yyyymmdd' },
				save: { method : 'POST', url : baseTimeUrl + 'save/' }
			}
		)
	}
});
