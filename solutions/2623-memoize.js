/**
 * Memoize
 * Intuition: Store results of function calls based on their inputs to avoid redundant computations.
 * Approach: 1. Initialize a Map to serve as the cache for storing previously computed results. 2. Return a new function that encapsulates the original function and the cache. 3. Inside the returned function, generate a unique string key by converting the array of input arguments. 4. Check if this key already exists in the cache. 5. If the key is present, retrieve and return the corresponding cached value immediately. 6. If the key is not found, execute the original function with the current arguments, store its result in the cache using the generated key, and then return this newly calculated result.
 * Dry Run:
 * fn = sum, initial cache (storedResults) = new Map()
 * Call 1: memoizedVersion(2, 3)
 *   functionArgs = [2, 3]
 *   argumentIdentifier = "2,3"
 *   storedResults.has("2,3") is false.
 *   calculatedResult = sum(2, 3) = 5
 *   storedResults.set("2,3", 5)
 *   Return 5.
 *   (storedResults now is {"2,3": 5})
 * Call 2: memoizedVersion(2, 3)
 *   functionArgs = [2, 3]
 *   argumentIdentifier = "2,3"
 *   storedResults.has("2,3") is true.
 *   cachedOutput = storedResults.get("2,3") = 5
 *   Return 5. (The original 'sum' function is not invoked again.)
 * Time Complexity: O(L)
 * Space Complexity: O(N * (L + V))
 */
function memoize(fn) {
  const storedResults = new Map();

  const memoizedVersion = (...functionArgs) => {
    const argumentIdentifier = String(functionArgs);

    if (storedResults.has(argumentIdentifier)) {
      const cachedOutput = storedResults.get(argumentIdentifier);
      return cachedOutput;
    }

    const calculatedResult = fn(...functionArgs);
    storedResults.set(argumentIdentifier, calculatedResult);
    return calculatedResult;
  };

  return memoizedVersion;
}
