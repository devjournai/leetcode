/**
 * Minimum Capacity Box
 * Intuition: We initialize a variable $\textit{ans}$ to represent the index of the box with the smallest capacity that can hold the item, with an initial value of $-1$. We iterate over the array $\textit{capacity}$, and for each box, if its capacity is greater than or equal to $\textit{itemSize}$, it can hold the item. At this point, we check whether it is the smallest-capacity box found so far; if so, we update $\textit{ans}$. Finally, we return $\textit{ans}$. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{capacity}$. The space complexity is $O(1)$.
 * Approach: We initialize a variable $\textit{ans}$ to represent the index of the box with the smallest capacity that can hold the item, with an initial value of $-1$. We iterate over the array $\textit{capacity}$, and for each box, if its capacity is greater than or equal to $\textit{itemSize}$, it can hold the item. At this point, we check whether it is the smallest-capacity box found so far; if so, we update $\textit{ans}$. Finally, we return $\textit{ans}$. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{capacity}$. The space complexity is $O(1)$.
 * Dry Run: Input: capacity = [1,5,3,7], itemSize = 3 => Output: 2
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var minimumIndex = function (capacity, itemSize) {
  let ans = -1;
  for (let i = 0; i < capacity.length; ++i) {
    const x = capacity[i];
    if (x >= itemSize && (ans === -1 || x < capacity[ans])) {
      ans = i;
    }
  }
  return ans;
};
