/**
 * Find the Length of the Longest Common Prefix
 * Intuition: Generate all possible prefixes for numbers in arr1 and store them in a hash set for efficient lookups. Then, for each number in arr2, generate its prefixes and check if any of them exist in the set. The length of the longest matching prefix determines the result.
 * Approach: 1. Initialize an empty Set to store prefixes from arr1 and a variable to track the maximum common prefix length found so far. 2. Iterate through each number in arr1. For each number, repeatedly extract its prefixes (by integer division by 10) until the number becomes 0, adding each extracted prefix to the Set. 3. Iterate through each number in arr2. For each number, repeatedly extract its prefixes. For each extracted prefix, check if it exists in the Set. If it does, calculate its length (by converting to string and getting length) and update the maximum common prefix length if the current prefix is longer. 4. After processing all numbers in arr2, return the maximum common prefix length found.
 * Dry Run: arr1 = [123, 45], arr2 = [12, 678]
 *   1. `storedPrefixes = new Set()`, `maximumLength = 0`
 *   2. Process `arr1`:
 *      - `currentNumberA = 123`:
 *          - `prefixGenA = 123`: `storedPrefixes.add(123)`. `prefixGenA = 12`.
 *          - `prefixGenA = 12`: `storedPrefixes.add(12)`. `prefixGenA = 1`.
 *          - `prefixGenA = 1`: `storedPrefixes.add(1)`. `prefixGenA = 0`. Loop ends.
 *      - `currentNumberA = 45`:
 *          - `prefixGenA = 45`: `storedPrefixes.add(45)`. `prefixGenA = 4`.
 *          - `prefixGenA = 4`: `storedPrefixes.add(4)`. `prefixGenA = 0`. Loop ends.
 *      `storedPrefixes` is now `{123, 12, 1, 45, 4}`.
 *   3. Process `arr2`:
 *      - `currentNumberB = 12`:
 *          - `prefixGenB = 12`: `storedPrefixes.has(12)` is true. `prefixStringB = "12"`. `currentLengthB = 2`. `maximumLength = Math.max(0, 2)` -> `2`. `prefixGenB = 1`.
 *          - `prefixGenB = 1`: `storedPrefixes.has(1)` is true. `prefixStringB = "1"`. `currentLengthB = 1`. `maximumLength = Math.max(2, 1)` -> `2`. `prefixGenB = 0`. Loop ends.
 *      - `currentNumberB = 678`:
 *          - `prefixGenB = 678`: `storedPrefixes.has(678)` is false. `prefixGenB = 67`.
 *          - `prefixGenB = 67`: `storedPrefixes.has(67)` is false. `prefixGenB = 6`.
 *          - `prefixGenB = 6`: `storedPrefixes.has(6)` is false. `prefixGenB = 0`. Loop ends.
 *   4. Return `maximumLength` (which is 2).
 * Time Complexity: O((N + M) * D)
 * Space Complexity: O(N * D)
 */
var longestCommonPrefix = function (arr1, arr2) {
  const storedPrefixes = new Set();
  let maximumLength = 0;

  for (const currentNumberA of arr1) {
    let prefixGenA = currentNumberA;
    while (prefixGenA > 0) {
      storedPrefixes.add(prefixGenA);
      prefixGenA = Math.floor(prefixGenA / 10);
    }
  }

  for (const currentNumberB of arr2) {
    let prefixGenB = currentNumberB;
    while (prefixGenB > 0) {
      if (storedPrefixes.has(prefixGenB)) {
        let prefixStringB = String(prefixGenB);
        let currentLengthB = prefixStringB.length;
        maximumLength = Math.max(maximumLength, currentLengthB);
      }
      prefixGenB = Math.floor(prefixGenB / 10);
    }
  }

  return maximumLength;
};
