/**
 * Minimum Cost to Equalize Arrays Using Swaps
 * Intuition: We can use two hash tables $\textit{cnt1}$ and $\textit{cnt2}$ to count the occurrences of each integer in the two arrays. During the counting process, we can directly cancel out the occurrences of integers that appear in both arrays. Finally, we check whether the occurrence count of every integer in both hash tables is even. If any integer has an odd count, we return -1. Otherwise, we compute the sum of half the occurrence counts of all integers in $\textit{cnt1}$, which gives the minimum cost. The time complexity is $O(n)$, and the space complexity is $O(n)$, where $n$ is the length of the arrays.
 * Approach: We can use two hash tables $\textit{cnt1}$ and $\textit{cnt2}$ to count the occurrences of each integer in the two arrays. During the counting process, we can directly cancel out the occurrences of integers that appear in both arrays. Finally, we check whether the occurrence count of every integer in both hash tables is even. If any integer has an odd count, we return -1. Otherwise, we compute the sum of half the occurrence counts of all integers in $\textit{cnt1}$, which gives the minimum cost. The time complexity is $O(n)$, and the space complexity is $O(n)$, where $n$ is the length of the arrays.
 * Dry Run: Input: nums1 = [10,20], nums2 = [20,10] => Output: 0
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var minCost = function (nums1, nums2) {
  const cnt2 = new Map();

  for (const x of nums2) {
    cnt2.set(x, (cnt2.get(x) ?? 0) + 1);
  }

  const cnt1 = new Map();

  for (const x of nums1) {
    const c = cnt2.get(x) ?? 0;
    if (c > 0) {
      cnt2.set(x, c - 1);
    } else {
      cnt1.set(x, (cnt1.get(x) ?? 0) + 1);
    }
  }

  let ans = 0;

  for (const v of cnt1.values()) {
    if (v % 2 === 1) {
      return -1;
    }
    ans += Math.floor(v / 2);
  }

  for (const v of cnt2.values()) {
    if (v % 2 === 1) {
      return -1;
    }
  }

  return ans;
};
