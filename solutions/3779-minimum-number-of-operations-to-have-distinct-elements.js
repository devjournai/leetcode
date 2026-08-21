/**
 * Minimum Number of Operations to Have Distinct Elements
 * Intuition: We can traverse the array \textit{nums} in reverse order and use a hash table \textit{st} to record the elements we have already traversed. When we traverse to element \textit{nums}[i], if \textit{nums}[i] is already in the hash table \textit{st}, it means we need to remove all elements in \textit{nums}[0..i], and the number of operations required is \left\lfloor \frac{i}{3} \right\rfloor + 1. Otherwise, we add \textit{nums}[i] to the hash table \textit{st} and continue to traverse the next element.
 * Approach: After the traversal is complete, if no duplicate elements are found, then all elements in the array are already distinct, no operations are needed, and the answer is 0. The time complexity is O(n), and the space complexity is O(n). Where n is the length of the array \textit{nums}.
 * Dry Run: Input nums = [3,8,3,6,5,8]. Output 1.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var minOperations = function (nums) {
  const st = new Set();
  for (let i = nums.length - 1; i >= 0; i--) {
    if (st.has(nums[i])) {
      return Math.floor(i / 3) + 1;
    }
    st.add(nums[i]);
  }
  return 0;
};
