var express = require('express');
var router = express.Router();
var mongoskin = require('mongoskin');
/*
 * GET time
 */

/*
router.get('/:yyyymmdd', function(req, res) {
	res.json({msg: 'no emp id'});
});
*/

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
					in1: '??', out1: '??', in2: '??', out2: '??'
				});
			}
		}
	});
});

/*
 * POST to save (create or update) time
 */
router.post('/save', function(req, res) {
    var db = req.db;
	if (req.body._id) {	// update
		var _id = req.body._id;
		console.log(_id);;;
		delete req.body._id;
		db.collection('times').update( { _id: mongoskin.helper.toObjectID(_id)},  req.body, 
			function ( err, result ) {
				res.send( err === null ? { msg: 'updated!' } : { msg: err + '??' } );
			}
		);
	} else {			// create
		db.collection('times').insert(req.body, function(err, result){
			res.send(
				(err === null) ? { msg: 'created!' } : { msg: err }
			);
		});
	}
});


module.exports = router;
