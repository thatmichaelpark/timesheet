var express = require('express');
var router = express.Router();
var mongoskin = require('mongoskin');
/*
 * GET time
 */

router.get('/', function(req, res) {
	var db = req.db;
	db.collection('times')
		.find({}).toArray(function (err, items) {
		if (err) {
			res.status(400).json({msg: err.code});;;
		} else {
		console.log(items);;;
			res.json(items);
		}
	})
});


router.get('/:emp_id/:yyyymmdd', function(req, res) {
	var db = req.db;
	db.collection('times')
		.findOne({emp_id: req.params.emp_id, yyyymmdd: req.params.yyyymmdd}, function (err, result) {
		if (err) {
			res.status(400).json({msg: err.code});;;
		} else {
			if (result) {
				res.json(result);
			} else {
				var yyyy = req.params.yyyymmdd.substring(0, 4);
				var mm = Number(req.params.yyyymmdd.substring(4, 6))-1;
				var dd = req.params.yyyymmdd.substring(6, 8);
				var date = new Date(yyyy, mm, dd);
				res.json({
					emp_id: req.params.emp_id,
					yyyymmdd: req.params.yyyymmdd,
					date: date,
					times: []
				});
			}
		}
	});
});

router.get('/:emp_id/:yyyymmdd0/:yyyymmdd1', function(req, res) {
	var db = req.db;
	console.log(req.params.yyyymmdd0);;;
	console.log(req.params.yyyymmdd1);;;
	
	db.collection('times')
		.find({ $and: [{ emp_id: req.params.emp_id },
						{ yyyymmdd: { $gte: req.params.yyyymmdd0}},
						{ yyyymmdd: { $lte: req.params.yyyymmdd1}}]}).toArray(function (err, items) {
		if (err) {
			res.status(400).json({msg: err.code});;;
		} else {
		console.log(items);;;
			res.json(items);
		}
	})
});

/*
 * POST to save (create or update) time
 */
router.post('/save', function(req, res) {
    var db = req.db;
	if (req.body._id) {	// update
		var _id = req.body._id;
		delete req.body._id;
		db.collection('times').update( { _id: mongoskin.helper.toObjectID(_id)},  req.body, 
			function ( err, result ) {
				res.send( err === null ? req.body : { msg: err + '??' } );
			}
		);
	} else {			// create
		db.collection('times').insert(req.body, function(err, result){
			res.send(
				(err === null) ? req.body : { msg: err }
			);
		});
	}
});


module.exports = router;
