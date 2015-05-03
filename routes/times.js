var express = require('express');
var router = express.Router();

/*
 * GET time
 */
 
router.get('/:emp_id/:date', function(req, res) {
	var db = req.db;
	console.log(req.params.emp_id);;;
	console.log(require('util').inspect(req.params.date));;;
	
	db.collection('times').findOne({emp_id: (req.params.emp_id)}, function (err, result) {
		if (err) {
			console.log(err);;;
			res.status(400).json({msg: err.code});;;
		} else {
			res.json(result);
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
    db.collection('times').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


module.exports = router;
