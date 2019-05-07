git submodule update --init --recursive
cd ../node-red/
git reset --hard a2d03c14ae26a0e53beefa2ba4d07232778f9814
cp ../customizations/settings.js .
cp ../customizations/flows.json .
npm i -S node-red-contrib-cassandra node-red-contrib-users node-red-contrib-web-worldmap node-red-dashboard node-red-node-data-generator
npm install
npm run build
rm .flows.json.backup
