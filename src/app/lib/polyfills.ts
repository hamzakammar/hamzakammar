// Global localStorage polyfill for SSR
// This prevents Node.js v25's broken localStorage mock from causing errors
if (typeof window === 'undefined') {
  // Server-side: create a no-op localStorage
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  };
}
