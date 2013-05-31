node-express-framework
==============

Node-Expressフレームワーク

フォルダ構成
. <- このドメインにおけるドキュメントルート
├── app.js       // node expressの設定　mainの開始
├── modules      // アプリケーション(server)のモジュール(js)を置く場所
├── public		// css 画像などを置く場所
├── routes		// ejsのfunction
└── views		// ejs

■ 主な実装
app(express)の外部化
ioの外部化
ルーティンの自動化

ejsのサンプル ./views/index.ejs ./routes/index.js
	・変数の表示
	・forでリスト表示