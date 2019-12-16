# Order system of no man restaurant(SWR 2019)
## Overview
* menu UI
![](https://i.imgur.com/vDsKYhm.png)
![](https://i.imgur.com/VCSJM01.png)
![](https://i.imgur.com/rfKddOx.png)

* order record
![](https://i.imgur.com/xIri13m.png)
## backstage
![](https://i.imgur.com/lFdYW0X.png)
## 專案結構
* build
* config
* dist `編譯後出現，上機時只需要這個`
* server `後端`
  * model `與資料庫溝通`
  * controller `與前端溝通`
  * routers `由後端控制路由`
    * index.js `後端主程式。控制view首頁路由，但其餘view路由在前端控制`
* src `view(前端)`
  * asset `素材位置`
  * components
      * Layout.vue
  * routers `由前端控制路由`
      * index.js
  * main.js `前端主程式，將App.vue綁定至html。`
  * App.vue `vue進入點`
  * Home.vue
  * Menu.vue 

* static
* test

## 程式結構
![](https://i.imgur.com/jLOHEBg.jpg)

## 如何開始開發?
* 環境設定:
    1. 請先<code>Fork</code>一份repo到自己的github。
    2. 將專案<code>clone</code>到自己的電腦。
    3. 開啟命令列(cmd/terminal)後，cd到這份專案的路徑下。
    4. 輸入<code>  npm i  </code>或是<code>  yarn  </code>。
    5. 輸入` git remote add upstream https://github.com/JiaAnTW/no_man_restaurant.git  `
    6. 輸入` git remote -v `，確認是否有出現:
`upstream  https://github.com/JiaAnTW/no_man_restaurant.git  (fetch)`
`upstream  https://github.com/JiaAnTW/no_man_restaurant.git  (push)`
    7. 每次要開發前，都先執行` git fetch upstream `確認有沒有更新版本。如果有更新到`package.json`，就要執行<code>  npm i  </code>或是<code>  yarn  </code>。

我自己是習慣複製一份從github抓下來的專案到另外一個地方開發，每次要傳github或要更新之前再copy回去。不過這個看個人~


* 如果你是在luffy除錯:
    1. 請打開`package.json`，修改`"script"`底下的`"dev"`改為`"scripts": {
    "dev": "webpack-dev-server --host 0.0.0.0 --public --inline --progress --config build/webpack.dev.conf.js",`
    2. 進入`build`資料夾底下的`webpack.dev.conf.js`，把` devServer:{`前面改為` devServer: {
    clientLogLevel: 'warning',
    disableHostCheck: true,`
    3. 執行`npm start`後，terminal會顯示`locadhost:某數字`，你在自己電腦輸入`http://luffy.ee.ncku.edu.tw:某數字`即可預覽前端結果

* 如果你想開發 **前端** ，請:
    1. 開啟命令列(cmd/terminal)後，cd到這份專案的路徑下。
    2. 在termial直接執行`  npm run serve  `就可以開始開發。
    3. 開啟瀏覽器，在網址輸入`localhost:8080`可以看到結果。

* 如果你想開發 **後端** 或是想要 **測試前端串接後端後的結果** ，請:
    1. (後端請跳過)如果你是想測試前端串接後端後的結果，請執行`  npm run build  `，**確認沒有錯誤訊息後**繼續。
    2. 開啟命令列(cmd/terminal)後，cd到這份專案的路徑下的server資料夾。
    3. 執行`  node index  `就會建立本地端伺服器。
    4. 開啟瀏覽器，在網址輸入`localhost:8081`可以看到結果。
    5. **每次修改**`server` **資料夾內的檔案(也就是後端)** 後，都要先執行ctrl+c中斷伺服器，再回到第3步。

## 完成/暫存開發並上傳至Github

* 如果你是clone我的repo
1. 執行` git pull `確認有沒有更新版本。如果有更新到`package.json`，就要執行<code>  npm i  </code>或是<code>  yarn  </code>。
2. 開啟命令列(cmd/terminal)後，cd到這份專案的路徑下。
3. 如果你**修改過前端，請務必先執行**`  npm run build  `**後**，確認沒有錯誤訊息再繼續。
4. ` git push `

* 如果你是clone你fork的repo
1. 執行` git fetch upstream `確認有沒有更新版本。如果有更新到`package.json`，就要執行<code>  npm i  </code>或是<code>  yarn  </code>。
2. 開啟命令列(cmd/terminal)後，cd到這份專案的路徑下。
3. 如果你**修改過前端，請務必先執行**`  npm run build  `**後**，確認沒有錯誤訊息再繼續。
4. 不要add那該死的 node_module = = ( 原因見下圖 )
5. Push到你的Github之後，到[這裡](https://github.com/JiaAnTW/no_man_restaurant/pulls)來發個Pull Request。
![](https://imgur.com/a/lSuEJVe)




## Coding style
* 函式: 開頭小寫，以大寫分隔。處理事件通常以handle開頭
  範例`const handleClick=()=>{}`
* 變數:?
* 字串: 使用**單上引號**
  範例:`var word='Hello world!'`
* 屬性: 使用**雙上引號**、開頭小寫，以直線分隔
  範例`<div class="num-block" id="second"></div>`
