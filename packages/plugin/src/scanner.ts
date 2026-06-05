import { readdirSync, statSync } from "fs";
import { join } from "path";
import type { FileRole, RouteFile, RoleMapping } from "./types";

const VALID_EXTS = [".jsx", ".tsx", ".js", ".ts"];

function getRole(filename: string, mapping: RoleMapping): { role: FileRole; lazy: boolean } | null {
  for (const ext of VALID_EXTS) {
    if (filename.endsWith(ext)) {
      const base = filename.slice(0, filename.length - ext.length);
      const meta = mapping[base];
      if (meta) return { role: meta.role, lazy: meta.lazy };
    }
  }
  return null;
}

function isExcluded(name: string, exclude: string[]): boolean {
  return exclude.includes(name);
}

export function scanDirectory(
  absoluteDir: string,
  exclude: string[],
  roleMapping: RoleMapping,
  relativeBase: string = ""
): RouteFile[] {
  const results: RouteFile[] = [];

  let entries: string[];
  try {
    entries = readdirSync(absoluteDir);
  } catch {
    return results;
  }

  for (const entry of entries) {
    if (isExcluded(entry, exclude)) continue;

    const entryPath = join(absoluteDir, entry);

    let isDir = false;
    let isFile = false;
    try {
      const stat = statSync(entryPath);
      isDir = stat.isDirectory();
      isFile = stat.isFile();
    } catch {
      continue;
    }

    const relPath = relativeBase ? `${relativeBase}/${entry}` : entry;

    if (isDir) {
      results.push(...scanDirectory(entryPath, exclude, roleMapping, relPath));
    } else if (isFile) {
      const matched = getRole(entry, roleMapping);
      if (matched) {
        results.push({
          absolutePath: entryPath.replace(/\\/g, "/"),
          dirRelativePath: relPath,
          role: matched.role,
          lazy: matched.lazy || false,
        });
      }
    }
  }

  return results;
}
