/**
 * Count Substrings That Satisfy K-Constraint II
 * Intuition: The k-constraint windows form a unimodal range: for each left index there is a farthest valid right, and valid substrings in a query range can be split into a triangular prefix plus a prefix-sum of windows that end later.
 * Approach: 1. Sliding-window to compute rightToLeft[r] (leftmost start of a valid window ending at r) and leftToRight[l] (rightmost end of a valid window starting at l). 2. prefix[i] = number of valid substrings ending in [0..i-1]. 3. For query [l,r], if r is inside leftToRight[l] answer C(length, 2)+length; otherwise add that triangle up to leftToRight[l] plus prefix[r+1]-prefix[leftToRight[l]+1].
 * Dry Run:
 *   s = "000", k = 1, query [0,2]
 *   Every substring of zeros has 0 ones, so all 6 substrings are valid.
 * Time Complexity: O(n + q)
 * Space Complexity: O(n)
 */
var countKConstraintSubstrings = function (s, k, queries) {
  const n = s.length;
  const ans = Array(queries.length);
  const count = [0, 0];
  const leftToRight = Array(n);
  const rightToLeft = Array(n);
  const prefix = Array(n + 1).fill(0);

  for (let l = 0, r = 0; r < n; r++) {
    count[s[r] - "0"]++;
    while (count[0] > k && count[1] > k) {
      count[s[l] - "0"]--;
      l++;
    }
    rightToLeft[r] = l;
  }

  count[0] = 0;
  count[1] = 0;

  for (let l = n - 1, r = n - 1; l >= 0; l--) {
    count[s[l] - "0"]++;
    while (count[0] > k && count[1] > k) {
      count[s[r] - "0"]--;
      r--;
    }
    leftToRight[l] = r;
  }

  for (let r = 0; r < n; r++) {
    prefix[r + 1] = prefix[r] + r - rightToLeft[r] + 1;
  }

  for (let i = 0; i < queries.length; i++) {
    const l = queries[i][0];
    const r = queries[i][1];
    if (r > leftToRight[l]) {
      const sz = leftToRight[l] - l + 1;
      ans[i] =
        (sz * (sz + 1)) / 2 + (prefix[r + 1] - prefix[leftToRight[l] + 1]);
    } else {
      const sz = r - l + 1;
      ans[i] = (sz * (sz + 1)) / 2;
    }
  }

  return ans;
};
