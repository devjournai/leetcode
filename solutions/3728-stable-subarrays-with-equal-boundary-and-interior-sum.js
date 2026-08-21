/**
 * Stable Subarrays With Equal Boundary and Interior Sum
 * Intuition: We define a prefix sum array \textit{s}, where s[i] represents the sum of the first i elements in the array \text{capacity}, that is, s[i] = \text{capacity}[0] + \text{capacity}[1] + \ldots + \text{capacity}[i-1]. Initially, s[0] = 0.
 * Approach: According to the problem statement, a subarray \text{capacity}[l..r] is a stable array if: \text{capacity}[l] = \text{capacity}[r] = \text{capacity}[l + 1] + \text{capacity}[l + 2] + \ldots + \text{capacity}[r - 1] \text{capacity}[l] = \text{capacity}[r] = s[r] - s[l + 1] We can enumerate the right endpoint r. For each r, we calculate the left endpoint l = r - 2, and store the information of the left endpoints that meet the condition in a hash table. Specifically, we use a hash table \text{cnt} to record the number of occurrences of each key-value pair (\text{capacity}[l], \text{capacity}[l] + s[l + 1]). When we enumerate the right endpoint r, we can query the hash table \text{cnt} to get the number of left endpoints that meet the condition, that is, the number of occurrences of the key-value pair (\text{capacity}[r], s[r]), and add it to the answer. The time complexity is O(n) and the space complexity is O(n), where n is the length of the array.
 * Dry Run: Input capacity = [9,3,3,3,9]. Output 2.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var countStableSubarrays = function (capacity) {
  const n = capacity.length;
  const s = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    s[i] = s[i - 1] + capacity[i - 1];
  }

  const cnt = new Map();
  let ans = 0;

  for (let r = 2; r < n; r++) {
    const l = r - 2;
    const keyL = `${capacity[l]},${capacity[l] + s[l + 1]}`;
    cnt.set(keyL, (cnt.get(keyL) || 0) + 1);

    const keyR = `${capacity[r]},${s[r]}`;
    ans += cnt.get(keyR) || 0;
  }

  return ans;
};
