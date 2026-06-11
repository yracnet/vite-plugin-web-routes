import { generateCode } from "../src/build/generator";
import { scanDirectory } from "../src/build/scanDirectory";
import { buildTree } from "../src/build/buildTree";
import { assertConfig } from "../src/types";

const run1 = () => {
    const config = assertConfig({
        allowWrap: true,
        allowLayout: false,
        dirs: [
            {
                route: "",
                dir: "./test/p1"
            },
            {
                route: "admin",
                dir: "./test/p2"
            },
        ]
    });
    const files = scanDirectory(config);
    console.log("files", files);
    //const tree = buildTree(files, config);
    //console.log("files", JSON.stringify(tree, null, 2));
    // const code = generateCode(tree, config);
    // console.log("files", code);
}

console.clear();
run1();