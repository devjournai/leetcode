/**
 * Maximum Score After Binary Swaps
 * Intuition: According to the problem statement, each '1' can be swapped left any number of times, so each '1' can choose the largest unpicked number to its left. We can maintain these candidates with a max-heap.
 * Approach: Traverse the string s: for each position i, push the corresponding number \textit{nums}[i] into the max-heap; if s[i] = '1', pop the maximum from the heap and add it to the answer. After the traversal, the accumulated sum is the maximum score. The time complexity is O(n \log n) and the space complexity is O(n), where n is the length of the array \textit{nums}.
 * Dry Run: Input nums = [2,1,5,2,3], s = "01010". Output 7.
 * Time Complexity: O(n \log n)
 * Space Complexity: O(n)
 */
var maximumScore = function (nums, s) {
  let ans = 0;
  const pq = new MaxPriorityQueue();

  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const c = s[i];
    pq.enqueue(x);
    if (c === "1") {
      ans += pq.dequeue();
    }
  }

  return ans;
};
