/**
 * Count Sorted Vowel Strings
 * Intuition: Combinations with repetition: strings of length n over 5 vowels in order. DP: vowelCounter[i] = number of length-n strings ending at vowel i, built by prefix sums of the previous length.
 * Approach: 1. Start with [1,1,1,1,1] for length 1. 2. For each extra character, set counter[i] += counter[i-1] (in place, i from 1 to 4). 3. Sum the five counters.
 * Dry Run: n=2 → after one update [1,2,3,4,5], sum 15.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countVowelStrings = function (n) {
  const vowelCounter = [1, 1, 1, 1, 1];

  for (let stringLength = 1; stringLength < n; stringLength++) {
    for (let vowelPosition = 1; vowelPosition < 5; vowelPosition++) {
      vowelCounter[vowelPosition] += vowelCounter[vowelPosition - 1];
    }
  }

  let finalSum = 0;
  for (let currentPosition = 0; currentPosition < 5; currentPosition++) {
    finalSum += vowelCounter[currentPosition];
  }
  return finalSum;
};
