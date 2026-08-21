/**
 * Longest Substring Without Repeating Characters
 * Intuition: A sliding window of unique characters is maintained with a Set; when a duplicate appears at `rightPointer`, the left side shrinks until that character is gone, then the window length is recorded.
 * Approach: 1. Initialize `leftPointer`, `maxLength`, and `seenCharacters`. 2. Expand `rightPointer` across `str`. 3. While `currentChar` is already in the set, delete `str[leftPointer]` and increment `leftPointer`. 4. Add `currentChar` and update `maxLength` with `rightPointer - leftPointer + 1`. 5. Return `maxLength`.
 * Dry Run: str = "abcab".
 *   - right=0 'a': set={a}, maxLength=1
 *   - right=1 'b': set={a,b}, maxLength=2
 *   - right=2 'c': set={a,b,c}, maxLength=3
 *   - right=3 'a': delete 'a', left=1, add 'a' → set={b,c,a}, maxLength=3
 *   - right=4 'b': delete 'b', left=2, add 'b' → maxLength=3. Return 3.
 * Time Complexity: O(N)
 * Space Complexity: O(min(M, N))
 */

var lengthOfLongestSubstring = function (str) {
  let leftPointer = 0;
  let maxLength = 0;
  const seenCharacters = new Set();

  for (let rightPointer = 0; rightPointer < str.length; rightPointer++) {
    const currentChar = str[rightPointer];

    while (seenCharacters.has(currentChar)) {
      seenCharacters.delete(str[leftPointer]);
      leftPointer++;
    }

    seenCharacters.add(currentChar);
    maxLength = Math.max(maxLength, rightPointer - leftPointer + 1);
  }

  return maxLength;
};
