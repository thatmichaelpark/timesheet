var express = require('express');
var router = express.Router();
var jf = require('jsonfile');
var util = require('util');
var mongoskin = require('mongoskin');

/* GET employees. */

router.get('/', function(req, res) {
	var db = req.db;
	db.collection('employees').find().toArray(function (err, items) {
		if (err) {
			console.log(err);;;
			res.status(400).json({msg: err.code});;;
		} else {
			res.json(items);
		}
	});
});

router.get('/:id', function(req, res) {
	var db = req.db;
	db.collection('employees').findOne({_id: mongoskin.helper.toObjectID(req.params.id)}, function (err, result) {
		if (err) {
			console.log(err);;;
			res.status(400).json({msg: err.code});;;
		} else {
			res.json(result);
		}
	});
});

/*
 * PUT to update employee.
 */
router.put('/update/:id', function( req, res ) {
	console.log(req.body);;;
	var db = req.db;
	var _id = req.params.id;
	delete req.body._id;
	db.collection( 'employees' ).update( { _id: mongoskin.helper.toObjectID(req.params.id)},  req.body, function ( err, result ) {
		res.send( err === null ? { msg: 'success!' } : { msg: err + '??' } );
	});
});

/*
 * POST to add employee
 */
router.post('/add', function(req, res) {
    var db = req.db;
    db.collection('employees').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});



module.exports = router;
