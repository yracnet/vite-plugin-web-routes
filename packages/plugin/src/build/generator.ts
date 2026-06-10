import type { WebConfig } from "../types";
import type { RouteElement, RouteEntry } from "./buildTree";

const generateImports = (tree: RouteElement) => {
    const imports: string[] = [];
    
    function walk(node: RouteElement) {
        for (const key of ["WRAP", "WRAP_ERROR","LAYOUT", "LAYOUT_ERROR", "PAGE", "PAGE_ERROR"]) {
            //@ts-ignore
            const item: RouteEntry = node[key];
            if (item && item.lazy) {
                imports.push(`const  ${item.varName} = lazy(() => import("${item.importFile}"));`);
            } else if (item) {
                imports.push(`import ${item.varName} from "${item.importFile}";`);
            }
        }
        for (const child of Object.values(node.children)) {
            walk(child);
        }
    }
    walk(tree);
    return imports.join("\n");
}

const toElement = (varName?: string) => `CREATE_ELEMENT:${varName}`;

const toPath = (name: string) => name.replace('$$', '*')
    .replace('$', ':')
    .replace('[]', '*')
    .replace('[...', '*')
    .replace('[', ':')
    .replace(']', '');


type RouteNode = {
    index?: boolean;
    path?: string;
    element?: string;
    errorElement?: string;
    children: RouteNode[];
}
const createRouterNode = (path: string = "", page: RouteEntry = false, error: RouteEntry = false, index = false): RouteNode => {
    const node: RouteNode = {
        path,
        element: undefined,
        errorElement: undefined,
        children: [],
    };
    if (index) {
        node.index = true;
    }
    if (page) {
        node.element = toElement(page.varName);
        if (error) {
            node.errorElement = toElement(error.varName);
        }
    }
    return node;
}

const walkRoute = (path: string, base: RouteElement, routes: RouteNode[]) => {
    path = toPath(path)
    let parent = routes;
    if (base.WRAP) {
        const root = createRouterNode(path, base.WRAP, base.WRAP_ERROR);
        path = "";
        parent.push(root);
        parent = root.children;
    }
    if (base.LAYOUT) {
        const layout = createRouterNode(path, base.LAYOUT, base.LAYOUT_ERROR);
        path = "";
        parent.push(layout);
        parent = layout.children;
    }
    if (base.PAGE) {
        const page = createRouterNode(path, base.PAGE, base.PAGE_ERROR);
        parent.push(page);
    }
    Object.entries(base.children).forEach(([segment, item]) => {
        const nextSegment = path === "" ? segment : `${path}/${segment}`;
        walkRoute(nextSegment, item, parent);
    });
}


const buildReactRouter = (tree: RouteElement) => {
    const routes: RouteNode[] = [];
    walkRoute("", tree, routes);
    return JSON.stringify(routes, null, 2);
};

export const generateCode = (routeElement: RouteElement, _: WebConfig): string => {
    const imports = generateImports(routeElement);
    const code = buildReactRouter(routeElement)
        .replace(/"CREATE_ELEMENT:(.*)"/g, 'createElement($1)')
        .replace(/"([A-Za-z_$][A-Za-z0-9_$]*)":/g, '$1:');
    return `
import { lazy, createElement } from "react";
${imports}

const routes = ${code};

export default routes;
`;
}