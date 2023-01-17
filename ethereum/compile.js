const path = require('path');
const solc = require('solc');   
//fs library gives access to our file system modules on our system
const fs = require('fs-extra');

// puts build directory to buildPath --> __dirname referes to current directory.
const buildPath = path.resolve(__dirname, 'build');
//removes the entire folder:
fs.removeSync(buildPath);

//Read 'campaign.sol' file from 'contracts' folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

//Compile both contracts with solidity compiler
const output = solc.compile(source, 1).contracts;   //output contains 2 contracats now
//makes sure 'build' directory is created, if not it creates it.
fs.ensureDirSync(buildPath);

console.log(output);
for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]
    );
}