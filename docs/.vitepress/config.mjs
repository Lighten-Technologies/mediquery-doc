import fs from "fs";
import { defineConfig } from "vitepress";

// Collect endpoints by running the collectEndpoints.js script
// execSync("node " + __dirname + "/collectEndpoints.js", { stdio: "inherit" });

const apiPath = fs.readFileSync("docs/path.yaml", "utf-8");

console.log(apiPath);

// const collectedEndpointsPath = path.resolve(__dirname, "../collectedEndpoints.yml");
// const collectedEndpoints = yaml.parse(fs.readFileSync(collectedEndpointsPath, "utf-8"));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FineNurse API",
  description: "A FineNurse Documentaion",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "bl-finedrop2",
        module: "bl-finedrop2",
        // link: "/api-doc/bl-finedrop2",
        versionList: ["master-v1.0.0", "master-v1.0.1", "samsung-v1.0.0", "samsung-v1.0.1"],
        items: [
          {
            module: "bl-finedrop2",
            version: "master-v1.0.0",
            method: [],
            todo: false,
            text: "master-v1.0.0",
            link: "/api-doc/bl-finedrop2/master-v1.0.0",
          },
          {
            module: "bl-finedrop2",
            version: "master-v1.0.0",
            method: ["GET", "POST", "PUT", "DELETE"],
            todo: true,
            text: "/api/lighten/finedrop2/v1/devices",
            link: "/api-doc/bl-finedrop2/master-v1.0.0/api/lighten/finedrop2/v1/devices",
          },
          {
            module: "bl-finedrop2",
            version: "master-v1.0.0",
            method: ["POST"],
            todo: false,
            text: "/api/lighten/finedrop2/v1/devi333ces",
            link: "/markdown-examples/example2",
          },
          {
            module: "bl-finedrop2",
            version: "master-v1.0.0",
            method: ["PUT"],
            todo: true,
            text: "/api/lighten/finedrop2/v1/device32423s",
            link: "/markdown-examples/example2",
          },
          {
            module: "bl-finedrop2",
            version: "master-v1.0.0",
            method: ["DELETE"],
            todo: true,
            text: "/api/lighten/finedrop2/v1/de333vices",
            link: "/markdown-examples/example2",
          },
          ,
          {
            module: "bl-finedrop2",
            version: "master-v1.0.1",
            method: ["PUT"],
            todo: true,
            text: "/api/lighten/finedrop2/v1/device32423s",
            link: "/markdown-examples/example2",
          },
          {
            module: "bl-finedrop2",
            version: "master-v1.0.1",
            method: ["DELETE"],
            todo: true,
            text: "/api/lighten/finedrop2/v1/de333vices",
            link: "/markdown-examples/example2",
          },
          ,
        ],
      },
      {
        text: "bl-finenurse",
        module: "bl-finenurse",
        versionList: ["master-v1.0.0", "master-v1.0.1"],
        items: [
          {
            module: "bl-finenurse",
            version: "master-v1.0.0",
            method: ["GET", "POST", "PUT", "DELETE"],
            todo: true,
            text: "/api/lighten/finenurse/v1/devices",
            link: "/markdown-examples/example1",
          },
          {
            module: "bl-finenurse",
            version: "master-v1.0.0",
            method: ["POST"],
            todo: false,
            text: "/api/lighten/finenurse/v1/devi333ces",
            link: "/markdown-examples/example2",
          },
          {
            module: "bl-finenurse",
            version: "master-v1.0.1",
            method: ["PUT"],
            todo: true,
            text: "/api/lighten/finenurse/v1/device32423s",
            link: "/markdown-examples/example2",
          },
          {
            module: "bl-finenurse",
            version: "master-v1.0.1",
            method: ["DELETE"],
            todo: true,
            text: "/api/lighten/finenurse/v1/de333vices",
            link: "/markdown-examples/example2",
          },
          ,
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
