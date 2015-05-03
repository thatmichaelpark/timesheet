var express = require('express');
var router = express.Router();

/*
 * GET time
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
 * PUT to update time.
 */
router.put('/update/:id', function( req, res ) {
	console.log(req.body);;;
	var db = req.db;
	var _id = req.params.id;
	delete req.body._id;
	db.collection( 'times' ).update( { _id: mongoskin.helper.toObjectID(req.params.id)},  req.body, function ( err, result ) {
		res.send( err === null ? { msg: 'success!' } : { msg: err + '??' } );
	});
});

/*
 * POST to add time
 */
router.post('/add', function(req, res) {
    var db = req.db;
	console.log(req.body);;;

    db.collection('times').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });

});


module.exports = router;
