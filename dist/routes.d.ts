import http from "node:http";
import type { HashMap } from "./hashmap/HashMap.js";
/** Une seule HashMap partagée par toutes les requêtes (mémoire du cache). */
export declare function createServer(store: HashMap): http.Server;
export declare function listen(store: HashMap): void;
//# sourceMappingURL=routes.d.ts.map