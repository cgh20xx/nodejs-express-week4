# nodejs-express-week4
- 接續上一週程式
- 整合 user model，只做後端 API
- 設計篩選功能(從新到舊貼文、從舊到新、關鍵字搜尋)


## 安裝專案
```
$ git clone git@github.com:cgh20xx/nodejs-express-week4.git
$ cd nodejs-express-week4
$ npm install
```

## 啟動專案
```
$ npm start
```

# Heroku 相關設定(重要)
- server.js 裡面 server 偵聽的 port 需先使用系統環境變數 process.env.PORT
- 需在 package.json 裡面新增 script start 以及 engines (可指定node版本)
```json
{
  "scripts": {
    "start": "node ./bin/www",
  },
  "engines": {
    "node": "16.x"
  }
}
```
## 全域安裝 Heroku CLI (若沒裝過才裝)
```
$ npm install -g heroku
```

## 登入 Heroku
```
$ heroku login
```
## 在 Heroku 建立此專案的雲端主機
```
$ heroku create <herokud的次網域名稱>
```

## 佈署到 Heroku 遠端數據庫
專案若要更新到 Heroku，就要執行此命令。
```
$ git push heroku main 
```

## 到 Heroku 該專案下設定環境變數
到 Settings -> Config Vars 設定資料庫連線字串和密碼 (DB_CONN、DB_PASSWORD)
不用設定 PORT (Heroku 已內建)

## 在瀏覽器打開此專案的 Heroku 網址
```
$ heroku open
```