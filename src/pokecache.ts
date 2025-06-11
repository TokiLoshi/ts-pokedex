export type CacheEntry<T> = {
	createdAt: number;
	value: T;
};

export class Cache {
	#cache = new Map<string, CacheEntry<any>>();
	#reapIntervalId: NodeJS.Timeout | undefined = undefined;
	#interval: number;

	constructor(interval: number) {
		this.#interval = interval;
		this.#startReapLoop();
	}

	add<T>(key: string, value: T) {
		const entry: CacheEntry<T> = {
			createdAt: Date.now(),
			value: value,
		};
		this.#cache.set(key, entry);
	}

	get<T>(key: string) {
		const entry = this.#cache.get(key);

		if (entry !== undefined) {
			return entry.value as T;
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
