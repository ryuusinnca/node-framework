
/*
 * GET home page.
 */

exports.hoge = function(req, res){
	res.render('index', { title: 'Express' });
};

exports.hoge1 = function(req, res){
	res.render('game', { title: 'Express' });
};

exports.hoge2 = function(req, res){
	res.render('index', { title: 'Express' });
};