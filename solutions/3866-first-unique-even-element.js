/**
 * First Unique Even Element
 * Intuition: We can use a hash table or array $\textit{cnt}$ to count the number of occurrences of each integer in the array. Then we traverse the array again to find and return the first even number that satisfies the condition. If no such even number exists, we return -1. The time complexity is $O(n)$, where $n$ is the length of the array. The space complexity is $O(M)$, where $M$ is the range of integers in the array (100 in this problem).
 * Approach: We can use a hash table or array $\textit{cnt}$ to count the number of occurrences of each integer in the array. Then we traverse the array again to find and return the first even number that satisfies the condition. If no such even number exists, we return -1. The time complexity is $O(n)$, where $n$ is the length of the array. The space complexity is $O(M)$, where $M$ is the range of integers in the array (100 in this problem).
 * Dry Run: Input: nums = [3,4,2,5,4,6] => Output: 2
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(M))
 */
var firstUniqueEven = function (nums) {
  const cnt = new Array(101).fill(0);

  for (const x of nums) {
    cnt[x]++;
  }

  for (const x of nums) {
    if (x % 2 === 0 && cnt[x] === 1) {
      return x;
    }
  }

  return -1;
};
