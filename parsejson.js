'use strict';

const fs = require('fs');
const wget = require('wget-improved');
const { exec } = require('child_process');
const execSync = require('child_process').execSync;


var files = fs.readdirSync('resources/');

let idMap = {};

var args = process.argv.slice(2);

files.forEach(file => {
  let rawdata = fs.readFileSync('resources/'+ file);
  let dataJson = JSON.parse(rawdata);
  let assets = dataJson['assets'];

  assets.forEach(asset => {
    let id = asset['id'];
    let url = asset['url-4K-SDR'];
    if('url-4K-SDR' in asset && !(id in idMap)) {
      let newname = `${id}.mov`
      idMap[id] = url;

      var filename = url.substring(url.lastIndexOf('/')+1);
      console.log(`${filename} -> ${newname}`)

      //rename files
      let dir = `${args[0]}`
      execSync(`mv ${filename} ${newname}`,{cwd: dir}, (err, stdout, stderr) => {
        if (err) {
          //some err occurred
          console.error(err)
        } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        }
      })

    }

  })
})

fs.writeFile('out.json', JSON.stringify(idMap, null, 2), (err) => { 
      
  // In case of a error throw err. 
  if (err) throw err; 
}) 
