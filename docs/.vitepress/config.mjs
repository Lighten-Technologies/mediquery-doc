import fs from "fs";
import { defineConfig } from "vitepress";

// Collect endpoints by running the collectEndpoints.js script
// execSync("node " + __dirname + "/collectEndpoints.js", { stdio: "inherit" });

const apiPath = fs.readFileSync("docs/path.yaml", "utf-8");
const sideBar = JSON.parse(fs.readFileSync("docs/api-doc/sidebar.json", "utf-8"));

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
    // nav: [{ text: "Home", link: "/" }],

    sidebar: sideBar,

    socialLinks: [
      { icon: "github", link: "https://github.com/Lighten-Technologies" },
      { icon: "homepage", link: "http://lighten-tech.co.kr/" },
    ],
  },
  ignoreDeadLinks: true,
});
