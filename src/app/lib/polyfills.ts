// Global localStorage polyfill for SSR
// This prevents Node.js v25's broken localStorage mock from causing errors
if (typeof window === 'undefined') {
  // Server-side: create a no-op localStorage
  (global as any).localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  };
}
