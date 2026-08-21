/**
 * Minimum Operations To Transform String
 * Intuition: Each operation advances every copy of one letter to the next letter (wrapping z → a). Letters already 'a' need no work; the bottleneck is the letter that is farthest behind 'a' going forward.
 * Approach: 1. Ignore 'a'. 2. For any other character c, it needs 26 - (c - 'a') operations if we always step that letter forward until it becomes 'a'. 3. The answer is the maximum of those distances.
 * Dry Run: s = "yz". 'y' is 2 steps from 'a', 'z' is 1 step. We must cover 2 steps, so answer 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minOperations = function (s) {
  let maxSteps = 0;

  for (const character of s) {
    if (character !== "a") {
      maxSteps = Math.max(maxSteps, 26 - (character.charCodeAt(0) - 97));
    }
  }

  return maxSteps;
};
