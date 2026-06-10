import { resolve, dirname } from "path";
import { mkdirSync, writeFileSync } from "fs";
import { assertConfig, type WebConfig, type WebOpts } from "./types";

import { scanDirectory } from "./build/scanDirectory";
import { buildTree } from "./build/buildTree";
import { generateCode } from "./build/generator";

export const webRoutes = (opts: WebOpts) => {
  const config: WebConfig = assertConfig(opts);
  const { root, moduleId, moduleFile, dirs, watchPattern, moduleDir } = config;
  mkdirSync(dirname(moduleFile), { recursive: true });

  function generate(): void {
    const files = scanDirectory(config);
    const tree = buildTree(files, config);
    const code = generateCode(tree, config);
    mkdirSync(moduleDir, { recursive: true });
    writeFileSync(moduleFile, code, "utf-8");
  }

  return {
    name: "vite-plugin-web-routes",
    config: () => {
      return {
        resolve: {
          alias: {
            [moduleId]: moduleFile
          }
        }
      }
    },
    buildStart: () => {
      generate();
    },
    configureServer: (server: {
      watcher: { on(event: string, cb: (event: string, path: string) => void): void };
    }) => {
      const watchedDirs = dirs
        .map((d) => resolve(root, d.dir).replace(/\\/g, "/"));
      server.watcher.on("all", (_event: string, filePath: string) => {
        const normalised = filePath.replace(/\\/g, "/");
        const isUnderWatched = watchedDirs.some((dir) => normalised.startsWith(dir));
        if (isUnderWatched && watchPattern.test(normalised)) generate();
      });
    },
  };
};


export default webRoutes;