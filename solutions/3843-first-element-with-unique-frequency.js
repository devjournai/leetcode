/**
 * First Element with Unique Frequency
 * Intuition: We use a hash table $\textit{cnt}$ to count the occurrences of each element, and then use another hash table $\textit{freq}$ to count the frequency of each occurrence count. Finally, we traverse the array $\textit{nums}$ again. For each element $x$, if the value of $\textit{freq}[\textit{cnt}[x]]$ is 1, it means the occurrence frequency of $x$ is unique, and we return $x$. If no such element is found after traversing, return -1. The time complexity is $O(n)$, and the space complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$.
 * Approach: We use a hash table $\textit{cnt}$ to count the occurrences of each element, and then use another hash table $\textit{freq}$ to count the frequency of each occurrence count. Finally, we traverse the array $\textit{nums}$ again. For each element $x$, if the value of $\textit{freq}[\textit{cnt}[x]]$ is 1, it means the occurrence frequency of $x$ is unique, and we return $x$. If no such element is found after traversing, return -1. The time complexity is $O(n)$, and the space complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$.
 * Dry Run: Input: nums = [20,10,30,30] => Output: 30
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var firstUniqueFreq = function (nums) {
  const cnt = new Map();
  for (const x of nums) {
    cnt.set(x, (cnt.get(x) ?? 0) + 1);
  }

  const freq = new Map();
  for (const v of cnt.values()) {
    freq.set(v, (freq.get(v) ?? 0) + 1);
  }

  for (const x of nums) {
    if (freq.get(cnt.get(x)) === 1) {
      return x;
    }
  }

  return -1;
};
