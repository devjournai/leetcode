/**
 * Extra Characters In A String
 * Intuition: This problem can be solved using dynamic programming. The state `dp[i]` will represent the minimum number of extra characters required to break the prefix `s[0...i-1]` into valid dictionary words.
 * Approach: 1. Initialize a DP array `dynamicProgrammingState` of size `stringLength + 1`, where `stringLength` is the length of `s`. Set `dynamicProgrammingState[0]` to 0 (no extra characters for an empty prefix) and all other entries to `Infinity`. 2. Convert the `dictionary` into a `Set` for efficient word lookup. 3. Iterate `currentPosition` from 1 to `stringLength` (representing prefixes of increasing length). For each `currentPosition`, initialize `dynamicProgrammingState[currentPosition]` by assuming the character `s[currentPosition-1]` is an extra character, i.e., `dynamicProgrammingState[currentPosition] = dynamicProgrammingState[currentPosition - 1] + 1`. 4. Then, iterate `segmentStart` from 0 up to `currentPosition - 1`. Extract the substring `s.slice(segmentStart, currentPosition)`. 5. If this substring is found in the `wordCollection`, it means we can form a valid word. Update `dynamicProgrammingState[currentPosition]` to the minimum of its current value and `dynamicProgrammingState[segmentStart]` (since the segment from `segmentStart` to `currentPosition - 1` is a valid word, no extra characters are added for this segment itself). 6. The final answer is `dynamicProgrammingState[stringLength]`.
 * Dry Run: s = "leetcode", dictionary = ["leet", "code"]
 * stringLength = 8
 * dynamicProgrammingState = [0, inf, inf, inf, inf, inf, inf, inf, inf]
 * wordCollection = {"leet", "code"}
 *
 * currentPosition = 1: dynamicProgrammingState[1] = dynamicProgrammingState[0] + 1 = 1. No dictionary word found.
 * dynamicProgrammingState = [0, 1, inf, inf, inf, inf, inf, inf, inf]
 *
 * currentPosition = 2: dynamicProgrammingState[2] = dynamicProgrammingState[1] + 1 = 2. No dictionary word found.
 * dynamicProgrammingState = [0, 1, 2, inf, inf, inf, inf, inf, inf]
 *
 * currentPosition = 3: dynamicProgrammingState[3] = dynamicProgrammingState[2] + 1 = 3. No dictionary word found.
 * dynamicProgrammingState = [0, 1, 2, 3, inf, inf, inf, inf, inf]
 *
 * currentPosition = 4: dynamicProgrammingState[4] = dynamicProgrammingState[3] + 1 = 4.
 *   segmentStart = 0: subsegment = "leet". Found in wordCollection.
 *     dynamicProgrammingState[4] = Math.min(4, dynamicProgrammingState[0]) = Math.min(4, 0) = 0.
 * dynamicProgrammingState = [0, 1, 2, 3, 0, inf, inf, inf, inf]
 *
 * currentPosition = 5: dynamicProgrammingState[5] = dynamicProgrammingState[4] + 1 = 1. No dictionary word found.
 * dynamicProgrammingState = [0, 1, 2, 3, 0, 1, inf, inf, inf]
 *
 * currentPosition = 6: dynamicProgrammingState[6] = dynamicProgrammingState[5] + 1 = 2. No dictionary word found.
 * dynamicProgrammingState = [0, 1, 2, 3, 0, 1, 2, inf, inf]
 *
 * currentPosition = 7: dynamicProgrammingState[7] = dynamicProgrammingState[6] + 1 = 3. No dictionary word found.
 * dynamicProgrammingState = [0, 1, 2, 3, 0, 1, 2, 3, inf]
 *
 * currentPosition = 8: dynamicProgrammingState[8] = dynamicProgrammingState[7] + 1 = 4.
 *   segmentStart = 4: subsegment = "code". Found in wordCollection.
 *     dynamicProgrammingState[8] = Math.min(4, dynamicProgrammingState[4]) = Math.min(4, 0) = 0.
 * dynamicProgrammingState = [0, 1, 2, 3, 0, 1, 2, 3, 0]
 *
 * Return dynamicProgrammingState[8] = 0.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N + D)
 */
var minExtraChar = function (s, dictionary) {
  const stringLength = s.length;
  const dynamicProgrammingState = new Array(stringLength + 1).fill(Infinity);
  dynamicProgrammingState[0] = 0;
  const wordCollection = new Set(dictionary);

  let currentPosition = 1;
  while (currentPosition <= stringLength) {
    dynamicProgrammingState[currentPosition] =
      dynamicProgrammingState[currentPosition - 1] + 1;

    for (let segmentStart = 0; segmentStart < currentPosition; segmentStart++) {
      const subsegmentValue = s.slice(segmentStart, currentPosition);
      if (wordCollection.has(subsegmentValue)) {
        dynamicProgrammingState[currentPosition] = Math.min(
          dynamicProgrammingState[currentPosition],
          dynamicProgrammingState[segmentStart],
        );
      }
    }
    currentPosition++;
  }

  return dynamicProgrammingState[stringLength];
};
