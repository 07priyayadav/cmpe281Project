cd ../node-red/
cp ../customizations/settings.js .
cp ../customizations/flows.json .
npm i -S node-red-contrib-cassandra node-red-contrib-users node-red-contrib-web-worldmap node-red-dashboard node-red-node-data-generator
npm install
npm run build
rm .flows.json.backup
