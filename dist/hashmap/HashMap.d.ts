export declare class HashMap {
    private buckets;
    private capacity;
    private size;
    constructor(capacity?: number);
    set(key: string, value: string): void;
    get(key: string): string | null;
    has(key: string): boolean;
    delete(key: string): boolean;
    keys(): string[];
    getSize(): number;
    debugBuckets(): {
        capacity: number;
        size: number;
        buckets: {
            index: number;
            entries: {
                key: string;
                value: string;
            }[];
        }[];
    };
    private resize;
}
//# sourceMappingURL=HashMap.d.ts.map