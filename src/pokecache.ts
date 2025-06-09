// Create a cache entry Type T to hold objects with the following properties:
// CacheEntry<T>
// createAt number for Date.now
// val - T generic representing object we're cache

export type CacheEntry<T> = {
	createdAt: number;
	val: T;
};

export class Cache {
	#cache = new Map<string, CacheEntry<any>>();
	#reapIntervalId: NodeJS.Timeout | undefined = undefined;
	#interval: number;

	constructor(timeoutval: number) {
		this.#interval = timeoutval;
		this.#startReapLoop();
	}

	add<T>(key: string, val: T) {
		this.#cache.set(key, {
			createdAt: Date.now(),
			val: val,
		});
	}
	get<T>(key: string): undefined | T {
		const result = this.#cache.get(key);
		if (!result) {
			return undefined;
		}
		return result.val;
	}
	#reap() {
		// Loop through the cache
		// If the entry is older than Date.now() - this.#interval

		for (const [key, entry] of this.#cache) {
			if (Date.now() - entry.createdAt > this.#interval) {
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
