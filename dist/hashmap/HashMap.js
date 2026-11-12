import { hash } from "./hash.js";
export class HashMap {
    buckets;
    capacity;
    size;
    constructor(capacity = 16) {
        this.buckets = new Array(capacity).fill(null);
        this.capacity = capacity;
        this.size = 0;
    }
    set(key, value) {
        const index = hash(key, this.capacity);
        const head = this.buckets[index] ?? null; // undefined → null
        let current = head;
        while (current !== null) {
            if (current.key === key) {
                current.value = value;
                return;
            }
            current = current.next;
        }
        const entry = {
            key,
            value,
            next: head,
        };
        this.buckets[index] = entry;
        this.size++;
    }
    // méthode temporaire de debug
    debug() {
        console.log("capacity:", this.capacity, "size:", this.size, "buckets:", this.buckets.length);
    }
}
//# sourceMappingURL=HashMap.js.map