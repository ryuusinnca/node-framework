
/*
 * GET home page.

 ejs.render( テンプレートデータ , オプション );
 	第１引数――レンダリングする対象データ（＝読み込んだテンプレートの文字列）を指定します。
	第２引数――テンプレートに渡す変数などの情報を連想配列にまとめたものを指定します。
 */

exports.index = function(req, res){
	res.render('index', {
	 title: 'indexタイトル',
	 supplies: ['mop', 'broom', 'duster']
	});
};

exports.index1 = function(req, res){
	res.render('game', { title: 'Express' });
};

exports.index2 = function(req, res){
	res.render('index', { title: 'Express' });
};