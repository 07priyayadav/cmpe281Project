# Application Server (node-red) setup instructions
  - update submodules for the main (_cmpe281Project_) repo with: `git submodule update --init`
  - `cd` into `<root>/application-server/node-red/` directory
  - (assuming `nodejs` and `npm` are pre-installed) run `npm install && npm run build`
  - run the application server (node-red) with: `node red.js --settings settings.js`
