# open-iota

> A open source explorer for the IOTA tangle

[open-iota.surge.sh](open-iota.surge.sh)

This web wallet is designed for the IOTA network. It allows the user to access the network safely and securely from any device, the web app connects to a user configurable node and uses it to get all the infomation about the network. At no point will the users seed ever be exposed to the node or any other third party.
   
It is is written in VueJS 2, using single file components, vue-async-computed and no vuex store yet. It builds using webpack and is currently deployed on surge


## So far

Things needed:
* Web wallet format/spec
* Web wallet importing, saving and generation
* Account (via seed) viewing
* Account utils (make tx, reattach, rebroadcast)
* QR code for address
* Guide and explanation page
* News and update page
* Convince public nodes to accept https
* Pre rendering and SEO


## How you can help
* Submit issues + suggestions
* Code new features + improve/fix current ones (pull requests are are very welcome)

## Build Setup

So you want to build it on your own?
1. Clone repo
```
git clone https://github.com/lsquires/open-iota.git
```

2. Install dependecies (in root file)
```
npm install
```

3. Build + deploy on a dev server
```
npm run dev
```

If you want to make a PR make sure it works in the browser, run `npm run build` and the serve the dist/ folder over html (just run `serve dist`)
