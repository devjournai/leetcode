/**
 * Construct Uniform Parity Array I
 * Intuition: If all elements in $\textit{nums1}$ are either all odd or all even, we can directly set $\textit{nums2}$ equal to $\textit{nums1}$, which satisfies the condition. If $\textit{nums1}$ contains both odd and even numbers, we can set each element of $\textit{nums2}$ to the current element of $\textit{nums1}$ minus some element in $\textit{nums1}$ with different parity. Since odd minus even and even minus odd both yield an odd number, all elements of $\textit{nums2}$ will be odd, satisfying the condition. Therefore, regardless of whether the elements in $\textit{nums1}$ are all odd, all even, or a mix of both, we can always construct a valid $\textit{nums2}$. Thus the answer is always $\text{true}$. The time complexity is $O(1)$, and the space complexity is $O(1)$.
 * Approach: If all elements in $\textit{nums1}$ are either all odd or all even, we can directly set $\textit{nums2}$ equal to $\textit{nums1}$, which satisfies the condition. If $\textit{nums1}$ contains both odd and even numbers, we can set each element of $\textit{nums2}$ to the current element of $\textit{nums1}$ minus some element in $\textit{nums1}$ with different parity. Since odd minus even and even minus odd both yield an odd number, all elements of $\textit{nums2}$ will be odd, satisfying the condition. Therefore, regardless of whether the elements in $\textit{nums1}$ are all odd, all even, or a mix of both, we can always construct a valid $\textit{nums2}$. Thus the answer is always $\text{true}$. The time complexity is $O(1)$, and the space complexity is $O(1)$.
 * Dry Run: Input: nums1 = [2,3] => Output: true
 * Time Complexity: O(O(1))
 * Space Complexity: O(O(1))
 */
var uniformArray = function (nums1) {
  return true;
};
