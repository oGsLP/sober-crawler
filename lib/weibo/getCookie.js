// import path from "path";
// import fs from "fs";
const fs = require("fs");
const log = console.log;
const { Builder, By } = require("selenium-webdriver");
const readPreset = require("./../util/readPreset");
const sleep = require("./../util/func");
// import { error, success } from "./../util/log";
const weiboUrl = "https://weibo.com/";
const defaultPath = "./preset/cookie/weiboCookie.txt";

const getCookie = function(cookiePath = defaultPath) {
  // log(fileName);
  // log(dirName);
  let cookie = "dsad";
  try {
    fs.accessSync(cookiePath);
    let data = fs.readFileSync(cookiePath, "utf8");
    if (checkCookieValid(data)) {
      cookie = data;
    } else cookie = writeCookie(cookiePath);
  } catch (err) {
    cookie = writeCookie(cookiePath);
  }

  return cookie;
};

const checkCookieValid = function(data) {
  return !data;
};

const approachCookie = function() {
  // eslint-disable-next-line func-names
  let [username, password] = [
    readPreset("weibo").username,
    readPreset("weibo").password
  ];
  // eslint-disable-next-line func-names
  async function getCookieByDriver(username, password) {
    let driver = await new Builder().forBrowser("chrome").build();
    // eslint-disable-next-line no-unused-vars
    let Cookie = "";
    try {
      await driver
        .manage()
        .window()
        .maximize();
      await driver.get(weiboUrl);
      await sleep(5000);
      await driver.findElement(By.css("#loginname")).sendKeys(username);
      await driver
        .findElement(
          By.css(
            "#pl_login_form > div > div:nth-child(3) > div.info_list.password > div > input"
          )
        )
        .sendKeys(password);
      // await driver
      //   .findElement(
      //     By.css(
      //       "#pl_login_form > div > div:nth-child(3) > div.info_list.login_btn > a"
      //     )
      //   )
      //   .click();
      await sleep(15000);
      let cookies = await driver.manage().getCookies();
      log(cookies);
      for (let i = 0; i < cookies.length; i++) {
        Cookie += cookies[i].name + "=" + cookies[i].value + ";";
      }
    } finally {
      await driver.quit();
    }

    return Cookie;
  }

  return getCookieByDriver(username, password);
};

const writeCookie = function(_path) {
  let data = approachCookie();
  fs.writeFileSync(_path, data);
  log("ds" + data);
  return data;
};

module.exports = getCookie;
