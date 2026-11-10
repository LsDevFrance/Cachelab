import crypto from "crypto";

class Hash {
  private bucketCount: number;
  private table: number[][];

  constructor(buckets: number) {
    this.bucketCount = buckets;
    this.table = Array.from({ length: this.bucketCount }, () => []);
  }

  hashId(key: string): number {
    const hash = crypto.createHash("sha256").update(key).digest("hex");
    return hash;
  }

  insert(key: { [key: string]: string }) {
    const hashedKey = this.hashId(key.toString());
    const index = this.getHashIndex(hashedKey);

    this.table[index]?.push(hashedKey);
  }

  remove(key: number) {
    const index = this.getHashIndex(key);

    const bucket = this.table[index];
    if (!bucket) return;

    const pos = bucket.indexOf(key);
    if (pos !== -1) {
      bucket.splice(pos, 1);
    }
  }

  display() {
    for (let i = 0; i < this.bucketCount; i++) {
      let output = i.toString();
      for (const key of this.table[i] ?? []) {
        output += " -> " + key;
      }

      console.log(output);
    }
  }

  getHashIndex(key: number) {
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
hashTable.display();
