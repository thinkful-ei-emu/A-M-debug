const fs = require('fs');
const path = require('path');

const source = process.argv[2];
const target = process.argv[3];

// read contents of source
const contentsOfSource = fs.readFileSync(source, 'utf-8');

// get lines of source into an array, remove empty lines
const linesInSource = contentsOfSource.split('\n').filter(Boolean);

// make the target dir if it doesn't exist
if (!fs.existsSync(target)) {
  fs.mkdirSync(target);
}

// iterare over the lines
linesInSource.forEach(line => {
  // get the content of the lines, first word is a filename, rest is content
  const [ filename, ...contentArr ] = line.split(' ');

  const arr = contentArr.join(' ');
  // construct the full path for the file to create
  const newFilePath = path.join(__dirname, target, filename);

  // write the file and it's contents
  fs.writeFileSync(
    newFilePath,
    arr,
    //contentArr,
    { flag: 'w+', encoding: 'utf-8' }
  );
});