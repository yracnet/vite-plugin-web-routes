import { resolve, dirname } from "path";
import { mkdirSync, writeFileSync } from "fs";
import { assertConfig, type WebConfig, type RoleMapping, type WebOpts } from "./types";
import { scanDirectory } from "./scanner";
import { buildTree } from "./tree";
import { generateCode } from "./generator";


function buildWatchPattern(roleMapping: RoleMapping): RegExp {
  const keys = Object.keys(roleMapping)
    .sort((a, b) => b.length - a.length)
    .map((k) => k.replace(/\./g, "\\."));
  return new RegExp(`\\/(${keys.join("|")})\\.(jsx?|tsx?)$`);
}

export const webRoutes = (opts: WebOpts) => {
  const config: WebConfig = assertConfig(opts);
  const { root, moduleFile, dirs, exclude, roleMapping } = config;
  const watchPattern = buildWatchPattern(roleMapping);

  function generate(): void {
    const roots = [];
    const lazyFiles = new Set<string>();
    for (const d of dirs) {
      const absoluteDir = resolve(root, d.dir);
      const files = scanDirectory(absoluteDir, exclude, roleMapping);
      roots.push(buildTree(files, d.route));
      for (const file of files) {
        if (d.lazy || file.lazy) {
          lazyFiles.add(file.absolutePath);
        }
      }
    }

    const code = generateCode(roots, moduleFile, lazyFiles);
    mkdirSync(dirname(moduleFile), { recursive: true });
    writeFileSync(moduleFile, code, "utf-8");
  }

  return {
    name: "vite-plugin-web-routes",
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