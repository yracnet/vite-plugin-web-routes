import path from "slash-path";

export type FileRole = "WRAP" | "WRAP_ERROR" // WRAP
  | "LAYOUT" | "LAYOUT_ERROR"  // LAYOUT
  | "INDEX" | "PAGE" | "PAGE_ERROR" // PAGE;

export interface RoleMeta {
  role: FileRole;
  lazy: boolean;
  menu: boolean;
}

export type RoleMapping = Record<string, RoleMeta>;

export const DEFAULT_ROLE_MAPPING: RoleMapping = {
  "ROOT":          { role: "WRAP",         lazy: false, menu: false },
  "CATCH":         { role: "WRAP_ERROR",   lazy: false, menu: false },
  
  "LAYOUT":        { role: "LAYOUT",       lazy: false, menu: false },
  "LAYOUT.lazy":   { role: "LAYOUT",       lazy: true,  menu: false },
  "BOUNDARY":      { role: "LAYOUT_ERROR", lazy: false, menu: false },
  "BOUNDARY.lazy": { role: "LAYOUT_ERROR", lazy: true,  menu: false },
  
  "INDEX":         { role: "PAGE",         lazy: false, menu: true  },
  "PAGE":          { role: "PAGE",         lazy: false, menu: false },
  "PAGE.lazy":     { role: "PAGE",         lazy: true,  menu: false },
  "ERROR":         { role: "PAGE_ERROR",   lazy: false, menu: false },
  "ERROR.lazy":    { role: "PAGE_ERROR",   lazy: true,  menu: false },
};

export interface RouteFile {
  absolutePath: string;
  dirRelativePath: string;
  role: FileRole;
  lazy: boolean;
}

export interface RouteNode {
  segment: string;
  root?: string;
  page?: string;
  layout?: string;
  error?: string;
  boundary?: string;
  children: Map<string, RouteNode>;
}

export interface DirOpt {
  dir: string;
  route: string;
  skip?: boolean | string;
  lazy?: boolean;
}

export interface WebOpts {
  root?: string;
  moduleFile?: string;
  moduleId?: string
  routeBase?: string;
  dirs: DirOpt[];
  allLazy?: boolean;
  allowWrap?: boolean;
  allowLayout?: boolean;
  include?: string[];
  exclude?: string[];
  roleMapping?: Record<string, RoleMeta | false>;
}

export interface DirConfig {
  dir: string;
  route: string;
  lazy: boolean;
}

export interface WebConfig {
  root: string;
  moduleDir: string;
  moduleFile: string;
  moduleId: string;
  routeBase: string;
  dirs: DirConfig[];
  allowWrap: boolean;
  allowLayout: boolean;
  include: string[];
  exclude: string[];
  roleMapping: RoleMapping;
  watchPattern: RegExp
}


function buildWatchPattern(roleMapping: RoleMapping): RegExp {
  const keys = Object.keys(roleMapping)
    .sort((a, b) => b.length - a.length)
    .map((k) => k.replace(/\./g, "\\."));
  return new RegExp(`\\/(${keys.join("|")})\\.(jsx?|tsx?)$`);
}

export const assertConfig = (opts: WebOpts): WebConfig => {
  const {
    root = process.cwd(),
    moduleFile: targetFile = ".web/routes.jsx",
    moduleId = "@web/routes.jsx",
    routeBase = "",
    dirs = [{ route: "", dir: "./src/pages", skip: false }],
    allLazy = false,
    allowWrap = false,
    allowLayout = true,
    exclude = ["node_modules", ".git"],
    include: includeOverride = [],
    roleMapping: roleMappingOverride = {},
  } = opts;
  const currentMode = process.env.NODE_ENV ?? "dev";
  const roleMapping = Object.entries({ ...DEFAULT_ROLE_MAPPING, ...roleMappingOverride })
    .reduce<RoleMapping>((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});
  const watchPattern = buildWatchPattern(roleMapping);

  const includeRole = Object.entries(roleMapping).filter(it => it[1]).map(it => `**/${it[0]}{,.lazy}.{tsx,jsx}`)
  const moduleFile = path.resolve(root, targetFile);
  const moduleDir = path.dirname(moduleFile);
  return {
    root,
    moduleFile,
    moduleDir,
    moduleId,
    routeBase,
    dirs: dirs
      .filter((dir) => {
        if (dir.skip === true || dir.skip === currentMode) {
          return false;
        }
        return true;
      })
      .map((it) => {
        return {
          dir: it.dir,
          route: it.route,
          lazy: allLazy || !!it.lazy,
        }
      }),
    allowWrap,
    allowLayout,
    exclude,
    include: [...includeRole, ...includeOverride],
    roleMapping,
    watchPattern,
  };
};
