// node merge-package.js ./shell-package.json ./caculator-package.json ./package.json
// taro工程中的package.json
var shell = process.argv[2]
// 壳工程中的package.json
var self = process.argv[3]
// 输出的package.json
var dest = process.argv[4]

console.log('merge %s %s into %s', shell, self, dest)

var fs = require('fs');
var shellJson = require(shell)
var selfJson = require(self)

// 合并依赖
Object.keys(selfJson.dependencies).forEach((v) => {
  if (!shellJson.devDependencies[v] && !shellJson.dependencies[v]) {
    shellJson.dependencies[v] = selfJson.dependencies[v]
  }
})

// 合并结果输出到文件中
fs.writeFileSync(dest, JSON.stringify(shellJson, null, 2))