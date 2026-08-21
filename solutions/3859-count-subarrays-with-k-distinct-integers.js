/**
 * Count Subarrays With K Distinct Integers
 * Intuition: Translate the problem into a direct scan or DP over the constraints, using the official examples as the correctness check.
 * Approach: 1. Parse the inputs. 2. Apply the core algorithm described in Intuition. 3. Return the required value.
 * Dry Run: Input: nums = [1,2,1,2,2], k = 2, m = 2 => Output: 2
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var countSubarrays = function (nums, k, m) {
  const f = (lim) => {
    const cnt = new Map();
    let ans = 0;
    let l = 0;
    let t = 0;

    for (const x of nums) {
      cnt.set(x, (cnt.get(x) ?? 0) + 1);
      if (cnt.get(x) === m) {
        t++;
      }

      while (cnt.size >= lim && t >= k) {
        const y = nums[l++];
        cnt.set(y, cnt.get(y) - 1);

        if (cnt.get(y) === m - 1) {
          t--;
        }

        if (cnt.get(y) === 0) {
          cnt.delete(y);
        }
      }

      ans += l;
    }

    return ans;
  };

  return f(k) - f(k + 1);
};
