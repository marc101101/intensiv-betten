"use strict";

const fs = require("fs");
var HTMLParser = require("node-html-parser");

var filename = "test";

let rawdata = fs.readFileSync(filename + ".html", "utf8");

const root = HTMLParser.parse(rawdata);

function getStatus(element) {
  let status = element.childNodes[1].classNames[0];

  if (status.includes("red")) {
    return "red";
  }
  if (status.includes("green")) {
    return "green";
  }
  if (status.includes("yellow")) {
    return "yellow";
  }
  return undefined;
}

function extractData(htmlElement) {
  let root_data = [];
  root.querySelectorAll(htmlElement).forEach(element => {
    let data = {
      hospital: element.childNodes[1].structuredText.replace(
        /(\r\n|\n|\r)/gm,
        ", "
      ),
      contact: element.childNodes[3].structuredText
        .replace(/(\r\n|\n|\r)/gm, " ")
        .replace("wesbite", ""),
      fed: element.childNodes[5].structuredText,
      icu_low_care: getStatus(element.childNodes[7]),
      icu_high_care: getStatus(element.childNodes[9]),
      ecmo: getStatus(element.childNodes[11]),
      updated: element.childNodes[13].structuredText.replace(
        /(\r\n|\n|\r)/gm,
        ", "
      )
    };
    root_data.push(data);
  });
  return root_data;
}

console.log(extractData(".row0").length);
console.log(extractData(".row1"));
