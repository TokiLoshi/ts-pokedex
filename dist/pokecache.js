// Create a cache entry Type T to hold objects with the following properties:
// CacheEntry<T>
// createAt number for Date.now
// val - T generic representing object we're cache
export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(timeoutval) {
        this.#interval = timeoutval;
        this.#startReapLoop();
    }
    add(key, val) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val,
        });
    }
    get(key) {
        const result = this.#cache.get(key);
        if (!result) {
            return undefined;
        }
        return result;
    }
    #reap() {
        // Loop through the cache
        // If the entry is older than Date.now() - this.#interval
        const cutoffTime = Date.now() - this.#interval;
        for (const [key, entry] of this.#cache) {
            if (cutoffTime > entry.createdAt) {
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop() {
        // use setInterval to call #this.reap() after a delay of this.#interval
        // stor interval ID in this.
        const id = setInterval(this.#reap.bind(this), this.#interval);
        this.#reapIntervalId = id;
    }
    stopReapLoop() {
        // use clearInterval to stop the reap loop
        clearInterval(this.#reapIntervalId);
        // set this.#reapIntervalId back to undefined
        this.#reapIntervalId = undefined;
    }
}
