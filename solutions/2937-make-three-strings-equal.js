/**
 * Make Three Strings Equal
 * Intuition: To make three strings equal by only deleting rightmost characters, they must share a common prefix. The minimum number of operations is achieved by truncating all three strings to their longest possible common prefix. If no common prefix of at least one character exists, it's impossible to make them equal to a non-empty string, in which case we return -1.
 * Approach: 1. Calculate the lengths of the three input strings. 2. Determine the minimum of these three lengths, as this is the maximum possible length for any common prefix. 3. Initialize a counter for the common prefix length. 4. Iterate from the first character (index 0) up to the minimum length. In each iteration, compare the characters at the current index across all three strings. 5. If all three characters are identical, increment the common prefix length counter. 6. If any characters differ, break the loop, as the common prefix cannot extend further. 7. After the loop, if the final common prefix length is zero, return -1. 8. Otherwise, the total minimum operations are the sum of characters removed from each string, which is (s1.length - commonPrefixLength) + (s2.length - commonPrefixLength) + (s3.length - commonPrefixLength). Return this sum.
 * Dry Run: s1 = "abc", s2 = "acb", s3 = "bac"
 *   1. lengthOne = 3, lengthTwo = 3, lengthThree = 3.
 *   2. minimalLength = Math.min(3, 3, 3) = 3.
 *   3. currentPrefixLength = 0.
 *   4. loopIndex = 0:
 *      - s1[0] ('a'), s2[0] ('a'), s3[0] ('b'). Characters are not all equal ('a' !== 'b').
 *      - Break from the loop.
 *   5. Loop ends. currentPrefixLength remains 0.
 *   6. Check if currentPrefixLength === 0. It is (0 === 0).
 *   7. Return -1.
 * Time Complexity: O(min(N1, N2, N3))
 * Space Complexity: O(1)
 */
var findMinimumOperations = function (s1, s2, s3) {
  const lengthOne = s1.length;
  const lengthTwo = s2.length;
  const lengthThree = s3.length;

  const minimalLength = Math.min(lengthOne, lengthTwo, lengthThree);

  let currentPrefixLength = 0;
  for (let loopIndex = 0; loopIndex < minimalLength; loopIndex++) {
    if (s1[loopIndex] !== s2[loopIndex] || s2[loopIndex] !== s3[loopIndex]) {
      break;
    }
    currentPrefixLength++;
  }

  if (currentPrefixLength === 0) {
    return -1;
  }

  const operationsForFirst = lengthOne - currentPrefixLength;
  const operationsForSecond = lengthTwo - currentPrefixLength;
  const operationsForThird = lengthThree - currentPrefixLength;

  return operationsForFirst + operationsForSecond + operationsForThird;
};
