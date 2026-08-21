/**
 * Construct Uniform Parity Array II
 * Intuition: If all elements in $\textit{nums1}$ are either all odd or all even, we can directly set $\textit{nums2}$ equal to $\textit{nums1}$, which satisfies the condition. If $\textit{nums1}$ contains both odd and even numbers, we need to find the minimum odd number $mn$, and check whether there exists an even number $x$ in $\textit{nums1}$ such that $x < mn$. If such an even number exists, we cannot construct a valid $\textit{nums2}$, so we return $\text{false}$; otherwise we return $\text{true}$. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{nums1}$. The space complexity is $O(1)$.
 * Approach: If all elements in $\textit{nums1}$ are either all odd or all even, we can directly set $\textit{nums2}$ equal to $\textit{nums1}$, which satisfies the condition. If $\textit{nums1}$ contains both odd and even numbers, we need to find the minimum odd number $mn$, and check whether there exists an even number $x$ in $\textit{nums1}$ such that $x < mn$. If such an even number exists, we cannot construct a valid $\textit{nums2}$, so we return $\text{false}$; otherwise we return $\text{true}$. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{nums1}$. The space complexity is $O(1)$.
 * Dry Run: Input: nums1 = [1,4,7] => Output: true
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var uniformArray = function (nums1) {
  let mn = Number.MAX_SAFE_INTEGER;
  for (const x of nums1) {
    if (x % 2 === 1) {
      mn = Math.min(mn, x);
    }
  }
  for (const x of nums1) {
    if (x % 2 === 0 && mn !== Number.MAX_SAFE_INTEGER && x < mn) {
      return false;
    }
  }
  return true;
};
