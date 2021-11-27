const { exec } = require('child_process');
const fs = require('fs-extra');
const prompt = require('prompt');
init();//begin the creation process

function init() {
    if(!fs.existsSync('./apps'))//if folder "apps" does not exist, create it. 
        fs.mkdirSync('./apps');
    prompt.start();
    prompt.get(['app_name', 'app_description', 'version', 'author'], (err, result) => {
        if(err) 
            return console.log(err);
        const name = result.app_name || ('UNTITLEDx' + Math.floor(Math.random()*255));
        makeFiles(name, result);
    });
}

function makeFiles(name, result) {
    fs.mkdirSync(`./apps/${name}`);//make app folder
    fs.writeFileSync(`./apps/${name}/package.json`, 
        JSON.stringify({//make package.json file
            "version": (result.version || "1.0.0"),
            "name": name,
            "app-name": name,
            "package-name": "webview",
            "project-type": "webview",
            "icon": "./assets/icon/icon.png",
            "dist-path": "./",
            "permission": [
        	 "android.permission.INTERNET"
    	    ],
            "description": (result.app_description || "-"),
            "main": "main.js",
            "scripts": {
                "start:dev": "node .",
                "build": "androidjs build"
            },
            "author": (result.app_author || '-'),
            "license": "ISC",
            "dependencies": {
                "androidjs": "^2.0.2"
            },
            "project-name": name,
            "theme": {
                "fullScreen": true
            }
        }, null, 2)
    );
    fs.copySync('./assets/node_modules', `./apps/${name}/node_modules`);//copy the modules
    fs.copySync('./assets/package-lock.json', `./apps/${name}/package-lock.json`);//copy package-lock.json file
    fs.writeFileSync(`./apps/${name}/main.js`, `const back = require('androidjs').back; // important line of code, do not remove`);//make backend node file
    fs.copySync('./assets/views', `./apps/${name}/views`);//copy main app page folder
    fs.copySync('./assets/assets', `./apps/${name}/assets`);//copy the assets folder
    console.log('--------------------------------------------------------------');
    console.log('---------------------APP CREATED!-----------------------------');
    console.log('-----------RUN "androidjs build" to build the app-------------');
    console.log('--------------------------------------------------------------');
    exec(`cd ./apps/${name}`, (err) => {
        if(err)
            return;
        exec(`code .`);
    });
}
