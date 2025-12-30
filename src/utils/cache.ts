/**
 * SimpleCache - In-memory cache with TTL support
 * Provides a simple key-value cache with automatic expiration.
 * Useful for caching API responses, computations, etc.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class SimpleCache<T = any> {
  private cache: Map<string, CacheEntry<T>>;
  private defaultTTL: number;

  /**
   * Create a new SimpleCache instance
   * @param defaultTTL - Default time-to-live in milliseconds (default: 5 minutes)
   */
  constructor(defaultTTL: number = 5 * 60 * 1000) {
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  /**
   * Set a value in the cache
   * @param key - Cache key
   * @param value - Value to cache
   * @param ttl - Optional TTL in milliseconds (uses default if not provided)
   */
  set(key: string, value: T, ttl?: number): void {
    const timeToLive = ttl !== undefined ? ttl : this.defaultTTL;
    const expiresAt = Date.now() + timeToLive;
    
    this.cache.set(key, {
      value,
      expiresAt
    });
  }

  /**
   * Get a value from the cache
   * @param key - Cache key
   * @returns The cached value or undefined if not found or expired
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return undefined;
    }

    // Check if entry has expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Check if a key exists and is not expired
   * @param key - Cache key
   * @returns true if key exists and is valid
   */
  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Delete a specific key from the cache
   * @param key - Cache key to delete
   * @returns true if key existed and was deleted
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all entries from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get the number of entries in the cache (includes expired entries)
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Clean up expired entries from the cache
   * @returns Number of entries removed
   */
  cleanup(): number {
    const now = Date.now();
    let removed = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        removed++;
      }
    }

    return removed;
  }
}
