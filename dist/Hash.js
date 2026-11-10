function serialize(key) {
    return JSON.stringify(key);
}
function hashId(id) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = (Math.imul(hash, 31) + id.charCodeAt(i)) | 0;
    }
    return hash;
}
class Hash {
    bucketCount;
    table;
    constructor(buckets) {
        this.bucketCount = buckets;
        this.table = Array.from({ length: this.bucketCount }, () => []);
    }
    insert(key) {
        const serialized = serialize(key);
        const index = this.getHashIndex(hashId(serialized));
        const bucket = this.table[index];
        if (!bucket || bucket.includes(serialized))
            return;
        bucket.push(serialized);
    }
    remove(key) {
        const serialized = serialize(key);
        const index = this.getHashIndex(hashId(serialized));
        const bucket = this.table[index];
        if (!bucket)
            return;
        const pos = bucket.indexOf(serialized);
        if (pos !== -1) {
            bucket.splice(pos, 1);
        }
    }
    display() {
        for (let i = 0; i < this.bucketCount; i++) {
            let output = i.toString();
            for (const key of this.table[i] ?? []) {
                output += " --> " + key;
            }
            console.log(output);
        }
    }
    getHashIndex(key) {
        return ((key % this.bucketCount) + this.bucketCount) % this.bucketCount;
    }
}
// Driver Code
const keys = [
    { user1: "liron" },
    { user2: "mathias" },
    { user3: "lucas" },
    { user4: "vanny" },
];
const hashTable = new Hash(7);
for (const key of keys) {
    hashTable.insert(key);
}
hashTable.display();
console.log("-----------------");
hashTable.remove({ user2: "mathias" });
hashTable.display();
export {};
//# sourceMappingURL=Hash.js.map