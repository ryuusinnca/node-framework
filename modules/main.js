// モジュール読み込み
var app = module.parent.exports.app   // app=express 先にapp.jsで実体を作っておく必要がある
  , io = app.get('io');               // commonをrequireする前にapp.setでioを登録する必要あり

//
// 更新処理
//
exports.update = function(){
	console.log("update");

	//クライアントから接続があった時
	io.sockets.on('connection',function(socket){
		//クライアントからmessageイベントが受信した時
		socket.on('message',function(data){
			//念のためdataの値が正しいかチェック
			if(data && typeof data.text === 'string'){
				//メッセージを投げたクライアント以外全てのクライアントにメッセージを送信する。
				socket.broadcast.json.emit('message',{text:data.text});
			}
		});
	});
};