/**
 * Minimum Moves to Equal Array Elements III
 * Intuition: This problem requires making all elements in the array equal, with each operation only able to increase a single element by 1. To minimize the number of operations, we should make all elements equal to the maximum value in the array.
 * Approach: Therefore, we can first calculate the maximum value \textit{mx} and the sum of array elements \textit{s}. The number of operations required to make all elements equal to \textit{mx} is \textit{mx} \times n - \textit{s}, where n is the length of the array. The time complexity is O(n), where n is the length of the array. The space complexity is O(1).
 * Dry Run: Input nums = [2,1,3]. Output 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minMoves = function (nums) {
  const n = nums.length;
  const mx = Math.max(...nums);
  const s = nums.reduce((a, b) => a + b, 0);
  return mx * n - s;
};
