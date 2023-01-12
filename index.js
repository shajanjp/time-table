#!/usr/bin/env node
import {readFile} from "fs";
import {colorLog} from "./color.js";

readFile(process.argv[2], 'utf8', (err, data) => {
  if(err) {
    if(err.code === 'ENOENT') {
      console.log("File doesnt exist");
    }
  } else {
    const processed = processFileData(data);
    printToStdout(processed);
  }
});

function processFileData(data) {
  const lines = data.split('\n');
  const tableContent = [];
  let currentEntry = null;

  for(const line of lines) {
    const lineContent = line.trim();
    
    switch(true){
      case (lineContent === ''): {
        break;
      }
            
      case (lineContent.startsWith('#')): {
        let headingLevel = getHeadingLevel(lineContent);

        if(currentEntry) {
          tableContent.push(currentEntry);
        }

        currentEntry = { type: 'heading', level: headingLevel, text: lineContent.substring(headingLevel).trim()};
        
        break;
      }
      
      case (lineContent.startsWith('/')): {
        currentEntry[lineContent.split(' ')[0].substring(1)] = lineContent.split(' ')[1];
        break;
      }

      default: {
        if(currentEntry) {
          tableContent.push(currentEntry);
        }

        currentEntry = { type: 'text', text: lineContent };

        break;
      }
    }
  }

  if(currentEntry) {
    tableContent.push(currentEntry);
  }

  return tableContent;
}

function getHeadingLevel(heading){
  let level = 0;

  for(let i = 0; i< heading.length; i++) {
    if(heading[i] === '#') {
      level++;
    } else {
      break;
    }
  }

  return level;
}

function printToStdout(data) {
  const keyMaxCharMap = data.reduce((acc, obj) => {
    if(obj.type !== 'heading') {
      for (const [key, value] of Object.entries(obj)) {
        if(value.length > (acc[key] || 0) && key !== 'type'){
          acc[key] = value.length;
        }
      };
    }

    return acc;
  }, {});

  for(const { type, ...entry } of data){
    if(type === 'heading') {
      if(entry.level === 1){
        colorLog(`<green>${entry.text}</green>`)
      } else {
        colorLog(`<yellow>${entry.text}</yellow>`)
      }
    } else {
      let row = [];
      for(const [column, size] of Object.entries(keyMaxCharMap)) {
        row.push((entry[column] || '').padEnd(size, ' '));
      }
      console.log(row.join('  '));
      row = [];
    }
  }
}