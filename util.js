const fs = require("fs");
const path = require("path");
const finalDir = "compiled";
const distDir = "dist";
const backendDir = "backend";

const dir = fs.readdirSync(path.resolve(__dirname, distDir));
dir.forEach(f => {
  const fileArray = f.split(".");
  if (fileArray[1] == 'js' && fileArray[0] != 'index') { return; }
  fs.copyFileSync(path.resolve(__dirname, distDir, f), path.resolve(__dirname, finalDir, f));
});

const backendFiles = fs.readdirSync(path.resolve(__dirname, backendDir));
backendFiles.forEach(f => {
  fs.copyFileSync(path.resolve(__dirname, backendDir, f), path.resolve(__dirname, finalDir, f));
});
