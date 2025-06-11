export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, value) {
        const entry = {
            createdAt: Date.now(),
            value: value,
        };
        this.#cache.set(key, entry);
    }
    get(key) {
        const entry = this.#cache.get(key);
        if (entry !== undefined) {
            return entry.value;
        }
        return undefined;
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
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
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
        // set this.#reapIntervalId back to undefined
    }
}
