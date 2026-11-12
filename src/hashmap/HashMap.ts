import { hash } from "./hash.js";

type Entry = {
  key: string;
  value: string;
  next: Entry | null;
};

const LOAD_FACTOR = 0.75;

export class HashMap {
  private buckets: (Entry | null)[];
  private capacity: number;
  private size: number;

  constructor(capacity = 16) {
    this.capacity = capacity;
    this.buckets = new Array(capacity).fill(null);
    this.size = 0;
  }
  set(key: string, value: string): void {
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

  get(key: string): string | null {
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

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    const index = hash(key, this.capacity);
    let current = this.buckets[index] ?? null;
    let previous: Entry | null = null;

    while (current !== null) {
      if (current.key === key) {
        if (previous === null) {
          this.buckets[index] = current.next;
        } else {
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
  keys(): string[] {
    const result: string[] = [];
    for (const head of this.buckets) {
      let current = head;
      while (current !== null) {
        result.push(current.key);
        current = current.next;
      }
    }
    return result;
  }

  getSize(): number {
    return this.size;
  }

  // GESTION MÉMOIRE : double la capacité et redistribue les clés
  private resize(): void {
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
