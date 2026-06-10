import { WebConfig } from "../types";
import fg from "fast-glob";

export type RouteDir = {
    dir: string;
    route: string;
    lazy: boolean;
    files: string[];
};
export const scanDirectory = ({ dirs, include, exclude } : WebConfig): RouteDir[] => {
    return dirs.map((it) => {
        const files = fg.sync(include, {
            ignore: exclude,
            onlyDirectories: false,
            dot: true,
            unique: true,
            cwd: it.dir,
        });
        return {
            dir: it.dir,
            route: it.route,
            lazy: it.lazy,
            files
        };
    });
};