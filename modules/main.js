// モジュール読み込み
var app = module.parent.exports.app   // app=express 先にapp.jsで実体を作っておく必要がある
  , io = app.get('io')               // commonをrequireする前にapp.setでioを登録する必要あり
  , server = app.get('wsserver')
  , mysql = app.get('mysql');



var query = mysql.query('select * from mst_users;', function (err, results) {
  console.log('--- results ---');
  console.log(results);
  console.log('name is ...');
  //console.log(results[0].name);
});

//
// 更新処理
//
/*
exports.update = function(){
	console.log("update");

	//クライアントから接続があった時
	io.sockets.on('connection',function(socket){
		//クライアントからmessageイベントが受信した時
		socket.on('message',function(data){
			console.log("get message:"+data);

			//念のためdataの値が正しいかチェック
			if(data && typeof data.text === 'string'){
				//メッセージを投げたクライアント以外全てのクライアントにメッセージを送信する。
				socket.broadcast.json.emit('message',{text:data.text});
			}
		});


		socket.on('login',function(data){
			console.log("get message:"+data);

			//念のためdataの値が正しいかチェック
			if(data && typeof data.text === 'string'){
				//メッセージを投げたクライアント以外全てのクライアントにメッセージを送信する。
				socket.broadcast.json.emit('message',{text:data.text});
			}
		});
	});
};
*/

exports.update = function(){
	// クライアントからの接続イベントを処理
	server.on('connection', function(socket) {
	  // クライアントからのメッセージ受信イベントを処理
	  socket.on('message', function(data) {
	  	console.log(data);
	  	/*
	    // 実行時間を追加
	    var data = JSON.parse(data);
	    var d = new Date();
	    data.time = d.getFullYear()  + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	    data = JSON.stringify(data);
	    console.log('\033[96m' + data + '\033[39m');
	    */
	    // 受信したメッセージを全てのクライアントに送信する
	    server.clients.forEach(function(client) {
	      client.send(data);
	    });
	  });
	});
};


