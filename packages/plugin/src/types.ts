import { resolve } from "path";

export type FileRole = "INDEX" | "PAGE" | "LAYOUT" | "ERROR" | "BOUNDARY";

export interface RoleMeta {
  role: FileRole;
  lazy: boolean;
  menu: boolean;
}

export type RoleMapping = Record<string, RoleMeta>;

export const DEFAULT_ROLE_MAPPING: RoleMapping = {
  "INDEX":         { role: "PAGE",     lazy: false,  menu: true },
  "PAGE":          { role: "PAGE",     lazy: false,  menu: false },
  "PAGE.lazy":     { role: "PAGE",     lazy: true,   menu: false  },
  "LAYOUT":        { role: "LAYOUT",   lazy: false,  menu: false },
  "LAYOUT.lazy":   { role: "LAYOUT",   lazy: true,   menu: false  },
  "ERROR":         { role: "ERROR",    lazy: false,  menu: false },
  "ERROR.lazy":    { role: "ERROR",    lazy: true,   menu: false  },
  "BOUNDARY":      { role: "BOUNDARY", lazy: false,  menu: false },
  "BOUNDARY.lazy": { role: "BOUNDARY", lazy: true,   menu: false  },
};

export interface RouteFile {
  absolutePath: string;
  dirRelativePath: string;
  role: FileRole;
  lazy: boolean;
}

export interface RouteNode {
  segment: string;
  page?: string;
  layout?: string;
  error?: string;
  boundary?: string;
  children: Map<string, RouteNode>;
}

export interface DirOpt {
  dir: string;
  route: string;
  skip?: boolean;
  lazy?: boolean;
}

export interface WebOpts {
  root?: string;
  moduleFile?: string;
  routeBase?: string;
  dirs: DirOpt[];
  allLazy?: boolean;
  include?: string[];
  exclude?: string[];
  roleMapping?: RoleMapping;
}

export interface DirConfig {
  dir: string;
  route: string;
  lazy: boolean;
}

export interface WebConfig {
  root: string;
  moduleFile: string;
  routeBase: string;
  dirs: DirConfig[];
  include: string[];
  exclude: string[];
  roleMapping: RoleMapping;
}

export const assertConfig = (opts: WebOpts): WebConfig => {
  const {
    root = process.cwd(),
    moduleFile = ".web/routes.jsx",
    routeBase = "",
    dirs = [{ route: "", dir: "./src/pages", skip: false }],
    allLazy = false,
    exclude = ["node_modules", ".git"],
    include = [],
    roleMapping: roleMappingOverride = {},
  } = opts;
  return {
    root,
    moduleFile: resolve(root, moduleFile),
    routeBase,
    dirs: dirs.filter((it) => !it.skip).map((it) => ({
      dir: it.dir,
      route: it.route,
      lazy: allLazy || !!it.lazy,
    })),
    exclude,
    include,
    roleMapping: { ...DEFAULT_ROLE_MAPPING, ...roleMappingOverride },
  };
};
