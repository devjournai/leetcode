/**
 * Smallest Pair With Different Frequencies
 * Intuition: We use a hash table $\textit{cnt}$ to count the frequency of each value in the array. Then we find the smallest value $x$, and the smallest value $y$ that is greater than $x$ and has a different frequency from $x$. If no such $y$ exists, return $[-1, -1]$. The time complexity is $O(n)$, and the space complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$.
 * Approach: We use a hash table $\textit{cnt}$ to count the frequency of each value in the array. Then we find the smallest value $x$, and the smallest value $y$ that is greater than $x$ and has a different frequency from $x$. If no such $y$ exists, return $[-1, -1]$. The time complexity is $O(n)$, and the space complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$.
 * Dry Run: Input: nums = [1,1,2,2,3,4] => Output: [1,3]
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var minDistinctFreqPair = function (nums) {
  const inf = Number.MAX_SAFE_INTEGER;
  const cnt = new Map();

  let x = inf;
  for (const v of nums) {
    cnt.set(v, (cnt.get(v) ?? 0) + 1);
    x = Math.min(x, v);
  }

  let minY = inf;
  for (const [y] of cnt) {
    if (y < minY && cnt.get(x) !== cnt.get(y)) {
      minY = y;
    }
  }

  return minY === inf ? [-1, -1] : [x, minY];
};
