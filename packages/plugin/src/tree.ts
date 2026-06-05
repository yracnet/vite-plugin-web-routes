import type { RouteFile, RouteNode } from "./types";

const toSegment = (part: string): string =>
  part === "[]" ? "*" : part.replace(/^\[(.+)\]$/, ":$1");

export const buildTree = (files: RouteFile[], rootSegment: string): RouteNode => {
  const root: RouteNode = { segment: rootSegment, children: new Map() };

  for (const file of files) {
    const parts = file.dirRelativePath.split("/");
    const dirParts = parts.slice(0, -1);

    let node = root;
    for (const part of dirParts) {
      if (!node.children.has(part)) {
        node.children.set(part, { segment: toSegment(part), children: new Map() });
      }
      node = node.children.get(part)!;
    }

    if (file.role === "PAGE") node.page = file.absolutePath;
    else if (file.role === "LAYOUT") node.layout = file.absolutePath;
    else if (file.role === "ERROR") node.error = file.absolutePath;
    else if (file.role === "BOUNDARY") node.boundary = file.absolutePath;
  }

  return root;
};
