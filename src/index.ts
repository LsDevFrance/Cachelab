import { HashMap } from "./hashmap/HashMap.js";
import { listen } from "./routes.js";

const store = new HashMap(32);
listen(store);
