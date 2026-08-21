/**
 * Last Remaining Integer After Alternating Deletion Operations
 * Intuition: This is Josephus-style elimination that alternates left-to-right and right-to-left every-second deletions. After each pass the remaining values form an arithmetic progression whose start and step can be updated in O(1).
 * Approach: While more than one integer remains, if the current pass goes right-to-left and the length is even, the first remaining value moves forward by the current step. Then halve the count (ceil), double the step, and flip direction.
 * Dry Run: n = 8. Remaining after L pass [1,3,5,7], after R pass [3,7], after L pass [3].
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var lastInteger = function (n) {
  let result = 1;
  let step = 1;
  let fromRight = 0;
  while (n !== 1) {
    if (fromRight && n % 2 === 0) {
      result += step;
    }
    n = Math.floor((n + 1) / 2);
    step *= 2;
    fromRight ^= 1;
  }
  return result;
};
