"use strict";
var express = require('express')
  , http = require('http')
  , path = require('path');

// 別ファイルのイベントハンドラからappオブジェクトにアクセスする
var app = module.exports.app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// サーバー作成
var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


// websocketサーバー作成
var ws = require('websocket.io');
var wsserver = ws.listen(8888, function(){
  console.log("Websocket.io server listening on port " + 8888);
});

app.set('wsserver', wsserver);

//socket.ioのインスタンス作成
//var io = require('socket.io').listen(server);

var io = require('socket.io').listen(
  server
  ,{ key : 'ryuusinnca'
    ,cert : 'hogehoge1234' });
app.set('io', io);

// mysqlのインスタンス作成
var mysql = require('mysql').createConnection({
  host: 'localhost',
  database: 'c9',
  user: 'ryuusinnca',
  password: ''
});
app.set('mysql', mysql);


// ルーティンの自動登録
var common_module = require('./modules/common')
  , common = new common_module()
  , routes_dir = path.resolve(__dirname + '/routes');
common.map_routes(routes_dir);

// libの読み込み
// ./modules/server内全てのjsをresuireする
// app(express)を読み込めるようにするため
//common.require_of_all_js('./modules/lib');


// メインの開始
var main = require('./modules/main.js');
main.update();
