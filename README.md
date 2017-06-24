# node-express-framework

## Node-Expressフレームワーク</br>

フォルダ構成</br>
. <- このドメインにおけるドキュメントルート</br>
├── app.js       // node expressの設定　mainの開始</br>
├── modules      // アプリケーション(server)のモジュール(js)を置く場所</br>
├── public		// css 画像などを置く場所</br>
├── routes		// ejsのfunction</br>
└── views		// ejs</br>

# ■ 主な実装</br>
app(express)の外部化</br>
ioの外部化</br>
ルーティンの自動化</br>

ejsのサンプル ./views/index.ejs ./routes/index.js</br>
	・変数の表示</br>
	・forでリスト表示</br>

# ● node_moduleの設定方法
下記コマンドをたたく</br>
npm install [module name]</br>

module kind</br>
・express</br>
・ejs</br>
・socket.io</br>
・mysql</br>
