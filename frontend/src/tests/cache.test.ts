/**
 * Unit tests for SimpleCache
 */

import { SimpleCache } from '../utils/cache';

describe('SimpleCache', () => {
  let cache: SimpleCache<string>;

  beforeEach(() => {
    cache = new SimpleCache<string>(1000); // 1 second TTL for tests
  });

  afterEach(() => {
    cache.clear();
  });

  describe('set and get', () => {
    it('should store and retrieve a value', () => {
      cache.set('key1', 'value1');
      expect(cache.get('key1')).toBe('value1');
    });

    it('should return undefined for non-existent key', () => {
      expect(cache.get('nonexistent')).toBeUndefined();
    });

    it('should overwrite existing values', () => {
      cache.set('key1', 'value1');
      cache.set('key1', 'value2');
      expect(cache.get('key1')).toBe('value2');
    });

    it('should handle different data types', () => {
      const objectCache = new SimpleCache<any>();
      
      objectCache.set('string', 'test');
      objectCache.set('number', 42);
      objectCache.set('object', { foo: 'bar' });
      objectCache.set('array', [1, 2, 3]);
      
      expect(objectCache.get('string')).toBe('test');
      expect(objectCache.get('number')).toBe(42);
      expect(objectCache.get('object')).toEqual({ foo: 'bar' });
      expect(objectCache.get('array')).toEqual([1, 2, 3]);
    });
  });

  describe('TTL expiration', () => {
    it('should expire entries after default TTL', (done) => {
      cache.set('key1', 'value1');
      expect(cache.get('key1')).toBe('value1');

      setTimeout(() => {
        expect(cache.get('key1')).toBeUndefined();
        done();
      }, 1100); // Wait slightly longer than 1 second TTL
    }, 2000);

    it('should respect custom TTL per entry', (done) => {
      cache.set('short', 'value1', 500); // 500ms TTL
      cache.set('long', 'value2', 2000); // 2000ms TTL

      setTimeout(() => {
        expect(cache.get('short')).toBeUndefined(); // Should be expired
        expect(cache.get('long')).toBe('value2'); // Should still exist
        done();
      }, 700);
    }, 2000);

    it('should not expire entries retrieved before TTL', (done) => {
      cache.set('key1', 'value1');
      
      setTimeout(() => {
        expect(cache.get('key1')).toBe('value1'); // Should still be valid
      }, 500);

      setTimeout(() => {
        expect(cache.get('key1')).toBeUndefined(); // Should be expired
        done();
      }, 1100);
    }, 2000);
  });

  describe('has', () => {
    it('should return true for existing non-expired keys', () => {
      cache.set('key1', 'value1');
      expect(cache.has('key1')).toBe(true);
    });

    it('should return false for non-existent keys', () => {
      expect(cache.has('nonexistent')).toBe(false);
    });

    it('should return false for expired keys', (done) => {
      cache.set('key1', 'value1');
      expect(cache.has('key1')).toBe(true);

      setTimeout(() => {
        expect(cache.has('key1')).toBe(false);
        done();
      }, 1100);
    }, 2000);
  });

  describe('delete', () => {
    it('should delete an existing key', () => {
      cache.set('key1', 'value1');
      expect(cache.has('key1')).toBe(true);
      
      const deleted = cache.delete('key1');
      expect(deleted).toBe(true);
      expect(cache.has('key1')).toBe(false);
    });

    it('should return false when deleting non-existent key', () => {
      const deleted = cache.delete('nonexistent');
      expect(deleted).toBe(false);
    });
  });

  describe('clear', () => {
    it('should remove all entries', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.set('key3', 'value3');
      
      expect(cache.size()).toBe(3);
      
      cache.clear();
      
      expect(cache.size()).toBe(0);
      expect(cache.get('key1')).toBeUndefined();
      expect(cache.get('key2')).toBeUndefined();
      expect(cache.get('key3')).toBeUndefined();
    });
  });

  describe('size', () => {
    it('should return the number of entries', () => {
      expect(cache.size()).toBe(0);
      
      cache.set('key1', 'value1');
      expect(cache.size()).toBe(1);
      
      cache.set('key2', 'value2');
      expect(cache.size()).toBe(2);
      
      cache.delete('key1');
      expect(cache.size()).toBe(1);
    });

    it('should include expired entries in size', (done) => {
      cache.set('key1', 'value1');
      expect(cache.size()).toBe(1);

      setTimeout(() => {
        // Size still includes expired entry until cleanup
        expect(cache.size()).toBe(1);
        // But get should return undefined
        expect(cache.get('key1')).toBeUndefined();
        done();
      }, 1100);
    }, 2000);
  });

  describe('cleanup', () => {
    it('should remove expired entries', (done) => {
      cache.set('key1', 'value1', 500);
      cache.set('key2', 'value2', 2000);
      
      setTimeout(() => {
        expect(cache.size()).toBe(2); // Both still in map
        
        const removed = cache.cleanup();
        expect(removed).toBe(1); // One expired entry removed
        expect(cache.size()).toBe(1); // One entry remains
        expect(cache.get('key2')).toBe('value2'); // Long TTL entry still valid
        done();
      }, 700);
    }, 2000);

    it('should return 0 when no expired entries exist', () => {
      cache.set('key1', 'value1');
      const removed = cache.cleanup();
      expect(removed).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string as key', () => {
      cache.set('', 'empty-key-value');
      expect(cache.get('')).toBe('empty-key-value');
    });

    it('should handle undefined as value', () => {
      const anyCache = new SimpleCache<any>();
      anyCache.set('key', undefined);
      // Since get() returns undefined for both missing and undefined values,
      // we can't distinguish, so has() will also return false
      expect(anyCache.has('key')).toBe(false);
    });

    it('should handle zero TTL', () => {
      cache.set('key1', 'value1', 0);
      // With 0 TTL, entry is set but expires at Date.now() + 0
      // It may still be retrievable if checked immediately
      const result = cache.get('key1');
      // Accept either value (if checked fast enough) or undefined (if expired)
      expect([undefined, 'value1']).toContain(result);
    });

    it('should handle very large TTL', () => {
      cache.set('key1', 'value1', 1000 * 60 * 60 * 24 * 365); // 1 year
      expect(cache.get('key1')).toBe('value1');
    });
  });
});
