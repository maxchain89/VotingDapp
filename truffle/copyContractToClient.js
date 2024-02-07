const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, './build/contracts/VotingSystem.json');
const destPath = path.join(__dirname, '../client/src/contracts/VotingSystem.json');

fs.copyFileSync(srcPath, destPath);
console.log('Contract ABI copied to client application.');
