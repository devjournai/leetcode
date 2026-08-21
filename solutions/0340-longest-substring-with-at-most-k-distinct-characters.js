/**
 * Longest Substring With At Most K Distinct Characters
 * Intuition: A sliding window holds at most k distinct characters via a frequency map. Expand right; while the map has more than k keys, evict from the left.
 * Approach: 1. Grow rightPointer, incrementing charFrequencyMap. 2. While map.size > distinctLimit, decrement the left character and delete it at 0, then leftPointer++. 3. Update longestAchievedLength with right - left + 1. 4. Return that length.
 * Dry Run: inputString = "eceba", distinctLimit = 2.
 *   - Window grows to "ece" (2 distinct). Adding 'b' forces left past the first 'e' then 'c' until size is 2.
 *   - Best length is 3.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var lengthOfLongestSubstringKDistinct = function (inputString, distinctLimit) {
  const charFrequencyMap = new Map();
  let longestAchievedLength = 0;
  let leftPointer = 0;
  let rightPointer = 0;

  while (rightPointer < inputString.length) {
    const currentCharacter = inputString[rightPointer];
    charFrequencyMap.set(
      currentCharacter,
      (charFrequencyMap.get(currentCharacter) || 0) + 1
    );

    for (; charFrequencyMap.size > distinctLimit;) {
      const charToEvict = inputString[leftPointer];
      charFrequencyMap.set(charToEvict, charFrequencyMap.get(charToEvict) - 1);
      if (charFrequencyMap.get(charToEvict) === 0) {
        charFrequencyMap.delete(charToEvict);
      }
      leftPointer++;
    }

    longestAchievedLength = Math.max(
      longestAchievedLength,
      rightPointer - leftPointer + 1
    );
    rightPointer++;
  }

  return longestAchievedLength;
};
