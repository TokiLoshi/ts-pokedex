export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(timeoutval) {
        this.#interval = timeoutval;
        this.#startReapLoop();
    }
    add(key, val) {
        const entry = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
    }
    get(key) {
        const entry = this.#cache.get(key);
        if (entry !== undefined) {
            return entry.val;
        }
        return undefined;
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
    }
    #reap() {
        const now = Date.now();
        for (const [key, entry] of this.#cache) {
            if (now - entry.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }
    stopReapLoop() {
        // use clearInterval to stop the reap loop
        clearInterval(this.#reapIntervalId);
        // set this.#reapIntervalId back to undefined
        this.#reapIntervalId = undefined;
    }
}
