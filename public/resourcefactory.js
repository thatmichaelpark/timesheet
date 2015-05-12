//var baseUrl = 'http://localhost/';
var baseUrl = 'http://10.0.20.101/';
angular.module('resourceModule', ['ngResource'])
.constant( 'baseEmployeeUrl', baseUrl + 'employee/' )
.constant( 'baseTimeUrl', baseUrl + 'times/' )

.factory( 'resourceFactory', function ( $resource, baseTimeUrl, baseEmployeeUrl ) {
	return {
		timeResource: $resource( baseTimeUrl, {emp_id: '@emp_id', yyyymmdd: '@yyyymmdd', yyyymmdd0: '@yyyymmdd0', yyyymmdd1: '@yyyymmdd1'},
			{
				get: { method : 'GET', url : baseTimeUrl + ':emp_id/:yyyymmdd' },
				getRange: { method: 'GET', url: baseTimeUrl + ':emp_id/:yyyymmdd0/:yyyymmdd1', isArray: true },
				save: { method : 'POST', url : baseTimeUrl + 'save/' }
			}
		),
		employeeResource: $resource(baseEmployeeUrl, {_id: '@_id', pin: '@pin'},
			{
				get: { method : 'GET', url : baseEmployeeUrl + '/:_id' },
				getbypin: { method : 'GET', url : baseEmployeeUrl + 'bypin/:pin' },
				getActive: { method : 'GET', url : baseEmployeeUrl + 'active/', isArray: true },
				add: { method : 'POST', url : baseEmployeeUrl + 'add/' },
				update: { method : 'PUT', url : baseEmployeeUrl + 'update/:_id' }
			}
		)
	}
});
