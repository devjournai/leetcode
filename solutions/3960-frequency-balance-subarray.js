/**
 * Frequency Balance Subarray
 * Intuition: We can enumerate the left endpoint l of the subarray in the range [0, n), then enumerate the right endpoint r from left to right starting from l. During the enumeration, we use two hash tables cnt and freq to record the frequency of each element in the subarray and the frequency of each frequency value, respectively.
 * Approach: We can enumerate the left endpoint l of the subarray in the range [0, n), then enumerate the right endpoint r from left to right starting from l. During the enumeration, we use two hash tables cnt and freq to record the frequency of each element in the subarray and the frequency of each frequency value, respectively. When either of the following conditions is satisfied, update the answer ans = max(ans, r - l + 1): - There is only one distinct element in the hash table cnt, i.e., the length of cnt is 1; - There are only two distinct frequency values in the hash table freq, i.e., the length of freq is 2, and one frequency value is exactly twice the other;
 * Dry Run: Input: nums = [1,2,2,1,2,3,3,3]. Output: 5.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var getLength = function (nums) {
  const n = nums.length;
  let ans = 1;

  for (let l = 0; l < n; l++) {
    const cnt = new Map();
    const freq = new Map();

    for (let r = l; r < n; r++) {
      const x = nums[r];
      const c = cnt.get(x) ?? 0;

      if ((freq.get(c) ?? 0) > 0) {
        const f = (freq.get(c) ?? 0) - 1;
        if (f === 0) {
          freq.delete(c);
        } else {
          freq.set(c, f);
        }
      }

      cnt.set(x, c + 1);
      freq.set(c + 1, (freq.get(c + 1) ?? 0) + 1);

      const cur = c + 1;

      if (
        cnt.size === 1 ||
        (freq.size === 2 &&
          ((freq.get(cur * 2) ?? 0) > 0 ||
            (cur % 2 === 0 && (freq.get(cur / 2) ?? 0) > 0)))
      ) {
        ans = Math.max(ans, r - l + 1);
      }
    }
  }

  return ans;
};
