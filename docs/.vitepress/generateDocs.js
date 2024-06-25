const fs = require("fs");
const path = require("path");
const yaml = require("yaml");
const ejs = require("ejs");

// 템플릿 파일 읽기
const moduleInfoTemplate = path.join(__dirname, "moduleInfo.ejs");
const versionInfoTemplate = path.join(__dirname, "versionInfoTemplate.ejs");
const apiDocTemplate = path.join(__dirname, "apiDocTemplate.ejs");
const schemaTemplate = path.join(__dirname, "schemaTemplate.ejs");

const basePath = path.join(__dirname, "../", "knowledge-base");
const outputBasePath = path.join(__dirname, "../", "api-doc");

// bl-finedrop2 tree
// .
// ├── master-v1.0.0
// │   ├── doc
// │   │   ├── device.yml
// │   │   └── pairing.yml
// │   ├── examples.yml
// │   ├── patchNote.md
// │   ├── path.yml
// │   └── schema
// │       ├── deviceDVO.json
// │       └── pairingDVO.json
// ├── master-v1.0.1
// │   ├── doc
// │   │   ├── device.yml
// │   │   └── pairing.yml
// │   ├── examples.yml
// │   ├── patchNote.md
// │   ├── path.yml
// │   └── schema
// │       ├── deviceDVO.json
// │       └── pairingDVO.json
// └── moduleInfo.yml
function makeVersionDirToDoc(moduleName, versionDir) {
  const version = path.basename(versionDir);
  const files = fs.readdirSync(versionDir);

  const versionInfo = yaml.parse(fs.readFileSync(path.join(versionDir, "info.yml"), "utf-8"));

  const docFiles = fs.readdirSync(path.join(versionDir, "doc"));
  const docEndPoints = docFiles.reduce((acc, curr, index, array) => {
    const docFilePath = path.join(versionDir, "doc", curr);
    const docContent = fs.readFileSync(docFilePath, "utf-8");

    try {
      const docData = yaml.parse(docContent).endpoints;
      acc.push(...docData);
      return acc;
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 스키마 정리
  const schemaFiles = fs.readdirSync(path.join(versionDir, "schema"));
  const schemaEndPoints = schemaFiles.reduce((acc, curr, index, array) => {
    const schemaFilePath = path.join(versionDir, "schema", curr);
    const schemaContent = fs.readFileSync(schemaFilePath, "utf-8");

    try {
      const schemaData = JSON.parse(schemaContent);
      acc.push({
        schemaName: curr,
        schemaData,
      });
    } catch (e) {
      console.error(e);
    }
    return acc;
  }, []);

  // write apiDoc
  try {
    // version Info write
    try {
      fs.mkdirSync(path.join(outputBasePath, moduleName, version), { recursive: true });
      ejs.renderFile(versionInfoTemplate, { versionInfo }, (err, str) => {
        if (err) {
          console.error(err);
        } else {
          fs.writeFileSync(
            path.join(outputBasePath, moduleName, version, "index.md"),
            str,
            "utf-8"
          );
        }
      });
    } catch (e) {
      console.error(e);
    }

    // schema write
    try {
      fs.mkdirSync(path.join(outputBasePath, moduleName, version, "schema"), {
        recursive: true,
      });

      ejs.renderFile(schemaTemplate, { moduleName, version, schemaEndPoints }, (err, str) => {
        if (err) {
          console.error(err);
        } else {
          fs.writeFileSync(
            path.join(outputBasePath, moduleName, version, "schema", "index.md"),
            str,
            "utf-8"
          );
        }
      });
    } catch (e) {
      console.error(e);
    }

    // documents write
    const docEndPointsByPath = docEndPoints.reduce((acc, curr, index, array) => {
      if (acc[curr.path]) {
        acc[curr.path][curr.method] = curr;
      } else {
        acc[curr.path] = {
          [curr.method]: curr,
        };
      }
      return acc;
    }, {});
    //     {
    //   '/api/lighten/finedrop2/v1/devices': {
    //     GET: {
    //       method: 'GET',
    //       path: '/api/lighten/finedrop2/v1/devices',
    //       name: '디바이스 목록 가져오기',
    //       description: '장치 목록을 가져옵니다.\n',
    //       request: [Object],
    //       response: [Object]
    //     },
    //     POST: {
    //       method: 'POST',
    //       path: '/api/lighten/finedrop2/v1/devices',
    //       name: '디바이스 목록 입력',
    //       description: '장치 목록을 가져옵니다.\n',
    //       request: [Object],
    //       response: [Object]
    //     }
    //   },
    //   '/api/lighten/finedrop2/v1/devices/new': {
    //     GET: {
    //       method: 'GET',
    //       path: '/api/lighten/finedrop2/v1/devices/new',
    //       name: '신규 디바이스 목록 가져오기',
    //       description: '장치 목록을 가져옵니다.\n',
    //       request: [Object],
    //       response: [Object]
    //     }
    //   },
    //   '/api/lighten/finedrop2/v1/pairings': {
    //     GET: {
    //       method: 'GET',
    //       path: '/api/lighten/finedrop2/v1/pairings',
    //       name: '디바이스 목록 가져오기',
    //       description: '장치 목록을 가져옵니다.\n',
    //       request: [Object],
    //       response: [Object]
    //     },
    //     POST: {
    //       method: 'POST',
    //       path: '/api/lighten/finedrop2/v1/pairings',
    //       name: '디바이스 목록 입력',
    //       description: '장치 목록을 가져옵니다.\n',
    //       request: [Object],
    //       response: [Object]
    //     }
    //   },
    //   '/api/lighten/finedrop2/v1/pairings/new': {
    //     GET: {
    //       method: 'GET',
    //       path: '/api/lighten/finedrop2/v1/pairings/new',
    //       name: '신규 디바이스 목록 가져오기',
    //       description: '장치 목록을 가져옵니다.\n',
    //       request: [Object],
    //       response: [Object]
    //     }
    //   }
    // }
    Object.keys(docEndPointsByPath).forEach((apiPath) => {
      console.log(moduleName + " | " + version + " | " + apiPath);
      const endPoint = docEndPointsByPath[apiPath];
      try {
        fs.mkdirSync(path.join(outputBasePath, moduleName, version, apiPath), {
          recursive: true,
        });

        ejs.renderFile(apiDocTemplate, { moduleName, version, apiPath, endPoint }, (err, str) => {
          if (err) {
            console.error(err);
          } else {
            fs.writeFileSync(
              path.join(outputBasePath, moduleName, version, apiPath, "index.md"),
              str,
              "utf-8"
            );
          }
        });
      } catch (e) {
        console.error(e);
      }
    });
    // docEndPoints.forEach((endPoint) => {
    //   try {
    //     fs.mkdirSync(path.join(outputBasePath, moduleName, version, endPoint?.path), {
    //       recursive: true,
    //     });

    //     ejs.renderFile(apiDocTemplate, { moduleName, version, endPoint }, (err, str) => {
    //       if (err) {
    //         console.error(err);
    //       } else {
    //         fs.writeFileSync(
    //           path.join(outputBasePath, moduleName, version, endPoint?.path, "index.md"),
    //           str,
    //           "utf-8"
    //         );
    //       }
    //     });
    //   } catch (e) {
    //     console.error(e);
    //   }
    // });
  } catch (e) {
    console.error(e);
  }
}

function makeVersionInfo(moduleName, versionDir) {}

function makeModuleInfo(moduleName, modulePath, versionList) {
  const moduleInfo = yaml.parse(fs.readFileSync(path.join(modulePath, "moduleInfo.yml"), "utf-8"));
  ejs.renderFile(moduleInfoTemplate, { moduleName, moduleInfo, versionList }, (err, str) => {
    if (err) {
      console.error(err);
    } else {
      //touch dir
      fs.mkdirSync(path.join(outputBasePath, moduleName), { recursive: true });
      fs.writeFileSync(path.join(outputBasePath, moduleName, "index.md"), str, "utf-8");
    }
  });
}
const processDirectory = (dir) => {
  const modules = fs.readdirSync(dir);

  modules.forEach((module) => {
    const modulePath = path.join(dir, module);
    const stat = fs.statSync(modulePath);

    const moduleName = module;
    console.log(moduleName);

    // read inside directory
    if (stat.isDirectory()) {
      const files = fs.readdirSync(modulePath);
      const versionList = files.filter((file) => {
        return fs.statSync(path.join(modulePath, file)).isDirectory();
      });

      // make moduleInfo
      makeModuleInfo(moduleName, modulePath, versionList);
      versionList.forEach((versionDir) => {
        const versionPath = path.join(modulePath, versionDir);
        const stat = fs.statSync(versionPath);
        if (stat.isDirectory()) {
          makeVersionDirToDoc(moduleName, versionPath);
        }
      });
    }
  });
};

// 스크립트 실행
processDirectory(basePath);
