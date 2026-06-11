
import path from "slash-path";
import type { WebConfig } from "../types";
import type { RouteDir } from "./scanDirectory";

export type RouteEntry = false | {
    varName: string,
    lazy: boolean,
    importFile: string,
    sourceFile: string,
};
export type RouteElement = {
    WRAP: RouteEntry;
    WRAP_ERROR: RouteEntry;
    LAYOUT: RouteEntry;
    LAYOUT_ERROR: RouteEntry;
    PAGE: RouteEntry;
    PAGE_ERROR: RouteEntry;
    children: Record<string, RouteElement>;
};
const createNode = (): RouteElement => {
    return {
        WRAP: false,
        WRAP_ERROR: false,
        LAYOUT: false,
        LAYOUT_ERROR: false,
        PAGE: false,
        PAGE_ERROR: false,
        children: {},
    };
}
export const buildTree = (routeDirs: RouteDir[], { moduleDir, roleMapping }: WebConfig) => {
    const node = createNode();
    let count = 0;
    for (const { route, dir, lazy, files } of routeDirs) {
        for (const file of files) {
            const nameFile = path.basename(file).replace(/\.[^.]+$/, '');
            const meta = roleMapping[nameFile];
            if (!meta) {
                continue;
            }

            const sourceFile = path.join(dir, file);
            const importFile = path.relative(moduleDir, sourceFile);
            const segment = path.dirname(file);
            const parts = path.join(route, segment)
                .split("/")
                .filter(Boolean)
                .filter(it => it !== ".");
            let current = node;
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                current.children[part] ??= createNode();
                current = current.children[part];
            }

            const varName = path.join(route, segment, nameFile, `${++count}`)
                .replace(/[^a-zA-Z0-9]/g, "_")
                .replace(/_+/g, "_");
            //@ts-ignore
            current[meta.role] = {
                lazy: lazy || meta.lazy,
                varName,
                importFile,
                sourceFile,
            };
        }
    }
    return node;
}
