import { hash } from "./hash.js";
const LOAD_FACTOR = 0.75;
export class HashMap {
    buckets;
    capacity;
    size;
    constructor(capacity = 16) {
        this.capacity = capacity;
        this.buckets = new Array(capacity).fill(null);
        this.size = 0;
    }
    set(key, value) {
        const index = hash(key, this.capacity);
        const head = this.buckets[index] ?? null;
        let current = head;
        while (current !== null) {
            if (current.key === key) {
                current.value = value;
                return;
            }
            current = current.next;
        }
        this.buckets[index] = { key, value, next: head };
        this.size++;
        if (this.size / this.capacity > LOAD_FACTOR) {
            this.resize();
        }
    }
    get(key) {
        const index = hash(key, this.capacity);
        let current = this.buckets[index] ?? null;
        while (current !== null) {
            if (current.key === key) {
                return current.value;
            }
            current = current.next;
        }
        return null;
    }
    has(key) {
        return this.get(key) !== null;
    }
    delete(key) {
        const index = hash(key, this.capacity);
        let current = this.buckets[index] ?? null;
        let previous = null;
        while (current !== null) {
            if (current.key === key) {
                if (previous === null) {
                    this.buckets[index] = current.next;
                }
                else {
                    previous.next = current.next;
                }
                this.size--;
                return true;
            }
            previous = current;
            current = current.next;
        }
        return false;
    }
    // LIST O(n), on doit tout parcourir
    keys() {
        const result = [];
        for (const head of this.buckets) {
            let current = head;
            while (current !== null) {
                result.push(current.key);
                current = current.next;
            }
        }
        return result;
    }
    getSize() {
        return this.size;
    }
    // comme ca on peut voir les buckets
    debugBuckets() {
        const buckets = [];
        for (let index = 0; index < this.capacity; index++) {
            const entries = [];
            let current = this.buckets[index] ?? null;
            while (current !== null) {
                entries.push({ key: current.key, value: current.value });
                current = current.next;
            }
            buckets.push({ index, entries });
        }
        return { capacity: this.capacity, size: this.size, buckets };
    }
    // GESTION MÉMOIRE : double la capacité et redistribue les clés
    resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
        for (const head of oldBuckets) {
            let current = head;
            while (current !== null) {
                this.set(current.key, current.value);
                current = current.next;
            }
        }
    }
}
//# sourceMappingURL=HashMap.js.map