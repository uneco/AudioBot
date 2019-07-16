# Discord Audio Player

## 使い方

### モジュールをインストール

```shell
npm install
```

or

```shell
yarn install
```

### 開発環境用にnodemonを入れると楽かも

```shell
npm install --save nodemon
```

or 

```shell
yarn global add nodemon
```

### コンフィグファイルを作る

```javascript
export default {
  token: "YOUR-BOT-TOKEN",
  niconico: {
    email: "YOUR-EMAIL",
    password: "YOUR-PASSWORD"
  }
}
```

### ビルド

```shell
npm run build
```

or 

```shell
yarn build
```

### run bot

```shell
node dist/app.js
```

おわり
