import * as fs from 'fs';

console.log('Checking tsconfig.build.json...');
const config = fs.readFileSync('./tsconfig.build.json', 'utf-8');
console.log(config);
