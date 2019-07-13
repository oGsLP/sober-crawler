const getCookie = require("./getCookie");
const readPreset = require("./../util/readPreset");
const webUrl = "https://weibo.com/";

let headers = {
  Accept: "*/*",
  "Accept-Encoding": "gzip, deflate, sdch",
  "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "Content-Type": "application/x-www-form-urlencoded",
  Host: "weibo.com",
  Pragma: "no-cache",
  Referer: "http://weibo.com/u/3278620272?profile_ftype=1&is_all=1",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36", // 需要自行修改
  "X-Requested-With": "XMLHttpRequest"
};

const generateUrl = function() {
  let presets = readPreset("weibo");
};

const crawlUid = function(uid) {
  let url = webUrl + uid;
};
