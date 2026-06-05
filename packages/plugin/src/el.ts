export type JSXElement = {
    tag: string;
    attrs: Record<string, string>;
    children: JSXElement[];
    imports: string[];
};

export const createJSXElement = (tag: string) => {
    const node: JSXElement = {
        tag,
        attrs: {},
        children: [],
        imports: [],
    };

    const raw = () => node;

    const addImport = (imp: string) => {
        node.imports.push(imp);
        return api;
    };

    const setAttr = (key: string, value: any) => {
        if (typeof value === "object") {
            node.attrs[key] = JSON.stringify(value);
        } else {
            node.attrs[key] = String(value);
        }
        return api;
    };

    const addChild = (tag: string) => {
        const child = createJSXElement(tag);
        node.children.push(child.raw());
        return child;
    };

    const printImports = () => {
        const out: string[] = [];
        const walk = (n: JSXElement) => {
            n.imports.forEach((i) => out.push(i));
            n.children.forEach(walk);
        };
        walk(node);
        return out.join("\n");
    };

    const printElement = (indent = "  ") => {
        const render = (el: JSXElement, tab: string): string => {
            const attrs = Object.entries(el.attrs)
                .map(([k, v]) => `${k}=${v}`)
                .join(" ");

            const open = attrs
                ? `<${el.tag} ${attrs}>`
                : `<${el.tag}>`;

            const close = `</${el.tag}>`;

            const children = el.children
                .map((c) => render(c, tab + "  "))
                .join("\n");

            const body = children ? `\n${children}\n${tab}` : "";

            return `${tab}${open}${body}${close}`;
        };

        return render(node, indent);
    };

    const api = {
        addImport,
        setAttr,
        addChild,
        printImports,
        printElement,
        raw,
    };

    return api;
};