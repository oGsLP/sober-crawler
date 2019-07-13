// import path from "path";
// import fs from "fs";
const fs = require("fs");
const log = console.log;
const { Builder, By, until } = require("selenium-webdriver");
const readPreset = require("./../util/readPreset");
const sleep = require("./../util/func");
// import { error, success } from "./../util/log";
const weiboUrl = "https://weibo.com/";
const defaultPath = "./preset/cookie/weiboCookie.txt";

const getCookie = async function(cookiePath = defaultPath) {
  // log(fileName);
  // log(dirName);
  let cookie = "";
  try {
    fs.accessSync(cookiePath);
    let data = fs.readFileSync(cookiePath, "utf8");
    if (checkCookieValid(data)) {
      cookie = data;
    } else cookie = await writeCookie(cookiePath);
  } catch (err) {
    cookie = await writeCookie(cookiePath);
  }

  return cookie;
};

const checkCookieValid = function(data) {
  return Boolean(data);
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
    let Cookie = "d";
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
      await driver.wait(
        until.titleIs("我的首页 微博-随时随地发现新鲜事"),
        12000
      );
      let cookies = await driver.manage().getCookies();
      for (let i = 0; i < cookies.length; i++) {
        Cookie += cookies[i].name + "=" + cookies[i].value + ";";
      }
    } catch (e) {
      log(e);
    } finally {
      await driver.quit();
    }

    return Cookie;
  }

  // eslint-disable-next-line no-return-await
  return getCookieByDriver(username, password);
};

const writeCookie = async function(_path) {
  let data = await approachCookie();
  fs.writeFileSync(_path, data);
  return data;
};

module.exports = getCookie;
