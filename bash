npm install @heroicons/react
# または
yarn add @heroicons/react 

# Macの場合
sed -i '' 's/"dev": "next dev --turbopack"/"dev": "next dev"/' package.json

# Linuxの場合
sed -i 's/"dev": "next dev --turbopack"/"dev": "next dev"/' package.json 

npx next dev 

# node_modulesフォルダを削除
rm -rf node_modules

# package-lock.jsonを削除
rm package-lock.json

# 依存関係を再インストール
npm install next@14.1.0 react@18.2.0 react-dom@18.2.0 @next/mdx@14.1.0

# その他の依存関係を再インストール
npm install 

npm run build 

git add .
git commit -m "Downgrade Next.js and React to stable versions"
git push 