/**
 * Provides a promisified implementation of setTimeout
 *
 * @param ms
 */
export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
