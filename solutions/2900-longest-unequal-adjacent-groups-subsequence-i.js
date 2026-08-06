/**
 * Longest Unequal Adjacent Groups Subsequence I
 * Intuition: To find the longest subsequence with alternating group values, a greedy strategy is optimal. By always selecting a word if its group differs from the last chosen word's group, we extend the subsequence as much as possible at each step, ensuring the longest valid sequence.
 * Approach: 1. Initialize an empty array `longestSequence` to store the result. 2. If the input `words` array is not empty, add its first element to `longestSequence` and store its corresponding group value in `previousGroupType`. 3. Iterate through the `words` array starting from the second element (index 1) using a `while` loop. 4. In each iteration, compare the current word's group value (`groups[currentPosition]`) with `previousGroupType`. 5. If they are different, append the current word (`words[currentPosition]`) to `longestSequence` and update `previousGroupType` to `groups[currentPosition]`. 6. Increment the `currentPosition` to move to the next word. 7. After the loop completes, return `longestSequence`.
 * Dry Run: words = ["a","b","c","d"], groups = [1,0,1,1]
 *   1. longestSequence = []
 *   2. words.length (4) > 0. longestSequence.push("a"), so longestSequence = ["a"]. previousGroupType = 1. currentPosition = 1.
 *   3. Loop (currentPosition = 1):
 *      a. currentPosition (1) < words.length (4) is true.
 *      b. groups[1] (0) !== previousGroupType (1) is true.
 *      c. longestSequence.push("b"), so longestSequence = ["a", "b"].
 *      d. previousGroupType = groups[1] (0).
 *      e. currentPosition becomes 2.
 *   4. Loop (currentPosition = 2):
 *      a. currentPosition (2) < words.length (4) is true.
 *      b. groups[2] (1) !== previousGroupType (0) is true.
 *      c. longestSequence.push("c"), so longestSequence = ["a", "b", "c"].
 *      d. previousGroupType = groups[2] (1).
 *      e. currentPosition becomes 3.
 *   5. Loop (currentPosition = 3):
 *      a. currentPosition (3) < words.length (4) is true.
 *      b. groups[3] (1) !== previousGroupType (1) is false.
 *      c. currentPosition becomes 4.
 *   6. Loop (currentPosition = 4):
 *      a. currentPosition (4) < words.length (4) is false. Loop terminates.
 *   7. Return longestSequence = ["a", "b", "c"].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getLongestSubsequence = function (words, groups) {
  const longestSequence = [];

  if (words.length === 0) {
    return longestSequence;
  }

  longestSequence.push(words[0]);
  let previousGroupType = groups[0];
  let currentPosition = 1;

  while (currentPosition < words.length) {
    if (groups[currentPosition] !== previousGroupType) {
      longestSequence.push(words[currentPosition]);
      previousGroupType = groups[currentPosition];
    }
    currentPosition++;
  }

  return longestSequence;
};
