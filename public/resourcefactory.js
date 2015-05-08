var baseUrl = 'http://localhost/';
angular.module('resourceModule', ['ngResource'])
.constant( 'baseEmployeeUrl', baseUrl + 'employee/' )
.constant( 'baseTimeUrl', baseUrl + 'times/' )

.factory( 'resourceFactory', function ( $resource, baseTimeUrl, baseEmployeeUrl ) {
	return {
		timeResource: $resource( baseTimeUrl, {emp_id: '@emp_id', yyyymmdd: '@yyyymmdd'},
			{
				get: { method : 'GET', url : baseTimeUrl + ':emp_id/:yyyymmdd' },
				save: { method : 'POST', url : baseTimeUrl + 'save/' }
			}
		),
		employeeResource: $resource(baseEmployeeUrl, {_id: '@_id', pin: '@pin'},
			{
				get: { method : 'GET', url : baseEmployeeUrl + '/:_id' },
				getbypin: { method : 'GET', url : baseEmployeeUrl + 'bypin/:pin' },
				active: { method : 'GET', url : baseEmployeeUrl + 'active/' },
				add: { method : 'POST', url : baseEmployeeUrl + 'add/' },
				update: { method : 'PUT', url : baseEmployeeUrl + 'update/:_id' }
			}
		)
	}
});
