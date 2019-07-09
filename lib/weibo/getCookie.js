// import path from "path";
// import fs from "fs";
const path = require("path");
const fs = require("fs");
const log = console.log;
// import { error, success } from "./../util/log";
let defaultPath = "./preset/cookie/weiboCookie.txt";

const getCookie = function(cookiePath = defaultPath) {
  let fileName = path.basename(cookiePath);
  let dirName = path.dirname(cookiePath);
  // log(fileName);
  // log(dirName);
  fs.access(dirName, err => {
    if (err) log(err);
    else {
      fs.access(fileName, err => {
        if (err) {
          writeCookie(cookiePath);
        } else {
          fs.readFile(cookiePath, (err, data) => {
            if (err) {
              log(err);
            } else if (checkCookieValid(data)) {
              return data;
            } else {
              writeCookie(cookiePath);
            }
          });
        }
      });
    }
  });
};

const checkCookieValid = function(data) {
  return Boolean(data);
};

const approachCookie = function() {
  return new Promise(resolve => {
    resolve();
  }).then(() => {
    return "cookie";
  });
};

const writeCookie = function(_path) {
  approachCookie()
    .then(data => {
      fs.writeFile(_path, data, err => {
        if (err) log(err);
        else {
          // success("write cookie!");
          log("write cookie!");
          return data;
        }
      });
    })
    .catch(() => {
      log("approach cookie fail");
      // error("approach cookie fail");
    });
};

module.exports = getCookie;
