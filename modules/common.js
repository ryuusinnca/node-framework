// モジュール読み込み
var fs = require('fs')
  , path = require('path')
  , app = module.parent.exports.app   // app=express 先にapp.jsで実体を作っておく必要がある
  , io = app.get('io');               // commonをrequireする前にapp.setでioを登録する必要あり

var common = function(){};
//
// ルーティングの自動登録
//
common.prototype.map_routes = function(dir,path) {
  // デフォルト引数
  if(typeof path === 'undefined') path = "";
  // ディレクトリ内のオブジェクト名を取得
  var files = fs.readdirSync(dir);
  // foreach で順番に取得
  files.forEach(function(e){
    // 拡張子を取得
    var ext = e.substr(e.lastIndexOf('.'), e.length);
    // パスのバッファ
    var _e = e;
    // オブジェクトパス
    e = dir + '/' + e;
    // フォルダかファイルかを判別
    var stats = fs.statSync(e);
    // フォルダかどうか（フォルダ名が.jsついていた場合の対策）
    if(stats.isDirectory()){
      // フォルダならファイル（js）にあたるまで再起呼び出しをする
      common.prototype.map_routes(e,path+_e+"/");  // リカーシブコール
    }
    // 拡張子が.jsのファイルを読み込み
    else if(ext === '.js'){
      // 相対パスを取得
      var url_path=path;
      // モジュールの取得
      var handler = require(e)
      // app(express)にモジュールから取得したメソッドを登録
      for(var f in handler){
        //console.log(f);
        switch(f){
          case 'index':
            app.get('/'+url_path, handler[f]);
            app.get('/'+url_path+f, handler[f]);
            break;
          default:
            app.get('/'+url_path+ f, handler[f]);
        }
      }// for
    } // if
  }); // foreach
};  // map_routes

//
// 指定したディレクトリ内全てのjsをrequireする
//
common.prototype.require_of_all_js = function(dir,path) {
  if(typeof path === 'undefined') path = "";  // デフォルト引数
  var files = fs.readdirSync(dir);  // ディレクトリ内のオブジェクト名を取得
  files.forEach(function(e){  // foreach で順番に取得
    var ext = e.substr(e.lastIndexOf('.'), e.length); // 拡張子を取得
    var _e = e; // パスのバッファ
    e = dir + '/' + e;  // オブジェクトパス
    var stats = fs.statSync(e); // フォルダかファイルかを判別
    if(stats.isDirectory()){  // フォルダかどうか（フォルダ名が.jsついていた場合の対策）
      common.prototype.map_routes(e,path+_e+"/");  // リカーシブコール  // フォルダならファイル（js）にあたるまで再起呼び出しをする
    }
    else if(ext === '.js'){ // 拡張子が.jsのファイルを読み込み
      var url_path=path;  // 相対パスを取得
      require(e);
    } // if
  }); // foreach
};  // map_routes


//
// エクスポート
//
module.exports = common;