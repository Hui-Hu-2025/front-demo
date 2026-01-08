const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '.cursor', 'debug.log');
const log = (location, message, data, hypothesisId) => {
  const logEntry = JSON.stringify({location, message, data: {...data, hypothesisId}, timestamp:Date.now(), sessionId:'debug-session', runId:'diagnostic'}) + '\n';
  try { fs.appendFileSync(logPath, logEntry); } catch(e) {}
};

// #region agent log
log('diagnose.js:1', 'Diagnostic script started', {}, 'A,B,C,D,E');
// #endregion

// #region agent log
log('diagnose.js:8', 'Node.js version check', {nodeVersion:process.version, majorVersion:parseInt(process.version.slice(1).split('.')[0])}, 'A');
// #endregion

const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

console.log('=== 诊断信息 ===');
console.log(`Node.js 版本: ${nodeVersion}`);
console.log(`主版本号: ${majorVersion}`);

// #region agent log
log('diagnose.js:15', 'Checking node_modules existence', {nodeModulesExists:fs.existsSync(path.join(__dirname,'node_modules'))}, 'B');
// #endregion

const nodeModulesPath = path.join(__dirname, 'node_modules');
const nodeModulesExists = fs.existsSync(nodeModulesPath);
console.log(`node_modules 存在: ${nodeModulesExists}`);

if (nodeModulesExists) {
  // #region agent log
  log('diagnose.js:22', 'Checking eslint-config-react-app', {eslintConfigExists:fs.existsSync(path.join(nodeModulesPath,'eslint-config-react-app'))}, 'B');
  // #endregion
  
  const eslintConfigPath = path.join(nodeModulesPath, 'eslint-config-react-app');
  const eslintConfigExists = fs.existsSync(eslintConfigPath);
  console.log(`eslint-config-react-app 存在: ${eslintConfigExists}`);
  
  // #region agent log
  log('diagnose.js:28', 'Checking @rushstack/eslint-patch', {rushstackExists:fs.existsSync(path.join(nodeModulesPath,'@rushstack','eslint-patch'))}, 'D');
  // #endregion
  
  const rushstackPath = path.join(nodeModulesPath, '@rushstack', 'eslint-patch');
  const rushstackExists = fs.existsSync(rushstackPath);
  console.log(`@rushstack/eslint-patch 存在: ${rushstackExists}`);
  
  // #region agent log
  log('diagnose.js:34', 'Checking react-scripts', {reactScriptsExists:fs.existsSync(path.join(nodeModulesPath,'react-scripts'))}, 'C');
  // #endregion
  
  const reactScriptsPath = path.join(nodeModulesPath, 'react-scripts');
  const reactScriptsExists = fs.existsSync(reactScriptsPath);
  console.log(`react-scripts 存在: ${reactScriptsExists}`);
  
  if (reactScriptsExists) {
    try {
      const packageJsonPath = path.join(reactScriptsPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        // #region agent log
        log('diagnose.js:43', 'react-scripts version', {reactScriptsVersion:packageJson.version}, 'C');
        // #endregion
        console.log(`react-scripts 版本: ${packageJson.version}`);
      }
    } catch (e) {
      console.log(`读取 react-scripts package.json 失败: ${e.message}`);
    }
  }
}

// #region agent log
log('diagnose.js:52', 'Diagnostic script completed', {}, 'A,B,C,D,E');
// #endregion

console.log('\n=== 诊断完成 ===');

