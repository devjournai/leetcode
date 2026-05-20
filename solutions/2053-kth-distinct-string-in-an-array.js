/**
 * Kth Distinct String In An Array
 * Intuition: To find the k-th distinct string in the array while respecting the original order, we first need to identify which strings are distinct (appear exactly once). A frequency map is suitable for this. Once we know the frequency of each string, we can iterate through the original array again, count distinct strings as we encounter them, and return the one that corresponds to the k-th distinct instance.
 * Approach: 1. Populate a frequency map (e.g., `Map`) by iterating through the input array `arr`. Each string will be a key, and its count will be the value. 2. Initialize a counter for distinct strings found so far. 3. Iterate through `arr` a second time. For each string, check its frequency in the map. If the frequency is 1, it's a distinct string. Increment the distinct counter. If the distinct counter equals `k`, this is our target string, so return it. 4. If the loop completes and `k` distinct strings were not found, return an empty string.
 * Dry Run: arr = ["d", "b", "c", "b", "c", "a"], k = 2
 * 1. Initialize stringFrequencyMap = new Map().
 *    - Process "d": stringFrequencyMap = {"d": 1}
 *    - Process "b": stringFrequencyMap = {"d": 1, "b": 1}
 *    - Process "c": stringFrequencyMap = {"d": 1, "b": 1, "c": 1}
 *    - Process "b": stringFrequencyMap = {"d": 1, "b": 2, "c": 1}
 *    - Process "c": stringFrequencyMap = {"d": 1, "b": 2, "c": 2}
 *    - Process "a": stringFrequencyMap = {"d": 1, "b": 2, "c": 2, "a": 1}
 * 2. Initialize distinctStringCounter = 0.
 * 3. Iterate through arr:
 *    - currentStringIterator = "d": stringFrequencyMap.get("d") is 1. distinctStringCounter becomes 1. (1 !== k).
 *    - currentStringIterator = "b": stringFrequencyMap.get("b") is 2. Not distinct.
 *    - currentStringIterator = "c": stringFrequencyMap.get("c") is 2. Not distinct.
 *    - currentStringIterator = "b": stringFrequencyMap.get("b") is 2. Not distinct.
 *    - currentStringIterator = "c": stringFrequencyMap.get("c") is 2. Not distinct.
 *    - currentStringIterator = "a": stringFrequencyMap.get("a") is 1. distinctStringCounter becomes 2. (2 === k). Return "a".
 * Time Complexity: O(N)
 * Space Complexity: O(M)
 */
var kthDistinct = function (arr, k) {
  const stringFrequencyMap = new Map();

  for (const currentStringItem of arr) {
    const existingCount = stringFrequencyMap.get(currentStringItem) || 0;
    stringFrequencyMap.set(currentStringItem, existingCount + 1);
  }

  let distinctStringCounter = 0;
  for (const stringElement of arr) {
    const stringEntryCount = stringFrequencyMap.get(stringElement);
    if (stringEntryCount === 1) {
      distinctStringCounter++;
      if (distinctStringCounter === k) {
        return stringElement;
      }
    }
  }

  return "";
};
