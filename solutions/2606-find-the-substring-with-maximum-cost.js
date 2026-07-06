/**
 * Find The Substring With Maximum Cost
 * Intuition: This problem can be transformed into a maximum subarray sum problem (Kadane's Algorithm) once individual character costs are determined.
 * Approach: 1. Precompute the cost for each lowercase English letter ('a' through 'z'). Initialize these costs to their 1-indexed alphabetical positions. Then, iterate through the `chars` string and update the costs for any character present in `chars` with its corresponding value from `vals`. 2. Apply Kadane's algorithm to the input string `s`. Iterate through `s`, accumulating the `currentSubarrayCost` by adding the precomputed cost of each character. If `currentSubarrayCost` ever drops below zero, reset it to zero (as starting a new substring from the next character would yield a better or equal sum). Keep track of the `overallMaximumCost` found so far. Ensure `overallMaximumCost` is initialized to 0, as an empty string has a cost of 0, and the maximum cost cannot be negative.
 * Dry Run: s = "abc", chars = "a", vals = [-100]
 * 1. Initialize `charValueMappings`: ['a':1, 'b':2, ..., 'z':26].
 * 2. Override: `charValueMappings['a']` becomes -100. So, mappings are: 'a':-100, 'b':2, 'c':3, ...
 * 3. `overallMaximumCost = 0`, `currentSubarrayCost = 0`.
 * 4. Iterate 's':
 *    - char = 'a': cost = -100. `currentSubarrayCost = Math.max(0, 0 + (-100)) = 0`. `overallMaximumCost = Math.max(0, 0) = 0`.
 *    - char = 'b': cost = 2. `currentSubarrayCost = Math.max(0, 0 + 2) = 2`. `overallMaximumCost = Math.max(0, 2) = 2`.
 *    - char = 'c': cost = 3. `currentSubarrayCost = Math.max(0, 2 + 3) = 5`. `overallMaximumCost = Math.max(2, 5) = 5`.
 * 5. Return `overallMaximumCost` = 5.
 * Time Complexity: O(N + M)
 * Space Complexity: O(1)
 */
var maximumCostSubstring = function (s, chars, vals) {
  const charValueMappings = new Array(26)
    .fill()
    .map((_, charIndex) => charIndex + 1);

  for (
    let stringIterator = 0;
    stringIterator < chars.length;
    stringIterator++
  ) {
    const currentCharacterCode = chars.charCodeAt(stringIterator);
    const alphabetPosition = currentCharacterCode - 97;
    const specifiedValue = vals[stringIterator];
    charValueMappings[alphabetPosition] = specifiedValue;
  }

  let overallMaximumCost = 0;
  let currentSubarrayCost = 0;

  for (const characterOfS of s) {
    const characterAlphabetIndex = characterOfS.charCodeAt(0) - 97;
    const singleCharCost = charValueMappings[characterAlphabetIndex];
    currentSubarrayCost = Math.max(0, currentSubarrayCost + singleCharCost);
    overallMaximumCost = Math.max(overallMaximumCost, currentSubarrayCost);
  }

  return overallMaximumCost;
};
