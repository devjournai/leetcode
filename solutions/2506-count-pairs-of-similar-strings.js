/**
 * Count Pairs Of Similar Strings
 * Intuition: Strings are similar if they share the same set of characters. A unique, sorted string representation of these characters can serve as a canonical identifier. Counting frequencies of these canonical identifiers allows for easy calculation of pairs.
 * Approach: 1. Iterate through each word to generate its canonical character set representation (sorted unique characters). 2. Store the frequency of each canonical representation in a hash map. 3. Iterate through the frequencies in the map; for each frequency `n`, add `n * (n - 1) / 2` to a running total of similar pairs.
 * Dry Run: words = ["abca","cba","cba","bac"]
 *   1. Initialize `mapOfSimilarStrings = {}`, `pairAccumulator = 0`.
 *   2. First loop (processing words):
 *      - `wordIndex = 0`, `currentWord = "abca"`: `canonicalStringId` becomes "abc". `mapOfSimilarStrings["abc"] = 1`.
 *      - `wordIndex = 1`, `currentWord = "cba"`: `canonicalStringId` becomes "abc". `mapOfSimilarStrings["abc"] = 2`.
 *      - `wordIndex = 2`, `currentWord = "cba"`: `canonicalStringId` becomes "abc". `mapOfSimilarStrings["abc"] = 3`.
 *      - `wordIndex = 3`, `currentWord = "bac"`: `canonicalStringId` becomes "abc". `mapOfSimilarStrings["abc"] = 4`.
 *   3. After first loop: `mapOfSimilarStrings = {"abc": 4}`.
 *   4. Second loop (calculating pairs from frequencies):
 *      - `currentCountValue = 4`: Since `4 > 1`, `pairAccumulator += (4 * (4 - 1)) / 2 = (4 * 3) / 2 = 6`. `pairAccumulator` is now 6.
 *   5. Return `pairAccumulator` which is 6.
 * Time Complexity: O(N * L)
 * Space Complexity: O(N * K)
 */
var similarPairs = function (words) {
  const mapOfSimilarStrings = new Map();
  let pairAccumulator = 0;

  for (let wordIndex = 0; wordIndex < words.length; ++wordIndex) {
    const currentWord = words[wordIndex];
    const uniqueCharsSet = new Set(currentWord.split(""));
    const uniqueCharsArray = [...uniqueCharsSet];
    const sortedUniqueCharsArray = uniqueCharsArray.sort();
    const canonicalStringId = sortedUniqueCharsArray.join("");

    const existingCount = mapOfSimilarStrings.get(canonicalStringId) || 0;
    mapOfSimilarStrings.set(canonicalStringId, existingCount + 1);
  }

  mapOfSimilarStrings.forEach((currentCountValue) => {
    if (currentCountValue > 1) {
      pairAccumulator += (currentCountValue * (currentCountValue - 1)) / 2;
    }
  });

  return pairAccumulator;
};
