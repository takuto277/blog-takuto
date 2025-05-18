npm install @heroicons/react
# または
yarn add @heroicons/react 

# Macの場合
sed -i '' 's/"dev": "next dev --turbopack"/"dev": "next dev"/' package.json

# Linuxの場合
sed -i 's/"dev": "next dev --turbopack"/"dev": "next dev"/' package.json 

npx next dev 