import { relative, dirname } from "path";
import type { RouteNode } from "./types";

interface RouteEntry {
  path?: string;
  index?: true;
  elementFile?: string;
  errorFile?: string;
  children?: RouteEntry[];
}

const buildFlatEntries = (node: RouteNode, currentPath: string): RouteEntry[] => {
  if (node.layout) {
    const children: RouteEntry[] = [];
    if (node.page) children.push({ index: true, elementFile: node.page, errorFile: node.error });
    for (const child of node.children.values()) {
      children.push(...buildNestedEntries(child, ""));
    }
    return [{ path: currentPath, elementFile: node.layout, errorFile: node.boundary, children: children.length ? children : undefined }];
  }

  const entries: RouteEntry[] = [];
  if (node.page) entries.push({ path: currentPath, elementFile: node.page, errorFile: node.error });
  for (const child of node.children.values()) {
    const childPath = currentPath === "/" ? child.segment : `${currentPath}/${child.segment}`;
    entries.push(...buildFlatEntries(child, childPath));
  }
  return entries;
};

const buildNestedEntries = (node: RouteNode, basePath: string): RouteEntry[] => {
  const path = basePath ? `${basePath}/${node.segment}` : node.segment;

  if (node.layout) {
    const children: RouteEntry[] = [];
    if (node.page) children.push({ index: true, elementFile: node.page, errorFile: node.error });
    for (const child of node.children.values()) {
      children.push(...buildNestedEntries(child, ""));
    }
    return [{ path, elementFile: node.layout, errorFile: node.boundary, children: children.length ? children : undefined }];
  }

  const entries: RouteEntry[] = [];
  if (node.page) entries.push({ path, elementFile: node.page, errorFile: node.error });
  for (const child of node.children.values()) {
    entries.push(...buildNestedEntries(child, path));
  }
  return entries;
};

const rootToEntries = (root: RouteNode): RouteEntry[] => {
  const rootPath = root.segment || "/";

  if (root.layout) {
    const children: RouteEntry[] = [];
    if (root.page) children.push({ index: true, elementFile: root.page, errorFile: root.error });
    for (const child of root.children.values()) {
      children.push(...buildNestedEntries(child, ""));
    }
    return [{ path: rootPath, elementFile: root.layout, errorFile: root.boundary, children: children.length ? children : undefined }];
  }

  const entries: RouteEntry[] = [];
  if (root.page) entries.push({ path: rootPath, elementFile: root.page, errorFile: root.error });
  for (const child of root.children.values()) {
    const childPath = rootPath === "/" ? child.segment : `${rootPath}/${child.segment}`;
    entries.push(...buildFlatEntries(child, childPath));
  }
  return entries;
};

const collectFiles = (entries: RouteEntry[], out: Set<string>): void => {
  for (const e of entries) {
    if (e.elementFile) out.add(e.elementFile);
    if (e.errorFile) out.add(e.errorFile);
    if (e.children) collectFiles(e.children, out);
  }
};

const toVarName = (absoluteFilePath: string, moduleFileDir: string): string => {
  const rel = relative(moduleFileDir, absoluteFilePath).replace(/\\/g, "/");
  const stripped = rel.replace(/^(\.\.\/)+/, "").replace(/\.[^.]+$/, "");
  return "_" + stripped.replace(/[^a-zA-Z0-9]+/g, "_");
};

const toImportPath = (absoluteFilePath: string, moduleFileDir: string): string => {
  const rel = relative(moduleFileDir, absoluteFilePath).replace(/\\/g, "/");
  return rel.startsWith(".") ? rel : `./${rel}`;
};

const pad = (depth: number): string => "  ".repeat(depth);

const entryToCode = (entry: RouteEntry, varMap: Map<string, string>, depth: number): string => {
  const p = pad(depth);
  const pp = pad(depth + 1);
  const lines: string[] = [`${p}{`];

  if (entry.index) {
    lines.push(`${pp}index: true,`);
  } else if (entry.path !== undefined) {
    lines.push(`${pp}path: "${entry.path}",`);
  }

  if (entry.elementFile) lines.push(`${pp}element: createElement(${varMap.get(entry.elementFile)!}),`);
  if (entry.errorFile) lines.push(`${pp}errorElement: createElement(${varMap.get(entry.errorFile)!}),`);

  if (entry.children?.length) {
    lines.push(`${pp}children: [`);
    for (const child of entry.children) {
      lines.push(entryToCode(child, varMap, depth + 2) + ",");
    }
    lines.push(`${pp}],`);
  }

  lines.push(`${p}}`);
  return lines.join("\n");
};

export const generateCode = (
  roots: RouteNode[],
  absoluteModuleFile: string,
  lazyFiles: Set<string>,
): string => {
  const allEntries: RouteEntry[] = roots.flatMap(rootToEntries);

  const filesUsed = new Set<string>();
  collectFiles(allEntries, filesUsed);

  const targetDir = dirname(absoluteModuleFile);

  const varMap = new Map<string, string>();
  const usedNames = new Set<string>();
  for (const fp of filesUsed) {
    let name = toVarName(fp, targetDir);
    let candidate = name;
    let i = 2;
    while (usedNames.has(candidate)) candidate = `${name}_${i++}`;
    varMap.set(fp, candidate);
    usedNames.add(candidate);
  }

  const eagerFiles = [...filesUsed].filter((fp) => !lazyFiles.has(fp));
  const lazyFilesList = [...filesUsed].filter((fp) => lazyFiles.has(fp));
  const hasLazy = lazyFilesList.length > 0;
  const hasEager = eagerFiles.length > 0;

  const lines: string[] = [];
  const reactImports = hasLazy ? ["lazy", "createElement"] : ["createElement"];
  lines.push(`import { ${reactImports.join(", ")} } from "react";`);
  lines.push("");

  for (const fp of eagerFiles) {
    lines.push(`import ${varMap.get(fp)!} from "${toImportPath(fp, targetDir)}";`);
  }

  if (hasEager && hasLazy) lines.push("");

  for (const fp of lazyFilesList) {
    lines.push(`const ${varMap.get(fp)!} = lazy(() => import("${toImportPath(fp, targetDir)}"));`);
  }

  lines.push("");
  lines.push("const routes = [");
  for (const entry of allEntries) {
    lines.push(entryToCode(entry, varMap, 1) + ",");
  }
  lines.push("];");
  lines.push("");
  lines.push("export default routes;");

  return lines.join("\n");
};
