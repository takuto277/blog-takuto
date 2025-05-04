FROM node:18-alpine

WORKDIR /app

# 依存関係のインストール
COPY package.json package-lock.json* ./
RUN npm ci

# アプリケーションのコピー
COPY . .

# 開発サーバーのポート
EXPOSE 3000

# 開発モードで起動
CMD ["npm", "run", "dev"]
