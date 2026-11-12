import { HashMap } from "./hashmap/HashMap.js";

const map = new HashMap();
map.set("user:7", "Liron");
map.set("prix:42", "19.99");
map.set("user:7", "Liron S.");
map.debug(); // attendu → capacity: 16 size: 2 buckets: 16
