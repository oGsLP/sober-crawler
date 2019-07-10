const presetDir = "./preset";
const fs = require("fs");
const path = require("path");
const log = console.log;

const readPreset = function(kind = "weibo") {
  let presetPath = path.join(presetDir, kind + ".txt");
  if (kind.match(/[wW]eibo/)) {
    return readWeiboPreset(presetPath);
  }

  if (kind.match(/[kK]uai[sS]hou/)) {
    return readKuaishouPreset(presetPath);
  }

  if (kind.match(/[tT]iktok/)) {
    return readTiktokPreset(presetPath);
  }

  log("wrong kind!");
};

const readWeiboPreset = function(_path) {
  fs.access(_path, err => {
    if (err) {
      log("wrong path");
      return null;
    }
  });
  let data = fs.readFileSync(_path, "utf8");
  let lines = data
    .toString()
    .trim()
    .split("\r\n");
  let [username, password] = lines[0].trim().split(" ");
  let objs = [];
  for (let i = 1; i < lines.length; i++) {
    objs.push({
      uid: lines[i].trim().split(" ")[0],
      option: lines[i].trim().split(" ")[1]
    });
  }

  return {
    username,
    password,
    objs
  };
};

const readKuaishouPreset = function(_path) {
  return {};
};

const readTiktokPreset = function(_path) {
  return {};
};

module.exports = readPreset;
