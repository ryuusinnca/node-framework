// WebSocketサーバに接続
var ws = new WebSocket('ws://localhost:8888/');
//var ws = new WebSocket('ws://node_framework-c9-ryuusinnca.c9.io/');

jQuery(function($) {
	"use strict";
	//socket.ioのサーバにに接続
	var socket = io.connect('http://'+location.host+'/');
	//var socket = io.connect('https://is1a-test-nodejs01.pixely.jp/');

	
	//サーバからmessageイベントが送信された時
	socket.on('message',function(data){
		$('#list').prepend($('<div/>').text(data));
	});

	
	
	ws.onmessage = function(event) {
		console.log('onmessage'+event)
	  // 受信したメッセージを復元
	  var data = JSON.parse(event.data);
	  $('#list').prepend($('<div/>').text(data.text));
	};



	//sendボタンがクリックされた時
	$('#send').click(function(){
		var text = $('#input').val();
		if(text !== ''){
			//サーバにテキストを送信
			//socket.emit('message',{text:text});
			
			ws.send(JSON.stringify({
		      text:text
		    }));
		    
			$('#list').prepend($('<div/>').text(text));
			$('#input').val('');
			//location.href = '/';
		}
	});
});