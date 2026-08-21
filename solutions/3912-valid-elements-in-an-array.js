/**
 * Valid Elements in an Array
 * Intuition: We can preprocess the array to compute the maximum value to the right of each element and store it in an array right.
 * Approach: We can preprocess the array to compute the maximum value to the right of each element and store it in an array right. Then, we traverse the array from left to right, using a variable left to keep track of the maximum value to the left of the current element. For each element, if it satisfies any of the following conditions, we add it to the answer: - It is strictly greater than left. - It is the last element of the array. - It is strictly greater than right[i + 1].
 * Dry Run: Input: nums = [1,2,4,2,3,2]. Output: [1,2,4,3,2].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var findValidElements = function (nums) {
  const n = nums.length;
  const right = new Array(n);
  right[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    right[i] = Math.max(right[i + 1], nums[i]);
  }
  let left = 0;
  const ans = [];
  for (let i = 0; i < n; i++) {
    const x = nums[i];
    if (x > left || i === n - 1 || x > right[i + 1]) {
      ans.push(x);
    }
    left = Math.max(left, x);
  }
  return ans;
};
